<template>
  <div class="url-expander-plugin">
    <!-- 脚本头部 -->
    <ScriptHeader 
      title="🔗 短链接批量扩展工具"
      description="自动获取当前表格信息，批量将短链接转换为实际链接"
    />

    <!-- 主要操作区域 -->
    <div v-if="isReady && currentTable" class="main-content">
      <el-card class="operation-card">
    
        <div class="card-content">
          <div class="compact-form">
            <div class="form-group">
              <el-input
                v-model="urlPattern"
                placeholder="匹配规则: bit.ly, t.cn (留空匹配所有URL)"
                clearable
                size="default"
              />
              <div class="help-text">
                💡 多个域名用逗号分隔，留空匹配所有URL
              </div>
            </div>
            
            <div class="form-group">
              <el-select
                v-model="selectedFieldId"
                placeholder="选择短链接列"
                filterable
                size="default"
                style="width: 100%"
                @change="onFieldChange"
              >
                <el-option
                  v-for="field in textFields"
                  :key="field.id"
                  :label="field.name"
                  :value="field.id"
                />
              </el-select>
              <div class="help-text" v-if="textFields.length === 0">
                ⚠️ 未找到文本类型的列
              </div>
            </div>
            
            <div class="form-group">
              <el-radio-group v-model="replaceMode" size="default">
                <el-radio value="inplace">原列替换</el-radio>
                <el-radio value="newColumn">新增列</el-radio>
              </el-radio-group>
            </div>
            
            <div class="form-group" v-if="replaceMode === 'newColumn'">
              <el-input
                v-model="newColumnName"
                placeholder="新列名称: 扩展后链接"
                clearable
                size="default"
              />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 数据预览 -->
      <div v-if="selectedFieldId && matchingUrls.length > 0" class="preview-section">
        <el-card>
          <template #header>
            <div class="preview-header">
              <h3>📊 数据预览</h3>
              <div class="preview-stats">
                找到 {{ matchingUrls.length }} 个匹配的短链接
              </div>
            </div>
          </template>
          
          <el-table :data="matchingUrls" stripe max-height="300" size="small">
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column label="短链接" prop="originalUrl" min-width="150" show-overflow-tooltip />
            <el-table-column label="状态" width="80">
              <template #default="{ row }">
                <el-tag v-if="row.expanded" type="success" size="small">已扩展</el-tag>
                <el-tag v-else-if="row.processing" type="warning" size="small">处理中</el-tag>
                <el-tag v-else type="info" size="small">待处理</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="扩展后链接" prop="expandedUrl" min-width="200" show-overflow-tooltip />
          </el-table>
          
        </el-card>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <el-card>
          <div class="action-buttons">
            <el-button 
              type="primary" 
              size="large"
              @click="startProcess" 
              :disabled="!canStartProcess"
              :loading="processing"
            >
              🚀 {{ processing ? '正在处理...' : '开始扩展短链接' }}
            </el-button>
            
            <el-button 
              v-if="processCompleted && failedCount > 0" 
              type="warning" 
              size="large"
              @click="retryFailedUrls" 
              :loading="retrying"
            >
              🔄 重试失败的 {{ failedCount }} 条
            </el-button>
            
            <el-button 
              v-if="processCompleted" 
              type="success" 
              size="large"
              @click="writeBackResults" 
              :loading="writingBack"
            >
              ✅ {{ replaceMode === 'inplace' ? '写回原列' : '创建新列并写回' }}
            </el-button>
            
            <el-button 
              v-if="processCompleted" 
              size="large"
              @click="exportResults"
            >
              💾 导出结果
            </el-button>
          </div>
          
          <!-- 处理进度 -->
          <div v-if="processing || processCompleted" class="progress-section">
            <el-progress
              :percentage="progressPercentage"
              :status="progressStatus"
              :stroke-width="8"
            />
            <p class="progress-info">
              已处理 {{ processedCount }} / {{ totalCount }} 条记录
              <span v-if="processCompleted">
                （成功 {{ successCount }} 条，失败 {{ failedCount }} 条）
              </span>
            </p>
          </div>
          
          <!-- 警告提示 -->
          <el-alert
            v-if="replaceMode === 'inplace' && selectedFieldId"
            title="🔄 智能替换模式"
            type="info"
            description="原列替换将智能替换：保留原始数据内容，仅将短链接替换为扩展后的链接。建议先备份重要数据。"
            show-icon
            class="warning-alert"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 设置页面布局和元数据
definePageMeta({
  layout: false
})

// 设置页面头部信息
useHead({
  title: '短链接扩展器 - 多维表格脚本管理'
})

// 飞书SDK相关
let bitable: any = null
let currentTable: any = null

// 状态管理
const isReady = ref(false)
const initMessage = ref('正在初始化飞书SDK...')
const error = ref('')
const processing = ref(false)

// 表格数据
const tableFields = ref<Array<{ id: string; name: string; type: string }>>([])
const tableRecords = ref<Array<Record<string, any>>>([])

// 选择的列
const selectedFieldId = ref('')

// 替换模式
const replaceMode = ref<'inplace' | 'newColumn'>('inplace')
const newColumnName = ref('扩展后链接')

// URL匹配规则
const urlPattern = ref('')

// 匹配的URL数据
const matchingUrls = ref<Array<{
  recordId: string
  originalUrl: string
  expandedUrl?: string
  processing?: boolean
  expanded?: boolean
  error?: string
}>>([])

// 处理进度
const totalCount = ref(0)
const processedCount = ref(0)
const successCount = ref(0)
const failedCount = ref(0)
const processCompleted = ref(false)
const writingBack = ref(false)
const retrying = ref(false)

// 计算属性
const textFields = computed(() => {
  console.log('所有字段:', tableFields.value)
  return tableFields.value.filter(field => {
    // 飞书字段类型可能的值（包含可能包含URL的所有类型）
    const urlCompatibleTypes = [
      'Text', 'Url', 'SingleLineText', 'MultiLineText', 
      'RichText', 'Email', 'Phone', 'Link', 'Formula',
      'Attachment', 'SingleLink', 'DuplexLink'
    ]
    const isUrlCompatible = urlCompatibleTypes.some(type => 
      field.type === type || 
      field.type?.toString().toLowerCase().includes('text') ||
      field.type?.toString().toLowerCase().includes('url') ||
      field.type?.toString().toLowerCase().includes('link') ||
      field.type?.toString().toLowerCase().includes('rich')
    )
    console.log(`字段 ${field.name} (${field.type}): ${isUrlCompatible ? '✓ 可能包含URL' : '✗ 不支持'}`)
    return isUrlCompatible
  })
})

const progressPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((processedCount.value / totalCount.value) * 100)
})

const progressStatus = computed(() => {
  if (processCompleted.value) {
    return failedCount.value > 0 ? 'warning' : 'success'
  }
  return ''
})

const canStartProcess = computed(() => {
  return selectedFieldId.value && matchingUrls.value.length > 0 && !processing.value
})

// 方法
function extractUrlFromField(fieldValue: any): string[] {
  console.log('提取URL，输入值:', fieldValue, typeof fieldValue)
  
  if (!fieldValue) return []
  
  const urls: string[] = []
  
  // 从文本中提取URL的正则表达式
  const urlRegex = /https?:\/\/[^\s\u4e00-\u9fff]+/g
  
  function extractUrlsFromText(text: string): string[] {
    const matches = text.match(urlRegex) || []
    return matches.map(url => url.trim())
  }
  
  // 如果是字符串，从中提取URL
  if (typeof fieldValue === 'string') {
    const extractedUrls = extractUrlsFromText(fieldValue)
    urls.push(...extractedUrls)
  }
  
  // 如果是数组，处理数组中的每一项
  if (Array.isArray(fieldValue)) {
    for (const item of fieldValue) {
      if (typeof item === 'string') {
        const extractedUrls = extractUrlsFromText(item)
        urls.push(...extractedUrls)
      } else if (item && typeof item === 'object') {
        // 尝试多种可能的属性名
        const possibleKeys = ['text', 'link', 'url', 'href', 'content', 'value']
        for (const key of possibleKeys) {
          if (item[key] && typeof item[key] === 'string') {
            console.log(`从 ${key} 属性提取文本:`, item[key])
            const extractedUrls = extractUrlsFromText(item[key])
            urls.push(...extractedUrls)
          }
        }
        
        // 如果对象有嵌套结构，递归查找
        if (item.content && Array.isArray(item.content)) {
          const nestedUrls = extractUrlFromField(item.content)
          urls.push(...nestedUrls)
        }
      }
    }
  }
  
  // 如果是对象，尝试提取URL
  if (typeof fieldValue === 'object') {
    const possibleKeys = ['text', 'link', 'url', 'href', 'content', 'value']
    for (const key of possibleKeys) {
      if (fieldValue[key]) {
        const extractedUrls = extractUrlFromField(fieldValue[key])
        urls.push(...extractedUrls)
      }
    }
  }
  
  // 去重并返回
  return [...new Set(urls)]
}

// 智能替换函数：在原始内容中将短链接替换为扩展后的链接
function replaceUrlInContent(originalContent: any, shortUrl: string, expandedUrl: string): any {
  console.log('智能替换函数输入:', { originalContent, shortUrl, expandedUrl })
  
  // 如果原始内容为空或null，直接返回扩展后的URL
  if (!originalContent) {
    return expandedUrl
  }
  
  // 如果是字符串类型，直接进行替换
  if (typeof originalContent === 'string') {
    const result = originalContent.replace(new RegExp(escapeRegExp(shortUrl), 'g'), expandedUrl)
    console.log('字符串替换结果:', result)
    return result
  }
  
  // 如果是数组类型，处理数组中的每一项
  if (Array.isArray(originalContent)) {
    const result = originalContent.map(item => {
      if (typeof item === 'string') {
        return item.replace(new RegExp(escapeRegExp(shortUrl), 'g'), expandedUrl)
      } else if (item && typeof item === 'object') {
        // 处理对象类型，尝试替换常见的文本属性
        const newItem = { ...item }
        const textKeys = ['text', 'content', 'value', 'link', 'url', 'href']
        
        for (const key of textKeys) {
          if (newItem[key] && typeof newItem[key] === 'string') {
            newItem[key] = newItem[key].replace(new RegExp(escapeRegExp(shortUrl), 'g'), expandedUrl)
          }
        }
        return newItem
      }
      return item
    })
    console.log('数组替换结果:', result)
    return result
  }
  
  // 如果是对象类型，处理对象的属性
  if (typeof originalContent === 'object') {
    const result = { ...originalContent }
    const textKeys = ['text', 'content', 'value', 'link', 'url', 'href']
    
    for (const key of textKeys) {
      if (result[key] && typeof result[key] === 'string') {
        result[key] = result[key].replace(new RegExp(escapeRegExp(shortUrl), 'g'), expandedUrl)
      }
    }
    console.log('对象替换结果:', result)
    return result
  }
  
  // 其他情况，返回扩展后的URL
  console.log('未知类型，返回扩展后的URL')
  return expandedUrl
}

// 转义正则表达式特殊字符
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function initFeishuSDK() {
  try {
    initMessage.value = '正在加载飞书SDK...'
    
    // 检查是否在飞书环境中
    const isFeishuEnv = typeof window !== 'undefined' && 
      (window.location.href.includes('feishu') || 
       window.location.href.includes('lark') || 
       window.location.hostname === 'localhost' || 
       window.location.hostname.startsWith('192.168'))
    
    if (!isFeishuEnv) {
      throw new Error('请在飞书多维表格中使用此插件')
    }
    
    // 动态导入飞书SDK
    const { bitable: bitableSDK } = await import('@lark-base-open/js-sdk')
    bitable = bitableSDK
    
    initMessage.value = '正在检查权限...'
    
    // 检查SDK是否可用
    if (!bitable || !bitable.base) {
      // 如果是开发环境，启用模拟模式
      if (window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168')) {
        console.warn('⚠️ 开发环境：启用模拟模式')
        initMessage.value = '开发环境：模拟模式'
        error.value = '当前为开发环境，飞书SDK功能不可用。请在飞书多维表格中使用此插件。'
        return
      }
      throw new Error('飞书SDK未正确加载')
    }
    
    initMessage.value = '正在获取当前表格...'
    
    // 获取当前表格
    currentTable = await bitable.base.getActiveTable()
    
    initMessage.value = '正在加载表格字段...'
    
    // 获取表格字段
    const fieldList = await currentTable.getFieldList()
    const fields = []
    
    console.log('获取到的字段列表:', fieldList)
    
    for (const field of fieldList) {
      try {
        const meta = await field.getMeta()
        console.log('字段元数据:', meta)
        
        // 处理字段类型，飞书SDK可能返回数字类型
        let fieldType = meta.type
        if (typeof fieldType === 'number') {
          // 飞书字段类型枚举映射
          const typeMap: Record<number, string> = {
            1: 'Text',
            2: 'Number', 
            3: 'SingleSelect',
            4: 'MultiSelect',
            5: 'DateTime',
            7: 'Checkbox',
            11: 'Person',
            13: 'Phone',
            15: 'Url',
            17: 'Attachment',
            18: 'SingleLink',
            19: 'Formula',
            20: 'DuplexLink',
            21: 'Location',
            22: 'GroupChat',
            23: 'CreatedTime',
            24: 'ModifiedTime',
            25: 'CreatedUser',
            26: 'ModifiedUser'
          }
          fieldType = typeMap[fieldType] || `Unknown(${fieldType})`
        }
        
        fields.push({
          id: meta.id,
          name: meta.name,
          type: fieldType
        })
      } catch (err) {
        console.error('获取字段元数据失败:', err)
      }
    }
    
    console.log('处理后的字段列表:', fields)
    tableFields.value = fields
    
    initMessage.value = '正在加载表格记录...'
    
    // 获取表格记录
    const recordList = await currentTable.getRecords({
      pageSize: 1000
    })
    
    console.log('获取到的原始记录列表:', recordList)
    console.log('记录数量:', recordList.records?.length || 0)
    
    const processedRecords = recordList.records.map((record: any, index: number) => {
      console.log(`处理记录 ${index}:`, record)
      const processedRecord = {
        recordId: record.recordId || record.id || `record_${index}`,
        ...record.fields
      }
      console.log(`处理后的记录 ${index}:`, processedRecord)
      return processedRecord
    })
    
    tableRecords.value = processedRecords
    console.log('最终的tableRecords:', tableRecords.value)
    
    isReady.value = true
    ElMessage.success('飞书SDK初始化成功！')
    
  } catch (err) {
    console.error('飞书SDK初始化失败:', err)
    error.value = err instanceof Error ? err.message : '初始化失败'
    ElMessage.error('飞书SDK初始化失败: ' + error.value)
  }
}

// 字段变化时的处理
async function onFieldChange() {
  if (selectedFieldId.value) {
    await analyzeUrls()
  }
}

// 分析URL匹配
async function analyzeUrls() {
  console.log('开始分析URL匹配')
  console.log('selectedFieldId:', selectedFieldId.value)
  console.log('tableRecords数量:', tableRecords.value.length)
  console.log('urlPattern:', urlPattern.value)
  
  if (!selectedFieldId.value || tableRecords.value.length === 0) {
    console.log('条件不满足，退出分析')
    matchingUrls.value = []
    return
  }

  const patterns = urlPattern.value
    .split(',')
    .map(p => p.trim())
    .filter(p => p.length > 0)
  
  console.log('解析后的匹配模式:', patterns)

  const matches: typeof matchingUrls.value = []
  
  for (let i = 0; i < tableRecords.value.length; i++) {
    const record = tableRecords.value[i]
    console.log(`检查记录 ${i}:`, record)
    
    const fieldValue = record[selectedFieldId.value]
    console.log(`字段 ${selectedFieldId.value} 的值:`, fieldValue, typeof fieldValue)
    
    // 使用专门的URL提取函数
    const extractedUrls = extractUrlFromField(fieldValue)
    console.log('提取到的URLs:', extractedUrls)
    
    // 处理每个提取到的URL
    for (const extractedUrl of extractedUrls) {
      if (extractedUrl && extractedUrl.trim()) {
        const trimmedUrl = extractedUrl.trim()
        console.log('处理后的URL:', trimmedUrl)
        
        // 检查是否为有效的URL
        const isValidUrl = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')
        console.log('是否为HTTP/HTTPS:', isValidUrl)
        
        if (!isValidUrl) {
          console.log('跳过非URL内容:', trimmedUrl)
          continue
        }
        
        // 检查是否匹配模式（如果没有设置模式，则匹配所有URL）
        let isMatch = true
        if (patterns.length > 0) {
          isMatch = patterns.some(pattern => {
            const match = trimmedUrl.includes(pattern)
            console.log(`模式 "${pattern}" 匹配结果:`, match)
            return match
          })
        } else {
          console.log('没有设置匹配模式，匹配所有URL')
        }
        
        console.log('最终匹配结果:', isMatch)
        
        if (isMatch) {
          console.log('添加到匹配列表:', trimmedUrl)
          matches.push({
            recordId: record.recordId || `record_${i}`,
            originalUrl: trimmedUrl,
            processing: false,
            expanded: false
          })
        }
      }
    }
  }
  
  console.log('最终匹配结果:', matches)
  matchingUrls.value = matches
  ElMessage.success(`找到 ${matches.length} 个匹配的短链接`)
}

// 开始处理短链接扩展
async function startProcess() {
  if (!canStartProcess.value) {
    ElMessage.error('请先选择字段并确保有匹配的短链接')
    return
  }

  processing.value = true
  processCompleted.value = false
  totalCount.value = matchingUrls.value.length
  processedCount.value = 0
  successCount.value = 0
  failedCount.value = 0

  try {
    // 批量处理URL扩展
    for (let i = 0; i < matchingUrls.value.length; i++) {
      const item = matchingUrls.value[i]
      item.processing = true
      
      try {
        console.log(`正在扩展URL: ${item.originalUrl}`)
        
        // 调用URL扩展API
        const response = await $fetch('/api/url-expand/batch', {
          method: 'POST',
          body: {
            urls: [item.originalUrl]
          }
        })

        console.log(`API响应:`, response)

        if (response.success && response.results && response.results[0]) {
          const result = response.results[0] as any
          console.log(`处理结果:`, result)
          
          if (result.success && result.expandedUrl) {
            item.expandedUrl = result.expandedUrl
            item.expanded = true
            successCount.value++
            console.log(`✅ 扩展成功: ${item.originalUrl} -> ${result.expandedUrl}`)
          } else {
            item.error = result.error || '扩展失败'
            failedCount.value++
            console.log(`❌ 扩展失败: ${item.originalUrl}, 错误: ${item.error}`)
          }
        } else {
          item.error = 'API响应格式错误'
          failedCount.value++
          console.log(`❌ API响应格式错误:`, response)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '扩展失败'
        item.error = errorMessage
        failedCount.value++
        console.error(`❌ 请求失败: ${item.originalUrl}, 错误:`, err)
      }
      
      item.processing = false
      processedCount.value++
      
      // 添加小延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    processCompleted.value = true
    ElMessage.success(`处理完成！成功 ${successCount.value} 条，失败 ${failedCount.value} 条`)
  } catch (error) {
    console.error('处理失败:', error)
    ElMessage.error('处理失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    processing.value = false
  }
}

// 重试失败的URL
async function retryFailedUrls() {
  const failedItems = matchingUrls.value.filter(item => !item.expanded && item.error)
  
  if (failedItems.length === 0) {
    ElMessage.info('没有需要重试的失败项')
    return
  }

  retrying.value = true
  
  try {
    ElMessage.info(`开始重试 ${failedItems.length} 个失败的URL`)
    
    let retrySuccessCount = 0
    let retryFailedCount = 0
    
    for (let i = 0; i < failedItems.length; i++) {
      const item = failedItems[i]
      item.processing = true
      item.error = undefined // 清除之前的错误信息
      
      try {
        console.log(`重试扩展URL: ${item.originalUrl}`)
        
        // 调用URL扩展API
        const response = await $fetch('/api/url-expand/batch', {
          method: 'POST',
          body: {
            urls: [item.originalUrl]
          }
        })

        console.log(`重试API响应:`, response)

        if (response.success && response.results && response.results[0]) {
          const result = response.results[0] as any
          console.log(`重试处理结果:`, result)
          
          if (result.success && result.expandedUrl) {
            item.expandedUrl = result.expandedUrl
            item.expanded = true
            retrySuccessCount++
            successCount.value++
            failedCount.value--
            console.log(`✅ 重试成功: ${item.originalUrl} -> ${result.expandedUrl}`)
          } else {
            item.error = result.error || '重试扩展失败'
            retryFailedCount++
            console.log(`❌ 重试失败: ${item.originalUrl}, 错误: ${item.error}`)
          }
        } else {
          item.error = 'API响应格式错误'
          retryFailedCount++
          console.log(`❌ 重试API响应格式错误:`, response)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '重试扩展失败'
        item.error = errorMessage
        retryFailedCount++
        console.error(`❌ 重试请求失败: ${item.originalUrl}, 错误:`, err)
      }
      
      item.processing = false
      
      // 添加小延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    if (retrySuccessCount > 0) {
      ElMessage.success(`重试完成！成功 ${retrySuccessCount} 条，失败 ${retryFailedCount} 条`)
    } else {
      ElMessage.warning(`重试完成，但没有成功的项目。失败 ${retryFailedCount} 条`)
    }
    
  } catch (error) {
    console.error('重试过程出错:', error)
    ElMessage.error('重试过程出错: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    retrying.value = false
  }
}

// 写回结果到飞书表格
async function writeBackResults() {
  if (!currentTable || !bitable) {
    ElMessage.error('飞书SDK未初始化')
    return
  }

  writingBack.value = true
  
  try {
    console.log('写回模式:', replaceMode.value)
    console.log('选中的字段ID:', selectedFieldId.value)
    
    let targetFieldId = selectedFieldId.value
    
    // 如果是新增列模式，先创建新字段
    if (replaceMode.value === 'newColumn') {
      console.log('使用新增列模式，将创建新字段:', newColumnName.value)
      // 检查目标字段名称是否已存在
      const existingFieldNames = tableFields.value.map(field => field.name)
      const targetFieldName = newColumnName.value
      
      // 如果字段已存在，直接使用现有字段而不是创建新字段
      if (existingFieldNames.includes(targetFieldName)) {
        const existingField = tableFields.value.find(field => field.name === targetFieldName)
        if (existingField) {
          targetFieldId = existingField.id
          console.log(`字段"${targetFieldName}"已存在，直接使用现有字段ID:`, targetFieldId)
          ElMessage.info(`字段"${targetFieldName}"已存在，将直接覆盖其中的数据`)
        }
      } else {
        // 字段不存在，创建新字段
        try {
        console.log('正在创建新字段:', newColumnName.value)
        console.log('bitable对象:', bitable)
        console.log('bitable.FieldType:', bitable.FieldType)
        
        // 使用正确的飞书SDK API创建字段
        // 尝试不同的字段类型定义方式
        let fieldType
        let fieldTypeSource = 'unknown'
        
        if (bitable.FieldType && bitable.FieldType.Text) {
          fieldType = bitable.FieldType.Text
          fieldTypeSource = 'bitable.FieldType.Text'
        } else if (bitable.FieldType && bitable.FieldType.TEXT) {
          fieldType = bitable.FieldType.TEXT
          fieldTypeSource = 'bitable.FieldType.TEXT'
        } else if (bitable.FieldType && typeof bitable.FieldType === 'object') {
          // 列出所有可用的字段类型
          console.log('可用的字段类型:', Object.keys(bitable.FieldType))
          // 尝试常见的文本字段类型名称
          const textTypes = ['Text', 'TEXT', 'SingleLineText', 'SINGLE_LINE_TEXT', 'text', 'string']
          for (const typeName of textTypes) {
            if (bitable.FieldType[typeName]) {
              fieldType = bitable.FieldType[typeName]
              fieldTypeSource = `bitable.FieldType.${typeName}`
              break
            }
          }
        }
        
        // 如果还是没有找到，使用数字或字符串作为最后备选
        if (!fieldType) {
          fieldType = 1 // 通常文本字段的数字类型是1
          fieldTypeSource = 'number 1 (fallback)'
        }
        
        console.log('使用的字段类型:', fieldType, '来源:', fieldTypeSource)
        
        const fieldConfig = {
          type: fieldType,
          name: newColumnName.value
        }
        
        console.log('字段配置:', fieldConfig)
        const newField = await currentTable.addField(fieldConfig)
        console.log('创建的新字段:', newField)
        console.log('新字段类型:', typeof newField)
        console.log('新字段的属性:', Object.keys(newField || {}))
        
        // 获取新字段的ID - 尝试多种方式
        if (newField && newField.id) {
          targetFieldId = newField.id
          console.log('从newField.id获取字段ID:', targetFieldId)
        } else if (newField && typeof newField.getMeta === 'function') {
          // 如果有getMeta方法，使用它
          const fieldMeta = await newField.getMeta()
          targetFieldId = fieldMeta.id
          console.log('从getMeta()获取字段ID:', targetFieldId)
        } else if (typeof newField === 'string') {
          // 如果直接返回字段ID字符串
          targetFieldId = newField
          console.log('newField本身就是字段ID:', targetFieldId)
        } else {
          // 最后尝试从返回对象的其他属性获取ID
          const possibleIdKeys = ['fieldId', 'field_id', 'id', 'Id', 'ID']
          for (const key of possibleIdKeys) {
            if (newField && newField[key]) {
              targetFieldId = newField[key]
              console.log(`从${key}属性获取字段ID:`, targetFieldId)
              break
            }
          }
          
          if (!targetFieldId) {
            throw new Error('无法获取新创建字段的ID，newField结构: ' + JSON.stringify(newField))
          }
        }
        
        console.log('新字段ID:', targetFieldId)
        ElMessage.success(`成功创建新列: ${newColumnName.value}`)
        } catch (fieldError) {
          console.error('创建字段失败:', fieldError)
          ElMessage.error('创建新列失败: ' + (fieldError instanceof Error ? fieldError.message : '未知错误'))
          return
        }
      }
    } else {
      console.log('使用原列替换模式，将直接更新选中的字段:', selectedFieldId.value)
    }
    
    // 获取目标字段对象
    console.log('获取目标字段对象，字段ID:', targetFieldId)
    const targetField = await currentTable.getField(targetFieldId)
    console.log('目标字段对象:', targetField)
    
    // 准备要更新的记录
    const successfulItems = matchingUrls.value.filter(item => item.expanded && item.expandedUrl)
    console.log(`准备更新 ${successfulItems.length} 条记录`)
    
    if (successfulItems.length === 0) {
      ElMessage.warning('没有成功扩展的URL需要写回')
      return
    }
    
    let successCount = 0
    let failedCount = 0
    
    // 根据替换模式采用不同的更新策略
    if (replaceMode.value === 'newColumn') {
      // 新增列模式：使用批量操作提升性能
      try {
        console.log('使用批量操作模式更新数据')
        const recordValues = successfulItems.map(item => ({
          recordId: item.recordId,
          fields: {
            [targetFieldId]: item.expandedUrl
          }
        }))
        
        // 使用批量更新接口
        await currentTable.setRecords(recordValues)
        successCount = successfulItems.length
        console.log(`✅ 批量更新成功: ${successCount} 条记录`)
        
      } catch (batchError) {
        console.warn('批量更新失败，回退到单条更新模式:', batchError)
        // 回退到单条更新
        await updateRecordsIndividually()
      }
    } else {
      // 原列替换模式：需要智能替换，使用单条更新
      await updateRecordsIndividually()
    }
    
    // 单条更新函数
    async function updateRecordsIndividually() {
      for (let i = 0; i < successfulItems.length; i++) {
        const item = successfulItems[i]
        try {
          console.log(`更新记录 ${i + 1}/${successfulItems.length}:`)
          console.log('  recordId:', item.recordId)
          console.log('  originalUrl:', item.originalUrl)
          console.log('  expandedUrl:', item.expandedUrl)
          
          let finalValue = item.expandedUrl || ''
          
          // 如果是原列替换模式，需要智能替换
          if (replaceMode.value === 'inplace') {
            console.log('  使用原列替换模式，读取原始数据进行智能替换')
            
            try {
              // 读取当前记录的原始字段值
              const currentValue = await targetField.getValue(item.recordId)
              console.log('  原始字段值:', currentValue)
              
              // 智能替换：在原始数据中将短链接替换为扩展后的链接
              if (item.expandedUrl) {
                finalValue = replaceUrlInContent(currentValue, item.originalUrl, item.expandedUrl)
              } else {
                console.warn('  扩展后的URL为空，跳过替换')
                continue
              }
              console.log('  替换后的值:', finalValue)
              
            } catch (readError) {
              console.warn('  读取原始值失败，使用直接覆盖模式:', readError)
              finalValue = item.expandedUrl || ''
            }
          }
          
          // 写回数据
          await targetField.setValue(item.recordId, finalValue)
          console.log('  ✅ setValue成功')
          
          successCount++
        } catch (recordError: any) {
          console.error(`更新记录失败 ${item.recordId}:`, recordError)
          console.error('错误详情:', {
            recordId: item.recordId,
            originalUrl: item.originalUrl,
            expandedUrl: item.expandedUrl,
            error: recordError.message
          })
          failedCount++
        }
      }
    }
    
    if (successCount > 0) {
      ElMessage.success(`成功写回 ${successCount} 条记录${failedCount > 0 ? `，失败 ${failedCount} 条` : ''}`)
    } else {
      ElMessage.error(`写回失败，所有 ${failedCount} 条记录都更新失败`)
    }
  } catch (error) {
    console.error('写回失败:', error)
    ElMessage.error('写回失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    writingBack.value = false
  }
}

function exportResults() {
  const results = matchingUrls.value.map(item => ({
    原链接: item.originalUrl,
    扩展后链接: item.expandedUrl || '扩展失败',
    状态: item.expanded ? '成功' : '失败',
    错误信息: item.error || ''
  }))
  
  const csv = [
    Object.keys(results[0]).join(','),
    ...results.map(row => Object.values(row).join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `短链接扩展结果_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  
  ElMessage.success('结果已导出')
}

// 页面初始化
onMounted(async () => {
  await initFeishuSDK()
})
</script>

<style scoped>
.url-expander-plugin {
  padding: 12px;
  max-width: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 16px;
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.page-header h2 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  color: #5a6c7d;
  font-size: 13px;
  line-height: 1.4;
}

.connection-status {
  margin-bottom: 16px;
}

.connection-status .el-alert {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-size: 13px;
}

.main-content {
  margin-bottom: 16px;
}

.operation-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: none;
  margin-bottom: 12px;
}

.operation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon {
  font-size: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 8px 0;
}

.compact-form {
  margin: 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.operation-card .el-card__header {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.operation-card .el-card__header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  pointer-events: none;
}

.operation-card h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: white;
  position: relative;
  z-index: 1;
}

.operation-card .el-card__body {
  padding: 16px;
  background: rgba(255, 255, 255, 0.95);
}

.help-text {
  font-size: 11px;
  color: #8492a6;
  margin-top: 4px;
  line-height: 1.3;
  padding: 4px 8px;
  background: #f8fafc;
  border-radius: 4px;
  border-left: 2px solid #667eea;
}

.preview-section {
  margin: 12px 0;
}

.preview-section .el-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: none;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  margin: -12px -12px 8px -12px;
}

.preview-header h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: white;
}

.preview-stats {
  color: white;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}

.preview-section .el-table {
  font-size: 12px;
}

.preview-section .el-table .el-table__header th {
  padding: 6px 0;
  background: #f8fafc;
  font-size: 11px;
  font-weight: 600;
  color: #5a6c7d;
}

.preview-section .el-table .el-table__body td {
  padding: 4px 0;
  font-size: 11px;
}

.preview-section .el-card__body {
  padding: 8px;
}

.more-info {
  text-align: center;
  color: #8492a6;
  font-size: 11px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
  margin-top: 8px;
  border: 1px solid #e2e8f0;
}

.action-section {
  margin: 32px 0;
}

.action-section .el-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 13px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-width: 120px;
}

.action-buttons .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-buttons .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.action-buttons .el-button--success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.action-buttons .el-button--success:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(56, 239, 125, 0.4);
}

.action-buttons .el-button--warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.action-buttons .el-button--warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 87, 108, 0.4);
}

.action-buttons .el-button:not(.el-button--primary):not(.el-button--success):not(.el-button--warning) {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #8b4513;
}

.action-buttons .el-button:not(.el-button--primary):not(.el-button--success):not(.el-button--warning):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(252, 182, 159, 0.4);
}

.progress-section {
  margin-top: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.progress-info {
  text-align: center;
  color: #5a6c7d;
  margin-top: 12px;
  font-size: 15px;
  font-weight: 500;
}

.warning-alert {
  margin-top: 20px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 16px rgba(245, 101, 101, 0.1);
}

/* 表格样式优化 */
.el-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.el-table th {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #2d3748;
  font-weight: 600;
  border: none;
}

.el-table td {
  border: none;
  padding: 16px 12px;
}

.el-table tr:hover td {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

/* 表单样式优化 */
.el-input__inner,
.el-select .el-input__inner {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

.el-input__inner:focus,
.el-select .el-input__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.el-select .el-input__inner {
  padding-left: 12px;
  padding-right: 30px;
}

.el-radio-group .el-radio {
  margin-right: 20px;
  margin-bottom: 8px;
}

.el-radio__label {
  color: #2d3748;
  font-weight: 500;
  font-size: 14px;
  padding-left: 8px;
}

.el-radio__input {
  margin-right: 6px;
}

/* 标签样式优化 */
.el-tag {
  border-radius: 20px;
  border: none;
  font-weight: 500;
  padding: 4px 12px;
}

.el-tag--success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.el-tag--warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.el-tag--info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .url-expander-plugin {
    padding: 16px;
  }
  
  .page-header {
    padding: 20px;
    margin-bottom: 24px;
  }
  
  .page-header h2 {
    font-size: 24px;
  }
  
  .compact-form {
    padding: 0 4px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .card-icon {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .action-buttons .el-button {
    margin-bottom: 0;
    min-width: auto;
  }
  
  .operation-card .el-card__header {
    padding: 16px 20px;
  }
  
  .operation-card h3 {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .form-group {
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .url-expander-plugin {
    padding: 12px;
  }
  
  .page-header {
    padding: 16px;
  }
  
  .page-header h2 {
    font-size: 20px;
  }
  
  .page-description {
    font-size: 14px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.operation-card,
.preview-section .el-card,
.action-section .el-card {
  animation: fadeInUp 0.6s ease-out;
}

.operation-card:nth-child(2) {
  animation-delay: 0.1s;
}

.preview-section .el-card {
  animation-delay: 0.2s;
}

.action-section .el-card {
  animation-delay: 0.3s;
}

/* 页面整体样式调整 */
.url-expander-plugin {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 主要内容区域 */
.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 操作卡片重新设计 */
.operation-card {
  border-radius: 24px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 24px;
}

.operation-card .el-card__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-bottom: none;
}

.operation-card .el-card__body {
  padding: 32px;
}

/* 表单样式优化 */
.compact-form .form-group {
  margin-bottom: 24px;
}

.compact-form .el-input,
.compact-form .el-select {
  border-radius: 12px;
}

.compact-form .el-input__wrapper {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.compact-form .el-input__wrapper:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.compact-form .el-input__wrapper.is-focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 按钮样式优化 */
.action-buttons .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.action-buttons .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* 警告提示样式 */
.warning-alert {
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .main-content {
    padding: 0 16px;
  }
  
  .operation-card .el-card__header {
    padding: 20px;
  }
  
  .operation-card .el-card__body {
    padding: 24px;
  }
}
</style>

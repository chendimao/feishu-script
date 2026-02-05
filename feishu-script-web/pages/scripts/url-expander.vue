<template>
  <div class="url-expander-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>短链接批量解析工具</h2>
      <p class="page-description">自动获取表格信息，批量将短链接转换为实际链接</p>
    </div>

    <!-- 连接状态显示 -->
    <div class="connection-status">
      <el-alert
        v-if="!feishuSDK.isFeishuEnv.value && !feishuConfig.appToken"
        title="提示"
        type="info"
        description="请在飞书多维表格环境中使用此功能，或确保URL包含正确的参数"
        show-icon
        class="status-alert"
      />
      
      <el-alert
        v-else-if="feishuConfig.appToken && feishuConfig.tableId"
        title="✓ 已连接到飞书表格"
        type="success"
        :description="`表格ID: ${feishuConfig.tableId}`"
        show-icon
        class="status-alert"
      />
      
      <el-alert
        v-else-if="feishuSDK.error.value"
        title="连接失败"
        type="error"
        :description="feishuSDK.error.value"
        show-icon
        class="status-alert"
      />
    </div>

    <!-- 主要操作区域 -->
    <div v-if="feishuConfig.appToken && feishuConfig.tableId" class="main-content">
      <el-row :gutter="24">
        <!-- 左侧：短链接匹配 -->
        <el-col :span="12">
          <el-card class="operation-card">
            <template #header>
              <h3>短链接匹配规则</h3>
            </template>
            <el-form label-width="100px">
              <el-form-item label="匹配规则">
                <el-input
                  v-model="urlPattern"
                  placeholder="输入短链接匹配规则，如：bit.ly, t.cn, tinyurl.com"
                  clearable
                />
                <div class="help-text">
                  支持多个域名，用逗号分隔。留空则匹配所有URL
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

        <!-- 右侧：列选择和操作 -->
        <el-col :span="12">
          <el-card class="operation-card">
            <template #header>
              <h3>选择操作列</h3>
            </template>
            <el-form label-width="100px">
              <el-form-item label="短链接列">
                <el-select
                  v-model="selectedFieldId"
                  placeholder="选择包含短链接的列"
                  filterable
                  style="width: 100%"
                  @change="onFieldChange"
                >
                  <el-option
                    v-for="field in textFields"
                    :key="field.fieldId"
                    :label="field.fieldName"
                    :value="field.fieldId"
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="替换模式">
                <el-radio-group v-model="replaceMode">
                  <el-radio value="inplace">原列替换</el-radio>
                  <el-radio value="newColumn">新增列</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item v-if="replaceMode === 'newColumn'" label="新列名称">
                <el-input
                  v-model="newColumnName"
                  placeholder="输入新列名称"
                  clearable
                />
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>

      <!-- 数据预览和操作按钮 -->
      <div v-if="selectedFieldId" class="preview-section">
        <el-card>
          <template #header>
            <div class="preview-header">
              <h3>数据预览</h3>
              <div class="preview-stats" v-if="matchingUrls.length > 0">
                找到 {{ matchingUrls.length }} 个匹配的短链接
              </div>
            </div>
          </template>
          
          <!-- 匹配的URL列表 -->
          <div v-if="matchingUrls.length > 0" class="matching-urls">
            <el-table :data="matchingUrls.slice(0, 10)" stripe max-height="300">
              <el-table-column label="序号" type="index" width="60" />
              <el-table-column label="短链接" prop="originalUrl" min-width="200" show-overflow-tooltip />
              <el-table-column label="状态" width="100">
                <template #default="{ row }">
                  <el-tag v-if="row.expanded" type="success">已解析</el-tag>
                  <el-tag v-else-if="row.processing" type="warning">处理中</el-tag>
                  <el-tag v-else type="info">待处理</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="解析后链接" prop="expandedUrl" min-width="300" show-overflow-tooltip />
            </el-table>
            
            <div v-if="matchingUrls.length > 10" class="more-info">
              还有 {{ matchingUrls.length - 10 }} 条数据...
            </div>
          </div>
          
          <div v-else-if="previewRecords.length > 0" class="no-match">
            <el-empty description="未找到匹配的短链接" />
          </div>
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
              🔗 {{ processing ? '正在处理...' : '开始解析短链接' }}
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
            title="注意"
            type="warning"
            description="原列替换将直接覆盖原数据，此操作不可撤销。建议先备份数据。"
            show-icon
            class="warning-alert"
          />
        </el-card>
      </div>
    </div>

    <!-- 手动输入选项（备用） -->
    <el-collapse v-if="!feishuConfig.appToken || !feishuConfig.tableId" class="manual-input">
      <el-collapse-item title="手动输入表格信息（备用选项）" name="manual">
        <el-form :model="feishuConfig" label-width="120px" class="config-form">
          <el-form-item label="App Token">
            <el-input
              v-model="feishuConfig.appToken"
              placeholder="请输入飞书多维表格的 app_token"
              clearable
            />
          </el-form-item>
          <el-form-item label="Table ID">
            <el-input
              v-model="feishuConfig.tableId"
              placeholder="请输入数据表的 table_id"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadTableData" :loading="loading">
              加载表格数据
            </el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useFeishu } from '~/composables/useFeishu'

// 加载状态
const loading = ref(false)
const processing = ref(false)

// 飞书SDK
const feishuSDK = useFeishu()

// 飞书配置
const feishuConfig = reactive({
  appToken: '',
  tableId: ''
})

// 表格数据
const tableFields = ref<Array<{ fieldId: string; fieldName: string; fieldType: string }>>([])
const previewRecords = ref<Record<string, any>[]>([])

// 选择的列
const selectedFieldId = ref('')

// 替换模式
const replaceMode = ref<'inplace' | 'newColumn'>('newColumn')
const newColumnName = ref('解析后链接')

// URL匹配规则
const urlPattern = ref('bit.ly,t.cn,tinyurl.com,short.link')

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

// 计算属性
const textFields = computed(() =>
  tableFields.value.filter(field =>
    ['text', 'singleText', 'richText'].includes(field.fieldType)
  )
)

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

// 计算属性保持不变，但简化逻辑

const canStartProcess = computed(() => {
  return selectedFieldId.value && matchingUrls.value.length > 0 && !processing.value
})

// 方法
// 自动连接飞书
async function autoConnectFeishu() {
  const tableInfo = await feishuSDK.autoGetTableInfo()
  if (tableInfo) {
    feishuConfig.appToken = tableInfo.baseId
    feishuConfig.tableId = tableInfo.tableId
    
    // 自动加载表格数据
    await loadTableData()
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
  if (!selectedFieldId.value || previewRecords.value.length === 0) {
    matchingUrls.value = []
    return
  }

  const patterns = urlPattern.value
    .split(',')
    .map(p => p.trim())
    .filter(p => p.length > 0)

  const matches: typeof matchingUrls.value = []
  
  for (const record of previewRecords.value) {
    const url = record[selectedFieldId.value]
    if (typeof url === 'string' && url.trim()) {
      const trimmedUrl = url.trim()
      
      // 检查是否匹配模式
      const isMatch = patterns.length === 0 || patterns.some(pattern => 
        trimmedUrl.includes(pattern)
      )
      
      if (isMatch && (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://'))) {
        matches.push({
          recordId: record.recordId || '',
          originalUrl: trimmedUrl,
          processing: false,
          expanded: false
        })
      }
    }
  }
  
  matchingUrls.value = matches
  ElMessage.success(`找到 ${matches.length} 个匹配的短链接`)
}

// 加载表格数据
async function loadTableData() {
  if (!feishuConfig.appToken || !feishuConfig.tableId) {
    ElMessage.error('请先获取表格信息')
    return
  }

  loading.value = true
  try {
    if (feishuSDK.isFeishuEnv.value) {
      // 在飞书环境中，使用SDK获取真实数据
      const fields = await feishuSDK.getTableFields(feishuConfig.tableId)
      tableFields.value = fields
    } else {
      // 非飞书环境，调用后端API
      const response = await $fetch<{ success: boolean; data?: Array<{ fieldId: string; fieldName: string; fieldType: string }> }>('/api/feishu/fields', {
        method: 'POST',
        body: {
          appToken: feishuConfig.appToken,
          tableId: feishuConfig.tableId
        }
      })
      tableFields.value = response.data || []
    }
    
    if (tableFields.value.length > 0) {
      ElMessage.success('表格数据加载成功')
    } else {
      ElMessage.warning('未找到表格字段')
    }
  } catch (error) {
    console.error('加载表格数据失败:', error)
    ElMessage.error('加载表格数据失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    loading.value = false
  }
  
  // 加载完字段后，自动加载记录数据
  if (tableFields.value.length > 0) {
    await loadAllRecords()
  }
}

// 加载所有记录数据用于分析
async function loadAllRecords() {
  if (!feishuConfig.appToken || !feishuConfig.tableId) {
    return
  }

  loading.value = true
  try {
    if (feishuSDK.isFeishuEnv.value) {
      // 在飞书环境中，使用SDK获取真实数据
      const records = await feishuSDK.getTableRecords(feishuConfig.tableId)
      previewRecords.value = records.map(record => ({
        recordId: record.recordId,
        ...record.fields
      }))
    } else {
      // 非飞书环境，调用后端API
      const response = await $fetch<{ success: boolean; data?: Array<Record<string, any>> }>('/api/feishu/records', {
        method: 'POST',
        body: {
          appToken: feishuConfig.appToken,
          tableId: feishuConfig.tableId,
          limit: 1000 // 获取更多数据
        }
      })
      previewRecords.value = response.data || []
    }
    
    // 如果已选择字段，自动分析URL
    if (selectedFieldId.value) {
      await analyzeUrls()
    }
  } catch (error) {
    console.error('加载记录失败:', error)
    ElMessage.error('加载记录失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    loading.value = false
  }
}

// 开始处理短链接解析
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
    // 批量处理URL解析
    const urlsToExpand = matchingUrls.value.map(item => item.originalUrl)
    
    const response = await $fetch<{
      success: boolean
      results: Array<{
        success: boolean
        originalUrl: string
        expandedUrl?: string
        error?: string
      }>
    }>('/api/url-expand/batch', {
      method: 'POST',
      body: {
        urls: urlsToExpand
      }
    })

    if (response.success && response.results) {
      // 更新匹配的URL数据
      for (let i = 0; i < response.results.length; i++) {
        const result = response.results[i]
        const matchItem = matchingUrls.value[i]
        
        if (result.success && result.expandedUrl) {
          matchItem.expandedUrl = result.expandedUrl
          matchItem.expanded = true
          successCount.value++
        } else {
          matchItem.error = result.error || '解析失败'
          failedCount.value++
        }
        
        matchItem.processing = false
        processedCount.value++
      }
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


async function writeBackResults() {
  writingBack.value = true
  try {
    // TODO: 调用 API 写回数据
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 成功提示
  } catch (error) {
    console.error('写回失败:', error)
  } finally {
    writingBack.value = false
  }
}

function exportResults() {
  // TODO: 导出处理结果
  console.log('导出结果')
}

function resetProcess() {
  selectedFieldId.value = ''
  matchingUrls.value = []
  processCompleted.value = false
  processing.value = false
  processedCount.value = 0
  successCount.value = 0
  failedCount.value = 0
  totalCount.value = 0
}

// 页面初始化
onMounted(async () => {
  // 自动尝试获取表格信息
  await autoConnectFeishu()
})
</script>

<style scoped>
.url-expander-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h2 {
  color: #303133;
  margin-bottom: 8px;
}

.page-description {
  color: #606266;
  font-size: 14px;
}

.connection-status {
  margin-bottom: 24px;
}

.status-alert {
  margin-bottom: 16px;
}

.main-content {
  margin-bottom: 24px;
}

.operation-card {
  height: 100%;
}

.operation-card .el-card__header {
  padding: 16px 20px;
  background: #f8f9fa;
}

.operation-card h3 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.help-text {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.preview-section {
  margin: 24px 0;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-header h3 {
  margin: 0;
  font-size: 16px;
}

.preview-stats {
  color: #409eff;
  font-weight: 500;
}

.matching-urls {
  margin-bottom: 16px;
}

.more-info {
  text-align: center;
  color: #909399;
  font-size: 14px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.no-match {
  padding: 40px 0;
}

.action-section {
  margin: 24px 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}

.progress-section {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.progress-info {
  text-align: center;
  color: #606266;
  margin-top: 8px;
  font-size: 14px;
}

.warning-alert {
  margin-top: 16px;
}

.manual-input {
  margin-top: 24px;
}

.config-form {
  max-width: 600px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .url-expander-page {
    padding: 16px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-buttons .el-button {
    margin-bottom: 8px;
  }
}
</style>

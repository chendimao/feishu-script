<template>
  <div class="url-expander">
    <!-- Header -->
    <header class="header">
      <button class="back-btn" @click="goBack">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="title">URL 解析器</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Connection Status -->
    <div class="status-bar">
      <div v-if="!feishuSDK.isFeishuEnv.value" class="status-badge status-info">
        <span class="status-dot"></span>
        <span>请在飞书环境中使用</span>
      </div>
      <div v-else-if="feishuConfig.appToken && feishuConfig.tableId" class="status-badge status-success">
        <span class="status-dot"></span>
        <span>已连接: {{ feishuConfig.tableId.slice(0, 8) }}...</span>
      </div>
      <div v-else-if="feishuSDK.error.value" class="status-badge status-error">
        <span class="status-dot"></span>
        <span>连接失败</span>
      </div>
    </div>

    <!-- Main Content -->
    <main v-if="feishuConfig.appToken && feishuConfig.tableId" class="main">
      <!-- Config Panel -->
      <section class="panel config-panel">
        <div class="panel-header">
          <span class="panel-icon">⚙️</span>
          <h2 class="panel-title">配置</h2>
        </div>

        <div class="panel-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">短链接列</label>
              <select v-model="selectedFieldId" class="form-select" @change="onFieldChange">
                <option value="">选择列</option>
                <option v-for="field in textFields" :key="field.fieldId" :value="field.fieldId">
                  {{ field.fieldName }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">匹配规则</label>
              <input
                v-model="urlPattern"
                type="text"
                class="form-input"
                placeholder="如: bit.ly, t.cn"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">输出模式</label>
              <div class="radio-group compact">
                <label class="radio-item" :class="{ active: replaceMode === 'inplace' }">
                  <input type="radio" v-model="replaceMode" value="inplace" />
                  <span class="radio-check"></span>
                  <span>原列替换</span>
                </label>
                <label class="radio-item" :class="{ active: replaceMode === 'newColumn' }">
                  <input type="radio" v-model="replaceMode" value="newColumn" />
                  <span class="radio-check"></span>
                  <span>新增列</span>
                </label>
              </div>
            </div>

            <div v-if="replaceMode === 'newColumn'" class="form-group">
              <label class="form-label">新列名称</label>
              <input
                v-model="newColumnName"
                type="text"
                class="form-input"
                placeholder="解析后链接"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Preview Panel -->
      <section v-if="selectedFieldId && matchingUrls.length > 0" class="panel preview-panel">
        <div class="panel-header">
          <span class="panel-icon">📋</span>
          <h2 class="panel-title">数据预览</h2>
          <span class="panel-badge">{{ matchingUrls.length }} 条</span>
        </div>

        <div class="panel-body">
          <div class="data-table">
            <div class="table-header">
              <div class="th" style="width: 40px">#</div>
              <div class="th" style="flex: 1.5">原始链接</div>
              <div class="th" style="width: 70px">状态</div>
              <div class="th" style="flex: 1.5">解析结果</div>
            </div>
            <div class="table-body">
              <div v-for="(item, index) in matchingUrls" :key="index" class="table-row">
                <div class="td" style="width: 40px">{{ index + 1 }}</div>
                <div class="td" style="flex: 1.5" :title="item.originalUrl">
                  <span class="url-text">{{ item.originalUrl }}</span>
                </div>
                <div class="td" style="width: 70px">
                  <span v-if="item.expanded" class="tag tag-success">成功</span>
                  <span v-else-if="item.processing" class="tag tag-processing">
                    <span class="spinner"></span>
                  </span>
                  <span v-else-if="item.error" class="tag tag-error">失败</span>
                  <span v-else class="tag tag-pending">待处理</span>
                </div>
                <div class="td" style="flex: 1.5" :title="item.expandedUrl || item.error">
                  <span v-if="item.expandedUrl" class="url-text success">{{ item.expandedUrl }}</span>
                  <span v-else-if="item.error" class="url-text error">{{ item.error }}</span>
                  <span v-else class="url-text placeholder">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Panel -->
      <section class="panel action-panel">
        <div class="panel-body">
          <div class="action-bar">
            <button
              class="btn btn-primary"
              :disabled="!canStartProcess || processing"
              @click="startProcess"
            >
              <span v-if="processing" class="btn-spinner"></span>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              {{ processing ? '处理中...' : '开始解析' }}
            </button>

            <button
              v-if="processCompleted"
              class="btn btn-success"
              :disabled="writingBack"
              @click="writeBackResults"
            >
              <span v-if="writingBack" class="btn-spinner"></span>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
              </svg>
              {{ replaceMode === 'inplace' ? '写回原列' : '创建新列' }}
            </button>

            <button
              v-if="hasFailedItems"
              class="btn btn-warning"
              :disabled="processing"
              @click="retryFailedItems"
            >
              <span v-if="processing" class="btn-spinner"></span>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              重试 ({{ actualFailedCount }})
            </button>
          </div>

          <!-- Progress -->
          <div v-if="processing || processCompleted" class="progress-wrapper">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }" :class="{ complete: processCompleted }"></div>
            </div>
            <div class="progress-meta">
              <span>{{ processedCount }} / {{ totalCount }}</span>
              <span v-if="processCompleted" class="progress-result">
                成功 {{ successCount }} · 失败 {{ actualFailedCount }}
              </span>
            </div>
          </div>

          <!-- Warning -->
          <div v-if="replaceMode === 'inplace' && selectedFieldId" class="inline-alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>原列替换将直接覆盖原数据，操作不可撤销</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useFeishu } from '@/composables/useFeishu'
import { urlExpanderApi } from '@/api/url-expander'
import { forceUpdateTimeout } from '@/utils/settings'

const router = useRouter()
const loading = ref(false)
const processing = ref(false)
const feishuSDK = useFeishu()

const feishuConfig = reactive({
  appToken: '',
  tableId: ''
})

const tableFields = ref<Array<{ fieldId: string; fieldName: string; fieldType: string }>>([])
const previewRecords = ref<Record<string, any>[]>([])
const selectedFieldId = ref('')
const replaceMode = ref<'inplace' | 'newColumn'>('newColumn')
const newColumnName = ref('解析后链接')
const urlPattern = ref('')

const matchingUrls = ref<Array<{
  recordId: string
  originalUrl: string
  expandedUrl?: string
  processing?: boolean
  expanded?: boolean
  error?: string
  retryCount?: number
  maxRetries?: number
}>>([])

const totalCount = ref(0)
const processedCount = ref(0)
const successCount = ref(0)
const failedCount = ref(0)
const processCompleted = ref(false)
const writingBack = ref(false)

const MAX_AUTO_RETRIES = 10
const RETRY_DELAY = 1000

const textFields = computed(() => {
  return tableFields.value.filter(field => {
    const fieldTypeNum = Number(field.fieldType)
    return [1, 13].includes(fieldTypeNum)
  })
})

const progressPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((processedCount.value / totalCount.value) * 100)
})

const actualFailedCount = computed(() => {
  return matchingUrls.value.filter(item => !item.expanded && item.error).length
})

const hasFailedItems = computed(() => actualFailedCount.value > 0)

const canStartProcess = computed(() => {
  return !!selectedFieldId.value && matchingUrls.value.length > 0 && !processing.value
})

function goBack() {
  router.push('/')
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function processFieldValue(value: any): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return ''
    const firstItem = value[0]
    if (firstItem && typeof firstItem === 'object') {
      if ('text' in firstItem) return String(firstItem.text)
      if ('link' in firstItem) return String(firstItem.link)
      if ('url' in firstItem) return String(firstItem.url)
      return JSON.stringify(firstItem)
    }
    return String(firstItem)
  }
  if (typeof value === 'object') {
    if ('text' in value) return String(value.text)
    if ('link' in value) return String(value.link)
    if ('url' in value) return String(value.url)
    return JSON.stringify(value)
  }
  return String(value)
}

async function autoConnectFeishu() {
  const isInFeishu = feishuSDK.checkFeishuEnvironment()
  if (isInFeishu) {
    await loadTableDataDirectly()
  }
}

async function loadTableDataDirectly() {
  loading.value = true
  try {
    const bitable = await feishuSDK.initFeishuSDK()
    if (!bitable) throw new Error('飞书SDK初始化失败')

    const table = await bitable.base.getActiveTable()
    const fieldList = await table.getFieldList()

    const fields = []
    for (const field of fieldList) {
      const fieldMeta = await field.getMeta()
      fields.push({
        fieldId: fieldMeta.id,
        fieldName: fieldMeta.name,
        fieldType: String(fieldMeta.type)
      })
    }

    tableFields.value = fields
    const tableMeta = await table.getMeta()
    feishuConfig.tableId = tableMeta.id
    feishuConfig.appToken = 'current'

    await loadRecordsUsingSDK()
  } catch (error) {
    console.error('加载表格数据失败:', error)
    tableFields.value = []
  } finally {
    loading.value = false
  }
}

async function loadRecordsUsingSDK() {
  if (!feishuConfig.tableId) return
  try {
    const records = await feishuSDK.getTableRecords(feishuConfig.tableId)
    previewRecords.value = records.map(record => {
      const processedRecord: any = { recordId: record.recordId }
      for (const [fieldId, value] of Object.entries(record.fields)) {
        processedRecord[fieldId] = processFieldValue(value)
      }
      return processedRecord
    })

    if (selectedFieldId.value) {
      await analyzeUrls()
    }
  } catch (error) {
    console.error('加载记录失败:', error)
    previewRecords.value = []
  }
}

async function onFieldChange() {
  if (selectedFieldId.value && previewRecords.value.length > 0) {
    await analyzeUrls()
  } else {
    matchingUrls.value = []
  }
}

function extractUrlsFromText(text: string, patterns: string[]): string[] {
  const urls: string[] = []
  const urlRegex = /https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/g
  const foundUrls = text.match(urlRegex) || []

  for (let url of foundUrls) {
    url = url.replace(/[，。！？；：、）】》」』"']+$/, '')
    const isMatch = patterns.length === 0 || patterns.some(pattern => url.includes(pattern))
    if (isMatch) urls.push(url)
  }

  return urls
}

async function analyzeUrls() {
  if (!selectedFieldId.value || previewRecords.value.length === 0) {
    matchingUrls.value = []
    return
  }

  const patterns = urlPattern.value.split(',').map(p => p.trim()).filter(p => p.length > 0)
  const matches: typeof matchingUrls.value = []

  for (const record of previewRecords.value) {
    const fieldValue = record[selectedFieldId.value]
    if (typeof fieldValue === 'string' && fieldValue.trim()) {
      const text = fieldValue.trim()
      const extractedUrls = extractUrlsFromText(text, patterns)
      for (const url of extractedUrls) {
        matches.push({
          recordId: record.recordId || '',
          originalUrl: url,
          processing: false,
          expanded: false,
          retryCount: 0,
          maxRetries: MAX_AUTO_RETRIES
        })
      }
    }
  }

  matchingUrls.value = matches
}

async function processUrlWithRetry(item: typeof matchingUrls.value[0]): Promise<void> {
  const maxRetries = item.maxRetries || MAX_AUTO_RETRIES

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    item.processing = true
    item.retryCount = attempt

    if (attempt > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
    }

    try {
      const response = await urlExpanderApi.expandBatch([item.originalUrl])

      if (response.data.success && response.data.results && response.data.results[0]) {
        const result = response.data.results[0]

        if (result.success && result.expandedUrl) {
          item.expandedUrl = result.expandedUrl
          item.expanded = true
          item.error = undefined
          successCount.value++
          break
        } else {
          const errorMsg = result.error || '解析失败'
          if (attempt < maxRetries) continue
          item.error = `${errorMsg} (重试${maxRetries}次后失败)`
          break
        }
      } else {
        if (attempt < maxRetries) continue
        item.error = `API响应格式错误 (重试${maxRetries}次后失败)`
        break
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '网络错误'
      item.error = errorMsg
      break
    }
  }

  item.processing = false
  processedCount.value++

  if (!item.expanded && !item.error) {
    item.error = '处理异常'
  }
}

async function startProcess() {
  if (!canStartProcess.value) return

  processing.value = true
  processCompleted.value = false
  totalCount.value = matchingUrls.value.length
  processedCount.value = 0
  successCount.value = 0
  failedCount.value = 0

  try {
    const batchSize = 3
    const batches: typeof matchingUrls.value[] = []

    for (let i = 0; i < matchingUrls.value.length; i += batchSize) {
      batches.push(matchingUrls.value.slice(i, i + batchSize))
    }

    await Promise.all(
      batches.map(async (batch) => {
        await Promise.all(batch.map(item => processUrlWithRetry(item)))
      })
    )

    processCompleted.value = true
  } catch (error) {
    console.error('处理失败:', error)
  } finally {
    processing.value = false
  }
}

async function retryFailedItems() {
  const failedItems = matchingUrls.value.filter(item => !item.expanded && item.error)
  if (failedItems.length === 0) return

  processing.value = true
  processCompleted.value = false

  try {
    const batchSize = 3
    const batches: typeof failedItems[] = []

    for (let i = 0; i < failedItems.length; i += batchSize) {
      batches.push(failedItems.slice(i, i + batchSize))
    }

    await Promise.all(
      batches.map(async (batch) => {
        batch.forEach(item => {
          item.processing = true
          item.error = undefined
        })

        try {
          const urls = batch.map(item => item.originalUrl)
          const response = await urlExpanderApi.expandBatch(urls)

          if (response.data.success && response.data.results) {
            response.data.results.forEach((result, index) => {
              const item = batch[index]
              if (result.success && result.expandedUrl) {
                item.expandedUrl = result.expandedUrl
                item.expanded = true
              } else {
                item.error = result.error || '重试失败'
              }
              item.processing = false
            })
          } else {
            batch.forEach(item => {
              item.error = '接口返回失败'
              item.processing = false
            })
          }
        } catch (error) {
          batch.forEach(item => {
            item.error = '请求失败'
            item.processing = false
          })
        }
      })
    )

    processCompleted.value = true
  } catch (error) {
    console.error('重试失败:', error)
  } finally {
    processing.value = false
  }
}

async function writeBackResults() {
  writingBack.value = true

  try {
    const bitable = await feishuSDK.initFeishuSDK()
    if (!bitable) throw new Error('飞书SDK初始化失败')

    const table = await bitable.base.getActiveTable()
    let targetFieldId: string

    if (replaceMode.value === 'newColumn') {
      const targetColumnName = newColumnName.value || '解析后链接'
      const fieldList = await table.getFieldList()
      const existingFields = []

      for (const field of fieldList) {
        const fieldMeta = await field.getMeta()
        existingFields.push({
          id: fieldMeta.id,
          name: fieldMeta.name,
          type: fieldMeta.type,
          field: field
        })
      }

      let existingField = existingFields.find(field => field.name === targetColumnName)
      if (!existingField) {
        existingField = existingFields.find(field => field.name?.trim() === targetColumnName.trim())
      }

      if (existingField) {
        targetFieldId = (existingField as any).id
      } else {
        let uniqueColumnName = targetColumnName
        let counter = 1

        while (true) {
          const nameExists = existingFields.some(field => field.name === uniqueColumnName)
          if (!nameExists) break
          counter++
          uniqueColumnName = `${targetColumnName}_${counter}`
        }

        const newField = await table.addField({
          type: 1,
          name: uniqueColumnName
        })

        targetFieldId = (newField as any).id || (newField as any).fieldId
        if (!targetFieldId && typeof newField === 'string') {
          targetFieldId = newField
        }
      }
    } else {
      targetFieldId = selectedFieldId.value
    }

    const recordsToUpdate = []

    if (replaceMode.value === 'inplace') {
      const recordMap = new Map<string, string>()

      for (const record of previewRecords.value) {
        const recordId = record.recordId
        const originalText = processFieldValue(record[selectedFieldId.value])
        recordMap.set(recordId, originalText)
      }

      const processedRecords = new Set<string>()

      for (const item of matchingUrls.value.filter(item => item.expanded && item.expandedUrl)) {
        if (processedRecords.has(item.recordId)) continue

        let updatedText = recordMap.get(item.recordId) || ''

        const recordUrls = matchingUrls.value.filter(url =>
          url.recordId === item.recordId && url.expanded && url.expandedUrl
        )

        for (const urlItem of recordUrls) {
          const regex = new RegExp(escapeRegExp(urlItem.originalUrl), 'g')
          updatedText = updatedText.replace(regex, urlItem.expandedUrl!)
        }

        recordsToUpdate.push({
          recordId: item.recordId,
          fields: { [targetFieldId]: updatedText }
        })

        processedRecords.add(item.recordId)
      }
    } else {
      recordsToUpdate.push(...matchingUrls.value
        .filter(item => item.expanded && item.expandedUrl)
        .map(item => ({
          recordId: item.recordId,
          fields: { [targetFieldId]: item.expandedUrl }
        }))
      )
    }

    if (recordsToUpdate.length === 0) {
      throw new Error('没有可回写的数据')
    }

    const batchSize = 100
    let successCount = 0
    let failCount = 0

    for (let i = 0; i < recordsToUpdate.length; i += batchSize) {
      const batch = recordsToUpdate.slice(i, i + batchSize)
      try {
        await table.setRecords(batch as any)
        successCount += batch.length
      } catch (error) {
        failCount += batch.length
      }
    }

    if (failCount === 0) {
      ElMessage.success(`回写成功！共 ${successCount} 条`)
    } else {
      ElMessage.warning(`回写完成：成功 ${successCount} 条，失败 ${failCount} 条`)
    }
  } catch (error) {
    console.error('写回失败:', error)
    ElMessage.error(`写回失败: ${error instanceof Error ? error.message : '未知错误'}`)
  } finally {
    writingBack.value = false
  }
}

onMounted(async () => {
  forceUpdateTimeout()
  await autoConnectFeishu()
})
</script>

<style scoped>
/* ===== Layout ===== */
.url-expander {
  min-height: 100vh;
  background: var(--fe-gray-50);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--fe-gray-700);
}

.url-expander * {
  box-sizing: border-box;
}

/* ===== Header ===== */
.header {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid var(--fe-gray-200);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--fe-radius-md);
  color: var(--fe-gray-500);
  cursor: pointer;
  transition: all 0.15s ease;
}

.back-btn:hover {
  background: var(--fe-gray-100);
  color: var(--fe-gray-700);
}

.title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--fe-gray-800);
  text-align: center;
  margin: 0;
}

.header-spacer {
  width: 32px;
}

/* ===== Status Bar ===== */
.status-bar {
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid var(--fe-gray-200);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-info {
  background: #eff6ff;
  color: var(--fe-info);
}

.status-info .status-dot {
  background: var(--fe-info);
}

.status-success {
  background: #ecfdf5;
  color: var(--fe-success);
}

.status-success .status-dot {
  background: var(--fe-success);
}

.status-error {
  background: #fef2f2;
  color: var(--fe-error);
}

.status-error .status-dot {
  background: var(--fe-error);
}

/* ===== Main Content ===== */
.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===== Panel ===== */
.panel {
  background: #fff;
  border-radius: var(--fe-radius-lg);
  box-shadow: var(--fe-shadow-sm);
  border: 1px solid var(--fe-gray-200);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--fe-gray-50);
  border-bottom: 1px solid var(--fe-gray-200);
}

.panel-icon {
  font-size: 14px;
  line-height: 1;
}

.panel-title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: var(--fe-gray-800);
  margin: 0;
}

.panel-badge {
  padding: 2px 8px;
  background: var(--fe-gray-200);
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  color: var(--fe-gray-600);
}

.panel-body {
  padding: 16px;
}

/* ===== Form ===== */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--fe-gray-600);
}

.form-input,
.form-select {
  height: 34px;
  padding: 0 10px;
  background: #fff;
  border: 1px solid var(--fe-gray-300);
  border-radius: var(--fe-radius-md);
  font-size: 13px;
  color: var(--fe-gray-700);
  transition: all 0.15s ease;
}

.form-input::placeholder {
  color: var(--fe-gray-400);
}

.form-input:hover,
.form-select:hover {
  border-color: var(--fe-gray-400);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--fe-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 28px;
  cursor: pointer;
}

/* ===== Radio Group ===== */
.radio-group {
  display: flex;
  gap: 8px;
}

.radio-group.compact {
  height: 34px;
}

.radio-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid var(--fe-gray-300);
  border-radius: var(--fe-radius-md);
  font-size: 12px;
  font-weight: 500;
  color: var(--fe-gray-600);
  cursor: pointer;
  transition: all 0.15s ease;
}

.radio-item:hover {
  border-color: var(--fe-gray-400);
}

.radio-item.active {
  background: var(--fe-primary);
  border-color: var(--fe-primary);
  color: #fff;
}

.radio-item input {
  display: none;
}

/* ===== Data Table ===== */
.data-table {
  border: 1px solid var(--fe-gray-200);
  border-radius: var(--fe-radius-md);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: var(--fe-gray-50);
  border-bottom: 1px solid var(--fe-gray-200);
}

.th {
  font-size: 11px;
  font-weight: 600;
  color: var(--fe-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.table-body {
  max-height: 280px;
  overflow-y: auto;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--fe-gray-100);
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--fe-gray-50);
}

.td {
  font-size: 12px;
  color: var(--fe-gray-700);
  min-width: 0;
}

.url-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.url-text.success {
  color: var(--fe-success);
}

.url-text.error {
  color: var(--fe-error);
}

.url-text.placeholder {
  color: var(--fe-gray-400);
}

/* ===== Tags ===== */
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.tag-success {
  background: #d1fae5;
  color: #065f46;
}

.tag-processing {
  background: #e0e7ff;
  color: #3730a3;
}

.tag-error {
  background: #fee2e2;
  color: #991b1b;
}

.tag-pending {
  background: var(--fe-gray-200);
  color: var(--fe-gray-600);
}

/* ===== Buttons ===== */
.action-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border-radius: var(--fe-radius-md);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--fe-primary);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--fe-primary-dark);
}

.btn-success {
  background: var(--fe-success);
  color: #fff;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-warning {
  background: var(--fe-warning);
  color: #fff;
}

.btn-warning:hover:not(:disabled) {
  background: #d97706;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* ===== Progress ===== */
.progress-wrapper {
  margin-top: 12px;
  padding: 12px;
  background: var(--fe-gray-50);
  border-radius: var(--fe-radius-md);
}

.progress-bar {
  height: 6px;
  background: var(--fe-gray-200);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--fe-primary);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.progress-fill.complete {
  background: var(--fe-success);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 11px;
  color: var(--fe-gray-500);
}

.progress-result {
  color: var(--fe-gray-700);
  font-weight: 500;
}

/* ===== Inline Alert ===== */
.inline-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 12px;
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: var(--fe-radius-md);
  font-size: 11px;
  color: #92400e;
}

.inline-alert svg {
  flex-shrink: 0;
  color: #d97706;
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .action-bar {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .table-header,
  .table-row {
    font-size: 11px;
  }

  .th,
  .td {
    padding: 6px 8px;
  }
}
</style>

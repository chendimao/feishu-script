import { ref, readonly } from 'vue'

interface FeishuSelection {
  baseId: string | null
  tableId: string | null
  fieldId: string | null
  viewId: string | null
  recordId: string | null
}

interface FeishuField {
  fieldId: string
  fieldName: string
  fieldType: string
}

interface FeishuRecord {
  recordId: string
  fields: Record<string, any>
}

export const useFeishu = () => {
  const isFeishuEnv = ref(false)
  const selection = ref<FeishuSelection | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 检查是否在飞书环境中
  const checkFeishuEnvironment = () => {
    // 检查是否有飞书SDK
    if (typeof window !== 'undefined') {
      // 检查是否在iframe中（飞书插件环境）
      const inIframe = window.self !== window.top
      // 检查URL是否包含飞书相关参数
      const hasFeishuParams = window.location.search.includes('app_token') || 
                             window.location.search.includes('table_id')
      
      isFeishuEnv.value = inIframe || hasFeishuParams
    }
    return isFeishuEnv.value
  }

  // 初始化飞书SDK
  const initFeishuSDK = async () => {
    if (typeof window === 'undefined') return false
    
    try {
      // 动态导入飞书SDK
      const { bitable } = await import('@lark-base-open/js-sdk')
      
      // 检查SDK是否可用
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      return bitable
    } catch (err) {
      console.warn('飞书SDK初始化失败:', err)
      error.value = '飞书SDK初始化失败'
      return null
    }
  }

  // 获取当前选择的表格信息
  const getCurrentSelection = async () => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      const currentSelection = await bitable.base.getSelection()
      selection.value = currentSelection
      
      return currentSelection
    } catch (err) {
      console.error('获取选择信息失败:', err)
      error.value = err instanceof Error ? err.message : '获取选择信息失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 获取表格字段信息
  const getTableFields = async (tableId?: string) => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      let table
      if (tableId) {
        table = await bitable.base.getTable(tableId)
      } else {
        table = await bitable.base.getActiveTable()
      }

      const fieldList = await table.getFieldList()
      const fields: FeishuField[] = []

      for (const field of fieldList) {
        const fieldMeta = await field.getMeta()
        fields.push({
          fieldId: fieldMeta.id,
          fieldName: fieldMeta.name,
          fieldType: fieldMeta.type
        })
      }

      return fields
    } catch (err) {
      console.error('获取表格字段失败:', err)
      error.value = err instanceof Error ? err.message : '获取表格字段失败'
      return []
    } finally {
      loading.value = false
    }
  }

  // 获取表格记录
  const getTableRecords = async (tableId?: string, viewId?: string) => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      let table
      if (tableId) {
        table = await bitable.base.getTable(tableId)
      } else {
        table = await bitable.base.getActiveTable()
      }

      const recordList = await table.getRecords({
        pageSize: 100, // 限制每次获取的记录数
        viewId: viewId
      })

      const records: FeishuRecord[] = recordList.records.map(record => ({
        recordId: record.recordId,
        fields: record.fields
      }))

      return records
    } catch (err) {
      console.error('获取表格记录失败:', err)
      error.value = err instanceof Error ? err.message : '获取表格记录失败'
      return []
    } finally {
      loading.value = false
    }
  }

  // 更新记录
  const updateRecord = async (recordId: string, fields: Record<string, any>, tableId?: string) => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      let table
      if (tableId) {
        table = await bitable.base.getTable(tableId)
      } else {
        table = await bitable.base.getActiveTable()
      }

      await table.setRecord(recordId, fields)
      return true
    } catch (err) {
      console.error('更新记录失败:', err)
      error.value = err instanceof Error ? err.message : '更新记录失败'
      return false
    } finally {
      loading.value = false
    }
  }

  // 批量更新记录
  const batchUpdateRecords = async (updates: Array<{recordId: string, fields: Record<string, any>}>, tableId?: string) => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      let table
      if (tableId) {
        table = await bitable.base.getTable(tableId)
      } else {
        table = await bitable.base.getActiveTable()
      }

      const results = []
      for (const update of updates) {
        try {
          await table.setRecord(update.recordId, update.fields)
          results.push({ success: true, recordId: update.recordId })
        } catch (err) {
          results.push({ 
            success: false, 
            recordId: update.recordId, 
            error: err instanceof Error ? err.message : '更新失败' 
          })
        }
      }

      return results
    } catch (err) {
      console.error('批量更新记录失败:', err)
      error.value = err instanceof Error ? err.message : '批量更新记录失败'
      return []
    } finally {
      loading.value = false
    }
  }

  // 创建新字段
  const createField = async (fieldName: string, fieldType: string, tableId?: string) => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      let table
      if (tableId) {
        table = await bitable.base.getTable(tableId)
      } else {
        table = await bitable.base.getActiveTable()
      }

      const field = await table.addField({
        type: fieldType,
        name: fieldName
      })

      return field
    } catch (err) {
      console.error('创建字段失败:', err)
      error.value = err instanceof Error ? err.message : '创建字段失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 从URL参数获取baseId和tableId（备用方案）
  const getIdsFromUrl = () => {
    if (typeof window === 'undefined') return { baseId: null, tableId: null }
    
    const urlParams = new URLSearchParams(window.location.search)
    return {
      baseId: urlParams.get('app_token') || urlParams.get('base_id'),
      tableId: urlParams.get('table_id')
    }
  }

  // 自动获取表格信息
  const autoGetTableInfo = async () => {
    // 首先检查是否在飞书环境
    if (!checkFeishuEnvironment()) {
      // 如果不在飞书环境，尝试从URL参数获取
      const urlIds = getIdsFromUrl()
      if (urlIds.baseId && urlIds.tableId) {
        return {
          baseId: urlIds.baseId,
          tableId: urlIds.tableId,
          source: 'url'
        }
      }
      
      error.value = '请在飞书多维表格环境中使用此功能'
      return null
    }

    // 在飞书环境中，使用SDK获取
    const currentSelection = await getCurrentSelection()
    if (currentSelection && currentSelection.baseId && currentSelection.tableId) {
      return {
        baseId: currentSelection.baseId,
        tableId: currentSelection.tableId,
        source: 'sdk'
      }
    }

    error.value = '无法获取表格信息，请确保已选择表格'
    return null
  }

  return {
    // 状态
    isFeishuEnv: readonly(isFeishuEnv),
    selection: readonly(selection),
    loading: readonly(loading),
    error: readonly(error),
    
    // 方法
    checkFeishuEnvironment,
    initFeishuSDK,
    getCurrentSelection,
    getTableFields,
    getTableRecords,
    updateRecord,
    batchUpdateRecords,
    createField,
    getIdsFromUrl,
    autoGetTableInfo
  }
}

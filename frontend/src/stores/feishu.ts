import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { feishuApi, type FeishuField, type FeishuRecord } from '@/api/feishu'

export interface FeishuSelection {
  baseId: string | null
  tableId: string | null
  fieldId: string | null
  viewId: string | null
  recordId: string | null
}

export const useFeishuStore = defineStore('feishu', () => {
  // State
  const isFeishuEnv = ref(false)
  const selection = ref<FeishuSelection | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const fields = ref<FeishuField[]>([])
  const records = ref<FeishuRecord[]>([])
  
  // Getters
  const hasSelection = computed(() => !!selection.value?.tableId)
  const currentTableId = computed(() => selection.value?.tableId)
  const currentBaseId = computed(() => selection.value?.baseId)
  
  // Actions
  const checkFeishuEnvironment = () => {
    if (typeof window !== 'undefined') {
      const inIframe = window.self !== window.top
      const hasFeishuParams = window.location.search.includes('app_token') || 
                             window.location.search.includes('table_id')
      isFeishuEnv.value = inIframe || hasFeishuParams
    }
    return isFeishuEnv.value
  }
  
  const getIdsFromUrl = () => {
    if (typeof window === 'undefined') return { baseId: null, tableId: null }
    
    const urlParams = new URLSearchParams(window.location.search)
    return {
      baseId: urlParams.get('app_token') || urlParams.get('base_id'),
      tableId: urlParams.get('table_id')
    }
  }
  
  const getTableFields = async (appToken: string, tableId: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await feishuApi.getFields(appToken, tableId)
      fields.value = response.data.data
      return fields.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取字段失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const getTableRecords = async (
    appToken: string,
    tableId: string,
    options?: { fieldIds?: string[]; pageSize?: number; pageToken?: string }
  ) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await feishuApi.getRecords(appToken, tableId, options)
      records.value = response.data.data.records
      return {
        records: records.value,
        pageToken: response.data.data.pageToken,
        hasMore: response.data.data.hasMore,
        total: response.data.data.total
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取记录失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updateRecords = async (
    appToken: string,
    tableId: string,
    updates: Array<{ recordId: string; fields: Record<string, any> }>
  ) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await feishuApi.updateRecords(appToken, tableId, updates)
      return response.data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新记录失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    // State
    isFeishuEnv,
    selection,
    loading,
    error,
    fields,
    records,
    // Getters
    hasSelection,
    currentTableId,
    currentBaseId,
    // Actions
    checkFeishuEnvironment,
    getIdsFromUrl,
    getTableFields,
    getTableRecords,
    updateRecords
  }
})

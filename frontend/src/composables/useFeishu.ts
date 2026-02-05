import { ref, readonly, onUnmounted, type Ref } from 'vue'

// ============================================================================
// 类型定义
// ============================================================================

/** 飞书选择信息 */
export interface FeishuSelection {
  baseId: string | null
  tableId: string | null
  fieldId: string | null
  viewId: string | null
  recordId: string | null
}

/** 飞书字段定义 */
export interface FeishuField {
  fieldId: string
  fieldName: string
  fieldType: string
}

/** 字段值类型 */
export type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | { text: string; link?: string }
  | null
  | undefined

/** 飞书记录 */
export interface FeishuRecord {
  recordId: string
  fields: Record<string, FieldValue>
}

/** SDK 错误类型 */
export interface FeishuSDKError extends Error {
  code?: string
  message: string
}

// 飞书 SDK 类型声明
declare module '@lark-base-open/js-sdk' {
  export interface Bitable {
    base: {
      getSelection(): Promise<{
        baseId: string | null
        tableId: string | null
        fieldId: string | null
        viewId: string | null
        recordId: string | null
      }>
      getTable(tableId: string): Promise<Table>
      getActiveTable(): Promise<Table>
    }
  }

  export interface Table {
    getFieldList(): Promise<Field[]>
    getRecords(options?: {
      pageSize?: number
      viewId?: string
    }): Promise<{
      records: Array<{
        recordId: string
        fields: Record<string, unknown>
      }>
    }>
    getMeta(): Promise<{
      id: string
      name: string
      [key: string]: any
    }>
    addField(options: {
      type: number
      name: string
      [key: string]: any
    }): Promise<{
      id?: string
      fieldId?: string
      [key: string]: any
    } | string>
    setRecords(records: Array<{
      recordId: string
      fields: Record<string, any>
    }>): Promise<void>
  }

  export interface Field {
    getMeta(): Promise<{
      id: string
      name: string
      type: string
    }>
  }

}

/** Bitable SDK 类型 */
type BitableSDK = typeof import('@lark-base-open/js-sdk').bitable

// ============================================================================
// 错误处理工具
// ============================================================================

/** 提取错误消息 */
const extractErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return '未知错误'
}

/** 检查是否为用户取消错误 */
const isAbortError = (err: unknown): boolean => {
  return err instanceof Error && err.name === 'AbortError'
}

// ============================================================================
// 主 Composable
// ============================================================================

export const useFeishu = () => {
  // 状态
  const isFeishuEnv = ref(false)
  const selection = ref<FeishuSelection | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // AbortController 用于取消异步操作
  const abortControllers: Ref<AbortController[]> = ref([])
  const isUnmounted = ref(false)

  // 注册 AbortController
  const registerAbortController = (): AbortController => {
    const controller = new AbortController()
    abortControllers.value.push(controller)
    return controller
  }

  // 清理所有 AbortController
  const cleanupAbortControllers = (): void => {
    abortControllers.value.forEach(controller => controller.abort())
    abortControllers.value = []
  }

  // 检查是否在飞书环境中
  const checkFeishuEnvironment = (): boolean => {
    if (typeof window === 'undefined') return false

    const inIframe = window.self !== window.top
    const hasFeishuParams =
      window.location.search.includes('app_token') ||
      window.location.search.includes('table_id')

    isFeishuEnv.value = inIframe || hasFeishuParams
    return isFeishuEnv.value
  }

  // 初始化飞书SDK
  const initFeishuSDK = async (): Promise<BitableSDK | null> => {
    if (typeof window === 'undefined') return null

    // 如果已卸载，直接返回
    if (isUnmounted.value) return null

    const controller = registerAbortController()

    try {
      const { bitable } = await import('@lark-base-open/js-sdk')

      // 检查是否已取消
      if (controller.signal.aborted || isUnmounted.value) {
        return null
      }

      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      return bitable
    } catch (err) {
      // 忽略取消错误
      if (isAbortError(err)) return null

      console.warn('飞书SDK初始化失败:', err)
      error.value = '飞书SDK初始化失败'
      return null
    }
  }

  // 获取当前选择的表格信息
  const getCurrentSelection = async (): Promise<FeishuSelection | null> => {
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
      if (isAbortError(err)) return null

      console.error('获取选择信息失败:', err)
      error.value = extractErrorMessage(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 获取表格字段信息（优化：并行执行）
  const getTableFields = async (tableId?: string): Promise<FeishuField[]> => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      const table = tableId
        ? await bitable.base.getTable(tableId)
        : await bitable.base.getActiveTable()

      const fieldList = await table.getFieldList()

      // 并行获取所有字段元数据
      const fields = await Promise.all(
        fieldList.map(async field => {
          const fieldMeta = await field.getMeta()
          return {
            fieldId: fieldMeta.id,
            fieldName: fieldMeta.name,
            fieldType: String(fieldMeta.type)
          }
        })
      )

      return fields
    } catch (err) {
      if (isAbortError(err)) return []

      console.error('获取表格字段失败:', err)
      error.value = extractErrorMessage(err)
      return []
    } finally {
      loading.value = false
    }
  }

  // 获取表格记录
  const getTableRecords = async (
    tableId?: string,
    viewId?: string
  ): Promise<FeishuRecord[]> => {
    loading.value = true
    error.value = null

    try {
      const bitable = await initFeishuSDK()
      if (!bitable) {
        throw new Error('飞书SDK不可用')
      }

      const table = tableId
        ? await bitable.base.getTable(tableId)
        : await bitable.base.getActiveTable()

      const recordList = await table.getRecords({
        pageSize: 100,
        viewId: viewId
      })

      const records: FeishuRecord[] = recordList.records.map(record => ({
        recordId: record.recordId,
        fields: record.fields as Record<string, FieldValue>
      }))

      return records
    } catch (err) {
      if (isAbortError(err)) return []

      console.error('获取表格记录失败:', err)
      error.value = extractErrorMessage(err)
      return []
    } finally {
      loading.value = false
    }
  }

  // 从URL参数获取baseId和tableId
  const getIdsFromUrl = (): { baseId: string | null; tableId: string | null } => {
    if (typeof window === 'undefined') return { baseId: null, tableId: null }

    const urlParams = new URLSearchParams(window.location.search)
    return {
      baseId: urlParams.get('app_token') || urlParams.get('base_id'),
      tableId: urlParams.get('table_id')
    }
  }

  // 自动获取表格信息
  const autoGetTableInfo = async (): Promise<
    | { baseId: string; tableId: string; source: 'url' | 'sdk' }
    | null
  > => {
    if (!checkFeishuEnvironment()) {
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

  // 组件卸载时清理
  onUnmounted(() => {
    isUnmounted.value = true
    cleanupAbortControllers()
  })

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
    getIdsFromUrl,
    autoGetTableInfo
  }
}

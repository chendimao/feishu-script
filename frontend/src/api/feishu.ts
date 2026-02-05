import apiClient from './client'

export interface FeishuField {
  fieldId: string
  fieldName: string
  fieldType: string
}

export interface FeishuRecord {
  recordId: string
  [key: string]: any
}

export const feishuApi = {
  /**
   * 获取表格字段列表
   */
  getFields(appToken: string, tableId: string) {
    return apiClient.get<{ data: FeishuField[] }>('/feishu/fields', {
      params: { app_token: appToken, table_id: tableId }
    })
  },

  /**
   * 获取表格记录列表
   */
  getRecords(
    appToken: string,
    tableId: string,
    options?: {
      fieldIds?: string[]
      pageSize?: number
      pageToken?: string
    }
  ) {
    return apiClient.post<{
      data: {
        records: FeishuRecord[]
        pageToken: string
        hasMore: boolean
        total: number
      }
    }>('/feishu/records', {
      appToken,
      tableId,
      ...options
    })
  },

  /**
   * 批量更新记录
   */
  updateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ recordId: string; fields: Record<string, any> }>
  ) {
    return apiClient.post<{
      data: { success: boolean; updatedCount: number }
    }>('/feishu/records/update', {
      appToken,
      tableId,
      records
    })
  }
}

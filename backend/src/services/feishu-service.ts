/**
 * 飞书多维表格 API 服务
 * 提供读取、写入、字段操作等功能
 */

import { createFeishuHeaders } from '../utils/feishu-auth'

const FEISHU_API_BASE = 'https://open.feishu.cn/open-api/bitable/v1'

export interface FeishuField {
  fieldId: string
  fieldName: string
  fieldType: string
}

export interface FeishuRecord {
  recordId: string
  [key: string]: any
}

/**
 * 飞书 API 错误处理
 */
function handleFeishuError(error: any, context: string): never {
  console.error(`飞书 API 错误 [${context}]:`, error)
  throw {
    success: false,
    error: error.message || '飞书 API 调用失败',
    context
  }
}

/**
 * 获取表格的字段列表
 */
export async function getTableFields(appToken: string, tableId: string): Promise<FeishuField[]> {
  try {
    const headers = await createFeishuHeaders()
    const response = await fetch(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/fields`, {
      headers
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as {
      code: number
      msg: string
      data: {
        items: Array<{
          field_id: string
          field_name: string
          type: number
        }>
      }
    }

    if (data.code !== 0) {
      throw new Error(data.msg)
    }

    // 转换字段类型编号为名称
    const typeMap: Record<number, string> = {
      1: 'text',
      2: 'number',
      3: 'singleSelect',
      4: 'multiSelect',
      5: 'date',
      7: 'checkbox',
      11: 'url',
      13: 'phone',
      14: 'email'
    }

    return data.data.items.map(field => ({
      fieldId: field.field_id,
      fieldName: field.field_name,
      fieldType: typeMap[field.type] || 'unknown'
    }))
  } catch (error) {
    handleFeishuError(error, '获取字段列表')
  }
}

/**
 * 获取表格记录列表
 */
export async function getTableRecords(
  appToken: string,
  tableId: string,
  options?: {
    fieldIds?: string[]
    pageSize?: number
    pageToken?: string
  }
): Promise<{
  records: FeishuRecord[]
  pageToken: string
  hasMore: boolean
  total: number
}> {
  try {
    const headers = await createFeishuHeaders()

    const params = new URLSearchParams()
    if (options?.fieldIds?.length) {
      params.append('field_ids', options.fieldIds.join(','))
    }
    if (options?.pageSize) {
      params.append('page_size', String(options.pageSize))
    }
    if (options?.pageToken) {
      params.append('page_token', options.pageToken)
    }

    const url = `${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/records?${params.toString()}`

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as {
      code: number
      msg: string
      data: {
        items: Array<{
          record_id: string
          fields: Record<string, any>
        }>
        page_token: string
        has_more: boolean
        total: number
      }
    }

    if (data.code !== 0) {
      throw new Error(data.msg)
    }

    return {
      records: data.data.items.map(item => ({
        recordId: item.record_id,
        ...item.fields
      })),
      pageToken: data.data.page_token,
      hasMore: data.data.has_more,
      total: data.data.total
    }
  } catch (error) {
    handleFeishuError(error, '获取记录列表')
  }
}

/**
 * 批量更新记录
 */
export async function updateTableRecords(
  appToken: string,
  tableId: string,
  records: Array<{
    recordId: string
    fields: Record<string, any>
  }>
): Promise<{ success: boolean; updatedCount: number }> {
  try {
    const headers = await createFeishuHeaders()

    const response = await fetch(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/records/batch_update`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        records: records.map(record => ({
          record_id: record.recordId,
          fields: record.fields
        }))
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as {
      code: number
      msg: string
      data: {
        records: Array<{
          record_id: string
        }>
      }
    }

    if (data.code !== 0) {
      throw new Error(data.msg)
    }

    return {
      success: true,
      updatedCount: data.data.records.length
    }
  } catch (error) {
    handleFeishuError(error, '批量更新记录')
  }
}

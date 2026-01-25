/**
 * 飞书多维表格 API 封装
 * 提供读取、写入、字段操作等功能
 */

import { createFeishuHeaders } from './feishu-auth'

const FEISHU_API_BASE = 'https://open.feishu.cn/open-api/bitable/v1'

/**
 * 飞书 API 错误处理
 */
function handleFeishuError(error: any, context: string) {
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
export async function getTableFields(appToken: string, tableId: string) {
  try {
    const headers = await createFeishuHeaders()
    const response = await $fetch<{
      code: number
      msg: string
      data: {
        items: Array<{
          field_id: string
          field_name: string
          type: number
        }>
      }
    }>(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/fields`, {
      headers
    })

    if (response.code !== 0) {
      throw new Error(response.msg)
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

    return response.data.items.map(field => ({
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
) {
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

    const response = await $fetch<{
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
    }>(url, { headers })

    if (response.code !== 0) {
      throw new Error(response.msg)
    }

    return {
      records: response.data.items.map(item => ({
        recordId: item.record_id,
        ...item.fields
      })),
      pageToken: response.data.page_token,
      hasMore: response.data.has_more,
      total: response.data.total
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
) {
  try {
    const headers = await createFeishuHeaders()

    const response = await $fetch<{
      code: number
      msg: string
      data: {
        records: Array<{
          record_id: string
        }>
      }
    }>(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/records/batch_update`, {
      method: 'POST',
      headers,
      body: {
        records: records.map(record => ({
          record_id: record.recordId,
          fields: record.fields
        }))
      }
    })

    if (response.code !== 0) {
      throw new Error(response.msg)
    }

    return {
      success: true,
      updatedCount: response.data.records.length
    }
  } catch (error) {
    handleFeishuError(error, '批量更新记录')
  }
}

/**
 * 新增字段
 */
export async function createTableField(
  appToken: string,
  tableId: string,
  fieldName: string,
  fieldType: string = 'text'
) {
  try {
    const headers = await createFeishuHeaders()

    // 字段类型映射
    const typeMap: Record<string, number> = {
      'text': 1,
      'number': 2,
      'singleSelect': 3,
      'multiSelect': 4,
      'date': 5,
      'checkbox': 7,
      'url': 11,
      'hyperlink': 11
    }

    const response = await $fetch<{
      code: number
      msg: string
      data: {
        field_id: string
      }
    }>(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/fields`, {
      method: 'POST',
      headers,
      body: {
        field_name: fieldName,
        type: typeMap[fieldType] || 1
      }
    })

    if (response.code !== 0) {
      throw new Error(response.msg)
    }

    return {
      success: true,
      fieldId: response.data.field_id
    }
  } catch (error) {
    handleFeishuError(error, '新增字段')
  }
}

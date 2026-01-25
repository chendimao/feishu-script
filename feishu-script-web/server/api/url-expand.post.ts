import { getTableRecords, updateTableRecords } from '../utils/feishu-bitable'
import { expandUrlsInBatch } from '../utils/url-expander'

/**
 * URL 扩展批量处理 API
 * 接收飞书表格数据，处理短链接，返回扩展结果
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { app_token, table_id, field_id, records, replace_mode, new_field_name } = body

  if (!app_token || !table_id || !field_id) {
    throw createError({
      statusCode: 400,
      message: '缺少必要参数'
    })
  }

  // 如果提供了记录数据，直接处理
  if (records && Array.isArray(records)) {
    return processRecords(records, field_id, app_token, table_id, replace_mode, new_field_name)
  }

  // 否则从飞书获取数据
  try {
    // 获取所有记录
    const allRecords: any[] = []
    let pageToken = ''
    let hasMore = true

    while (hasMore) {
      const result = await getTableRecords(app_token, table_id, {
        pageSize: 500,
        pageToken
      })

      if (!result) break

      allRecords.push(...result.records)
      pageToken = result.pageToken
      hasMore = result.hasMore
    }

    return processRecords(allRecords, field_id, app_token, table_id, replace_mode, new_field_name)
  } catch (error: any) {
    console.error('URL 扩展处理失败:', error)
    throw createError({
      statusCode: 500,
      message: error.message || '处理失败'
    })
  }
})

async function processRecords(
  records: any[],
  fieldId: string,
  appToken: string,
  tableId: string,
  replaceMode?: string,
  _newFieldName?: string
) {
  // 提取需要处理的 URL
  const urls: string[] = []
  const recordMap = new Map<string, any>()

  for (const record of records) {
    const recordId = record.recordId || record.id
    const fieldValue = record[fieldId]

    if (fieldValue && typeof fieldValue === 'string') {
      urls.push(fieldValue)
      recordMap.set(recordId, record)
    }
  }

  // 批量扩展 URL
  const results = await expandUrlsInBatch(urls)

  // 构建处理结果
  const processedResults = results.map((result, index) => ({
    ...result,
    recordId: records[index]?.recordId || records[index]?.id
  }))

  const successCount = results.filter(r => r.success).length
  const failedCount = results.length - successCount

  // 如果需要写回数据
  if (replaceMode === 'inplace') {
    try {
      const updates = processedResults
        .filter(r => r.success)
        .map(r => ({
          recordId: r.recordId,
          fields: {
            [fieldId]: r.expandedUrl
          }
        }))

      if (updates.length > 0) {
        await updateTableRecords(appToken, tableId, updates)
      }
    } catch (error) {
      console.error('写回数据失败:', error)
    }
  }

  return {
    success: true,
    data: {
      total: results.length,
      successCount,
      failedCount,
      results: processedResults
    }
  }
}

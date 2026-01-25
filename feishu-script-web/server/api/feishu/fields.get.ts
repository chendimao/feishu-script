import { getTableFields } from '../../utils/feishu-bitable'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { app_token, table_id } = query

  if (!app_token || !table_id) {
    throw createError({
      statusCode: 400,
      message: '缺少必要参数: app_token 和 table_id'
    })
  }

  try {
    const fields = await getTableFields(String(app_token), String(table_id))
    return {
      success: true,
      data: fields
    }
  } catch (error: any) {
    console.error('获取表格字段失败:', error)
    throw createError({
      statusCode: 500,
      message: error.message || '获取表格字段失败'
    })
  }
})

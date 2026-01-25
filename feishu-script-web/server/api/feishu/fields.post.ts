export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { appToken, tableId } = body

  if (!appToken || !tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要参数: appToken 和 tableId'
    })
  }

  try {
    // 暂时返回模拟数据，避免飞书API配置问题
    const mockFields = [
      { fieldId: 'fld001', fieldName: '短链接', fieldType: 'text' },
      { fieldId: 'fld002', fieldName: '标题', fieldType: 'text' },
      { fieldId: 'fld003', fieldName: '描述', fieldType: 'text' },
      { fieldId: 'fld004', fieldName: '创建时间', fieldType: 'date' },
      { fieldId: 'fld005', fieldName: '状态', fieldType: 'singleSelect' }
    ]
    
    return {
      success: true,
      data: mockFields
    }
  } catch (error: any) {
    console.error('获取表格字段失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取表格字段失败'
    })
  }
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { appToken, tableId, limit = 100 } = body

  if (!appToken || !tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要参数: appToken 和 tableId'
    })
  }

  try {
    // 暂时返回模拟数据
    const mockRecords = [
      {
        recordId: 'rec001',
        fld001: 'https://bit.ly/example1',
        fld002: '示例标题1',
        fld003: '这是一个示例描述',
        fld004: '2024-01-01',
        fld005: '待处理'
      },
      {
        recordId: 'rec002', 
        fld001: 'https://t.cn/example2',
        fld002: '示例标题2',
        fld003: '这是另一个示例',
        fld004: '2024-01-02',
        fld005: '已处理'
      },
      {
        recordId: 'rec003',
        fld001: 'https://tinyurl.com/example3',
        fld002: '示例标题3',
        fld003: '第三个示例',
        fld004: '2024-01-03',
        fld005: '待处理'
      }
    ]
    
    return {
      success: true,
      data: mockRecords.slice(0, Number(limit))
    }
  } catch (error: any) {
    console.error('获取表格记录失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '获取表格记录失败'
    })
  }
})

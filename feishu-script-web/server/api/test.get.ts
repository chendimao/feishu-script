export default defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig()
    
    return {
      success: true,
      message: 'API 测试成功',
      timestamp: new Date().toISOString(),
      config: {
        hasFeishuAppId: !!config.feishuAppId,
        hasFeishuAppSecret: !!config.feishuAppSecret,
      }
    }
  } catch (error: any) {
    console.error('测试API错误:', error)
    return {
      success: false,
      error: error.message || '未知错误'
    }
  }
})

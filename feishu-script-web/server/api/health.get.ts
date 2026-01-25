export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: (process as any).env.NODE_ENV || 'development',
    config: {
      appName: config.public.appName,
      hasFeishuConfig: !!(config.feishuAppId && config.feishuAppSecret)
    },
    uptime: (process as any).uptime(),
    memory: (process as any).memoryUsage(),
    platform: (process as any).platform,
    nodeVersion: (process as any).version
  }
})

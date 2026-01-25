export default defineNuxtRouteMiddleware((to) => {
  // 如果访问的是插件页面，且不在飞书环境中
  if (to.path.includes('/scripts/') && process.client) {
    const isFeishuEnv = window.location.href.includes('feishu') || 
                       window.location.href.includes('lark')
    
    if (!isFeishuEnv) {
      console.log('🔍 非飞书环境访问插件页面')
    }
  }
})

import dotenv from 'dotenv'
import path from 'path'

// 加载环境变量
const envPath = path.resolve(__dirname, '../../.env')
console.log('[Config] Loading .env from:', envPath)
dotenv.config({ path: envPath })

export const config = {
  port: parseInt(process.env.PORT || '3030', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // 飞书配置
  feishu: {
    appId: process.env.FEISHU_APP_ID || '',
    appSecret: process.env.FEISHU_APP_SECRET || ''
  },
  
  // CORS 配置
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // URL 解析配置
  urlExpander: {
    maxConcurrent: parseInt(process.env.MAX_CONCURRENT || '100', 10),
    timeout: parseInt(process.env.TIMEOUT || '1200000', 10) // 20分钟超时
  }
}

// 输出配置信息用于调试
console.log('[Config] CORS_ORIGIN from env:', process.env.CORS_ORIGIN)
console.log('[Config] Final corsOrigin config:', config.corsOrigin)
console.log('[Config] URL Expander timeout:', config.urlExpander.timeout, 'ms')
console.log('[Config] URL Expander maxConcurrent:', config.urlExpander.maxConcurrent)

// 验证必要配置
export function validateConfig(): void {
  const required = [
    'FEISHU_APP_ID',
    'FEISHU_APP_SECRET'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.warn(`[Config] Missing environment variables: ${missing.join(', ')}`)
  }
}

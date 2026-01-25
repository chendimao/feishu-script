/**
 * 飞书 API 认证工具
 * 处理 tenant_access_token 的获取和缓存
 */

interface TokenInfo {
  token: string
  expiresAt: number // 过期时间戳
}

let tokenCache: TokenInfo | null = null

// 飞书开放平台 API 基础地址
const FEISHU_API_BASE = 'https://open.feishu.cn/open-api'

/**
 * 获取 tenant_access_token
 * 飞书 token 有效期为 2 小时,需要缓存管理
 */
export async function getTenantAccessToken(): Promise<string> {
  const config = useRuntimeConfig()

  // 检查缓存的 token 是否有效
  if (tokenCache && tokenCache.expiresAt > Date.now() + 303000) { // 提前 5 分钟刷新
    return tokenCache.token
  }

  try {
    const response = await $fetch<{
      code: number
      msg: string
      data: {
        tenant_access_token: string
        expire: number
      }
    }>(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
      method: 'POST',
      body: {
        app_id: config.feishuAppId,
        app_secret: config.feishuAppSecret
      }
    })

    if (response.code !== 0) {
      throw new Error(`获取 token 失败: ${response.msg}`)
    }

    // 缓存 token
    tokenCache = {
      token: response.data.tenant_access_token,
      expiresAt: Date.now() + (response.data.expire - 300) * 1000 // 提前 5 秒过期
    }

    return tokenCache.token
  } catch (error) {
    console.error('获取飞书 tenant_access_token 失败:', error)
    throw error
  }
}

/**
 * 清除 token 缓存
 * 用于强制重新获取 token
 */
export function clearTokenCache() {
  tokenCache = null
}

/**
 * 创建飞书 API 请求头
 */
export async function createFeishuHeaders(): Promise<Record<string, string>> {
  const token = await getTenantAccessToken()
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

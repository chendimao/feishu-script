/**
 * URL 扩展器服务
 * 封装 url-expander-server.js 的核心逻辑
 */

import { URL } from 'url'

// 配置
const MAX_CONCURRENT = 10
const TIMEOUT = 10000

interface ExpandResult {
  success: boolean
  originalUrl: string
  expandedUrl?: string
  error?: string
  errorType?: string
}

/**
 * 检查 URL 格式是否有效
 */
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch {
    return false
  }
}

/**
 * 扩展单个 URL
 */
export async function expandUrl(shortUrl: string): Promise<ExpandResult> {
  if (!isValidUrl(shortUrl)) {
    return {
      success: false,
      originalUrl: shortUrl,
      error: '无效的 URL 格式',
      errorType: 'INVALID_URL'
    }
  }

  try {
    const urlObj = new URL(shortUrl)

    // 使用 Promise 和 fetch 实现超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    const response = await fetch(shortUrl, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual'
    })

    clearTimeout(timeoutId)

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (location) {
        const expandedUrl = location.startsWith('http')
          ? location
          : new URL(location, shortUrl).href

        return {
          success: true,
          originalUrl: shortUrl,
          expandedUrl
        }
      }
    }

    return {
      success: false,
      originalUrl: shortUrl,
      error: `非重定向响应 (状态码: ${response.status})`,
      errorType: 'NO_REDIRECT'
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'

    if (errorMessage.includes('abort') || errorMessage.includes('timeout')) {
      return {
        success: false,
        originalUrl: shortUrl,
        error: '请求超时',
        errorType: 'TIMEOUT'
      }
    }

    return {
      success: false,
      originalUrl: shortUrl,
      error: errorMessage,
      errorType: 'NETWORK_ERROR'
    }
  }
}

/**
 * 批量扩展 URL
 */
export async function expandUrlsInBatch(urls: string[]): Promise<ExpandResult[]> {
  const results: ExpandResult[] = []
  const queue = [...urls]
  const inProgress: Promise<ExpandResult>[] = []

  while (queue.length > 0 || inProgress.length > 0) {
    // 填充并发队列
    while (inProgress.length < MAX_CONCURRENT && queue.length > 0) {
      const url = queue.shift()!
      const promise = expandUrl(url).then(result => {
        const index = inProgress.indexOf(promise)
        if (index > -1) {
          inProgress.splice(index, 1)
        }
        return result
      })
      inProgress.push(promise)
    }

    // 等待至少一个完成
    if (inProgress.length > 0) {
      const result = await Promise.race(inProgress)
      results.push(result)
    }
  }

  return results
}

/**
 * 从文本中提取 URL
 */
export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g
  const matches = text.match(urlRegex)
  return matches || []
}

/**
 * 处理单元格内容中的 URL
 */
export async function processCellContent(
  content: string,
  options?: {
    extractAll?: boolean // 是否提取所有 URL，默认只处理纯 URL
    replaceInText?: boolean // 是否在原文中替换
  }
): Promise<{
  isUrl: boolean
  urls: Array<{
    original: string
    expanded?: string
    error?: string
  }>
  result: string
}> {
  // 如果内容本身就是 URL
  if (isValidUrl(content)) {
    const result = await expandUrl(content)
    return {
      isUrl: true,
      urls: [{
        original: content,
        expanded: result.expanded,
        error: result.error
      }],
      result: result.expanded || content
    }
  }

  // 如果需要提取文本中的 URL
  if (options?.extractAll) {
    const urls = extractUrls(content)
    const results: Array<{ original: string; expanded?: string; error?: string }> = []

    for (const url of urls) {
      const result = await expandUrl(url)
      results.push({
        original: url,
        expanded: result.expanded,
        error: result.error
      })
    }

    // 替换原文中的 URL
    let result = content
    for (const { original, expanded, error } of results) {
      if (expanded && !error) {
        result = result.replace(original, expanded)
      }
    }

    return {
      isUrl: false,
      urls: results,
      result
    }
  }

  return {
    isUrl: false,
    urls: [],
    result: content
  }
}

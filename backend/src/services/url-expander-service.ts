/**
 * URL 解析服务
 */

import { expandUrlsInBatch, ExpandResult } from '../utils/url-expander'

export { ExpandResult }

/**
 * 批量解析 URL
 */
export async function expandUrls(urls: string[]): Promise<{
  success: boolean
  total: number
  successCount: number
  failedCount: number
  results: ExpandResult[]
}> {
  const results = await expandUrlsInBatch(urls)
  const successCount = results.filter(r => r.success).length

  return {
    success: true,
    total: urls.length,
    successCount,
    failedCount: results.length - successCount,
    results
  }
}

import apiClient from './client'

export interface ExpandResult {
  success: boolean
  originalUrl: string
  expandedUrl?: string
  error?: string
  errorType?: string
}

export interface BatchExpandResponse {
  success: boolean
  total: number
  successCount: number
  failedCount: number
  results: ExpandResult[]
}

export const urlExpanderApi = {
  /**
   * 批量解析 URL
   */
  expandBatch(urls: string[]) {
    return apiClient.post<BatchExpandResponse>('/url-expand/batch', { urls })
  }
}

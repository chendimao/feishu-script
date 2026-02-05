import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useConfigStore } from '@/stores/config'

// 创建 axios 实例
let apiInstance: AxiosInstance

// 初始化 API 实例
function createApiInstance(): AxiosInstance {
  const configStore = useConfigStore()
  
  const instance = axios.create({
    baseURL: configStore.apiUrl,
    timeout: configStore.config.timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      if (configStore.config.enableLogging) {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          params: config.params
        })
      }
      return config
    },
    (error) => {
      if (configStore.config.enableLogging) {
        console.error('❌ Request Error:', error)
      }
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (configStore.config.enableLogging) {
        console.log('✅ API Response:', {
          status: response.status,
          data: response.data,
          url: response.config.url
        })
      }
      return response
    },
    async (error) => {
      const configStore = useConfigStore()
      
      if (configStore.config.enableLogging) {
        console.error('❌ Response Error:', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url
        })
      }

      // 处理常见错误
      if (error.response) {
        const { status, data } = error.response
        
        switch (status) {
          case 400:
            ElMessage.error(data?.message || '请求参数错误')
            break
          case 401:
            ElMessage.error('未授权访问')
            break
          case 403:
            ElMessage.error('访问被拒绝')
            break
          case 404:
            ElMessage.error('请求的资源不存在')
            break
          case 500:
            ElMessage.error('服务器内部错误')
            break
          default:
            ElMessage.error(data?.message || `请求失败 (${status})`)
        }
      } else if (error.code === 'ECONNABORTED') {
        ElMessage.error('请求超时，请检查网络连接')
      } else if (error.message.includes('Network Error')) {
        ElMessage.error('网络连接失败，请检查服务器地址')
      } else {
        ElMessage.error(error.message || '请求失败')
      }

      return Promise.reject(error)
    }
  )

  return instance
}

// 获取 API 实例（单例模式）
export function getApiInstance(): AxiosInstance {
  if (!apiInstance) {
    apiInstance = createApiInstance()
    
    // 监听配置更新事件
    if (typeof window !== 'undefined') {
      window.addEventListener('config-updated', () => {
        recreateApiInstance()
      })
    }
  }
  return apiInstance
}

// 重新创建 API 实例（配置更新时调用）
export function recreateApiInstance(): AxiosInstance {
  apiInstance = createApiInstance()
  return apiInstance
}

// 通用请求方法
export class ApiRequest {
  private static instance: AxiosInstance

  private static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = getApiInstance()
    }
    return this.instance
  }

  // 更新实例配置
  static updateConfig(): void {
    this.instance = recreateApiInstance()
  }

  // GET 请求
  static async get<T = any>(
    url: string, 
    params?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.getInstance().get(url, { params, ...config })
    return response.data
  }

  // POST 请求
  static async post<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.getInstance().post(url, data, config)
    return response.data
  }

  // PUT 请求
  static async put<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.getInstance().put(url, data, config)
    return response.data
  }

  // DELETE 请求
  static async delete<T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.getInstance().delete(url, config)
    return response.data
  }

  // 带重试的请求
  static async requestWithRetry<T = any>(
    requestFn: () => Promise<T>,
    maxRetries?: number
  ): Promise<T> {
    const configStore = useConfigStore()
    const retries = maxRetries ?? configStore.config.retryCount
    
    let lastError: any
    
    for (let i = 0; i <= retries; i++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error
        
        if (i < retries) {
          const delay = Math.min(1000 * Math.pow(2, i), 5000) // 指数退避，最大5秒
          if (configStore.config.enableLogging) {
            console.warn(`⚠️ Request failed, retrying in ${delay}ms... (${i + 1}/${retries})`)
          }
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    throw lastError
  }
}

export default ApiRequest

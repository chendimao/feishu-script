import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getSettings } from '@/utils/settings'

// 创建 API 客户端实例
const apiClient = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 动态设置 baseURL
function updateBaseURL() {
  const settings = getSettings()
  apiClient.defaults.baseURL = settings.apiBaseUrl || import.meta.env.VITE_API_BASE_URL || '/api'
  apiClient.defaults.timeout = settings.timeout || 600000
  
  // 添加调试信息
  console.log('[API Client] 配置更新:', {
    baseURL: apiClient.defaults.baseURL,
    timeout: apiClient.defaults.timeout,
    settingsTimeout: settings.timeout
  })
}

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 每次请求前更新配置
    updateBaseURL()
    
    // 添加请求配置调试信息
    console.log('[API Request] 配置:', {
      url: config.url,
      method: config.method,
      timeout: config.timeout,
      baseURL: config.baseURL
    })
    
    // 可以在这里添加认证token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data
    if (!data.success) {
      ElMessage.error(data.error || '请求失败')
      return Promise.reject(new Error(data.error))
    }
    return data
  },
  (error: AxiosError) => {
    const errorData = error.response?.data as { error?: string } | undefined
    const message = errorData?.error || error.message || '网络错误'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 初始化配置
updateBaseURL()

export default apiClient
export { updateBaseURL }

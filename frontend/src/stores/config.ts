import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'

export interface AppConfig {
  apiBaseUrl: string
  timeout: number
  retryCount: number
  enableLogging: boolean
}

const DEFAULT_CONFIG: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3030',
  timeout: 60000,
  retryCount: 3,
  enableLogging: true
}

export const useConfigStore = defineStore('config', () => {
  // 状态
  const config = ref<AppConfig>({ ...DEFAULT_CONFIG })
  const isLoading = ref(false)
  const lastSaved = ref<Date | null>(null)

  // 计算属性
  const apiUrl = computed(() => config.value.apiBaseUrl)
  const hasUnsavedChanges = computed(() => {
    const stored = getStoredConfig()
    return JSON.stringify(config.value) !== JSON.stringify(stored)
  })

  // 从 localStorage 获取配置
  function getStoredConfig(): AppConfig {
    try {
      const stored = localStorage.getItem('app-config')
      if (stored) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(stored) }
      }
    } catch (error) {
      console.warn('Failed to parse stored config:', error)
    }
    return { ...DEFAULT_CONFIG }
  }

  // 初始化配置
  function initConfig() {
    config.value = getStoredConfig()
  }

  // 保存配置到 localStorage
  function saveConfig() {
    try {
      localStorage.setItem('app-config', JSON.stringify(config.value))
      lastSaved.value = new Date()
      
      // 通知 API 实例更新配置
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('config-updated'))
      }
      
      return true
    } catch (error) {
      console.error('Failed to save config:', error)
      return false
    }
  }

  // 重置配置为默认值
  function resetConfig() {
    config.value = { ...DEFAULT_CONFIG }
  }

  // 更新配置
  function updateConfig(newConfig: Partial<AppConfig>) {
    config.value = { ...config.value, ...newConfig }
  }

  // 验证 API URL
  async function validateApiUrl(url: string): Promise<boolean> {
    try {
      isLoading.value = true
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(`${url}/api/health`, {
        method: 'GET',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      return response.ok
    } catch (error) {
      console.error('API validation failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // 导出配置
  function exportConfig(): string {
    return JSON.stringify(config.value, null, 2)
  }

  // 导入配置
  function importConfig(configJson: string): boolean {
    try {
      const importedConfig = JSON.parse(configJson)
      // 验证配置结构
      if (typeof importedConfig === 'object' && importedConfig !== null) {
        config.value = { ...DEFAULT_CONFIG, ...importedConfig }
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import config:', error)
      return false
    }
  }

  // 初始化
  initConfig()

  return {
    // 状态
    config: readonly(config),
    isLoading: readonly(isLoading),
    lastSaved: readonly(lastSaved),
    
    // 计算属性
    apiUrl,
    hasUnsavedChanges,
    
    // 方法
    initConfig,
    saveConfig,
    resetConfig,
    updateConfig,
    validateApiUrl,
    exportConfig,
    importConfig
  }
})

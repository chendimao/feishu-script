// 设置管理工具
export interface AppSettings {
  apiBaseUrl: string
  timeout: number
  retryCount: number
  enableLogging: boolean
  autoSave: boolean
  compactMode: boolean
}

// 默认设置
export const defaultSettings: AppSettings = {
  apiBaseUrl: 'https://aiti.xin:5003/api',
  timeout: 6000000,
  retryCount: 3,
  enableLogging: false,
  autoSave: true,
  compactMode: false
}

// 缓存键名
const SETTINGS_KEY = 'feishu-script-settings'

/**
 * 获取设置
 */
export function getSettings(): AppSettings {
  try {
    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      // 合并默认设置和保存的设置
      const finalSettings = { ...defaultSettings, ...settings }
      console.log('[Settings] 加载设置:', {
        saved: settings,
        default: defaultSettings,
        final: finalSettings
      })
      return finalSettings
    }
  } catch (error) {
    console.warn('加载设置失败:', error)
  }
  console.log('[Settings] 使用默认设置:', defaultSettings)
  return { ...defaultSettings }
}

/**
 * 保存设置
 */
export function saveSettings(settings: Partial<AppSettings>): void {
  try {
    const currentSettings = getSettings()
    const newSettings = { ...currentSettings, ...settings }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
  } catch (error) {
    console.error('保存设置失败:', error)
    throw error
  }
}

/**
 * 获取 API 基础地址
 */
export function getApiBaseUrl(): string {
  const settings = getSettings()
  return settings.apiBaseUrl
}

/**
 * 保存 API 基础地址
 */
export function saveApiBaseUrl(url: string): void {
  saveSettings({ apiBaseUrl: url })
}

/**
 * 清除所有设置
 */
export function clearSettings(): void {
  localStorage.removeItem(SETTINGS_KEY)
}

/**
 * 重置为默认设置
 */
export function resetSettings(): void {
  clearSettings()
}

/**
 * 强制更新超时设置
 */
export function forceUpdateTimeout(): void {
  const currentSettings = getSettings()
  if (currentSettings.timeout < 600000) {
    console.log('[Settings] 检测到旧的超时设置，强制更新为600秒')
    saveSettings({ timeout: 600000 })
  }
}


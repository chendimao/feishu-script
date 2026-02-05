<template>
  <div class="settings-page">
    <!-- 简洁头部 -->
    <header class="page-header">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="page-title">设置</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- 设置内容 -->
    <main class="settings-content">
      <!-- API 配置卡片 -->
      <section class="setting-card">
        <div class="card-title">
          <div class="title-icon blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <span>API 配置</span>
        </div>

        <div class="form-group">
          <label class="form-label">基础地址</label>
          <input 
            v-model="formData.apiBaseUrl" 
            type="text" 
            class="form-input enhanced"
            placeholder="http://aiti.xin:5004"
            @blur="validateApiUrl"
          />
          <p class="form-hint">飞书 API 服务地址</p>
        </div>
      </section>

      <!-- 操作按钮 -->
      <div class="action-bar">
        <button class="btn-secondary" @click="resetForm">重置</button>
        <button class="btn-primary" @click="saveSettings" :disabled="saving">
          <svg v-if="!saving" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          <span v-if="saving" class="loading-dot"></span>
          {{ saving ? '保存中' : '保存' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSettings, saveSettings as saveSettingsToCache, clearSettings } from '@/utils/settings'
import { updateBaseURL } from '@/api/client'

const router = useRouter()

// 状态
const saving = ref(false)

// 表单数据
const formData = reactive({
  apiBaseUrl: 'https://aiti.xin:5003/api'
})

// 返回上一页
function goBack() {
  router.back()
}

// 验证 API 地址
function validateApiUrl() {
  if (!formData.apiBaseUrl) return
  
  if (!formData.apiBaseUrl.startsWith('http')) {
    formData.apiBaseUrl = 'http://' + formData.apiBaseUrl
  }
  
  // 自动保存到缓存
  saveToCache()
}


// 重置表单
async function resetForm() {
  try {
    await ElMessageBox.confirm(
      '确定要重置 API 地址吗？这将清除缓存的配置。',
      '确认重置',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 清除缓存
    clearSettings()
    
    // 重置表单数据
    formData.apiBaseUrl = 'http://aiti.xin:5004'
    
    // 更新 API 客户端配置
    updateBaseURL()
    
    ElMessage.success('设置已重置')
  } catch {
    // 用户取消，不做任何操作
  }
}

// 保存设置到缓存
function saveToCache() {
  const settings = {
    apiBaseUrl: formData.apiBaseUrl
  }
  saveSettingsToCache(settings)
  
  // 更新 API 客户端配置
  updateBaseURL()
}

// 从缓存加载设置
function loadFromCache() {
  const settings = getSettings()
  
  // 更新表单数据
  formData.apiBaseUrl = settings.apiBaseUrl
}

// 保存设置
async function saveSettings() {
  saving.value = true
  
  try {
    // 保存到缓存
    saveToCache()
    
    setTimeout(() => {
      saving.value = false
      ElMessage.success('设置已保存')
    }, 600)
  } catch (error) {
    console.error('保存设置失败:', error)
    saving.value = false
    ElMessage.error('保存失败，请重试')
  }
}

onMounted(() => {
  // 加载保存的设置
  loadFromCache()
})
</script>

<style scoped>
/* ===== 基础重置 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.settings-page {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* ===== 头部 ===== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.page-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.header-spacer {
  width: 36px;
}

/* ===== 内容区 ===== */
.settings-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===== 卡片 ===== */
.setting-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.setting-card.info-card {
  padding: 12px 16px;
  background: #fafafa;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.title-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
  flex-shrink: 0;
}

.title-icon.blue {
  background: #3b82f6;
}

.title-icon.purple {
  background: #8b5cf6;
}

/* ===== 表单 ===== */
.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.form-input.enhanced {
  height: 48px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 500;
  background: #fafbfc;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.form-input:hover {
  border-color: #d0d0d0;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-input.enhanced:hover {
  background: #f5f7fa;
  border-color: #c1c9d2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.form-input.enhanced:focus {
  background: #fff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

/* 按钮 */
.btn-outline {
  height: 40px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-outline:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f0f7ff;
}

.btn-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 开关列表 ===== */
.toggle-list {
  display: flex;
  flex-direction: column;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.toggle-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.toggle-desc {
  font-size: 12px;
  color: #999;
}

/* 开关 */
.toggle-switch {
  width: 44px;
  height: 24px;
  background: #e0e0e0;
  border: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}

.toggle-switch.active {
  background: #3b82f6;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(20px);
}

/* ===== 信息行 ===== */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.info-row:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  font-size: 13px;
  color: #999;
}

.info-value {
  font-size: 13px;
  color: #666;
  font-family: 'SF Mono', Monaco, monospace;
}

/* ===== 操作栏 ===== */
.action-bar {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
}

.btn-secondary {
  background: #fff;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #f5f5f5;
  border-color: #d0d0d0;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 加载动画 ===== */
.loading-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== 移动端适配 ===== */
@media (max-width: 480px) {
  .settings-content {
    padding: 12px;
  }
  
  .setting-card {
    padding: 14px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .input-row {
    flex-direction: column;
  }
  
  .btn-outline {
    width: 100%;
  }
}
</style>

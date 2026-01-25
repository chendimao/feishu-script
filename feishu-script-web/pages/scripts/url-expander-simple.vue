<template>
  <div class="url-expander-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>短链接批量扩展工具</h2>
      <p class="page-description">自动获取表格信息，批量将短链接转换为实际链接</p>
    </div>

    <!-- 连接状态显示 -->
    <div class="connection-status">
      <el-alert
        v-if="!feishuConfig.appToken"
        title="提示"
        type="info"
        description="请在飞书多维表格环境中使用此功能，或确保URL包含正确的参数"
        show-icon
        class="status-alert"
      />
      
      <el-alert
        v-else-if="feishuConfig.appToken && feishuConfig.tableId"
        title="✓ 已连接到飞书表格"
        type="success"
        :description="`表格ID: ${feishuConfig.tableId}`"
        show-icon
        class="status-alert"
      />
    </div>

    <!-- 主要操作区域 -->
    <div v-if="feishuConfig.appToken && feishuConfig.tableId" class="main-content">
      <div class="operation-grid">
        <!-- 左侧：短链接匹配 -->
        <div class="operation-item">
          <el-card class="operation-card">
            <template #header>
              <div class="card-header">
                <div class="card-icon">🎯</div>
                <h3>短链接匹配规则</h3>
              </div>
            </template>
            <div class="card-content">
              <el-form label-width="80px" label-position="top">
                <el-form-item label="匹配规则">
                  <el-input
                    v-model="urlPattern"
                    placeholder="输入短链接域名，如：bit.ly, t.cn, tinyurl.com"
                    clearable
                    size="large"
                  />
                  <div class="help-text">
                    💡 支持多个域名，用逗号分隔。留空则匹配所有URL
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>

        <!-- 右侧：列选择和操作 -->
        <div class="operation-item">
          <el-card class="operation-card">
            <template #header>
              <div class="card-header">
                <div class="card-icon">📋</div>
                <h3>选择操作列</h3>
              </div>
            </template>
            <div class="card-content">
              <el-form label-width="80px" label-position="top">
                <el-form-item label="短链接列">
                  <el-select
                    v-model="selectedFieldId"
                    placeholder="选择包含短链接的列"
                    filterable
                    size="large"
                    style="width: 100%"
                    @change="onFieldChange"
                  >
                    <el-option
                      v-for="field in textFields"
                      :key="field.fieldId"
                      :label="field.fieldName"
                      :value="field.fieldId"
                    />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="替换模式">
                  <el-radio-group v-model="replaceMode" size="large">
                    <el-radio value="inplace">原列替换</el-radio>
                    <el-radio value="newColumn">新增列</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item v-if="replaceMode === 'newColumn'" label="新列名称">
                  <el-input
                    v-model="newColumnName"
                    placeholder="输入新列名称"
                    clearable
                    size="large"
                  />
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="action-section">
        <el-card>
          <div class="action-buttons">
            <el-button 
              type="primary" 
              size="large"
              @click="testFunction"
              :loading="processing"
            >
              🔗 测试连接
            </el-button>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 手动输入选项（备用） -->
    <el-collapse v-if="!feishuConfig.appToken || !feishuConfig.tableId" class="manual-input">
      <el-collapse-item title="手动输入表格信息（备用选项）" name="manual">
        <el-form :model="feishuConfig" label-width="120px" class="config-form">
          <el-form-item label="App Token">
            <el-input
              v-model="feishuConfig.appToken"
              placeholder="请输入飞书多维表格的 app_token"
              clearable
            />
          </el-form-item>
          <el-form-item label="Table ID">
            <el-input
              v-model="feishuConfig.tableId"
              placeholder="请输入数据表的 table_id"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadTableData" :loading="loading">
              加载表格数据
            </el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

// 加载状态
const loading = ref(false)
const processing = ref(false)

// 飞书配置
const feishuConfig = reactive({
  appToken: '',
  tableId: ''
})

// 表格数据
const tableFields = ref<Array<{ fieldId: string; fieldName: string; fieldType: string }>>([])

// 选择的列
const selectedFieldId = ref('')

// 替换模式
const replaceMode = ref<'inplace' | 'newColumn'>('newColumn')
const newColumnName = ref('扩展后链接')

// URL匹配规则
const urlPattern = ref('bit.ly,t.cn,tinyurl.com,short.link')

// 计算属性
const textFields = computed(() =>
  tableFields.value.filter(field =>
    ['text', 'singleText', 'richText'].includes(field.fieldType)
  )
)

// 方法
async function testFunction() {
  processing.value = true
  try {
    console.log('测试函数执行')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('测试完成')
  } finally {
    processing.value = false
  }
}

function onFieldChange() {
  console.log('字段变化:', selectedFieldId.value)
}

async function loadTableData() {
  loading.value = true
  try {
    // 模拟加载数据
    await new Promise(resolve => setTimeout(resolve, 1000))
    tableFields.value = [
      { fieldId: 'fld1', fieldName: '短链接', fieldType: 'text' },
      { fieldId: 'fld2', fieldName: '标题', fieldType: 'text' },
      { fieldId: 'fld3', fieldName: '创建时间', fieldType: 'date' }
    ]
    console.log('表格数据加载完成')
  } finally {
    loading.value = false
  }
}

// 页面初始化
onMounted(async () => {
  console.log('页面初始化')
  // 尝试从URL获取参数
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const appToken = urlParams.get('app_token')
    const tableId = urlParams.get('table_id')
    
    if (appToken && tableId) {
      feishuConfig.appToken = appToken
      feishuConfig.tableId = tableId
      await loadTableData()
    }
  }
})
</script>

<style scoped>
.url-expander-page {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.page-header h2 {
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.page-description {
  color: #5a6c7d;
  font-size: 16px;
  line-height: 1.6;
}

.connection-status {
  margin-bottom: 32px;
}

.status-alert {
  margin-bottom: 16px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.main-content {
  margin-bottom: 40px;
}

.operation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

.operation-item {
  min-height: 280px;
}

.operation-card {
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
}

.operation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
  z-index: 1;
}

.operation-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 8px 0;
}

.operation-card .el-card__header {
  padding: 20px 24px;
  background: #ffffff;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;
}

.operation-card .el-card__header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  pointer-events: none;
}

.operation-card h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  position: relative;
  z-index: 1;
}

.operation-card .el-card__body {
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
}

.help-text {
  font-size: 13px;
  color: #8492a6;
  margin-top: 8px;
  line-height: 1.5;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.action-section {
  margin: 32px 0;
}

.action-section .el-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 180px;
  background: #3b82f6;
  color: white;
}

.action-buttons .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.manual-input {
  margin-top: 32px;
}

.manual-input .el-collapse {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: none;
}

.config-form {
  max-width: 600px;
  margin: 0 auto;
}

/* 表单样式优化 */
.el-form-item__label {
  color: #2d3748;
  font-weight: 600;
}

.el-input__inner,
.el-select .el-input__inner {
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.el-input__inner:focus,
.el-select .el-input__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.el-radio-group .el-radio {
  margin-right: 24px;
}

.el-radio__label {
  color: #2d3748;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .operation-grid {
    gap: 24px;
  }
  
  .operation-item {
    min-height: 260px;
  }
}

@media (max-width: 768px) {
  .url-expander-page {
    padding: 16px;
  }
  
  .page-header {
    padding: 20px;
    margin-bottom: 24px;
  }
  
  .page-header h2 {
    font-size: 24px;
  }
  
  .operation-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .operation-item {
    min-height: auto;
  }
  
  .operation-card {
    border-radius: 16px;
  }
  
  .operation-card:hover {
    transform: translateY(-4px) scale(1.01);
  }
  
  .card-icon {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .action-buttons .el-button {
    margin-bottom: 0;
    min-width: auto;
  }
  
  .operation-card .el-card__header {
    padding: 16px 20px;
  }
  
  .operation-card h3 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .url-expander-page {
    padding: 12px;
  }
  
  .page-header {
    padding: 16px;
  }
  
  .page-header h2 {
    font-size: 20px;
  }
  
  .page-description {
    font-size: 14px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.operation-card,
.action-section .el-card,
.manual-input .el-collapse {
  animation: fadeInUp 0.6s ease-out;
}

.operation-card:nth-child(2) {
  animation-delay: 0.1s;
}

.action-section .el-card {
  animation-delay: 0.2s;
}

.manual-input .el-collapse {
  animation-delay: 0.3s;
}
</style>

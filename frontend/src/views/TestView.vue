<template>
  <div class="test-page">
    <ScriptHeader title="API 测试工具" description="测试后端 API 接口" />
    
    <div class="test-content">
      <el-card class="test-card">
        <template #header>
          <div class="card-header">
            <span>API 测试</span>
            <el-button type="primary" @click="runAllTests" :loading="loading">
              运行全部测试
            </el-button>
          </div>
        </template>
        
        <div class="test-form">
          <el-form :model="form" label-width="120px">
            <el-form-item label="App Token">
              <el-input v-model="form.appToken" placeholder="请输入 App Token" />
            </el-form-item>
            
            <el-form-item label="Table ID">
              <el-input v-model="form.tableId" placeholder="请输入 Table ID" />
            </el-form-item>
          </el-form>
        </div>
        
        <div class="test-results" v-if="results.length > 0">
          <h3>测试结果</h3>
          <el-timeline>
            <el-timeline-item
              v-for="(result, index) in results"
              :key="index"
              :type="result.success ? 'success' : 'danger'"
              :icon="result.success ? 'Check' : 'Close'"
            >
              <div class="result-item">
                <div class="result-title">{{ result.name }}</div>
                <div class="result-status" :class="{ success: result.success, error: !result.success }">
                  {{ result.success ? '成功' : '失败' }}
                </div>
                <pre v-if="result.data" class="result-data">{{ JSON.stringify(result.data, null, 2) }}</pre>
                <div v-if="result.error" class="result-error">{{ result.error }}</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ScriptHeader from '@/components/ScriptHeader.vue'
import { feishuApi } from '@/api/feishu'
import { urlExpanderApi } from '@/api/url-expander'

const loading = ref(false)
const results = ref<Array<{
  name: string
  success: boolean
  data?: any
  error?: string
}>>([])

const form = reactive({
  appToken: '',
  tableId: ''
})

async function runAllTests() {
  loading.value = true
  results.value = []
  
  try {
    // 测试 1: 健康检查
    await testHealth()
    
    // 测试 2: URL 解析
    await testUrlExpand()
    
    // 测试 3: 飞书字段（如果有配置）
    if (form.appToken && form.tableId) {
      await testFeishuFields()
    }
  } finally {
    loading.value = false
  }
}

async function testHealth() {
  try {
    const response = await fetch('/api/health')
    const data = await response.json()
    results.value.push({
      name: '健康检查',
      success: data.success,
      data: data.data
    })
  } catch (error) {
    results.value.push({
      name: '健康检查',
      success: false,
      error: error instanceof Error ? error.message : '请求失败'
    })
  }
}

async function testUrlExpand() {
  try {
    const response = await urlExpanderApi.expandBatch([
      'https://bit.ly/test123',
      'https://t.cn/test456'
    ])
    results.value.push({
      name: 'URL 解析',
      success: true,
      data: response.data
    })
  } catch (error) {
    results.value.push({
      name: 'URL 解析',
      success: false,
      error: error instanceof Error ? error.message : '请求失败'
    })
  }
}

async function testFeishuFields() {
  try {
    const response = await feishuApi.getFields(form.appToken, form.tableId)
    results.value.push({
      name: '飞书字段获取',
      success: true,
      data: response.data
    })
  } catch (error) {
    results.value.push({
      name: '飞书字段获取',
      success: false,
      error: error instanceof Error ? error.message : '请求失败'
    })
  }
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.test-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test-form {
  margin-bottom: 30px;
}

.test-results h3 {
  margin-bottom: 20px;
  color: #303133;
}

.result-item {
  padding: 10px 0;
}

.result-title {
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.result-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.result-status.success {
  background: #f0f9eb;
  color: #67c23a;
}

.result-status.error {
  background: #fef0f0;
  color: #f56c6c;
}

.result-data {
  background: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  margin: 10px 0;
}

.result-error {
  color: #f56c6c;
  font-size: 13px;
  margin-top: 8px;
}
</style>

<template>
  <div class="test-page">
    <!-- 脚本头部 -->
    <ScriptHeader 
      title="🧪 API测试工具"
      description="测试各种API接口的功能和响应"
    />
    
    <el-card>
      <template #header>
        <h3>基本功能测试</h3>
      </template>
      
      <el-form label-width="120px">
        <el-form-item label="App Token">
          <el-input v-model="appToken" placeholder="输入app token" />
        </el-form-item>
        
        <el-form-item label="Table ID">
          <el-input v-model="tableId" placeholder="输入table id" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="testConnection" :loading="loading">
            测试连接
          </el-button>
        </el-form-item>
      </el-form>
      
      <div v-if="result" class="result">
        <h4>测试结果：</h4>
        <pre>{{ result }}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const appToken = ref('test_app_token')
const tableId = ref('test_table_id')
const loading = ref(false)
const result = ref('')

async function testConnection() {
  loading.value = true
  result.value = ''
  
  try {
    if (!appToken.value || !tableId.value) {
      result.value = '请输入 App Token 和 Table ID'
      return
    }
    
    // 测试基本API
    const testResponse = await $fetch('/api/test')
    result.value = `基本API测试:\n${JSON.stringify(testResponse, null, 2)}\n\n`
    
    // 测试获取字段
    const fieldsResponse = await $fetch('/api/feishu/fields', {
      method: 'POST',
      body: {
        appToken: appToken.value,
        tableId: tableId.value
      }
    })
    result.value += `字段API测试:\n${JSON.stringify(fieldsResponse, null, 2)}\n\n`
    
    // 测试获取记录
    const recordsResponse = await $fetch('/api/feishu/records', {
      method: 'POST',
      body: {
        appToken: appToken.value,
        tableId: tableId.value,
        limit: 3
      }
    })
    result.value += `记录API测试:\n${JSON.stringify(recordsResponse, null, 2)}\n\n`
    
    // 测试URL扩展
    const urlResponse = await $fetch('/api/url-expand/batch', {
      method: 'POST',
      body: {
        urls: ['https://bit.ly/test1', 'https://t.cn/test2']
      }
    })
    result.value += `URL扩展API测试:\n${JSON.stringify(urlResponse, null, 2)}`
    
  } catch (error) {
    result.value = `错误: ${error}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: #f8fafc;
}

.test-page > .el-card {
  max-width: 800px;
  margin: 0 auto 24px auto;
  border-radius: 24px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.test-page .el-card__header {
  background: #ffffff;
  color: #1f2937;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.test-page .el-card__header h3 {
  color: #1f2937;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.test-page .el-card__body {
  padding: 32px;
}

/* 表单样式 */
.test-page .el-form-item {
  margin-bottom: 24px;
}

.test-page .el-input__wrapper {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.test-page .el-input__wrapper:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.test-page .el-input__wrapper.is-focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 按钮样式 */
.test-page .el-button--primary {
  background: #3b82f6;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.test-page .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* 结果区域 */
.result {
  margin-top: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.result h4 {
  color: #2d3748;
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.result pre {
  white-space: pre-wrap;
  word-break: break-all;
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4a5568;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .test-page > .el-card {
    margin: 0 16px 24px 16px;
  }
  
  .test-page .el-card__header {
    padding: 20px;
  }
  
  .test-page .el-card__body {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .test-page > .el-card {
    margin: 0 12px 20px 12px;
  }
  
  .test-page .el-card__header {
    padding: 16px;
  }
  
  .test-page .el-card__body {
    padding: 20px;
  }
}
</style>

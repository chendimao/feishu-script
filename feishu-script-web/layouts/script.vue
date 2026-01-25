<template>
  <div class="script-layout">
    <!-- 公共头部 -->
    <div class="script-header">
      <div class="header-content">
        <el-button 
          type="primary" 
          :icon="ArrowLeft" 
          @click="goBack"
          class="back-button"
        >
          返回首页
        </el-button>
        <div class="header-info">
          <h1 class="script-title">{{ title || '脚本工具' }}</h1>
          <p v-if="description" class="script-description">{{ description }}</p>
        </div>
      </div>
    </div>

    <!-- 脚本内容区域 -->
    <div class="script-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

interface Props {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '脚本工具',
  description: ''
})

const router = useRouter()

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.script-layout {
  min-height: 100vh;
  background: #f5f7fa;
}

.script-header {
  background: white;
  border-bottom: 1px solid #e4e7ed;
  padding: 20px 0;
  margin-bottom: 24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-button {
  flex-shrink: 0;
}

.header-info {
  flex: 1;
}

.script-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.script-description {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.script-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .script-content {
    padding: 0 16px;
  }
  
  .script-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .script-header {
    padding: 16px 0;
    margin-bottom: 16px;
  }
  
  .header-content {
    padding: 0 12px;
  }
  
  .script-content {
    padding: 0 12px;
  }
}
</style>

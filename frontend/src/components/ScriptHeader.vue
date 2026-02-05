<template>
  <div class="script-header">
    <!-- 紧凑导航栏 -->
    <nav class="nav-bar">
      <button @click="goBack" class="back-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="hidden sm:inline">返回</span>
      </button>
    </nav>

    <!-- 紧凑标题区域 -->
    <div class="title-section">
      <div class="title-content">
        <h1 class="page-title">{{ title }}</h1>
        <p v-if="description" class="page-subtitle">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title: string
  description?: string
  metrics?: {
    processed?: string
    success?: string
    time?: string
  }
}

withDefaults(defineProps<Props>(), {
  metrics: () => ({
    processed: '1,234',
    success: '98%',
    time: '2.3s'
  })
})

const router = useRouter()

function goBack() {
  router.push('/')
}
</script>

<style scoped>
/* 移动端优先设计 */
.script-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}

/* 紧凑导航栏 */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #334155;
}

.back-btn:active {
  transform: scale(0.98);
}

/* 紧凑标题区域 */
.title-section {
  padding: 16px;
}

.title-content {
  margin-bottom: 16px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* 响应式设计 - 移动端优先 */
@media (min-width: 640px) {
  .nav-bar {
    padding: 16px 24px;
  }
  
  .title-section {
    padding: 20px 24px;
  }
  
  .page-title {
    font-size: 1.875rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .script-header {
    margin-bottom: 24px;
  }
  
  .title-section {
    padding: 24px 32px;
  }
  
  .page-title {
    font-size: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .nav-bar {
    padding: 20px 40px;
  }
  
  .title-section {
    padding: 32px 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .title-content {
    flex: 1;
    margin-bottom: 0;
    margin-right: 32px;
  }
}

/* 工具类 */
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.hidden { display: none; }

@media (min-width: 640px) {
  .sm\:inline { display: inline; }
}
</style>

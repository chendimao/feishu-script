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
interface Props {
  title: string
  description?: string
  metrics?: {
    processed?: string
    success?: string
    time?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
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

/* 状态指示器 */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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

/* 实时数据可视化 */
.data-viz {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.metric-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 8px;
  text-align: center;
  transition: all 0.2s ease;
}

.metric-item:hover {
  background: #f1f5f9;
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 2px;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
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
  
  .data-viz {
    gap: 16px;
  }
  
  .metric-item {
    padding: 16px 12px;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
  
  .metric-label {
    font-size: 0.875rem;
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
  
  .data-viz {
    gap: 20px;
  }
  
  .metric-item {
    padding: 20px 16px;
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
  
  .data-viz {
    flex-shrink: 0;
    width: 300px;
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

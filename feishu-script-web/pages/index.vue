<template>
  <div class="home-page">
    <!-- Hero Section with Real-time Data -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <AppLogo 
            size="large" 
            :show-text="true" 
            :show-subtitle="true"
            :show-background="true"
            app-name="多维表格脚本管理"
            subtitle="让工作更高效，让数据更智能"
          />
        </div>
        
      
      </div>
    </section>

    <!-- Feature Highlights -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        
        <div class="features-grid">
          <div
            v-for="script in scripts"
            :key="script.id"
            class="feature-card"
            :class="`theme-${script.theme}`"
            @click="handleScriptClick(script)"
          >
            <div class="feature-header">
              <div class="feature-icon">
                <component :is="script.icon" />
              </div>
              <div class="feature-badge">
                <span class="badge-text">{{ script.status || '可用' }}</span>
              </div>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">{{ script.name }}</h3>
              <p class="feature-desc">{{ script.description }}</p>
              <div class="feature-stats" v-if="script.stats">
                <span class="stat-item">
                  <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  {{ script.stats }}
                </span>
              </div>
            </div>
            <div class="feature-footer">
              <button class="feature-btn">
                <span>立即使用</span>
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

   
  </div>
</template>

<script setup lang="ts">
import { Connection, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 实时统计数据
const stats = ref({
  totalProcessed: '12,345',
  activeUsers: '1,234',
  successRate: '98.5%'
})

// 脚本配置
const scripts = [
  {
    id: 'url-expander-plugin',
    name: '短链接解析器',
    description: '智能解析短链接，支持批量处理和原列替换',
    icon: Connection,
    route: '/scripts/url-expander-plugin',
    status: '热门',
    
    theme: 'blue'
  },
  {
    id: 'test',
    name: 'API测试工具',
    description: '测试各种API接口的功能和响应',
    icon: Setting,
    route: '/test',
    status: '可用', 
    theme: 'purple'
  }
]

const router = useRouter()

function handleScriptClick(script: typeof scripts[0]) {
  router.push(script.route)
}
</script>

<style scoped>
/* 移动端优先设计 */
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%);
  position: relative;
}

.home-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid #e5e7eb;
  padding: 10px 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.hero-content {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-text {
  text-align: center;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

/* Real-time Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.stat-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 8px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-item:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border-color: #3b82f6;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.stat-item:hover::before {
  opacity: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Features Section */
.features-section {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin: 0 0 24px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 20px;
}

/* 现代化功能卡片 */
.feature-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
}

.feature-badge {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 16px;
  padding: 3px 10px;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #0369a1;
}

.feature-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.feature-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.feature-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #059669;
  font-weight: 500;
}

.stat-icon {
  width: 14px;
  height: 14px;
}

.feature-footer {
  margin-top: auto;
}

.feature-btn {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-btn:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.btn-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.feature-card:hover .btn-icon {
  transform: translateX(2px);
}

/* 主题色彩系统 */
.feature-card.theme-blue .feature-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
}

.feature-card.theme-blue .feature-badge {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-color: #93c5fd;
}

.feature-card.theme-blue .badge-text {
  color: #1d4ed8;
}

.feature-card.theme-blue:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
}

.feature-card.theme-purple .feature-icon {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
}

.feature-card.theme-purple .feature-badge {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  border-color: #c4b5fd;
}

.feature-card.theme-purple .badge-text {
  color: #7c3aed;
}

.feature-card.theme-purple:hover {
  border-color: #8b5cf6;
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
}

/* Trust Section */
.trust-section {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 24px 0;
}

.trust-grid {
  display: grid;
  gap: 16px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.trust-icon {
  width: 32px;
  height: 32px;
  background: #ecfdf5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  flex-shrink: 0;
}

.trust-text {
  flex: 1;
}

.trust-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.trust-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

/* 工具类 */
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }

/* 响应式设计 - 移动端优先 */
@media (min-width: 640px) {
  .hero-section {
    padding: 32px 24px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .stats-grid {
    gap: 16px;
  }
  
  .stat-item {
    padding: 20px 16px;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
  }
  
  .features-section {
    padding: 48px 0;
  }
  
  .section-title {
    font-size: 1.875rem;
    margin-bottom: 32px;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .feature-desc {
    font-size: 0.875rem;
  }
  
  .trust-section {
    padding: 32px 0;
  }
  
  .trust-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  .trust-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .trust-icon {
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 768px) {
  .hero-section {
    padding: 48px 32px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .stats-grid {
    gap: 20px;
    max-width: 800px;
  }
  
  .stat-item {
    padding: 24px 20px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .features-section {
    padding: 64px 0;
  }
  
  .section-title {
    font-size: 2.25rem;
    margin-bottom: 40px;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .feature-item {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    padding: 64px 40px;
  }
  
  .hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
  }
  
  .hero-text {
    flex: 1;
    text-align: left;
    margin-bottom: 0;
  }
  
  .stats-grid {
    flex-shrink: 0;
    width: 400px;
    margin: 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>

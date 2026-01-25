<template>
  <div class="home-page">
    <!-- Hero Section with Real-time Data -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">多维表格脚本管理</h1>
          <p class="hero-subtitle">让工作更高效，让数据更智能</p>
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
            class="feature-item"
            @click="handleScriptClick(script)"
          >
            <div class="feature-icon">
              <component :is="script.icon" />
            </div>
            <div class="feature-content">
              <h3 class="feature-title">{{ script.name }}</h3>
              <p class="feature-desc">{{ script.description }}</p>
            </div>
            <div class="feature-action">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-grid">
          <div class="trust-item">
            <div class="trust-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div class="trust-text">
              <div class="trust-title">安全可靠</div>
              <div class="trust-desc">企业级安全保障</div>
            </div>
          </div>
          
          <div class="trust-item">
            <div class="trust-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div class="trust-text">
              <div class="trust-title">高效处理</div>
              <div class="trust-desc">平均响应时间 < 2s</div>
            </div>
          </div>
          
          <div class="trust-item">
            <div class="trust-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div class="trust-text">
              <div class="trust-title">用户喜爱</div>
              <div class="trust-desc">98% 满意度评分</div>
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
    name: '🔗 短链接扩展器',
    description: '飞书插件版本，直接使用飞书SDK，无需配置',
    icon: Connection,
    route: '/scripts/url-expander-plugin'
  },
  {
    id: 'test',
    name: '🧪 API测试工具',
    description: '测试各种API接口的功能和响应',
    icon: Setting,
    route: '/test'
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
  background: #f8fafc;
}

/* Hero Section */
.hero-section {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px 16px;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text {
  text-align: center;
  margin-bottom: 32px;
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
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: #f1f5f9;
  border-color: #3b82f6;
  transform: translateY(-2px);
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
  padding: 32px 0;
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
  gap: 12px;
}

.feature-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-item:hover {
  background: #f9fafb;
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
  min-width: 0;
}

.feature-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 2px 0;
  line-height: 1.3;
}

.feature-desc {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.feature-action {
  color: #9ca3af;
  flex-shrink: 0;
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
    gap: 16px;
  }
  
  .feature-item {
    padding: 20px;
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
  }
  
  .feature-title {
    font-size: 1rem;
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

<template>
  <div class="home-page">
    <!-- Header -->
    <header class="header">
      <div class="header-spacer"></div>
      <h1 class="title">脚本管理</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <AppLogo
          size="medium"
          :show-text="true"
          :show-subtitle="true"
          :show-background="false"
          app-name="多维表格脚本管理"
          subtitle="让工作更高效，让数据更智能"
        />
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">核心功能</h2>
          <span class="section-count">{{ scripts.length }} 个工具</span>
        </div>

        <div class="features-grid">
          <div
            v-for="script in scripts"
            :key="script.id"
            class="feature-card"
            :class="`theme-${script.theme}`"
            @click="handleScriptClick(script)"
          >
            <div class="card-header">
              <div class="card-icon">
                <component :is="script.icon" />
              </div>
              <span v-if="script.status" class="card-badge">{{ script.status }}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ script.name }}</h3>
              <p class="card-desc">{{ script.description }}</p>
            </div>
            <div class="card-footer">
              <span class="card-link">
                立即使用
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Connection, Tools } from '@element-plus/icons-vue'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()

const scripts = ref([
  {
    id: 'url-expander-plugin',
    name: '短链接解析器',
    description: '智能解析短链接，支持批量处理和原列替换',
    icon: Connection,
    route: '/scripts/url-expander',
    status: '热门',
    theme: 'blue'
  },
  {
    id: 'config',
    name: '系统配置',
    description: '配置应用程序设置和接口参数',
    icon: Tools,
    route: '/config',
    status: '',
    theme: 'green'
  }
])

function handleScriptClick(script: typeof scripts.value[0]) {
  router.push(script.route)
}
</script>

<style scoped>
/* ===== Layout ===== */
.home-page {
  min-height: 100vh;
  background: var(--fe-gray-50);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--fe-gray-700);
}

.home-page * {
  box-sizing: border-box;
}

/* ===== Header ===== */
.header {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid var(--fe-gray-200);
  position: sticky;
  top: 0;
  z-index: 100;
}

.title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--fe-gray-800);
  text-align: center;
  margin: 0;
}

.header-spacer {
  width: 32px;
}

/* ===== Hero ===== */
.hero {
  padding: 32px 16px;
  background: linear-gradient(135deg, #fff 0%, var(--fe-gray-50) 100%);
  border-bottom: 1px solid var(--fe-gray-200);
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

/* ===== Features ===== */
.features {
  padding: 24px 16px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--fe-gray-800);
  margin: 0;
}

.section-count {
  font-size: 12px;
  color: var(--fe-gray-500);
  background: var(--fe-gray-100);
  padding: 2px 8px;
  border-radius: 9999px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

/* ===== Feature Card ===== */
.feature-card {
  background: #fff;
  border-radius: var(--fe-radius-lg);
  border: 1px solid var(--fe-gray-200);
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.feature-card:hover {
  border-color: var(--fe-gray-300);
  box-shadow: var(--fe-shadow-md);
}

.feature-card.theme-blue:hover {
  border-color: var(--fe-primary);
}

.feature-card.theme-green:hover {
  border-color: var(--fe-success);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--fe-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}

.theme-blue .card-icon {
  background: linear-gradient(135deg, var(--fe-primary), var(--fe-primary-dark));
}

.theme-green .card-icon {
  background: linear-gradient(135deg, var(--fe-success), #059669);
}

.card-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--fe-gray-500);
  background: var(--fe-gray-100);
  padding: 2px 8px;
  border-radius: 9999px;
}

.card-body {
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--fe-gray-800);
  margin: 0 0 4px 0;
}

.card-desc {
  font-size: 12px;
  color: var(--fe-gray-500);
  margin: 0;
  line-height: 1.5;
}

.card-footer {
  border-top: 1px solid var(--fe-gray-100);
  padding-top: 12px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--fe-gray-600);
  transition: all 0.15s ease;
}

.feature-card:hover .card-link {
  color: var(--fe-primary);
}

.feature-card.theme-green:hover .card-link {
  color: var(--fe-success);
}

.card-link svg {
  transition: transform 0.15s ease;
}

.feature-card:hover .card-link svg {
  transform: translateX(2px);
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>

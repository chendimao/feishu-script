<template>
  <div class="layout-container">
    <header class="layout-header">
      <div class="header-gradient"></div>
      <div class="header-content">
        <div class="header-left">
          <div class="logo-container">
            <AppLogo size="medium" />
            <div class="brand-info">
              <span class="brand-name">飞书脚本</span>
              <span class="brand-tagline">智能数据处理</span>
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <div class="status-indicator">
              <div class="status-dot"></div>
              <span class="status-text">已连接</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="layout-main">
      <slot />
    </main>
   
  </div>
</template>

<script setup lang="ts">
// Layout组件
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  height: 64px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  overflow: hidden;
}

.header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%);
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-size: 16px;
  font-weight: 600;
  color: white;
  line-height: 1;
}

.brand-tagline {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  line-height: 1;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.status-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.header-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.layout-main {
  flex: 1;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 0px;
  min-height: calc(100vh - 64px);
}

.layout-footer {
  text-align: center;
  color: #909399;
  font-size: 14px;
  padding: 20px;
}
</style>

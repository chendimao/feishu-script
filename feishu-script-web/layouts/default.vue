<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-content">
        <AppLogo 
          size="small" 
          :show-text="true" 
          :show-subtitle="false"
          :show-background="false"
          :app-name="config.public.appName"
        />
      </div>
    </el-header>
    <el-main class="layout-main">
      <slot />
    </el-main>
   
  </el-container>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  padding: 8px 16px;
  height: 45px;
  line-height: 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

/* Logo样式已移至AppLogo组件 */

.layout-main {
  flex: 1;
  background-color: #f5f7fa;
  padding: 2px;
}

.layout-footer {
  text-align: center;
  color: #909399;
  font-size: 14px;
  padding: 20px;
}
</style>

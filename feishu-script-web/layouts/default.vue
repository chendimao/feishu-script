<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-content">
        <h1 class="app-title">{{ config.public.appName }}</h1>
      </div>
    </el-header>
    <el-main class="layout-main">
      <slot />
    </el-main>
    <el-footer class="layout-footer">
      <p>Powered by Nuxt 3 + Element Plus</p>
    </el-footer>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  height: 40px;
  line-height: 40px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.app-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

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

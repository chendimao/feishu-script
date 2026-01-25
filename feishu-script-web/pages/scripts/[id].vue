<template>
  <div class="script-page">
    <!-- 脚本头部 -->
    <ScriptHeader 
      :title="scriptName"
      description="动态脚本执行页面"
    />

    <div class="page-content">
      <!-- 根据脚本 ID 动态加载组件 -->
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 从路由参数获取脚本 ID
const scriptId = computed(() => route.params.id as string)

// 脚本名称映射
const scriptNames: Record<string, string> = {
  'url-expander': 'URL 短链接扩展器',
  'data-processor': '数据处理器',
  'batch-export': '批量导出工具',
  'custom-script': '自定义脚本'
}

const scriptName = computed(() => scriptNames[scriptId.value] || '脚本执行')
</script>

<style scoped>
.script-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-height: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
</style>

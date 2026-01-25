# 📋 脚本页面布局使用指南

## 🎯 概述

所有脚本页面现在都使用统一的 `ScriptHeader` 组件，提供一致的用户体验和导航功能。

## 🧩 ScriptHeader 组件

### 功能特性
- ✅ **统一的返回按钮** - 一键返回首页
- ✅ **响应式设计** - 适配各种屏幕尺寸
- ✅ **标题和描述** - 清晰的页面信息展示
- ✅ **一致的样式** - 统一的视觉风格

### 使用方法

```vue
<template>
  <div class="your-script-page">
    <!-- 脚本头部 -->
    <ScriptHeader 
      title="🔗 您的脚本标题"
      description="脚本功能描述（可选）"
    />
    
    <!-- 您的脚本内容 -->
    <div class="script-content">
      <!-- 脚本功能实现 -->
    </div>
  </div>
</template>

<script setup lang="ts">
// 您的脚本逻辑
</script>

<style scoped>
.your-script-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.script-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
```

## 📁 已更新的页面

### 1. 短链接解析器 (`/scripts/url-expander-plugin`)
- ✅ 使用 ScriptHeader 组件
- ✅ 标题：🔗 短链接批量解析工具
- ✅ 描述：自动获取当前表格信息，批量将短链接转换为实际链接

### 2. API测试工具 (`/test`)
- ✅ 使用 ScriptHeader 组件
- ✅ 标题：🧪 API测试工具
- ✅ 描述：测试各种API接口的功能和响应

### 3. 动态脚本页面 (`/scripts/[id]`)
- ✅ 使用 ScriptHeader 组件
- ✅ 动态标题：根据脚本ID显示对应名称
- ✅ 描述：动态脚本执行页面

## 🎨 设计规范

### 页面结构
```
┌─────────────────────────────────────┐
│           ScriptHeader              │
│  [返回按钮] 脚本标题                │
│             脚本描述                │
├─────────────────────────────────────┤
│                                     │
│          脚本内容区域               │
│                                     │
└─────────────────────────────────────┘
```

### 样式规范
- **页面背景**：`#f5f7fa`
- **最大宽度**：`1200px`
- **内边距**：`20px`（桌面）/ `16px`（平板）/ `12px`（手机）
- **头部背景**：白色，带底部边框

## 🚀 创建新脚本页面

### 步骤1：创建页面文件
```bash
# 在 pages/scripts/ 目录下创建新文件
touch pages/scripts/your-new-script.vue
```

### 步骤2：使用模板
```vue
<template>
  <div class="your-new-script">
    <!-- 脚本头部 -->
    <ScriptHeader 
      title="🎯 您的新脚本"
      description="脚本功能描述"
    />
    
    <!-- 脚本内容 -->
    <div class="script-content">
      <el-card>
        <template #header>
          <h3>功能区域</h3>
        </template>
        
        <!-- 您的功能实现 -->
        
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面标题
useHead({
  title: '您的新脚本 - 多维表格脚本管理'
})

// 您的脚本逻辑
</script>

<style scoped>
.your-new-script {
  min-height: 100vh;
  background: #f5f7fa;
}

.script-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.script-content .el-card {
  margin-bottom: 20px;
}
</style>
```

### 步骤3：添加到首页
在 `pages/index.vue` 中添加新脚本：

```javascript
const scripts = [
  // 现有脚本...
  {
    id: 'your-new-script',
    name: '🎯 您的新脚本',
    description: '脚本功能描述',
    icon: YourIcon,
    route: '/scripts/your-new-script'
  }
]
```

## 💡 最佳实践

1. **标题规范**：使用emoji + 功能名称
2. **描述简洁**：一句话说明脚本用途
3. **响应式设计**：确保在各种设备上正常显示
4. **一致性**：保持与其他脚本页面的风格一致
5. **可访问性**：确保返回按钮功能正常

## 🔧 自定义选项

### 修改头部样式
如果需要自定义头部样式，可以在 `components/ScriptHeader.vue` 中修改：

```vue
<!-- 在 ScriptHeader.vue 中添加插槽支持 -->
<template>
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
        <h1 class="script-title">{{ title }}</h1>
        <p v-if="description" class="script-description">{{ description }}</p>
        <!-- 自定义插槽 -->
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>
```

### 使用自定义插槽
```vue
<ScriptHeader title="脚本标题" description="描述">
  <template #extra>
    <el-button type="success">自定义按钮</el-button>
  </template>
</ScriptHeader>
```

## 📊 效果展示

现在所有脚本页面都具有：
- 🔙 **统一的返回按钮**
- 📱 **响应式布局**
- 🎨 **一致的视觉风格**
- ⚡ **良好的用户体验**

这样用户在任何脚本页面都能轻松返回首页，提升了整体的导航体验！

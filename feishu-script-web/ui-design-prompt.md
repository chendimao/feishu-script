# 🎨 UI/UX 设计提示词 - 简约漫画风格

## 🎯 设计风格要求

### 核心风格
- **简约 (Minimal)** - 干净、清晰、无冗余元素
- **漫画风格 (Cartoon Style)** - 圆润、友好、有趣的视觉元素
- **紧凑 (Compact)** - 高效利用空间，信息密度适中
- **避免紫色渐变** - 使用其他色彩方案

## 🎨 色彩方案建议

### 方案1：清新蓝绿色系
```css
/* 主色调 */
--primary: #3B82F6;      /* 蓝色 */
--secondary: #10B981;    /* 绿色 */
--accent: #F59E0B;       /* 橙色 */

/* 背景色 */
--bg-primary: #F8FAFC;   /* 浅灰蓝 */
--bg-secondary: #E2E8F0; /* 中灰 */
--bg-card: #FFFFFF;      /* 纯白 */

/* 文字色 */
--text-primary: #1E293B;   /* 深灰 */
--text-secondary: #64748B; /* 中灰 */
--text-muted: #94A3B8;     /* 浅灰 */
```

### 方案2：温暖橙红色系
```css
/* 主色调 */
--primary: #EF4444;      /* 红色 */
--secondary: #F97316;    /* 橙色 */
--accent: #84CC16;       /* 绿色 */

/* 背景色 */
--bg-primary: #FEF2F2;   /* 浅红 */
--bg-secondary: #FEF7ED; /* 浅橙 */
--bg-card: #FFFFFF;      /* 纯白 */
```

### 方案3：现代青色系
```css
/* 主色调 */
--primary: #06B6D4;      /* 青色 */
--secondary: #8B5CF6;    /* 紫罗兰 */
--accent: #F59E0B;       /* 琥珀色 */

/* 背景色 */
--bg-primary: #F0F9FF;   /* 浅青 */
--bg-secondary: #E0F2FE; /* 中青 */
--bg-card: #FFFFFF;      /* 纯白 */
```

## 🧩 设计元素规范

### 圆角设计
```css
/* 漫画风格圆角 */
--radius-sm: 8px;    /* 小元素 */
--radius-md: 16px;   /* 中等元素 */
--radius-lg: 24px;   /* 大卡片 */
--radius-xl: 32px;   /* 容器 */
--radius-full: 50px; /* 按钮/标签 */
```

### 阴影系统
```css
/* 简约阴影 */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
```

### 间距系统
```css
/* 紧凑间距 */
--space-xs: 4px;   /* 极小 */
--space-sm: 8px;   /* 小 */
--space-md: 16px;  /* 中 */
--space-lg: 24px;  /* 大 */
--space-xl: 32px;  /* 极大 */
```

## 🎭 漫画风格元素

### 图标风格
- **线条粗细**: 2-3px stroke-width
- **圆润端点**: stroke-linecap="round"
- **圆润连接**: stroke-linejoin="round"
- **简化形状**: 避免复杂细节

### 插画元素
```html
<!-- 简约装饰气泡 -->
<div class="decoration-bubble">
  <div class="bubble bubble-1"></div>
  <div class="bubble bubble-2"></div>
  <div class="bubble bubble-3"></div>
</div>
```

```css
.bubble {
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.1;
  animation: float 4s ease-in-out infinite;
}
```

### 表情符号使用
- **适度使用**: 仅在标题或重要提示中
- **统一风格**: 选择同一套表情符号
- **避免过度**: 不超过页面元素的10%

## 🚀 组件设计模式

### 按钮设计
```css
.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
```

### 卡片设计
```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}
```

### 输入框设计
```css
.input {
  border: 2px solid var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: var(--bg-card);
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}
```

## 📱 响应式设计

### 断点系统
```css
/* 移动优先 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 紧凑布局原则
- **移动端**: 单列布局，大按钮
- **平板**: 两列布局，适中元素
- **桌面**: 多列布局，紧凑间距

## 🎨 动画效果

### 微动画
```css
/* 悬停效果 */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* 点击效果 */
.click-scale:active {
  transform: scale(0.98);
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 浮动效果 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

### 过渡时间
- **快速**: 0.15s (按钮点击)
- **标准**: 0.2s (悬停效果)
- **慢速**: 0.3s (布局变化)

## 🎯 实际应用示例

### 页面头部
```html
<header class="page-header">
  <button class="back-btn">
    <svg class="icon"><!-- 返回图标 --></svg>
    <span>返回</span>
  </button>
  <div class="header-content">
    <h1 class="page-title">页面标题</h1>
    <p class="page-subtitle">简短描述</p>
  </div>
</header>
```

### 功能卡片
```html
<div class="feature-card">
  <div class="card-icon">
    <svg class="icon"><!-- 功能图标 --></svg>
  </div>
  <h3 class="card-title">功能名称</h3>
  <p class="card-desc">功能描述</p>
  <button class="card-btn">开始使用</button>
</div>
```

## 📋 设计检查清单

### 视觉一致性
- [ ] 统一的圆角半径
- [ ] 一致的颜色使用
- [ ] 统一的字体大小层级
- [ ] 一致的间距系统

### 交互反馈
- [ ] 所有可点击元素有悬停效果
- [ ] 按钮有点击反馈
- [ ] 表单有焦点状态
- [ ] 加载状态有动画

### 响应式适配
- [ ] 移动端友好
- [ ] 触摸目标足够大 (44px+)
- [ ] 文字可读性良好
- [ ] 布局不会破坏

### 可访问性
- [ ] 足够的颜色对比度 (4.5:1)
- [ ] 键盘导航支持
- [ ] 屏幕阅读器友好
- [ ] 焦点指示器清晰

## 🚀 快速启动模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>简约漫画风格页面</title>
  <style>
    :root {
      --primary: #3B82F6;
      --secondary: #10B981;
      --bg-primary: #F8FAFC;
      --bg-card: #FFFFFF;
      --text-primary: #1E293B;
      --radius-md: 16px;
      --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- 您的内容 -->
  </div>
</body>
</html>
```

这个提示词涵盖了简约、漫画风格、紧凑的设计要求，并避免了紫色渐变，提供了多种色彩方案供选择！

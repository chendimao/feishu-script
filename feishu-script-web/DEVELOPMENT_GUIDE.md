# 🚀 开发指南

## 📋 当前开发状态

### ✅ 已完成
- [x] 移除紫色渐变样式，改为简洁现代设计
- [x] 创建新的Logo系统和AppLogo组件
- [x] 配置构建输出目录为dist
- [x] 符合多维表格插件上架规范
- [x] 智能URL替换功能实现

### 🔄 正在进行
- [ ] UI/UX优化和现代化改造
- [ ] 响应式布局改进
- [ ] 用户体验提升

## 🎯 开发原则

### 1. **功能保护** (Function Preservation)
- ❌ **禁止修改**：业务逻辑、API调用、数据处理
- ✅ **允许修改**：CSS样式、布局结构、UI组件
- ⚠️ **谨慎修改**：组件props、事件处理（仅限样式相关）

### 2. **样式优化方向**
- 现代化设计语言
- 提升可读性和对比度
- 优化移动端体验
- 统一视觉风格

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 启动开发服务器（所有网络接口）
npm run dev:ip

# 构建生产版本
npm run build:prod

# 安全构建（如果有问题）
npm run build:safe

# 修复构建问题
./fix-build-issue.bat
```

## 📁 项目结构

```
feishu-script-web/
├── components/
│   ├── AppLogo.vue          # 新增：Logo组件
│   └── ScriptHeader.vue     # 已优化：脚本页面头部
├── layouts/
│   ├── default.vue          # 已优化：默认布局
│   └── script.vue           # 脚本专用布局
├── pages/
│   ├── index.vue            # 已优化：首页
│   ├── test.vue             # 已优化：测试页面
│   └── scripts/
│       ├── url-expander-plugin.vue    # 核心功能：URL扩展器
│       └── url-expander-simple.vue    # 简化版
├── public/
│   ├── logo.svg             # 新增：主Logo
│   └── favicon.svg          # 新增：网站图标
└── nuxt.config.ts           # 已配置：构建和路由设置
```

## 🎨 设计系统

### 色彩规范
```css
/* 主色调 */
--primary: #3b82f6;      /* 蓝色 */
--success: #10b981;      /* 绿色 */
--warning: #f59e0b;      /* 橙色 */
--error: #ef4444;        /* 红色 */

/* 中性色 */
--gray-50: #f8fafc;      /* 背景 */
--gray-100: #f3f4f6;     /* 卡片背景 */
--gray-200: #e5e7eb;     /* 边框 */
--gray-900: #1f2937;     /* 主文字 */
```

### 组件规范
- **按钮**：8px圆角，12px垂直内边距
- **卡片**：12px圆角，轻微阴影
- **输入框**：8px圆角，36px高度
- **间距**：4px基础单位，使用4的倍数

## 🔧 开发注意事项

### 样式修改原则
1. **保持功能完整性**：不修改v-model、@click等功能性属性
2. **渐进式改进**：一次修改一个组件，测试后再继续
3. **移动端优先**：确保在小屏幕上的可用性
4. **无障碍支持**：保持足够的对比度和点击区域

### 测试检查清单
- [ ] 功能是否正常工作
- [ ] 移动端显示是否正确
- [ ] 颜色对比度是否足够
- [ ] 交互反馈是否清晰

## 📱 响应式断点

```css
/* 移动端优先 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## 🚨 紧急修复

如果遇到构建问题，运行：
```bash
./fix-build-issue.bat
```

如果遇到Git推送问题，使用：
```bash
git push origin master
```
（注意不是 gitgit）

---

**记住：我们的目标是让界面更美观、更易用，但绝不能破坏现有功能！**

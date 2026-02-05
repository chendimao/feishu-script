# 前端项目

基于 Vue 3 + Vite + Element Plus 的现代化前端应用。

## 技术栈

- **Vue 3**: 渐进式 JavaScript 框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **Vite**: 快速的前端构建工具
- **Element Plus**: Vue 3 UI 组件库
- **Vue Router 4**: 官方路由管理器
- **Pinia**: Vue 状态管理库
- **Axios**: HTTP 客户端

## 项目结构

```
src/
├── api/           # API 接口定义
├── components/    # 公共组件
├── router/        # 路由配置
├── stores/        # Pinia 状态管理
├── views/         # 页面组件
├── App.vue        # 根组件
└── main.ts        # 入口文件
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 环境变量

创建 `.env` 文件配置环境变量：

```env
VITE_APP_TITLE=飞书脚本管理平台
VITE_API_BASE_URL=http://localhost:3030
VITE_APP_VERSION=1.0.0
VITE_DEV_PORT=5173
```

## 开发说明

- 开发服务器运行在 `http://localhost:5173`
- API 请求通过 `/api` 前缀代理到后端服务器
- 支持热模块替换 (HMR)
- 自动导入 Vue 组合式 API 和 Element Plus 组件

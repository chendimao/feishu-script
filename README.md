# 飞书脚本管理平台

一个基于前后端分离架构的飞书脚本管理平台，支持多种实用工具和脚本功能。

## 项目结构

```
feishuScript/
├── frontend/          # 前端项目 (Vue 3 + Vite + Element Plus)
├── backend/           # 后端项目 (Express + TypeScript)
├── feishu-script-web/ # 原 Nuxt 项目
└── package.json       # 根项目配置
```

## 技术栈

### 前端
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Element Plus
- **路由**: Vue Router 4 (Hash模式)
- **状态管理**: Pinia
- **开发端口**: 5173

### 后端
- **框架**: Express + TypeScript
- **开发工具**: Nodemon + ts-node
- **跨域处理**: CORS
- **环境变量**: dotenv
- **开发端口**: 3030

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖
```bash
# 安装所有依赖
npm run install:all

# 或者分别安装
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 开发模式
```bash
# 同时启动前后端服务
npm run dev

# 或者分别启动
npm run dev:frontend  # 启动前端 (localhost:5173)
npm run dev:backend   # 启动后端 (localhost:3030)
```

### 生产构建
```bash
# 构建所有项目
npm run build

# 或者分别构建
npm run build:frontend
npm run build:backend
```

## 功能特性

- 🔗 **短链接解析器**: 智能解析短链接，支持批量处理
- 🧪 **API测试工具**: 测试各种API接口功能
- 📊 **多维表格脚本**: 飞书多维表格自动化脚本
- 🎨 **现代化UI**: 基于Element Plus的美观界面

## 环境配置

### 前端环境变量 (.env)
```env
VITE_APP_TITLE=飞书脚本管理平台
VITE_API_BASE_URL=http://localhost:3030
VITE_APP_VERSION=1.0.0
VITE_DEV_PORT=5173
```

### 后端环境变量 (.env)
```env
PORT=3030
NODE_ENV=development
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
CORS_ORIGIN=http://localhost:5173
```

## 开发指南

1. **前端开发**: 访问 `http://localhost:5173`
2. **后端API**: 访问 `http://localhost:3030`
3. **API代理**: 前端 `/api` 请求自动代理到后端
4. **热重载**: 前后端都支持代码热重载

## 部署说明

详细部署说明请参考各子项目的文档：
- [前端部署指南](./frontend/README.md)
- [后端部署指南](./backend/README.md)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

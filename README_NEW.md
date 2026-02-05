# 飞书脚本平台 - 迁移完成

## 项目结构

```
feishuScript/
├── backend/                 # Express + TypeScript 后端
│   ├── src/
│   │   ├── app.ts          # Express 应用配置
│   │   ├── server.ts       # 服务入口
│   │   ├── config/         # 配置管理
│   │   ├── middleware/     # 中间件
│   │   ├── routes/         # API 路由
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Vue 3 + Vite 前端
│   ├── src/
│   │   ├── main.ts         # 应用入口
│   │   ├── App.vue         # 根组件
│   │   ├── router/         # 路由配置
│   │   ├── stores/         # Pinia 状态管理
│   │   ├── api/            # API 客户端
│   │   ├── components/     # 组件
│   │   └── views/          # 页面
│   ├── package.json
│   └── vite.config.ts
├── openspec/               # OpenSpec 变更提案
└── package.json            # 根目录工作区配置
```

## 快速开始

### 安装依赖

```bash
npm run install:all
```

### 开发环境

```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:backend   # http://localhost:3030
npm run dev:frontend  # http://localhost:5173
```

### 生产构建

```bash
npm run build
```

## API 端点

- `GET /api/health` - 健康检查
- `GET /api/feishu/fields` - 获取表格字段
- `POST /api/feishu/records` - 获取表格记录
- `POST /api/feishu/records/update` - 批量更新记录
- `POST /api/url-expand/batch` - 批量解析 URL

## 技术栈

- **前端**: Vue 3 + Vite + TypeScript + Element Plus + Pinia
- **后端**: Express + TypeScript
- **部署**: PM2 + Nginx

## 迁移说明

从 Nuxt.js 前后端混合架构迁移到 Vue 3 + Express 前后端分离架构。

详细迁移计划见 `openspec/changes/refactor-nuxt-to-separate/`。

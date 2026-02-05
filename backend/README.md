# 后端项目

基于 Express + TypeScript 的后端 API 服务。

## 技术栈

- **Express**: Node.js Web 框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **Nodemon**: 开发时自动重启服务
- **CORS**: 跨域资源共享中间件
- **dotenv**: 环境变量管理

## 项目结构

```
src/
├── config/        # 配置文件
├── middleware/    # 中间件
├── routes/        # 路由定义
├── services/      # 业务逻辑服务
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
├── app.ts         # Express 应用配置
└── server.ts      # 服务器启动文件
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器 (带热重载)
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 环境变量

复制 `.env.example` 到 `.env` 并配置：

```env
PORT=3030
NODE_ENV=development
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
CORS_ORIGIN=http://localhost:5173
MAX_CONCURRENT=10
TIMEOUT=600000
```

## API 接口

服务器运行在 `http://localhost:3030`

### 主要端点

- `GET /api/health` - 健康检查
- `POST /api/feishu/*` - 飞书相关 API
- `POST /api/url-expander` - 短链接解析

## 开发说明

- 使用 Nodemon 实现代码热重载
- 支持 CORS 跨域请求
- 统一的错误处理中间件
- 结构化的日志输出
- 优雅的服务器关闭处理

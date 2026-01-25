# 🚀 多维表格脚本管理部署指南

## 📋 部署前准备

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- 服务器（Linux/Windows）

### 2. 构建应用
```bash
# 在项目目录中运行
npm install

# 开发环境构建（输出到 .output 目录）
npm run build

# 生产环境构建（输出到 dist 目录）
npm run build:prod
```

- 开发/测试：使用 `npm run build`，输出到 `.output` 目录
- 生产部署：使用 `npm run build:prod`，输出到 `dist` 目录

## 🎯 部署方式

### 方式一：Node.js 服务器部署（推荐）

#### 1. 上传文件到服务器
将以下文件上传到服务器：
```
├── dist/             # 构建产物（必需）
├── package.json      # 依赖信息（必需）
├── ecosystem.config.js # PM2配置（可选）
└── .env             # 环境变量（可选）
```

#### 2. 服务器配置
```bash
# 安装依赖
npm install --production

# 配置环境变量
export NUXT_FEISHU_APP_ID="your_app_id"
export NUXT_FEISHU_APP_SECRET="your_app_secret"
export PORT=3030
```

#### 3. 启动应用

**方式A：直接启动**
```bash
node dist/server/index.mjs
```

**方式B：使用PM2（推荐）**
```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start ecosystem.config.js

# 保存PM2配置
pm2 save
pm2 startup
```

### 方式二：静态部署

如果不需要服务器端功能，可以生成静态文件：

#### 1. 修改配置
使用 `nuxt.config.static.ts` 替换 `nuxt.config.ts`

#### 2. 生成静态文件
```bash
npm run generate
```

#### 3. 部署到静态服务器
将 `dist/public` 目录上传到 Nginx、Apache 或 CDN。

## 🔧 Nginx 反向代理配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 环境变量配置

创建 `.env` 文件：
```env
# 飞书应用配置
NUXT_FEISHU_APP_ID=cli_xxxxxxxxx
NUXT_FEISHU_APP_SECRET=xxxxxxxxx

# 服务器配置
PORT=3030
NODE_ENV=production

# 其他配置
NUXT_PUBLIC_APP_NAME=多维表格脚本管理
```

## 🏥 健康检查

部署完成后，访问以下URL检查状态：
- `http://your-domain.com/` - 主页
- `http://your-domain.com/api/health` - API健康检查

健康检查返回示例：
```json
{
  "status": "ok",
  "timestamp": "2024-01-24T11:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "config": {
    "appName": "多维表格脚本管理",
    "hasFeishuConfig": true
  }
}
```

## 📊 监控和日志

### PM2 日志查看
```bash
# 查看日志
pm2 logs feishu-script

# 实时日志
pm2 logs feishu-script --lines 100 -f

# 重启应用
pm2 restart feishu-script

# 查看状态
pm2 status
```

### 日志文件位置
- 错误日志：`./logs/err.log`
- 输出日志：`./logs/out.log`
- 合并日志：`./logs/combined.log`

## 🔧 常见问题

### 1. 端口被占用
```bash
# 查看端口占用
netstat -tulpn | grep :3030

# 杀死进程
kill -9 <PID>
```

### 2. 权限问题
```bash
# 给脚本执行权限
chmod +x start.sh

# 修改文件所有者
chown -R www-data:www-data /path/to/app
```

### 3. 内存不足
在 `ecosystem.config.js` 中调整内存限制：
```javascript
{
  max_memory_restart: '2G'  // 增加内存限制
}
```

## 🚀 快速部署脚本

运行自动部署脚本：
```bash
node deploy.js
```

这会自动：
- 构建应用
- 生成配置文件
- 创建部署说明

## 📞 技术支持

如果遇到部署问题，请检查：
1. Node.js 版本是否正确
2. 环境变量是否配置
3. 端口是否可用
4. 防火墙设置
5. 日志文件中的错误信息

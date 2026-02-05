# 部署配置

## 环境变量配置

### 后端 (.env)
```
PORT=3030
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
CORS_ORIGIN=*
```

### 前端 (.env)
```
VITE_API_BASE_URL=/api
```

## PM2 配置

创建 `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'feishu-script-backend',
      cwd: './backend',
      script: 'dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3030
      }
    }
  ]
}
```

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态资源
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
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

## 部署步骤

1. 构建前端:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. 构建后端:
   ```bash
   cd backend
   npm install
   npm run build
   ```

3. 使用 PM2 启动后端:
   ```bash
   cd backend
   pm2 start ecosystem.config.js
   ```

4. 配置 Nginx 指向 frontend/dist

## 开发环境启动

```bash
# 终端 1 - 启动后端
cd backend
npm run dev

# 终端 2 - 启动前端
cd frontend
npm run dev
```

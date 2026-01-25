#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始部署多维表格脚本管理...\n');

// 1. 构建应用
console.log('📦 构建应用...');
try {
  execSync('npm run build:prod', { stdio: 'inherit' });
  console.log('✅ 构建完成\n');
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

// 2. 检查构建产物
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  console.error('❌ 构建产物不存在');
  process.exit(1);
}

console.log('📁 构建产物结构:');
console.log('├── dist/');
console.log('│   ├── server/');
console.log('│   │   └── index.mjs (服务器入口)');
console.log('│   └── public/ (静态资源)');
console.log('├── package.json');
console.log('└── nuxt.config.ts\n');

// 3. 生成部署说明
const deployInstructions = `
# 🚀 部署说明

## Node.js 服务器部署

### 1. 上传文件到服务器
将以下文件/目录上传到服务器:
- dist/ (整个目录)
- package.json
- nuxt.config.ts (可选)

### 2. 服务器上安装依赖
\`\`\`bash
npm install --production
\`\`\`

### 3. 启动应用
\`\`\`bash
# 方式1: 直接启动
node dist/server/index.mjs

# 方式2: 使用PM2 (推荐)
npm install -g pm2
pm2 start dist/server/index.mjs --name "feishu-script"
pm2 save
pm2 startup
\`\`\`

### 4. 配置反向代理 (Nginx)
\`\`\`nginx
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
\`\`\`

## 环境变量配置

在服务器上设置以下环境变量:
\`\`\`bash
export NUXT_FEISHU_APP_ID="your_app_id"
export NUXT_FEISHU_APP_SECRET="your_app_secret"
\`\`\`

或创建 .env 文件:
\`\`\`
NUXT_FEISHU_APP_ID=your_app_id
NUXT_FEISHU_APP_SECRET=your_app_secret
\`\`\`

## 健康检查

应用启动后，访问以下URL检查状态:
- http://localhost:3030 (主页)
- http://localhost:3030/api/health (API健康检查)

## 日志查看

\`\`\`bash
# PM2 日志
pm2 logs feishu-script

# 实时日志
pm2 logs feishu-script --lines 100 -f
\`\`\`
`;

fs.writeFileSync(path.join(__dirname, 'DEPLOY.md'), deployInstructions);
console.log('📝 部署说明已生成: DEPLOY.md\n');

// 4. 生成启动脚本
const startScript = `#!/bin/bash

# 多维表格脚本管理启动脚本

echo "🚀 启动多维表格脚本管理..."

# 检查Node.js版本
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 检查环境变量
if [ -z "$NUXT_FEISHU_APP_ID" ]; then
    echo "⚠️  警告: NUXT_FEISHU_APP_ID 环境变量未设置"
fi

if [ -z "$NUXT_FEISHU_APP_SECRET" ]; then
    echo "⚠️  警告: NUXT_FEISHU_APP_SECRET 环境变量未设置"
fi

# 启动应用
echo "🎯 启动应用..."
node dist/server/index.mjs
`;

fs.writeFileSync(path.join(__dirname, 'start.sh'), startScript);
console.log('📝 启动脚本已生成: start.sh\n');

// 5. 生成PM2配置
const pm2Config = {
  apps: [{
    name: 'feishu-script',
    script: 'dist/server/index.mjs',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3030
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};

fs.writeFileSync(path.join(__dirname, 'ecosystem.config.js'), 
  `module.exports = ${JSON.stringify(pm2Config, null, 2)};`);
console.log('📝 PM2配置已生成: ecosystem.config.js\n');

console.log('✅ 部署准备完成!');
console.log('\n📋 下一步:');
console.log('1. 阅读 DEPLOY.md 了解详细部署步骤');
console.log('2. 将 .output/ 目录和相关文件上传到服务器');
console.log('3. 在服务器上运行: npm install --production');
console.log('4. 配置环境变量');
console.log('5. 启动应用: pm2 start ecosystem.config.js');

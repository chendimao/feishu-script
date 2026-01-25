#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 创建部署包...\n');

// 1. 检查构建产物
if (!fs.existsSync('.output')) {
  console.log('❌ 构建产物不存在，正在构建...');
  execSync('npm run build', { stdio: 'inherit' });
}

// 2. 创建部署目录
const deployDir = 'deploy-package';
if (fs.existsSync(deployDir)) {
  console.log('🗑️  清理旧的部署包...');
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir);

// 3. 复制必需文件（.output目录已包含所需文件）
const filesToCopy = [
  { src: '.output', dest: '.output', type: 'dir' },
  { src: 'feishu-script.service', dest: 'feishu-script.service', type: 'file' }
];

console.log('📁 复制文件到部署包...');
filesToCopy.forEach(item => {
  const srcPath = path.join(__dirname, item.src);
  const destPath = path.join(__dirname, deployDir, item.dest);
  
  if (fs.existsSync(srcPath)) {
    if (item.type === 'dir') {
      fs.cpSync(srcPath, destPath, { recursive: true });
      console.log(`✅ 复制目录: ${item.src}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ 复制文件: ${item.src}`);
    }
  } else {
    console.log(`⚠️  文件不存在，跳过: ${item.src}`);
  }
});

// 4. 创建部署说明
const deployInstructions = `# 🚀 部署说明

## 服务器部署步骤

### 1. 上传文件
将此目录下的所有文件上传到服务器

### 2. 安装依赖
\`\`\`bash
npm install --production
\`\`\`

### 3. 配置环境变量
编辑 .env 文件，设置：
- NUXT_FEISHU_APP_ID=your_app_id
- NUXT_FEISHU_APP_SECRET=your_app_secret

### 4. 启动应用

#### 方式1: 直接启动
\`\`\`bash
node .output/server/index.mjs
\`\`\`

#### 方式2: 使用PM2（推荐）
\`\`\`bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start ecosystem.config.cjs

# 设置开机自启
pm2 save
pm2 startup
\`\`\`

### 5. 访问应用
- 本地: http://localhost:3030
- IP访问: http://服务器IP:3030

## 文件说明
- .output/ - 应用构建产物
- package.json - 依赖配置
- ecosystem.config.js - PM2配置
- .env - 环境变量
- start-with-ip.js - IP访问启动脚本
- feishu-script.service - Linux系统服务配置

## 故障排除
- 检查端口3030是否被占用
- 确保防火墙允许3030端口
- 查看PM2日志: pm2 logs feishu-script
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOY_README.md'), deployInstructions);
console.log('✅ 创建部署说明: DEPLOY_README.md');

// 5. 显示部署包信息
console.log('\n📊 部署包信息:');
const stats = fs.statSync(path.join(deployDir, '.output'));
console.log(`📁 部署包位置: ${path.resolve(deployDir)}`);
console.log(`📦 包含文件: ${fs.readdirSync(deployDir).length} 个`);

console.log('\n🎯 下一步:');
console.log('1. 将 deploy-package/ 目录上传到服务器');
console.log('2. 在服务器上运行: npm install --production');
console.log('3. 配置环境变量并启动应用');
console.log('\n✅ 部署包创建完成!');

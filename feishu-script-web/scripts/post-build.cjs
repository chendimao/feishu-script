#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📦 构建后处理：复制部署文件...');

// 获取项目根目录
const projectRoot = path.dirname(__dirname);

// 确保 dist 目录存在
const outputDir = path.join(projectRoot, 'dist');
if (!fs.existsSync(outputDir)) {
  console.log('❌ dist 目录不存在，请先运行构建');
  process.exit(1);
}

// 需要复制的文件列表
const filesToCopy = [
  {
    src: path.join(projectRoot, '.env.production'),
    dest: path.join(outputDir, '.env'),
    description: '生产环境变量'
  },
  {
    src: path.join(projectRoot, 'package.json'),
    dest: path.join(outputDir, 'package.json'),
    description: '项目依赖信息'
  },
  {
    src: path.join(projectRoot, 'ecosystem.config.cjs'),
    dest: path.join(outputDir, 'ecosystem.config.cjs'),
    description: 'PM2配置文件'
  },
  {
    src: path.join(projectRoot, 'ecosystem.config.dev-prod.cjs'),
    dest: path.join(outputDir, 'ecosystem.config.dev-prod.cjs'),
    description: 'PM2开发生产配置'
  },
  {
    src: path.join(projectRoot, 'start-with-ip.js'),
    dest: path.join(outputDir, 'start-with-ip.js'),
    description: 'IP启动脚本'
  },
  {
    src: path.join(projectRoot, 'start-windows.bat'),
    dest: path.join(outputDir, 'start-windows.bat'),
    description: 'Windows启动脚本'
  }
];

let successCount = 0;
let totalCount = filesToCopy.length;

console.log(`\n📋 准备复制 ${totalCount} 个文件:\n`);

filesToCopy.forEach(({ src, dest, description }) => {
  try {
    if (fs.existsSync(src)) {
      // 确保目标目录存在
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // 复制文件
      fs.copyFileSync(src, dest);
      console.log(`✅ ${description}: ${path.basename(src)} → ${path.basename(dest)}`);
      successCount++;
    } else {
      console.log(`⚠️  ${description}: ${path.basename(src)} (文件不存在，跳过)`);
    }
  } catch (error) {
    console.log(`❌ ${description}: ${path.basename(src)} - ${error.message}`);
  }
});

console.log(`\n📊 复制完成: ${successCount}/${totalCount} 个文件`);

// 创建部署说明文件
const deployReadme = `# 🚀 部署说明

## 📦 构建产物说明
此目录包含完整的生产部署文件：

### 核心文件
- \`server/index.mjs\` - 服务器入口文件
- \`public/\` - 静态资源文件

### 配置文件
- \`.env\` - 环境变量配置
- \`package.json\` - 依赖信息
- \`ecosystem.config.cjs\` - PM2配置

### 部署步骤

#### Windows系统:
1. 双击运行 \`start-windows.bat\` 启动脚本
2. 或者使用命令行:
   - 直接启动: \`npm start\`
   - PM2启动: \`npm run start:pm2\`

#### Linux/Mac系统:
1. 安装依赖: \`npm install --production\`
2. 配置环境变量: \`nano .env\`
3. 启动服务: \`pm2 start ecosystem.config.cjs\`

### 访问地址
- 本地: http://localhost:3030
- 服务器: http://服务器IP:3030

构建时间: ${new Date().toLocaleString('zh-CN')}
`;

// 创建简化的package.json用于dist目录
const outputPackageJson = {
  "name": "feishu-script-output",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "PORT=3030 node server/index.mjs",
    "start:pm2": "pm2 start ecosystem.config.cjs",
    "stop:pm2": "pm2 stop feishu-script",
    "logs:pm2": "pm2 logs feishu-script",
    "status:pm2": "pm2 status"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

try {
  // 更新dist目录的package.json
  const outputPackagePath = path.join(outputDir, 'package.json');
  const existingPackage = JSON.parse(fs.readFileSync(outputPackagePath, 'utf8'));
  const mergedPackage = { ...existingPackage, scripts: outputPackageJson.scripts };
  fs.writeFileSync(outputPackagePath, JSON.stringify(mergedPackage, null, 2));
  console.log('✅ 更新package.json脚本');
} catch (error) {
  console.log(`❌ 更新package.json失败: ${error.message}`);
}

try {
  fs.writeFileSync(path.join(outputDir, 'DEPLOY_README.md'), deployReadme);
  console.log('✅ 创建部署说明: DEPLOY_README.md');
} catch (error) {
  console.log(`❌ 创建部署说明失败: ${error.message}`);
}

console.log('\n🎉 构建后处理完成！');
console.log(`📁 部署文件位置: ${path.resolve(outputDir)}`);

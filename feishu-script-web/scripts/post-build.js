#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

console.log('📦 构建后处理：复制部署文件...');

// 确保 .output 目录存在
const outputDir = path.join(projectRoot, '.output');
if (!fs.existsSync(outputDir)) {
  console.log('❌ .output 目录不存在，请先运行构建');
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
      console.log(`✅ ${description}: ${src} → ${dest}`);
      successCount++;
    } else {
      console.log(`⚠️  ${description}: ${src} (文件不存在，跳过)`);
    }
  } catch (error) {
    console.log(`❌ ${description}: ${src} - ${error.message}`);
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
1. 上传整个 .output 目录到服务器
2. 安装依赖: \`npm install --production\`
3. 配置环境变量: \`nano .env\`
4. 启动服务: \`pm2 start ecosystem.config.cjs\`

### 访问地址
- 本地: http://localhost:3030
- 服务器: http://服务器IP:3030

构建时间: ${new Date().toLocaleString('zh-CN')}
`;

try {
  fs.writeFileSync(path.join(outputDir, 'DEPLOY_README.md'), deployReadme);
  console.log('✅ 创建部署说明: DEPLOY_README.md');
} catch (error) {
  console.log(`❌ 创建部署说明失败: ${error.message}`);
}

console.log('\n🎉 构建后处理完成！');
console.log(`📁 部署文件位置: ${path.resolve(outputDir)}`);

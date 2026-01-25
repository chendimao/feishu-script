#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 一键构建和打包...');

try {
  // 1. 清理旧的构建产物
  console.log('\n🧹 清理旧的构建产物...');
  if (fs.existsSync('.output')) {
    fs.rmSync('.output', { recursive: true });
    console.log('✅ 清理完成');
  }

  // 2. 执行构建
  console.log('\n🔨 开始构建项目...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建完成');

  // 3. 创建部署包
  console.log('\n📦 创建部署包...');
  execSync('npm run package', { stdio: 'inherit' });
  console.log('✅ 部署包创建完成');

  console.log('\n🎉 构建和打包完成！');
  console.log('📁 部署文件位置:');
  console.log('  - .output/ (完整构建产物)');
  console.log('  - deploy-package/ (部署包)');

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

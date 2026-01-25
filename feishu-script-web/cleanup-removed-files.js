#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🧹 清理已移除的文件...');

// 需要删除的文件列表
const filesToRemove = [
  'pages/scripts/url-expander-simple.vue',
  'pages/scripts/url-expander.vue'
];

let removedCount = 0;

filesToRemove.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ 删除: ${filePath}`);
      removedCount++;
    } else {
      console.log(`⚠️  文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ 删除失败: ${filePath} - ${error.message}`);
  }
});

// 删除备份文件
const backupFiles = [
  'pages/scripts/url-expander-simple.vue.bak',
  'pages/scripts/url-expander.vue.bak'
];

backupFiles.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ 删除备份: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ 删除备份失败: ${filePath} - ${error.message}`);
  }
});

console.log(`\n📊 清理完成: 删除了 ${removedCount} 个文件`);
console.log('\n🎉 短链接解析器简化版和完整版已成功移除！');
console.log('💡 现在只保留插件版本，提供更好的用户体验。');

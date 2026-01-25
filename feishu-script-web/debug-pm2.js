#!/usr/bin/env node

// 测试PM2环境变量传递
console.log('🔍 PM2环境变量调试:');
console.log('当前工作目录:', process.cwd());
console.log('脚本路径:', __filename);

console.log('\n📋 所有环境变量:');
Object.keys(process.env)
  .filter(key => key.includes('PORT') || key.includes('HOST') || key.includes('NODE') || key.includes('NITRO'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
  });

console.log('\n🎯 关键环境变量:');
console.log('NODE_ENV:', process.env.NODE_ENV || '未设置');
console.log('PORT:', process.env.PORT || '未设置');
console.log('HOST:', process.env.HOST || '未设置');
console.log('NITRO_PORT:', process.env.NITRO_PORT || '未设置');

console.log('\n⚡ PM2相关环境变量:');
console.log('PM2_HOME:', process.env.PM2_HOME || '未设置');
console.log('PM2_JSON_PROCESSING:', process.env.PM2_JSON_PROCESSING || '未设置');

// 启动一个简单的HTTP服务器测试端口
const http = require('http');
const port = process.env.NITRO_PORT || process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`🚀 服务器运行在端口 ${port}\n环境: ${process.env.NODE_ENV || 'development'}`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`\n🌐 测试服务器启动成功!`);
  console.log(`📍 访问地址: http://localhost:${port}`);
  console.log(`🔧 实际监听端口: ${server.address().port}`);
});

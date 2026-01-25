const Service = require('node-windows').Service;
const path = require('path');

// 创建服务对象
const svc = new Service({
  name: 'FeishuScriptPlatform',
  description: '飞书脚本管理平台',
  script: path.join(__dirname, '.output', 'server', 'index.mjs'),
  env: [
    {
      name: "NODE_ENV",
      value: "production"
    },
    {
      name: "HOST", 
      value: "0.0.0.0"
    },
    {
      name: "PORT",
      value: "3030"
    }
  ]
});

// 监听安装事件
svc.on('install', function() {
  console.log('✅ 服务安装成功！');
  console.log('🚀 正在启动服务...');
  svc.start();
});

svc.on('start', function() {
  console.log('✅ 服务启动成功！');
  console.log('📡 访问地址: http://localhost:3030');
});

// 安装服务
console.log('📦 正在安装服务...');
svc.install();

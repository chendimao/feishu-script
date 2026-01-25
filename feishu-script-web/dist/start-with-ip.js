#!/usr/bin/env node

const { spawn } = require('child_process');
const os = require('os');

// 获取本机IP地址
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();
const port = process.env.PORT || 3030;

console.log('🚀 启动多维表格脚本管理...\n');
console.log('📡 访问地址:');
console.log(`   本地访问: http://localhost:${port}`);
console.log(`   IP访问:   http://${localIP}:${port}`);
console.log(`   局域网:   http://${localIP}:${port}\n`);

// 设置环境变量
process.env.HOST = '0.0.0.0';
process.env.PORT = port;

// 启动服务器
const server = spawn('node', ['dist/server/index.mjs'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    HOST: '0.0.0.0',
    PORT: port
  }
});

server.on('error', (err) => {
  console.error('❌ 启动失败:', err);
});

server.on('close', (code) => {
  console.log(`\n🔴 服务器已停止 (退出码: ${code})`);
});

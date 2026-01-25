#!/bin/bash

echo "🔧 修复PM2环境变量问题..."

echo "📊 1. 当前PM2状态:"
pm2 status

echo -e "\n🛑 2. 停止并删除所有进程:"
pm2 stop all
pm2 delete all

echo -e "\n🧹 3. 杀死PM2守护进程:"
pm2 kill

echo -e "\n📋 4. 测试环境变量传递:"
echo "启动测试服务..."
pm2 start ecosystem.test.cjs

echo -e "\n⏱️  等待3秒..."
sleep 3

echo -e "\n📊 查看测试进程状态:"
pm2 status

echo -e "\n📋 查看测试日志:"
pm2 logs port-test --lines 10

echo -e "\n🌐 测试访问:"
curl -s http://localhost:3030 || echo "无法访问测试服务"

echo -e "\n🛑 停止测试进程:"
pm2 stop port-test
pm2 delete port-test

echo -e "\n🚀 启动正式服务:"
cd .output
pm2 start ecosystem.config.cjs

echo -e "\n📊 查看正式服务状态:"
pm2 status

echo -e "\n📋 查看正式服务日志:"
pm2 logs feishu-script --lines 10

echo -e "\n✅ 修复完成!"
echo "🌐 如果服务正常启动，访问: http://localhost:3030"

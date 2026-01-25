#!/bin/bash

echo "🔍 检查上游服务器认证问题..."

echo "📊 检查Node.js应用状态:"
pm2 status

echo -e "\n📋 检查PM2日志 (最近20行):"
pm2 logs feishu-script --lines 20 --nostream

echo -e "\n🌐 直接测试Node.js应用:"
echo "测试健康检查接口:"
curl -v http://192.168.5.31:3030/api/health 2>&1 | head -20

echo -e "\n测试主页:"
curl -I http://192.168.5.31:3030 2>&1 | head -10

echo -e "\n🔍 检查应用是否设置了认证中间件:"
echo "搜索认证相关代码:"
find /path/to/app -name "*.js" -o -name "*.ts" | xargs grep -l "auth\|Auth\|authenticate" 2>/dev/null | head -5 || echo "未发现认证代码"

echo -e "\n📡 检查网络连接:"
echo "从Nginx服务器到Node.js应用的连接:"
telnet 192.168.5.31 3030 < /dev/null 2>&1 | head -5

echo -e "\n🔧 检查防火墙规则:"
iptables -L | grep -E "3030|5003|5013" || echo "未发现相关防火墙规则"

echo -e "\n✅ 检查完成"

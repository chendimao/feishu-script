#!/bin/bash

echo "🔧 修复构建版本的认证问题..."

echo "📊 1. 重新构建项目:"
npm run build

echo -e "\n🔍 2. 检查构建产物:"
if [ -f ".output/server/index.mjs" ]; then
    echo "✅ 构建成功"
    
    echo "🔍 搜索认证相关代码:"
    grep -n "auth\|Auth\|401\|WWW-Authenticate" .output/server/index.mjs || echo "未发现认证代码"
    
else
    echo "❌ 构建失败"
    exit 1
fi

echo -e "\n🔧 3. 停止当前PM2进程:"
pm2 stop feishu-script 2>/dev/null || echo "进程未运行"
pm2 delete feishu-script 2>/dev/null || echo "进程不存在"

echo -e "\n🚀 4. 启动修复后的服务:"
pm2 start ecosystem.config.cjs

echo -e "\n📊 5. 检查服务状态:"
sleep 3
pm2 status

echo -e "\n🌐 6. 测试访问:"
curl -I http://localhost:3030 2>/dev/null | head -5

echo -e "\n✅ 修复完成"

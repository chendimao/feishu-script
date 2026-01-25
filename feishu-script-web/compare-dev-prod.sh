#!/bin/bash

echo "🔍 对比开发环境和生产环境..."

echo "📊 1. 检查当前运行的进程:"
echo "开发环境进程 (nuxt dev):"
ps aux | grep "nuxt dev" | grep -v grep || echo "未运行开发环境"

echo -e "\n生产环境进程 (PM2):"
pm2 list

echo -e "\n📡 2. 测试开发环境 (如果运行中):"
curl -I http://localhost:3030 2>/dev/null | head -5 || echo "开发环境未响应"

echo -e "\n📡 3. 测试生产环境:"
curl -I http://192.168.5.31:3030 2>/dev/null | head -5 || echo "生产环境未响应"

echo -e "\n🔍 4. 检查构建产物:"
if [ -d ".output" ]; then
    echo "✅ .output 目录存在"
    echo "📄 .output 目录结构:"
    find .output -name "*.mjs" -o -name "*.js" | head -10
    
    echo -e "\n🔍 搜索构建产物中的认证相关代码:"
    find .output -name "*.mjs" -o -name "*.js" | xargs grep -l "auth\|Auth\|401\|WWW-Authenticate" 2>/dev/null | head -5 || echo "未发现认证相关代码"
else
    echo "❌ .output 目录不存在，请先构建项目"
fi

echo -e "\n🔧 5. 检查环境变量差异:"
echo "开发环境变量 (从 .env):"
cat .env 2>/dev/null | grep -v "^#" | grep -v "^$" || echo "无 .env 文件"

echo -e "\n生产环境变量 (从 PM2):"
pm2 show feishu-script 2>/dev/null | grep -A 20 "env:" || echo "PM2 进程不存在"

echo -e "\n🔍 6. 检查 Nitro 配置差异:"
echo "开发模式 Nitro 配置:"
grep -A 10 "nitro:" nuxt.config.ts || echo "未找到 nitro 配置"

echo -e "\n生产模式 Nitro 配置:"
if [ -f "nuxt.config.prod.ts" ]; then
    grep -A 10 "nitro:" nuxt.config.prod.ts || echo "未找到生产环境 nitro 配置"
else
    echo "无生产环境专用配置"
fi

echo -e "\n✅ 对比完成"

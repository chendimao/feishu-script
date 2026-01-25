#!/bin/bash

echo "🔍 检查认证问题..."

# 1. 检查端口5003上运行的进程
echo "📊 检查端口5003:"
netstat -tulpn | grep :5003 || echo "端口5003未被占用"

# 2. 检查PM2进程状态
echo "📊 PM2进程状态:"
pm2 list

# 3. 检查Nginx配置
echo "📊 检查Nginx配置:"
if [ -f /etc/nginx/sites-enabled/feishu-script ]; then
    echo "发现Nginx配置文件"
    grep -n "auth" /etc/nginx/sites-enabled/feishu-script || echo "未发现认证配置"
else
    echo "未发现Nginx配置文件"
fi

# 4. 测试直接访问
echo "🌐 测试直接访问:"
curl -I http://localhost:3030 2>/dev/null || echo "HTTP访问失败"
curl -I -k https://localhost:5003 2>/dev/null || echo "HTTPS访问失败"

# 5. 检查SSL证书
echo "🔒 检查SSL证书:"
if [ -f ssl/cert.pem ]; then
    openssl x509 -in ssl/cert.pem -text -noout | grep "Subject:"
else
    echo "未发现SSL证书"
fi

echo "✅ 检查完成"

#!/bin/bash

echo "🔍 检查Nginx认证配置..."

PROXY_DIR="/www/sites/chendimao.com:5003/proxy"
NGINX_CONF="/etc/nginx/sites-enabled"

echo "📁 检查proxy目录: $PROXY_DIR"
if [ -d "$PROXY_DIR" ]; then
    echo "✅ Proxy目录存在"
    echo "📄 目录内容:"
    ls -la "$PROXY_DIR"
    
    echo -e "\n🔍 搜索认证配置:"
    find "$PROXY_DIR" -name "*.conf" -exec grep -l "auth_basic\|htpasswd\|Authorization" {} \; 2>/dev/null || echo "未发现认证配置"
    
    echo -e "\n📖 显示所有配置文件内容:"
    for conf in "$PROXY_DIR"/*.conf; do
        if [ -f "$conf" ]; then
            echo "=== $conf ==="
            cat "$conf"
            echo ""
        fi
    done
else
    echo "❌ Proxy目录不存在: $PROXY_DIR"
fi

echo -e "\n🌐 测试访问:"
echo "1. 直接测试上游服务器:"
curl -I http://192.168.5.31:3030 2>/dev/null | head -10

echo -e "\n2. HTTP测试 (应该重定向到HTTPS):"
curl -I http://aiti.xin:5013 2>/dev/null | head -10

echo -e "\n3. HTTPS测试:"
curl -I -k https://aiti.xin:5003 2>/dev/null | head -10

echo -e "\n4. 详细HTTPS测试 (显示认证头):"
curl -v -k https://aiti.xin:5003 2>&1 | grep -E "WWW-Authenticate|Authorization|401|403" || echo "未发现认证相关响应"

echo -e "\n🔒 检查SSL证书:"
openssl x509 -in /www/sites/chendimao.com:5003/ssl/fullchain.pem -text -noout | grep "Subject:" 2>/dev/null || echo "无法读取证书"

echo -e "\n📊 检查端口监听:"
netstat -tulpn | grep -E ":5003|:5013|:3030"

echo -e "\n✅ 检查完成"

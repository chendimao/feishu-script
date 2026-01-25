#!/bin/bash

echo "🔒 使用Let's Encrypt配置免费HTTPS证书..."

# 安装certbot
if ! command -v certbot &> /dev/null; then
    echo "📦 安装certbot..."
    # Ubuntu/Debian
    sudo apt update
    sudo apt install certbot python3-certbot-nginx -y
    
    # CentOS/RHEL
    # sudo yum install certbot python3-certbot-nginx -y
fi

# 获取证书
echo "🎯 为域名 aiti.xin 申请证书..."
sudo certbot --nginx -d aiti.xin

echo "✅ 证书配置完成！"
echo "🔄 证书将自动续期"

# 测试自动续期
sudo certbot renew --dry-run

echo "📋 下一步："
echo "1. 确保防火墙开放443端口"
echo "2. 重启Nginx: sudo systemctl restart nginx"
echo "3. 访问: https://aiti.xin"

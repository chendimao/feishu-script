#!/bin/bash

echo "🔒 配置HTTPS证书..."

# 创建证书目录
mkdir -p ssl

# 生成自签名证书（用于测试）
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=CN/ST=State/L=City/O=Organization/CN=aiti.xin"

echo "✅ 证书生成完成"
echo "📁 证书位置: ssl/cert.pem, ssl/key.pem"

# 设置权限
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem

echo "🚀 现在可以启动HTTPS服务器"

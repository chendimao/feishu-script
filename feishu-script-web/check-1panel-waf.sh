#!/bin/bash

echo "🔍 检查1Panel WAF配置..."

WAF_CONF="/usr/local/openresty/1pwaf/data/conf/waf.conf"
WAF_DIR="/usr/local/openresty/1pwaf/data/conf"

echo "📁 检查WAF配置文件: $WAF_CONF"
if [ -f "$WAF_CONF" ]; then
    echo "✅ WAF配置文件存在"
    echo "📖 WAF配置内容:"
    cat "$WAF_CONF"
    echo ""
    
    echo "🔍 搜索认证相关配置:"
    grep -n "auth_basic\|htpasswd\|Authorization\|auth_request" "$WAF_CONF" 2>/dev/null || echo "未在主WAF配置中发现认证"
    
else
    echo "❌ WAF配置文件不存在: $WAF_CONF"
fi

echo -e "\n📁 检查WAF目录: $WAF_DIR"
if [ -d "$WAF_DIR" ]; then
    echo "✅ WAF目录存在"
    echo "📄 目录内容:"
    ls -la "$WAF_DIR"
    
    echo -e "\n🔍 搜索所有WAF配置文件中的认证:"
    find "$WAF_DIR" -name "*.conf" -exec grep -l "auth_basic\|htpasswd\|Authorization" {} \; 2>/dev/null || echo "未发现认证配置"
    
    echo -e "\n📖 显示包含认证的配置文件:"
    find "$WAF_DIR" -name "*.conf" -exec grep -H "auth_basic\|htpasswd\|Authorization" {} \; 2>/dev/null || echo "无认证配置"
    
else
    echo "❌ WAF目录不存在: $WAF_DIR"
fi

echo -e "\n🔍 检查1Panel相关进程:"
ps aux | grep -E "1panel|waf" | grep -v grep || echo "未发现1Panel相关进程"

echo -e "\n📊 检查1Panel服务状态:"
systemctl status 1panel 2>/dev/null || echo "1Panel服务未运行或不存在"

echo -e "\n🌐 检查是否有1Panel管理界面:"
netstat -tulpn | grep -E ":10086|:8888|:9999" || echo "未发现常见的1Panel管理端口"

echo -e "\n✅ 检查完成"

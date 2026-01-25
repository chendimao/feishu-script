#!/bin/bash

echo "⚠️  临时禁用1Panel WAF..."

NGINX_CONF="/usr/local/openresty/nginx/conf/nginx.conf"
WAF_LINE="include /usr/local/openresty/1pwaf/data/conf/waf.conf;"

echo "📋 备份Nginx配置:"
cp "$NGINX_CONF" "$NGINX_CONF.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 注释WAF配置行:"
sed -i "s|$WAF_LINE|# $WAF_LINE|g" "$NGINX_CONF"

echo "✅ 检查修改结果:"
grep -n "waf.conf" "$NGINX_CONF"

echo "🧪 测试Nginx配置:"
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ 配置测试通过"
    echo "🔄 重启Nginx:"
    systemctl restart nginx
    echo "✅ WAF已临时禁用"
    echo ""
    echo "⚠️  注意：这只是临时解决方案！"
    echo "📋 要恢复WAF，请运行："
    echo "   cp $NGINX_CONF.backup.* $NGINX_CONF"
    echo "   systemctl restart nginx"
else
    echo "❌ 配置测试失败，恢复备份:"
    cp "$NGINX_CONF.backup."* "$NGINX_CONF"
    echo "✅ 已恢复原始配置"
fi

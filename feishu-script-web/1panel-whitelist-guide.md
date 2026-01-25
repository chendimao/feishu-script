# 1Panel WAF 白名单配置指南

## 🎯 问题说明
认证弹窗是由1Panel的WAF（Web应用防火墙）功能引起的。

## 🛠️ 解决方案

### 方案1：通过1Panel面板配置（推荐）

1. **访问1Panel管理界面**
   - 通常地址：`https://您的服务器IP:10086`
   - 或其他端口：8888, 9999

2. **登录1Panel**
   - 使用管理员账号密码登录

3. **找到WAF设置**
   - 导航到：网站 → 防火墙/WAF
   - 或：安全 → Web应用防火墙

4. **配置白名单**
   - 添加飞书域名到白名单：
     - `*.feishu.cn`
     - `*.lark.com`
   - 或添加特定路径白名单：
     - `/scripts/url-expander-plugin`

5. **禁用认证**
   - 找到HTTP基本认证设置
   - 对目标域名/路径禁用认证

### 方案2：修改WAF配置文件

如果无法访问1Panel面板，可以直接修改配置：

```bash
# 1. 检查WAF配置
bash check-1panel-waf.sh

# 2. 找到认证配置文件并编辑
# 通常在 /usr/local/openresty/1pwaf/data/conf/ 目录下

# 3. 注释或删除认证相关行：
# auth_basic "Protected";
# auth_basic_user_file /path/to/.htpasswd;

# 4. 重启Nginx
systemctl restart nginx
```

### 方案3：临时禁用WAF（测试用）

```bash
# 临时禁用WAF进行测试
bash disable-waf-temp.sh

# 测试完成后记得恢复WAF
```

## 🔍 常见WAF认证配置位置

- `/usr/local/openresty/1pwaf/data/conf/waf.conf`
- `/usr/local/openresty/1pwaf/data/conf/sites/`
- `/usr/local/openresty/1pwaf/data/conf/rules/`

## ⚠️ 注意事项

1. **安全风险**：禁用WAF会降低网站安全性
2. **备份配置**：修改前务必备份原始配置
3. **测试访问**：修改后测试网站是否正常访问
4. **监控日志**：关注访问日志和错误日志

## 🎯 推荐做法

1. 优先使用1Panel面板进行配置
2. 只对特定路径禁用认证，而不是整个站点
3. 定期检查和更新WAF规则
4. 保持1Panel和WAF组件更新

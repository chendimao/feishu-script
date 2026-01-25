# 🔍 浏览器认证缓存检查指南

## 问题分析
直接访问 `localhost:3030` 出现认证弹窗，可能的原因：

### 1. 浏览器缓存了认证信息
浏览器可能缓存了之前的认证状态

### 2. 浏览器安全策略
某些浏览器解析或安全设置可能触发认证

### 3. 应用内部认证逻辑
Node.js应用内部可能有隐藏的认证逻辑

## 🛠️ 排查步骤

### 步骤1: 清除浏览器缓存
1. **Chrome/Edge**: 
   - 按 `Ctrl+Shift+Delete`
   - 选择"所有时间"
   - 勾选"Cookie和其他网站数据"、"缓存的图片和文件"
   - 点击"清除数据"

2. **Firefox**:
   - 按 `Ctrl+Shift+Delete`
   - 选择"全部"
   - 勾选相关选项
   - 点击"立即清除"

### 步骤2: 使用无痕/隐私模式
- Chrome: `Ctrl+Shift+N`
- Firefox: `Ctrl+Shift+P`
- Edge: `Ctrl+Shift+N`

### 步骤3: 尝试不同浏览器
- 使用完全不同的浏览器测试
- 或使用便携版浏览器

### 步骤4: 检查浏览器解析
- 禁用所有浏览器解析
- 特别是安全类、代理类解析

### 步骤5: 使用curl命令测试
```bash
# 测试主页
curl -v http://localhost:3030

# 测试API
curl -v http://localhost:3030/api/health

# 查看完整响应头
curl -I http://localhost:3030
```

### 步骤6: 检查系统代理
- Windows: 检查"设置 → 网络和Internet → 代理"
- 确保没有设置HTTP代理

### 步骤7: 检查hosts文件
- Windows: `C:\Windows\System32\drivers\etc\hosts`
- 确保localhost指向127.0.0.1

## 🔧 临时解决方案

### 方案1: 更换端口
```bash
# 修改端口为3001
npm run dev -- --port 3001
# 然后访问 http://localhost:3001
```

### 方案2: 使用IP地址
```bash
# 访问 http://127.0.0.1:3030
# 而不是 http://localhost:3030
```

### 方案3: 重置浏览器
- 完全重置浏览器设置
- 或使用全新的浏览器配置文件

## 📊 判断标准

### 如果是浏览器问题:
- 无痕模式正常访问
- curl命令正常访问
- 不同浏览器表现不同

### 如果是应用问题:
- 所有访问方式都要求认证
- curl也返回401状态码
- 服务器日志显示认证相关信息

## 🎯 下一步行动

1. 先尝试无痕模式访问
2. 运行 `node debug-node-auth.js` 测试应用
3. 检查PM2日志: `pm2 logs feishu-script`
4. 如果问题仍存在，检查应用代码

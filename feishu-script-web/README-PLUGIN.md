# 飞书多维表格插件 - 短链接批量解析工具

## 🎯 功能概述

这是一个专为飞书多维表格设计的前端插件，可以直接在飞书环境中运行，无需任何后端配置。

## ✨ 主要特性

- **🔄 自动集成**: 直接使用飞书 JS SDK，无需配置 APP_ID 和 APP_SECRET
- **📊 实时数据**: 直接读取当前表格的字段和记录
- **🎯 智能匹配**: 支持自定义短链接域名匹配规则
- **⚡ 批量处理**: 一键批量解析所有匹配的短链接
- **💾 直接写回**: 处理结果直接写回飞书表格
- **📤 导出功能**: 支持导出处理结果为CSV文件

## 🚀 使用方式

### 作为飞书插件使用（推荐）

1. **部署插件**
   ```bash
   cd feishu-script-web
   npm run build
   # 将 .output 目录部署到你的服务器
   ```

2. **在飞书中添加插件**
   - 打开飞书多维表格
   - 点击右侧"插件"按钮
   - 选择"自定义插件"
   - 点击"+ 新增插件"
   - 输入插件地址：`https://your-domain.com/scripts/url-expander-plugin`
   - 点击"确定"

3. **使用插件**
   - 插件会自动获取当前表格信息
   - 设置短链接匹配规则（可选）
   - 选择包含短链接的列
   - 选择替换模式（原列替换或新增列）
   - 点击"开始解析短链接"
   - 等待处理完成后点击"写回"

### 独立访问使用

也可以直接访问：`https://your-domain.com/scripts/url-expander-plugin`

但需要注意：
- 不在飞书环境中时，无法使用飞书 SDK 功能
- 可以作为演示页面查看界面效果

## 🛠 技术架构

### 前端架构
```
飞书多维表格插件
├── Vue 3 + TypeScript
├── Element Plus UI 组件
├── @lark-base-open/js-sdk (飞书SDK)
└── Nuxt 3 框架
```

### 数据流程
```
1. 飞书SDK初始化
   ↓
2. 获取当前表格信息
   ↓
3. 读取表格字段和记录
   ↓
4. 用户选择短链接列
   ↓
5. 匹配短链接并预览
   ↓
6. 调用URL解析API
   ↓
7. 结果写回飞书表格
```

## 📋 API 接口

插件使用以下API接口：

### URL解析接口
```
POST /api/url-expand/batch
Content-Type: application/json

{
  "urls": ["https://bit.ly/example1", "https://t.cn/example2"]
}
```

响应：
```json
{
  "success": true,
  "total": 2,
  "successCount": 2,
  "failedCount": 0,
  "results": [
    {
      "success": true,
      "originalUrl": "https://bit.ly/example1",
      "expandedUrl": "https://example.com/expanded1"
    },
    {
      "success": true,
      "originalUrl": "https://t.cn/example2", 
      "expandedUrl": "https://example.com/expanded2"
    }
  ]
}
```

## 🔧 开发环境

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📝 飞书SDK使用说明

### 主要API调用

1. **获取当前表格**
   ```typescript
   const table = await bitable.base.getActiveTable()
   ```

2. **获取字段列表**
   ```typescript
   const fieldList = await table.getFieldList()
   ```

3. **获取记录列表**
   ```typescript
   const records = await table.getRecords({ pageSize: 1000 })
   ```

4. **更新记录**
   ```typescript
   await table.setRecord(recordId, { fieldId: newValue })
   ```

5. **创建新字段**
   ```typescript
   const newField = await table.addField({
     type: 'Text',
     name: '新字段名称'
   })
   ```

## ⚠️ 注意事项

1. **环境要求**
   - 必须在飞书多维表格环境中运行才能使用完整功能
   - 需要飞书应用具有表格读写权限

2. **数据安全**
   - 原列替换操作不可撤销，建议先备份数据
   - 建议优先使用"新增列"模式

3. **性能考虑**
   - 大量数据处理时会有延迟，请耐心等待
   - 建议分批处理超过1000条的数据

## 🆚 与传统方案的对比

### 传统方案（需要后端配置）
- ❌ 需要配置 FEISHU_APP_ID 和 FEISHU_APP_SECRET
- ❌ 需要后端服务器处理飞书API认证
- ❌ 部署复杂，需要管理环境变量
- ❌ 安全性考虑，需要保护密钥

### 插件方案（推荐）
- ✅ 无需任何后端配置
- ✅ 直接使用飞书SDK，安全可靠
- ✅ 部署简单，只需静态文件托管
- ✅ 性能更好，直接在飞书环境中运行

## 📚 相关文档

- [飞书开放平台文档](https://open.feishu.cn/document/)
- [飞书多维表格插件开发指南](https://bytedance.feishu.cn/docx/doxcnePFwps4gEELgNXTWsbRmzc)
- [@lark-base-open/js-sdk 文档](https://github.com/Lark-Base-Team/js-sdk)

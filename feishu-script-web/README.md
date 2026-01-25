# 飞书脚本管理平台

基于 Nuxt 3 + Element Plus 的飞书脚本管理平台,提供可视化的脚本执行界面,支持与飞书多维表格集成。

## 功能特性

- **脚本列表**: 展示所有可用脚本,快速选择和执行
- **短链接解析器**: 批量将短链接转换为实际链接
- **飞书多维表格集成**: 直接使用飞书SDK，无需配置API密钥
- **批量处理**: 支持大规模数据批量处理,带进度显示
- **多种替换模式**: 原列替换或新增列展示结果

## 技术栈

- **前端框架**: Nuxt 3 + Vue 3 + TypeScript
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **飞书 API**: 飞书开放平台服务端 API

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并填入飞书应用配置:

```bash
cp .env.example .env
```

###飞书应用 配置

1. 访问[飞书开放平台](https://open.feishu.cn/)
2. 创建自建应用,获取 App ID 和 App Secret
3. 开通以下权限:
   - bitable:data:read
   - bitable:data:write
   - bitable:schema:read
   - bitable:schema:write

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3030

### 构建生产版本

```bash
npm run build
npm run preview
```

## 项目结构

```
feishu-script-web/
├── pages/
│   ├── index.vue                    # 脚本列表首页
│   └── scripts/
│       ├── [id].vue                 # 脚本执行页框架
│       └── url-expander-plugin.vue  # 短链接解析器(插件版)
├── server/
│   ├── api/
│   │   ├── feishu/
│   │   │   └── fields.get.ts  # 获取表格字段
│   │   └── url-expand.post.ts # URL 解析处理
│   └── utils/
│       ├── feishu-auth.ts     # 飞书认证
│       ├── feishu-bitable.ts  # 多维表格 API
│       └── url-expander.ts    # URL 解析器
├── layouts/
│   └── default.vue            # 默认布局
├── components/                # 组件
├── composables/               # 组合式函数
└── stores/                    # Pinia 状态
```

## 使用说明

### 短链接解析器

1. 在首页点击"短链接解析器"
2. 在飞书多维表格中使用此插件（推荐）
3. 或者手动输入表格信息进行测试
4. 选择包含短链接的列
5. 选择替换模式:
   - **原列替换**: 直接覆盖原数据
   - **新增列**: 创建新列展示解析结果
6. 点击"开始处理"执行批量解析
7. 处理完成后可导出结果或写回数据

## API 接口

### 获取表格字段

```
GET /api/feishu/fields?app_token=xxx&table_id=xxx
```

### URL 解析处理

```
POST /api/url-expand
{
  "app_token": "xxx",
  "table_id": "xxx",
  "field_id": "fldxxx",
  "replace_mode": "inplace", // 或 "newColumn"
  "new_field_name": "实际链接"
}
```

## 注意事项

- 飞书 API 有调用频率限制,批量处理时已内置限流处理
- 原列替换会直接覆盖数据,建议先备份
- 确保飞书应用已开通所需权限

## 许可证

MIT

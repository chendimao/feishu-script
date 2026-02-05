# Docker 部署指南

## 文件说明

| 文件 | 说明 |
|------|------|
| `backend/Dockerfile` | 后端服务镜像构建文件 |
| `docker-compose.yml` | 服务编排配置 |
| `.env.example` | 环境变量示例文件 |

## 快速部署

### 1. 准备环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的飞书应用配置
nano .env
```

### 2. 构建并启动服务

```bash
# 构建镜像并启动
docker-compose up -d --build

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f backend
```

### 3. 验证部署

```bash
# 测试健康检查接口
curl http://localhost:3030/api/health
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `docker-compose up -d` | 后台启动服务 |
| `docker-compose down` | 停止并移除服务 |
| `docker-compose restart` | 重启服务 |
| `docker-compose logs -f` | 实时查看日志 |
| `docker-compose exec backend sh` | 进入容器内部 |

## 环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `FEISHU_APP_ID` | 是 | 飞书应用 ID |
| `FEISHU_APP_SECRET` | 是 | 飞书应用密钥 |
| `CORS_ORIGIN` | 否 | 允许的跨域来源，默认 `*` |
| `PORT` | 否 | 服务端口，默认 `3030` |
| `MAX_CONCURRENT` | 否 | 最大并发数，默认 `10` |
| `TIMEOUT` | 否 | 请求超时时间，默认 `600000` |

## 生产环境建议

1. **使用 Nginx 反向代理**: 参考 `docker-compose.yml` 中注释掉的 nginx 配置
2. **配置 HTTPS**: 使用 SSL 证书保护通信
3. **设置防火墙**: 仅开放必要的端口
4. **配置日志轮转**: 避免日志文件无限增长
5. **设置资源限制**: 限制容器使用的 CPU 和内存

# 阶段 1: 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 阶段 2: 生产阶段
FROM node:20-alpine AS production

WORKDIR /app

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 从构建阶段复制依赖
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# 复制项目文件
COPY --chown=nodejs:nodejs . .

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3030

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3030/api/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# 启动命令
CMD ["node", "dist/server.js"]

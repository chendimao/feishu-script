// PM2 配置文件 - 生产环境使用开发模式
module.exports = {
  apps: [
    {
      name: "feishu-script-dev-prod",
      script: "node_modules/nuxt/bin/nuxt.mjs",
      args: "dev --host 0.0.0.0 --port 3030",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        HOST: "0.0.0.0",
        PORT: 3030,
        NUXT_FEISHU_APP_ID: "",
        NUXT_FEISHU_APP_SECRET: ""
      },
      error_file: "./logs/dev-prod-err.log",
      out_file: "./logs/dev-prod-out.log",
      log_file: "./logs/dev-prod-combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};

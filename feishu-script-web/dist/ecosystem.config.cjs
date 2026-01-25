// PM2 配置文件 - CommonJS 格式
module.exports = {
  apps: [
    {
      name: "feishu-script",
      script: "./dist/server/index.mjs",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "3030",
        NITRO_PORT: "3030",
        NUXT_FEISHU_APP_ID: "",
        NUXT_FEISHU_APP_SECRET: ""
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};

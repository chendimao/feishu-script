// PM2 配置文件 - HTTPS版本
module.exports = {
  apps: [
    {
      name: "feishu-script-https",
      script: ".output/server/index.mjs",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 3030,
        // 移除HTTPS配置，让Nginx处理SSL
        // HTTPS: "true",
        // SSL_CERT: "./ssl/cert.pem",
        // SSL_KEY: "./ssl/key.pem",
        NUXT_FEISHU_APP_ID: "",
        NUXT_FEISHU_APP_SECRET: ""
      },
      error_file: "./logs/https-err.log",
      out_file: "./logs/https-out.log",
      log_file: "./logs/https-combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};

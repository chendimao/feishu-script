// PM2 测试配置文件
module.exports = {
  apps: [
    {
      name: "port-test",
      script: "debug-pm2.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "3030",
        NITRO_PORT: "3030",
        TEST_VAR: "test_value"
      },
      error_file: "./logs/test-err.log",
      out_file: "./logs/test-out.log",
      log_file: "./logs/test-combined.log",
      time: true
    }
  ]
};

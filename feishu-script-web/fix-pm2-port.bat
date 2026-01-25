@echo off
echo 🔧 修复PM2端口问题...

echo 📊 1. 查看当前PM2状态:
pm2 status

echo.
echo 🛑 2. 停止并删除所有PM2进程:
pm2 stop all
pm2 delete all

echo.
echo 🧹 3. 清理PM2缓存:
pm2 kill
pm2 resurrect

echo.
echo 📁 4. 进入.output目录:
cd .output

echo.
echo 🚀 5. 使用新配置启动:
pm2 start ecosystem.config.cjs

echo.
echo 📊 6. 查看新状态:
pm2 status

echo.
echo 📋 7. 查看日志:
pm2 logs feishu-script --lines 10

echo.
echo ✅ 修复完成！
pause

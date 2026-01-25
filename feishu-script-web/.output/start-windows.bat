@echo off
echo 🚀 启动多维表格脚本管理...

REM 检查Node.js版本
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

REM 检查是否在.output目录
if not exist "server\index.mjs" (
    echo ❌ 错误: 请在.output目录下运行此脚本
    echo 💡 提示: cd .output 然后再运行
    pause
    exit /b 1
)

REM 检查环境变量文件
if not exist ".env" (
    echo ⚠️  警告: 未找到.env文件
    echo 💡 提示: 请配置环境变量后再启动
    echo.
    echo 是否继续启动？(y/n)
    set /p continue=
    if /i not "%continue%"=="y" (
        echo 取消启动
        pause
        exit /b 0
    )
)

echo.
echo 📋 选择启动方式:
echo 1. 直接启动 (node server/index.mjs)
echo 2. PM2启动 (推荐)
echo 3. 查看PM2状态
echo 4. 停止PM2服务
echo 5. 查看PM2日志
echo.
set /p choice=请选择 (1-5): 

if "%choice%"=="1" (
    echo 🚀 直接启动服务器...
    echo 💡 按 Ctrl+C 停止服务
    echo 🌐 访问地址: http://localhost:3030
    echo.
    set PORT=3030
    node server/index.mjs
) else if "%choice%"=="2" (
    echo 🚀 使用PM2启动...
    pm2 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ PM2未安装，正在安装...
        npm install -g pm2
    )
    pm2 start ecosystem.config.cjs
    echo ✅ 服务已启动
    echo 🌐 访问地址: http://localhost:3030
    echo 💡 使用 'pm2 logs' 查看日志
    pm2 status
) else if "%choice%"=="3" (
    echo 📊 PM2状态:
    pm2 status
) else if "%choice%"=="4" (
    echo 🛑 停止PM2服务...
    pm2 stop feishu-script
    pm2 status
) else if "%choice%"=="5" (
    echo 📋 PM2日志:
    pm2 logs feishu-script --lines 50
) else (
    echo ❌ 无效选择
)

echo.
pause

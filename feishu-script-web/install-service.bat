@echo off
echo 安装多维表格脚本管理为Windows服务...

REM 安装node-windows
npm install -g node-windows

REM 创建服务安装脚本
node install-service.js

echo 服务安装完成！
pause

@echo off
echo 🔧 修复 Nuxt 构建问题...

echo 1. 清理缓存和构建产物...
if exist "node_modules" rmdir /s /q "node_modules"
if exist ".nuxt" rmdir /s /q ".nuxt"
if exist "dist" rmdir /s /q "dist"
if exist ".output" rmdir /s /q ".output"

echo 2. 重新安装依赖...
npm install

echo 3. 清理 npm 缓存...
npm cache clean --force

echo 4. 重新生成 Nuxt 类型...
npx nuxt prepare

echo 5. 尝试构建...
npm run build:prod

echo ✅ 修复完成！
pause

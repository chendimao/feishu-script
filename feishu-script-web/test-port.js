#!/usr/bin/env node

console.log('🔍 环境变量检查:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('HOST:', process.env.HOST);
console.log('NITRO_PORT:', process.env.NITRO_PORT);
console.log('NITRO_HOST:', process.env.NITRO_HOST);

console.log('\n📊 进程参数:');
console.log('process.argv:', process.argv);

console.log('\n🎯 最终使用的端口:');
const port = process.env.NITRO_PORT || process.env.PORT || 3000;
console.log('计算得出的端口:', port);

// 模拟Nitro的端口选择逻辑
const destr = (val) => {
  if (typeof val === 'string') {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === 'null') return null;
    if (val === 'undefined') return undefined;
    if (val === '') return undefined;
    if (!isNaN(val)) return Number(val);
  }
  return val;
};

const finalPort = destr(process.env.NITRO_PORT || process.env.PORT) || 3000;
console.log('Nitro逻辑计算的端口:', finalPort);

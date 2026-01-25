// 调试Node.js应用认证问题
const http = require('http');

console.log('🔍 调试Node.js应用认证问题...');

// 测试不同的请求路径
const testPaths = [
  '/',
  '/api/health',
  '/scripts/url-expander-plugin',
  '/test'
];

async function testPath(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3030,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Debug-Script/1.0'
      }
    };

    console.log(`\n📡 测试路径: ${path}`);
    
    const req = http.request(options, (res) => {
      console.log(`状态码: ${res.statusCode}`);
      console.log(`响应头:`, res.headers);
      
      // 检查是否有认证相关的响应头
      if (res.headers['www-authenticate']) {
        console.log(`🔒 发现认证头: ${res.headers['www-authenticate']}`);
      }
      
      if (res.statusCode === 401) {
        console.log('❌ 401 未授权 - 需要认证');
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (data.length < 200) {
          console.log(`响应内容: ${data}`);
        } else {
          console.log(`响应内容长度: ${data.length} 字符`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ 请求错误: ${e.message}`);
      resolve();
    });

    req.setTimeout(5000, () => {
      console.log('⏰ 请求超时');
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function main() {
  console.log('🚀 开始测试...');
  
  for (const path of testPaths) {
    await testPath(path);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
  }
  
  console.log('\n✅ 测试完成');
  console.log('\n💡 如果看到401状态码或www-authenticate头，说明认证来自Node.js应用');
  console.log('💡 如果所有请求都正常，说明认证可能来自浏览器缓存或其他地方');
}

main().catch(console.error);

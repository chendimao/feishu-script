#!/usr/bin/env node

/**
 * 短链接解析服务 - Node.js 后台服务
 * 
 * 功能：
 * - HTTP API 服务，接收短链接并返回实际 URL
 * - 支持批量解析
 * - 并发控制，避免限流
 * - 完善的错误处理和日志
 * - 支持 PM2 部署
 * 
 * 使用方式：
 * 1. 直接运行：node url-expander-server.js
 * 2. PM2 部署：pm2 start url-expander-server.js --name url-expander
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = process.env.PORT || 3030;
const MAX_CONCURRENT = parseInt(process.env.MAX_CONCURRENT || '10', 10);
const TIMEOUT = parseInt(process.env.TIMEOUT || '600000', 10);

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logData = data ? ` ${JSON.stringify(data)}` : '';
  console.log(`[${timestamp}] [${level}] ${message}${logData}`);
}

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

function expandUrl(shortUrl, timeout = TIMEOUT) {
  return new Promise((resolve, reject) => {
    if (!isValidUrl(shortUrl)) {
      return resolve({
        success: false,
        originalUrl: shortUrl,
        error: 'Invalid URL format',
        errorType: 'INVALID_URL',
      });
    }

    const urlObj = new URL(shortUrl);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const options = {
      method: 'HEAD',
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: timeout,
    };

    const req = protocol.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const location = res.headers.location;
        const expandedUrl = location.startsWith('http') 
          ? location 
          : new URL(location, shortUrl).href;

        resolve({
          success: true,
          originalUrl: shortUrl,
          expandedUrl: expandedUrl,
          statusCode: res.statusCode,
        });
      } else {
        resolve({
          success: false,
          originalUrl: shortUrl,
          error: `Not a redirect response (status: ${res.statusCode})`,
          errorType: 'NO_REDIRECT',
          statusCode: res.statusCode,
        });
      }
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        originalUrl: shortUrl,
        error: error.message,
        errorType: 'NETWORK_ERROR',
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        originalUrl: shortUrl,
        error: 'Request timeout',
        errorType: 'TIMEOUT',
      });
    });

    req.end();
  });
}

async function expandUrlsInBatch(urls, concurrency = MAX_CONCURRENT, timeout = TIMEOUT) {
  const results = [];
  const queue = [...urls];
  const inProgress = [];

  while (queue.length > 0 || inProgress.length > 0) {
    while (inProgress.length < concurrency && queue.length > 0) {
      const url = queue.shift();
      const promise = expandUrl(url, timeout)
        .then((result) => {
          const index = inProgress.indexOf(promise);
          if (index > -1) {
            inProgress.splice(index, 1);
          }
          return result;
        })
        .catch((error) => {
          const index = inProgress.indexOf(promise);
          if (index > -1) {
            inProgress.splice(index, 1);
          }
          return {
            success: false,
            originalUrl: url,
            error: error.message,
            errorType: 'UNKNOWN_ERROR',
          };
        });

      inProgress.push(promise);
    }

    if (inProgress.length > 0) {
      const result = await Promise.race(inProgress);
      results.push(result);
    }
  }

  return results;
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.connection.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const startTime = Date.now();
  const { method, url } = req;

  log('INFO', `${method} ${url}`);

  if (method === 'OPTIONS') {
    sendResponse(res, 200, { message: 'OK' });
    return;
  }

  if (method === 'GET' && url === '/') {
    sendResponse(res, 200, {
      service: 'URL Expander Service',
      version: '1.1.0',
      endpoints: {
        'POST /expand': 'Expand a single URL',
        'POST /expand/batch': 'Expand multiple URLs',
        'GET /health': 'Health check',
      },
      features: {
        customParams: 'Support custom parameters in request and response',
        timeout: 'Configurable timeout per request',
        concurrency: 'Configurable concurrency for batch requests',
      },
    });
    return;
  }

  if (method === 'GET' && url === '/health') {
    sendResponse(res, 200, {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (method === 'POST' && url === '/expand') {
    try {
      const body = await parseRequestBody(req);
      const { url: shortUrl, timeout, ...customParams } = body;

      if (!shortUrl) {
        sendResponse(res, 400, {
          success: false,
          error: 'Missing required field: url',
        });
        return;
      }

      const result = await expandUrl(shortUrl, timeout);
      const duration = Date.now() - startTime;

      log('INFO', `Expanded URL in ${duration}ms`, {
        originalUrl: shortUrl,
        success: result.success,
        customParams: Object.keys(customParams).length > 0 ? customParams : undefined,
      });

      sendResponse(res, 200, {
        ...result,
        duration,
        customParams: Object.keys(customParams).length > 0 ? customParams : undefined,
      });
    } catch (error) {
      log('ERROR', 'Failed to expand URL', { error: error.message });
      sendResponse(res, 400, {
        success: false,
        error: error.message,
      });
    }
    return;
  }

  if (method === 'POST' && url === '/expand/batch') {
    try {
      const body = await parseRequestBody(req);
      const { urls, concurrency, timeout, ...customParams } = body;

      if (!urls || !Array.isArray(urls)) {
        sendResponse(res, 400, {
          success: false,
          error: 'Missing or invalid field: urls (must be an array)',
        });
        return;
      }

      if (urls.length === 0) {
        sendResponse(res, 400, {
          success: false,
          error: 'URLs array is empty',
        });
        return;
      }

      if (urls.length > 100) {
        sendResponse(res, 400, {
          success: false,
          error: 'Too many URLs (max 100 per request)',
        });
        return;
      }

      const results = await expandUrlsInBatch(urls, concurrency, timeout);
      const duration = Date.now() - startTime;

      const successCount = results.filter((r) => r.success).length;
      const failedCount = results.length - successCount;

      log('INFO', `Batch expanded ${urls.length} URLs in ${duration}ms`, {
        total: urls.length,
        success: successCount,
        failed: failedCount,
        customParams: Object.keys(customParams).length > 0 ? customParams : undefined,
      });

      sendResponse(res, 200, {
        success: true,
        total: urls.length,
        successCount,
        failedCount,
        duration,
        results,
        customParams: Object.keys(customParams).length > 0 ? customParams : undefined,
      });
    } catch (error) {
      log('ERROR', 'Failed to expand URLs in batch', { error: error.message });
      sendResponse(res, 400, {
        success: false,
        error: error.message,
      });
    }
    return;
  }

  sendResponse(res, 404, {
    success: false,
    error: 'Not found',
  });
});

server.listen(PORT, () => {
  log('INFO', `URL Expander Service started on port ${PORT}`);
  log('INFO', `Max concurrent requests: ${MAX_CONCURRENT}`);
  log('INFO', `Request timeout: ${TIMEOUT}ms`);
  log('INFO', 'Press Ctrl+C to stop');
});

process.on('SIGTERM', () => {
  log('INFO', 'SIGTERM received, shutting down gracefully');
  server.close(() => {
    log('INFO', 'Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  log('INFO', 'SIGINT received, shutting down gracefully');
  server.close(() => {
    log('INFO', 'Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  log('ERROR', 'Uncaught exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log('ERROR', 'Unhandled rejection', { reason, promise });
});

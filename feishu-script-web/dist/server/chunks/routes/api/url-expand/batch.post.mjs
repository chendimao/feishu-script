import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const batch_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { urls } = body;
  if (!urls || !Array.isArray(urls)) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570: urls (\u5FC5\u987B\u662F\u6570\u7EC4)"
    });
  }
  if (urls.length === 0) {
    return {
      success: true,
      total: 0,
      successCount: 0,
      failedCount: 0,
      results: []
    };
  }
  if (urls.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage: "URL\u6570\u91CF\u8FC7\u591A (\u6700\u591A100\u4E2A)"
    });
  }
  try {
    const results = await Promise.all(urls.map(async (url) => {
      try {
        const supportedDomains = [
          "bit.ly",
          "t.co",
          "t.cn",
          "tinyurl.com",
          "goo.gl",
          "ow.ly",
          "short.link",
          "tiny.cc",
          "is.gd",
          "buff.ly"
        ];
        const isSupported = supportedDomains.some((domain) => url.includes(domain));
        if (!isSupported) {
          return {
            success: false,
            originalUrl: url,
            error: "\u4E0D\u652F\u6301\u7684\u77ED\u94FE\u63A5\u683C\u5F0F"
          };
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1e4);
        try {
          const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            signal: controller.signal,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          });
          clearTimeout(timeoutId);
          const expandedUrl = response.url;
          if (expandedUrl && expandedUrl !== url) {
            return {
              success: true,
              originalUrl: url,
              expandedUrl
            };
          } else {
            const getController = new AbortController();
            const getTimeoutId = setTimeout(() => getController.abort(), 1e4);
            try {
              const getResponse = await fetch(url, {
                method: "GET",
                redirect: "follow",
                signal: getController.signal,
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                }
              });
              clearTimeout(getTimeoutId);
              return {
                success: true,
                originalUrl: url,
                expandedUrl: getResponse.url || url
              };
            } catch (getError) {
              clearTimeout(getTimeoutId);
              throw getError;
            }
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      } catch (error) {
        console.error(`\u6269\u5C55URL\u5931\u8D25 ${url}:`, error.message);
        return {
          success: false,
          originalUrl: url,
          error: `\u6269\u5C55\u5931\u8D25: ${error.message}`
        };
      }
    }));
    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.length - successCount;
    return {
      success: true,
      total: urls.length,
      successCount,
      failedCount,
      results
    };
  } catch (error) {
    console.error("\u6279\u91CFURL\u6269\u5C55\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "\u6279\u91CFURL\u6269\u5C55\u5931\u8D25"
    });
  }
});

export { batch_post as default };
//# sourceMappingURL=batch.post.mjs.map

import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import { a as getTableRecords, u as updateTableRecords } from '../../_/feishu-bitable.mjs';
import { URL } from 'url';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const MAX_CONCURRENT = 10;
const TIMEOUT = 1e4;
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}
async function expandUrl(shortUrl) {
  if (!isValidUrl(shortUrl)) {
    return {
      success: false,
      originalUrl: shortUrl,
      error: "\u65E0\u6548\u7684 URL \u683C\u5F0F",
      errorType: "INVALID_URL"
    };
  }
  try {
    const urlObj = new URL(shortUrl);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    const response = await fetch(shortUrl, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "manual"
    });
    clearTimeout(timeoutId);
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        const expandedUrl = location.startsWith("http") ? location : new URL(location, shortUrl).href;
        return {
          success: true,
          originalUrl: shortUrl,
          expandedUrl
        };
      }
    }
    return {
      success: false,
      originalUrl: shortUrl,
      error: `\u975E\u91CD\u5B9A\u5411\u54CD\u5E94 (\u72B6\u6001\u7801: ${response.status})`,
      errorType: "NO_REDIRECT"
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF";
    if (errorMessage.includes("abort") || errorMessage.includes("timeout")) {
      return {
        success: false,
        originalUrl: shortUrl,
        error: "\u8BF7\u6C42\u8D85\u65F6",
        errorType: "TIMEOUT"
      };
    }
    return {
      success: false,
      originalUrl: shortUrl,
      error: errorMessage,
      errorType: "NETWORK_ERROR"
    };
  }
}
async function expandUrlsInBatch(urls) {
  const results = [];
  const queue = [...urls];
  const inProgress = [];
  while (queue.length > 0 || inProgress.length > 0) {
    while (inProgress.length < MAX_CONCURRENT && queue.length > 0) {
      const url = queue.shift();
      const promise = expandUrl(url).then((result) => {
        const index = inProgress.indexOf(promise);
        if (index > -1) {
          inProgress.splice(index, 1);
        }
        return result;
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

const urlExpand_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { app_token, table_id, field_id, records, replace_mode, new_field_name } = body;
  if (!app_token || !table_id || !field_id) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
    });
  }
  if (records && Array.isArray(records)) {
    return processRecords(records, field_id, app_token, table_id, replace_mode);
  }
  try {
    const allRecords = [];
    let pageToken = "";
    let hasMore = true;
    while (hasMore) {
      const result = await getTableRecords(app_token, table_id, {
        pageSize: 500,
        pageToken
      });
      if (!result) break;
      allRecords.push(...result.records);
      pageToken = result.pageToken;
      hasMore = result.hasMore;
    }
    return processRecords(allRecords, field_id, app_token, table_id, replace_mode, new_field_name);
  } catch (error) {
    console.error("URL \u6269\u5C55\u5904\u7406\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u5904\u7406\u5931\u8D25"
    });
  }
});
async function processRecords(records, fieldId, appToken, tableId, replaceMode, _newFieldName) {
  const urls = [];
  const recordMap = /* @__PURE__ */ new Map();
  for (const record of records) {
    const recordId = record.recordId || record.id;
    const fieldValue = record[fieldId];
    if (fieldValue && typeof fieldValue === "string") {
      urls.push(fieldValue);
      recordMap.set(recordId, record);
    }
  }
  const results = await expandUrlsInBatch(urls);
  const processedResults = results.map((result, index) => {
    var _a, _b;
    return {
      ...result,
      recordId: ((_a = records[index]) == null ? void 0 : _a.recordId) || ((_b = records[index]) == null ? void 0 : _b.id)
    };
  });
  const successCount = results.filter((r) => r.success).length;
  const failedCount = results.length - successCount;
  if (replaceMode === "inplace") {
    try {
      const updates = processedResults.filter((r) => r.success).map((r) => ({
        recordId: r.recordId,
        fields: {
          [fieldId]: r.expandedUrl
        }
      }));
      if (updates.length > 0) {
        await updateTableRecords(appToken, tableId, updates);
      }
    } catch (error) {
      console.error("\u5199\u56DE\u6570\u636E\u5931\u8D25:", error);
    }
  }
  return {
    success: true,
    data: {
      total: results.length,
      successCount,
      failedCount,
      results: processedResults
    }
  };
}

export { urlExpand_post as default };
//# sourceMappingURL=url-expand.post.mjs.map

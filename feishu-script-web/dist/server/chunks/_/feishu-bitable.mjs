import { u as useRuntimeConfig } from './nitro.mjs';

let tokenCache = null;
const FEISHU_API_BASE$1 = "https://open.feishu.cn/open-api";
async function getTenantAccessToken() {
  const config = useRuntimeConfig();
  if (tokenCache && tokenCache.expiresAt > Date.now() + 303e3) {
    return tokenCache.token;
  }
  try {
    const response = await $fetch(`${FEISHU_API_BASE$1}/auth/v3/tenant_access_token/internal`, {
      method: "POST",
      body: {
        app_id: config.feishuAppId,
        app_secret: config.feishuAppSecret
      }
    });
    if (response.code !== 0) {
      throw new Error(`\u83B7\u53D6 token \u5931\u8D25: ${response.msg}`);
    }
    tokenCache = {
      token: response.data.tenant_access_token,
      expiresAt: Date.now() + (response.data.expire - 300) * 1e3
      // 提前 5 秒过期
    };
    return tokenCache.token;
  } catch (error) {
    console.error("\u83B7\u53D6\u98DE\u4E66 tenant_access_token \u5931\u8D25:", error);
    throw error;
  }
}
async function createFeishuHeaders() {
  const token = await getTenantAccessToken();
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

const FEISHU_API_BASE = "https://open.feishu.cn/open-api/bitable/v1";
function handleFeishuError(error, context) {
  console.error(`\u98DE\u4E66 API \u9519\u8BEF [${context}]:`, error);
  throw {
    success: false,
    error: error.message || "\u98DE\u4E66 API \u8C03\u7528\u5931\u8D25",
    context
  };
}
async function getTableFields(appToken, tableId) {
  try {
    const headers = await createFeishuHeaders();
    const response = await $fetch(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/fields`, {
      headers
    });
    if (response.code !== 0) {
      throw new Error(response.msg);
    }
    const typeMap = {
      1: "text",
      2: "number",
      3: "singleSelect",
      4: "multiSelect",
      5: "date",
      7: "checkbox",
      11: "url",
      13: "phone",
      14: "email"
    };
    return response.data.items.map((field) => ({
      fieldId: field.field_id,
      fieldName: field.field_name,
      fieldType: typeMap[field.type] || "unknown"
    }));
  } catch (error) {
    handleFeishuError(error, "\u83B7\u53D6\u5B57\u6BB5\u5217\u8868");
  }
}
async function getTableRecords(appToken, tableId, options) {
  var _a;
  try {
    const headers = await createFeishuHeaders();
    const params = new URLSearchParams();
    if ((_a = options == null ? void 0 : options.fieldIds) == null ? void 0 : _a.length) {
      params.append("field_ids", options.fieldIds.join(","));
    }
    if (options == null ? void 0 : options.pageSize) {
      params.append("page_size", String(options.pageSize));
    }
    if (options == null ? void 0 : options.pageToken) {
      params.append("page_token", options.pageToken);
    }
    const url = `${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/records?${params.toString()}`;
    const response = await $fetch(url, { headers });
    if (response.code !== 0) {
      throw new Error(response.msg);
    }
    return {
      records: response.data.items.map((item) => ({
        recordId: item.record_id,
        ...item.fields
      })),
      pageToken: response.data.page_token,
      hasMore: response.data.has_more,
      total: response.data.total
    };
  } catch (error) {
    handleFeishuError(error, "\u83B7\u53D6\u8BB0\u5F55\u5217\u8868");
  }
}
async function updateTableRecords(appToken, tableId, records) {
  try {
    const headers = await createFeishuHeaders();
    const response = await $fetch(`${FEISHU_API_BASE}/apps/${appToken}/tables/${tableId}/records/batch_update`, {
      method: "POST",
      headers,
      body: {
        records: records.map((record) => ({
          record_id: record.recordId,
          fields: record.fields
        }))
      }
    });
    if (response.code !== 0) {
      throw new Error(response.msg);
    }
    return {
      success: true,
      updatedCount: response.data.records.length
    };
  } catch (error) {
    handleFeishuError(error, "\u6279\u91CF\u66F4\u65B0\u8BB0\u5F55");
  }
}

export { getTableRecords as a, getTableFields as g, updateTableRecords as u };
//# sourceMappingURL=feishu-bitable.mjs.map

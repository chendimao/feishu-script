import { c as defineEventHandler, g as getQuery, e as createError } from '../../../_/nitro.mjs';
import { g as getTableFields } from '../../../_/feishu-bitable.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const fields_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { app_token, table_id } = query;
  if (!app_token || !table_id) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570: app_token \u548C table_id"
    });
  }
  try {
    const fields = await getTableFields(String(app_token), String(table_id));
    return {
      success: true,
      data: fields
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25"
    });
  }
});

export { fields_get as default };
//# sourceMappingURL=fields.get.mjs.map

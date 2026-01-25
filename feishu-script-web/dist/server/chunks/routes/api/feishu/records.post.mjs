import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const records_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { appToken, tableId, limit = 100 } = body;
  if (!appToken || !tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570: appToken \u548C tableId"
    });
  }
  try {
    const mockRecords = [
      {
        recordId: "rec001",
        fld001: "https://bit.ly/example1",
        fld002: "\u793A\u4F8B\u6807\u98981",
        fld003: "\u8FD9\u662F\u4E00\u4E2A\u793A\u4F8B\u63CF\u8FF0",
        fld004: "2024-01-01",
        fld005: "\u5F85\u5904\u7406"
      },
      {
        recordId: "rec002",
        fld001: "https://t.cn/example2",
        fld002: "\u793A\u4F8B\u6807\u98982",
        fld003: "\u8FD9\u662F\u53E6\u4E00\u4E2A\u793A\u4F8B",
        fld004: "2024-01-02",
        fld005: "\u5DF2\u5904\u7406"
      },
      {
        recordId: "rec003",
        fld001: "https://tinyurl.com/example3",
        fld002: "\u793A\u4F8B\u6807\u98983",
        fld003: "\u7B2C\u4E09\u4E2A\u793A\u4F8B",
        fld004: "2024-01-03",
        fld005: "\u5F85\u5904\u7406"
      }
    ];
    return {
      success: true,
      data: mockRecords.slice(0, Number(limit))
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u8868\u683C\u8BB0\u5F55\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "\u83B7\u53D6\u8868\u683C\u8BB0\u5F55\u5931\u8D25"
    });
  }
});

export { records_post as default };
//# sourceMappingURL=records.post.mjs.map

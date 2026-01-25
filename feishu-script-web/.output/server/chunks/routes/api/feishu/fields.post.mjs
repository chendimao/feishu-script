import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const fields_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { appToken, tableId } = body;
  if (!appToken || !tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570: appToken \u548C tableId"
    });
  }
  try {
    const mockFields = [
      { fieldId: "fld001", fieldName: "\u77ED\u94FE\u63A5", fieldType: "text" },
      { fieldId: "fld002", fieldName: "\u6807\u9898", fieldType: "text" },
      { fieldId: "fld003", fieldName: "\u63CF\u8FF0", fieldType: "text" },
      { fieldId: "fld004", fieldName: "\u521B\u5EFA\u65F6\u95F4", fieldType: "date" },
      { fieldId: "fld005", fieldName: "\u72B6\u6001", fieldType: "singleSelect" }
    ];
    return {
      success: true,
      data: mockFields
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25"
    });
  }
});

export { fields_post as default };
//# sourceMappingURL=fields.post.mjs.map

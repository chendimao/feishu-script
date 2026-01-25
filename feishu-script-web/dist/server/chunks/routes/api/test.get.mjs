import { c as defineEventHandler, u as useRuntimeConfig } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const test_get = defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig();
    return {
      success: true,
      message: "API \u6D4B\u8BD5\u6210\u529F",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      config: {
        hasFeishuAppId: !!config.feishuAppId,
        hasFeishuAppSecret: !!config.feishuAppSecret
      }
    };
  } catch (error) {
    console.error("\u6D4B\u8BD5API\u9519\u8BEF:", error);
    return {
      success: false,
      error: error.message || "\u672A\u77E5\u9519\u8BEF"
    };
  }
});

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map

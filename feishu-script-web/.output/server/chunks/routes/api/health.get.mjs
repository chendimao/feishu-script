import { c as defineEventHandler, u as useRuntimeConfig } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const health_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  return {
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0.0",
    environment: "production" || "development",
    config: {
      appName: config.public.appName,
      hasFeishuConfig: !!(config.feishuAppId && config.feishuAppSecret)
    },
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: process.platform,
    nodeVersion: process.version
  };
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map

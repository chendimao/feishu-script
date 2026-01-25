import { _ as __nuxt_component_0 } from "./AppLogo-BDuU2WAG.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/hookable/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/unctx/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/defu/dist/defu.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/ufo/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-container" }, _attrs))} data-v-3fb5d48f><header class="layout-header" data-v-3fb5d48f><div class="header-gradient" data-v-3fb5d48f></div><div class="header-content" data-v-3fb5d48f><div class="header-left" data-v-3fb5d48f><div class="logo-container" data-v-3fb5d48f>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "medium" }, null, _parent));
      _push(`<div class="brand-info" data-v-3fb5d48f><span class="brand-name" data-v-3fb5d48f>飞书脚本</span><span class="brand-tagline" data-v-3fb5d48f>智能数据处理</span></div></div></div><div class="header-right" data-v-3fb5d48f><div class="header-actions" data-v-3fb5d48f><div class="status-indicator" data-v-3fb5d48f><div class="status-dot" data-v-3fb5d48f></div><span class="status-text" data-v-3fb5d48f>已连接</span></div></div></div></div></header><main class="layout-main" data-v-3fb5d48f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fb5d48f"]]);
export {
  _default as default
};
//# sourceMappingURL=default-BNFBoowF.js.map

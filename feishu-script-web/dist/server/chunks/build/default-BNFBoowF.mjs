import { _ as __nuxt_component_0 } from './AppLogo-BDuU2WAG.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-container" }, _attrs))} data-v-3fb5d48f><header class="layout-header" data-v-3fb5d48f><div class="header-gradient" data-v-3fb5d48f></div><div class="header-content" data-v-3fb5d48f><div class="header-left" data-v-3fb5d48f><div class="logo-container" data-v-3fb5d48f>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "medium" }, null, _parent));
      _push(`<div class="brand-info" data-v-3fb5d48f><span class="brand-name" data-v-3fb5d48f>\u98DE\u4E66\u811A\u672C</span><span class="brand-tagline" data-v-3fb5d48f>\u667A\u80FD\u6570\u636E\u5904\u7406</span></div></div></div><div class="header-right" data-v-3fb5d48f><div class="header-actions" data-v-3fb5d48f><div class="status-indicator" data-v-3fb5d48f><div class="status-dot" data-v-3fb5d48f></div><span class="status-text" data-v-3fb5d48f>\u5DF2\u8FDE\u63A5</span></div></div></div></div></header><main class="layout-main" data-v-3fb5d48f>`);
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

export { _default as default };
//# sourceMappingURL=default-BNFBoowF.mjs.map

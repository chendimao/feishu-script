import { defineComponent, ref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { c as connection_default, s as setting_default } from './index-DJ0OzA4C.mjs';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref({
      totalProcessed: "12,345",
      activeUsers: "1,234",
      successRate: "98.5%"
    });
    const scripts = [
      {
        id: "url-expander-plugin",
        name: "\u{1F517} \u77ED\u94FE\u63A5\u6269\u5C55\u5668",
        description: "\u98DE\u4E66\u63D2\u4EF6\u7248\u672C\uFF0C\u76F4\u63A5\u4F7F\u7528\u98DE\u4E66SDK\uFF0C\u65E0\u9700\u914D\u7F6E",
        icon: connection_default,
        route: "/scripts/url-expander-plugin"
      },
      {
        id: "test",
        name: "\u{1F9EA} API\u6D4B\u8BD5\u5DE5\u5177",
        description: "\u6D4B\u8BD5\u5404\u79CDAPI\u63A5\u53E3\u7684\u529F\u80FD\u548C\u54CD\u5E94",
        icon: setting_default,
        route: "/test"
      }
    ];
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-f99ff40a><section class="hero-section" data-v-f99ff40a><div class="hero-content" data-v-f99ff40a><div class="hero-text" data-v-f99ff40a><h1 class="hero-title" data-v-f99ff40a>\u591A\u7EF4\u8868\u683C\u811A\u672C\u7BA1\u7406</h1><p class="hero-subtitle" data-v-f99ff40a>\u8BA9\u5DE5\u4F5C\u66F4\u9AD8\u6548\uFF0C\u8BA9\u6570\u636E\u66F4\u667A\u80FD</p></div></div></section><section class="features-section" data-v-f99ff40a><div class="container" data-v-f99ff40a><h2 class="section-title" data-v-f99ff40a>\u6838\u5FC3\u529F\u80FD</h2><div class="features-grid" data-v-f99ff40a><!--[-->`);
      ssrRenderList(scripts, (script) => {
        _push(`<div class="feature-item" data-v-f99ff40a><div class="feature-icon" data-v-f99ff40a>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(script.icon), null, null), _parent);
        _push(`</div><div class="feature-content" data-v-f99ff40a><h3 class="feature-title" data-v-f99ff40a>${ssrInterpolate(script.name)}</h3><p class="feature-desc" data-v-f99ff40a>${ssrInterpolate(script.description)}</p></div><div class="feature-action" data-v-f99ff40a><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f99ff40a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-f99ff40a></path></svg></div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f99ff40a"]]);

export { index as default };
//# sourceMappingURL=index-Bbr4EJj2.mjs.map

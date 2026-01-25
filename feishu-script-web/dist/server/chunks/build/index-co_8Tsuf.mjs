import { _ as __nuxt_component_0 } from './AppLogo-BDuU2WAG.mjs';
import { defineComponent, ref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
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
        name: "\u77ED\u94FE\u63A5\u6269\u5C55\u5668",
        description: "\u667A\u80FD\u6269\u5C55\u77ED\u94FE\u63A5\uFF0C\u652F\u6301\u6279\u91CF\u5904\u7406\u548C\u539F\u5217\u66FF\u6362",
        icon: connection_default,
        route: "/scripts/url-expander-plugin",
        status: "\u70ED\u95E8",
        theme: "blue"
      },
      {
        id: "test",
        name: "API\u6D4B\u8BD5\u5DE5\u5177",
        description: "\u6D4B\u8BD5\u5404\u79CDAPI\u63A5\u53E3\u7684\u529F\u80FD\u548C\u54CD\u5E94",
        icon: setting_default,
        route: "/test",
        status: "\u53EF\u7528",
        theme: "purple"
      }
    ];
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-4b9d2ce3><section class="hero-section" data-v-4b9d2ce3><div class="hero-content" data-v-4b9d2ce3><div class="hero-text" data-v-4b9d2ce3>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "large",
        "show-text": true,
        "show-subtitle": true,
        "show-background": true,
        "app-name": "\u591A\u7EF4\u8868\u683C\u811A\u672C\u7BA1\u7406",
        subtitle: "\u8BA9\u5DE5\u4F5C\u66F4\u9AD8\u6548\uFF0C\u8BA9\u6570\u636E\u66F4\u667A\u80FD"
      }, null, _parent));
      _push(`</div></div></section><section class="features-section" data-v-4b9d2ce3><div class="container" data-v-4b9d2ce3><h2 class="section-title" data-v-4b9d2ce3>\u6838\u5FC3\u529F\u80FD</h2><div class="features-grid" data-v-4b9d2ce3><!--[-->`);
      ssrRenderList(scripts, (script) => {
        _push(`<div class="${ssrRenderClass([`theme-${script.theme}`, "feature-card"])}" data-v-4b9d2ce3><div class="feature-header" data-v-4b9d2ce3><div class="feature-icon" data-v-4b9d2ce3>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(script.icon), null, null), _parent);
        _push(`</div><div class="feature-badge" data-v-4b9d2ce3><span class="badge-text" data-v-4b9d2ce3>${ssrInterpolate(script.status || "\u53EF\u7528")}</span></div></div><div class="feature-content" data-v-4b9d2ce3><h3 class="feature-title" data-v-4b9d2ce3>${ssrInterpolate(script.name)}</h3><p class="feature-desc" data-v-4b9d2ce3>${ssrInterpolate(script.description)}</p>`);
        if (script.stats) {
          _push(`<div class="feature-stats" data-v-4b9d2ce3><span class="stat-item" data-v-4b9d2ce3><svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d2ce3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-4b9d2ce3></path></svg> ${ssrInterpolate(script.stats)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="feature-footer" data-v-4b9d2ce3><button class="feature-btn" data-v-4b9d2ce3><span data-v-4b9d2ce3>\u7ACB\u5373\u4F7F\u7528</span><svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d2ce3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-v-4b9d2ce3></path></svg></button></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b9d2ce3"]]);

export { index as default };
//# sourceMappingURL=index-co_8Tsuf.mjs.map

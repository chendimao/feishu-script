import { _ as __nuxt_component_0 } from "./AppLogo-BDuU2WAG.js";
import { defineComponent, ref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { c as connection_default, s as setting_default } from "./index-DJ0OzA4C.js";
import { u as useRouter, _ as _export_sfc } from "../server.mjs";
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
        name: "短链接解析器",
        description: "智能解析短链接，支持批量处理和原列替换",
        icon: connection_default,
        route: "/scripts/url-expander-plugin",
        status: "热门",
        theme: "blue"
      },
      {
        id: "test",
        name: "API测试工具",
        description: "测试各种API接口的功能和响应",
        icon: setting_default,
        route: "/test",
        status: "可用",
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
        "app-name": "多维表格脚本管理",
        subtitle: "让工作更高效，让数据更智能"
      }, null, _parent));
      _push(`</div></div></section><section class="features-section" data-v-4b9d2ce3><div class="container" data-v-4b9d2ce3><h2 class="section-title" data-v-4b9d2ce3>核心功能</h2><div class="features-grid" data-v-4b9d2ce3><!--[-->`);
      ssrRenderList(scripts, (script) => {
        _push(`<div class="${ssrRenderClass([`theme-${script.theme}`, "feature-card"])}" data-v-4b9d2ce3><div class="feature-header" data-v-4b9d2ce3><div class="feature-icon" data-v-4b9d2ce3>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(script.icon), null, null), _parent);
        _push(`</div><div class="feature-badge" data-v-4b9d2ce3><span class="badge-text" data-v-4b9d2ce3>${ssrInterpolate(script.status || "可用")}</span></div></div><div class="feature-content" data-v-4b9d2ce3><h3 class="feature-title" data-v-4b9d2ce3>${ssrInterpolate(script.name)}</h3><p class="feature-desc" data-v-4b9d2ce3>${ssrInterpolate(script.description)}</p>`);
        if (script.stats) {
          _push(`<div class="feature-stats" data-v-4b9d2ce3><span class="stat-item" data-v-4b9d2ce3><svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d2ce3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-4b9d2ce3></path></svg> ${ssrInterpolate(script.stats)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="feature-footer" data-v-4b9d2ce3><button class="feature-btn" data-v-4b9d2ce3><span data-v-4b9d2ce3>立即使用</span><svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d2ce3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-v-4b9d2ce3></path></svg></button></div></div>`);
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
export {
  index as default
};
//# sourceMappingURL=index-co_8Tsuf.js.map

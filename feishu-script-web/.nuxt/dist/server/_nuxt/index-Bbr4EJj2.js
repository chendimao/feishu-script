import { defineComponent, ref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
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
        name: "🔗 短链接扩展器",
        description: "飞书插件版本，直接使用飞书SDK，无需配置",
        icon: connection_default,
        route: "/scripts/url-expander-plugin"
      },
      {
        id: "test",
        name: "🧪 API测试工具",
        description: "测试各种API接口的功能和响应",
        icon: setting_default,
        route: "/test"
      }
    ];
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-f99ff40a><section class="hero-section" data-v-f99ff40a><div class="hero-content" data-v-f99ff40a><div class="hero-text" data-v-f99ff40a><h1 class="hero-title" data-v-f99ff40a>多维表格脚本管理</h1><p class="hero-subtitle" data-v-f99ff40a>让工作更高效，让数据更智能</p></div></div></section><section class="features-section" data-v-f99ff40a><div class="container" data-v-f99ff40a><h2 class="section-title" data-v-f99ff40a>核心功能</h2><div class="features-grid" data-v-f99ff40a><!--[-->`);
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
export {
  index as default
};
//# sourceMappingURL=index-Bbr4EJj2.js.map

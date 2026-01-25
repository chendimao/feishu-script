import { c as connection_default, s as setting_default, a as ElIcon, E as ElButton } from "./el-button-DEhYiaTs.js";
import "./base-B7YREFnB.js";
import { defineComponent, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { u as useRouter, _ as _export_sfc } from "../server.mjs";
import "@vue/shared";
import "lodash-unified";
import "@ctrl/tinycolor";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-774426ab><div class="page-header" data-v-774426ab><h2 data-v-774426ab>可用脚本</h2><p data-v-774426ab>选择下方脚本开始执行任务</p></div><div class="scripts-grid" data-v-774426ab><!--[-->`);
      ssrRenderList(scripts, (script) => {
        _push(`<div class="script-card" data-v-774426ab><div class="${ssrRenderClass([script.id, "script-icon"])}" data-v-774426ab>`);
        _push(ssrRenderComponent(_component_el_icon, { size: 48 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(script.icon), null, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(script.icon)))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><h3 class="script-name" data-v-774426ab>${ssrInterpolate(script.name)}</h3><p class="script-description" data-v-774426ab>${ssrInterpolate(script.description)}</p>`);
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          size: "small"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 立即使用 `);
            } else {
              return [
                createTextVNode(" 立即使用 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-774426ab"]]);
export {
  index as default
};
//# sourceMappingURL=index-BGaVLi89.js.map

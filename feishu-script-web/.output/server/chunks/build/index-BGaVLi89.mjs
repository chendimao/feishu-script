import { c as connection_default, s as setting_default, a as ElIcon, E as ElButton } from './el-button-DEhYiaTs.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
import './base-B7YREFnB.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@ctrl/tinycolor';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-774426ab><div class="page-header" data-v-774426ab><h2 data-v-774426ab>\u53EF\u7528\u811A\u672C</h2><p data-v-774426ab>\u9009\u62E9\u4E0B\u65B9\u811A\u672C\u5F00\u59CB\u6267\u884C\u4EFB\u52A1</p></div><div class="scripts-grid" data-v-774426ab><!--[-->`);
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
              _push2(` \u7ACB\u5373\u4F7F\u7528 `);
            } else {
              return [
                createTextVNode(" \u7ACB\u5373\u4F7F\u7528 ")
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

export { index as default };
//# sourceMappingURL=index-BGaVLi89.mjs.map

import { E as ElButton } from './el-button-CXDf1alm.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { j as arrow_left_default } from './index-DJ0OzA4C.mjs';
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
  __name: "script",
  __ssrInlineRender: true,
  props: {
    title: { default: "\u811A\u672C\u5DE5\u5177" },
    description: { default: "" }
  },
  setup(__props) {
    const router = useRouter();
    function goBack() {
      router.push("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "script-layout" }, _attrs))} data-v-dc3b4d43><div class="script-header" data-v-dc3b4d43><div class="header-content" data-v-dc3b4d43>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        icon: unref(arrow_left_default),
        onClick: goBack,
        class: "back-button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u8FD4\u56DE\u9996\u9875 `);
          } else {
            return [
              createTextVNode(" \u8FD4\u56DE\u9996\u9875 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="header-info" data-v-dc3b4d43><h1 class="script-title" data-v-dc3b4d43>${ssrInterpolate(__props.title || "\u811A\u672C\u5DE5\u5177")}</h1>`);
      if (__props.description) {
        _push(`<p class="script-description" data-v-dc3b4d43>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="script-content" data-v-dc3b4d43>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/script.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const script = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc3b4d43"]]);

export { script as default };
//# sourceMappingURL=script-BqlVgA16.mjs.map

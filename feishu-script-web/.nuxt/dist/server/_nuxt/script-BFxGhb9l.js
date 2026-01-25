import { E as ElButton } from "./el-button-CsUG_eNa.js";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { j as arrow_left_default } from "./index-DJ0OzA4C.js";
import { u as useRouter, _ as _export_sfc } from "../server.mjs";
import "lodash-unified";
import "@vue/shared";
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
  __name: "script",
  __ssrInlineRender: true,
  props: {
    title: { default: "脚本工具" },
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
            _push2(` 返回首页 `);
          } else {
            return [
              createTextVNode(" 返回首页 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="header-info" data-v-dc3b4d43><h1 class="script-title" data-v-dc3b4d43>${ssrInterpolate(__props.title || "脚本工具")}</h1>`);
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
export {
  script as default
};
//# sourceMappingURL=script-BFxGhb9l.js.map

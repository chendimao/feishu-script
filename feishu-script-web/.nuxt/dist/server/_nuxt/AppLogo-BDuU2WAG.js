import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    showText: { type: Boolean, default: true },
    showSubtitle: { type: Boolean, default: false },
    showBackground: { type: Boolean, default: true },
    appName: { default: "多维表格脚本管理" },
    subtitle: { default: "让工作更高效" }
  },
  setup(__props) {
    const props = __props;
    const logoSize = computed(() => {
      switch (props.size) {
        case "small":
          return 32;
        case "large":
          return 80;
        default:
          return 48;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-logo", { compact: __props.size === "small" }]
      }, _attrs))} data-v-b1e0aba9><svg${ssrRenderAttr("width", unref(logoSize))}${ssrRenderAttr("height", unref(logoSize))} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg" data-v-b1e0aba9><circle cx="32" cy="32" r="30"${ssrRenderAttr("fill", __props.showBackground ? "url(#gradient)" : "transparent")} stroke="#E5E7EB" stroke-width="2" data-v-b1e0aba9></circle><defs data-v-b1e0aba9><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" data-v-b1e0aba9><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#3B82F6", "stop-opacity": "1" })}" data-v-b1e0aba9></stop><stop offset="100%" style="${ssrRenderStyle({ "stop-color": "#1E40AF", "stop-opacity": "1" })}" data-v-b1e0aba9></stop></linearGradient></defs><g transform="translate(16, 16)" data-v-b1e0aba9><rect x="2" y="2" width="28" height="28" rx="4"${ssrRenderAttr("fill", __props.showBackground ? "white" : "#F8FAFC")}${ssrRenderAttr("fill-opacity", __props.showBackground ? "0.9" : "1")} data-v-b1e0aba9></rect><line x1="2" y1="12" x2="30" y2="12" stroke="#3B82F6" stroke-width="1.5" data-v-b1e0aba9></line><line x1="2" y1="20" x2="30" y2="20" stroke="#3B82F6" stroke-width="1.5" data-v-b1e0aba9></line><line x1="12" y1="2" x2="12" y2="30" stroke="#3B82F6" stroke-width="1.5" data-v-b1e0aba9></line><line x1="21" y1="2" x2="21" y2="30" stroke="#3B82F6" stroke-width="1.5" data-v-b1e0aba9></line><g transform="translate(22, 21)" data-v-b1e0aba9><circle cx="4" cy="4" r="2.5" fill="#10B981" data-v-b1e0aba9></circle><text x="4" y="6" text-anchor="middle" font-family="monospace" font-size="4" fill="white" font-weight="bold" data-v-b1e0aba9>S</text></g><circle cx="7" cy="7" r="1.5" fill="#6366F1" data-v-b1e0aba9></circle><circle cx="16.5" cy="7" r="1.5" fill="#8B5CF6" data-v-b1e0aba9></circle><circle cx="7" cy="16" r="1.5" fill="#EC4899" data-v-b1e0aba9></circle><circle cx="16.5" cy="16" r="1.5" fill="#F59E0B" data-v-b1e0aba9></circle></g></svg>`);
      if (__props.showText) {
        _push(`<div class="logo-text" data-v-b1e0aba9>`);
        if (__props.showSubtitle) {
          _push(`<span class="app-subtitle" data-v-b1e0aba9>${ssrInterpolate(__props.subtitle)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1e0aba9"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=AppLogo-BDuU2WAG.js.map

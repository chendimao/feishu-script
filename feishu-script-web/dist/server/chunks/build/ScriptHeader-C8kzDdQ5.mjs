import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRouter } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScriptHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    metrics: { default: () => ({
      processed: "1,234",
      success: "98%",
      time: "2.3s"
    }) }
  },
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "script-header" }, _attrs))} data-v-53bd2e09><nav class="nav-bar" data-v-53bd2e09><button class="back-btn" data-v-53bd2e09><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-53bd2e09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-53bd2e09></path></svg><span class="hidden sm:inline" data-v-53bd2e09>\u8FD4\u56DE</span></button></nav><div class="title-section" data-v-53bd2e09><div class="title-content" data-v-53bd2e09><h1 class="page-title" data-v-53bd2e09>${ssrInterpolate(__props.title)}</h1>`);
      if (__props.description) {
        _push(`<p class="page-subtitle" data-v-53bd2e09>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ScriptHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53bd2e09"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ScriptHeader-C8kzDdQ5.mjs.map

import { _ as __nuxt_component_0 } from './ScriptHeader-C8kzDdQ5.mjs';
import { _ as _export_sfc, d as useRoute, e as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const scriptId = computed(() => route.params.id);
    const scriptNames = {
      "url-expander": "URL \u77ED\u94FE\u63A5\u6269\u5C55\u5668",
      "data-processor": "\u6570\u636E\u5904\u7406\u5668",
      "batch-export": "\u6279\u91CF\u5BFC\u51FA\u5DE5\u5177",
      "custom-script": "\u81EA\u5B9A\u4E49\u811A\u672C"
    };
    const scriptName = computed(() => scriptNames[scriptId.value] || "\u811A\u672C\u6267\u884C");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScriptHeader = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "script-page" }, _attrs))} data-v-71eee96c>`);
      _push(ssrRenderComponent(_component_ScriptHeader, {
        title: unref(scriptName),
        description: "\u52A8\u6001\u811A\u672C\u6267\u884C\u9875\u9762"
      }, null, _parent));
      _push(`<div class="page-content" data-v-71eee96c>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/scripts/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71eee96c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cu_9AVgR.mjs.map

import { _ as __nuxt_component_0 } from "./ScriptHeader-C8kzDdQ5.js";
import { d as useRoute, e as __nuxt_component_1, _ as _export_sfc } from "../server.mjs";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const scriptId = computed(() => route.params.id);
    const scriptNames = {
      "url-expander": "URL 短链接扩展器",
      "data-processor": "数据处理器",
      "batch-export": "批量导出工具",
      "custom-script": "自定义脚本"
    };
    const scriptName = computed(() => scriptNames[scriptId.value] || "脚本执行");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScriptHeader = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "script-page" }, _attrs))} data-v-71eee96c>`);
      _push(ssrRenderComponent(_component_ScriptHeader, {
        title: unref(scriptName),
        description: "动态脚本执行页面"
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Cu_9AVgR.js.map

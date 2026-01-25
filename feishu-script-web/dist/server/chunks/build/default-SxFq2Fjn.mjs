import { defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, renderSlot, useSlots, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, useSSRContext } from 'vue';
import { w as withInstall, a as withNoopInstall, b as buildProps, _ as _export_sfc$1 } from './base-B7YREFnB.mjs';
import { _ as _export_sfc, b as useRuntimeConfig, f as useNamespace } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import 'lodash-unified';
import '@vue/shared';
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

const _sfc_main$5 = defineComponent({
  ...{
    name: "ElContainer"
  },
  __name: "container",
  props: buildProps({
    direction: {
      type: String,
      values: ["horizontal", "vertical"]
    }
  }),
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "section",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", isVertical.value)])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Container = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);
const _sfc_main$4 = defineComponent({
  ...{
    name: "ElAside"
  },
  __name: "aside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(
      () => props.width ? ns.cssVarBlock({ width: props.width }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "aside",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Aside = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);
const _sfc_main$3 = defineComponent({
  ...{
    name: "ElFooter"
  },
  __name: "footer",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(
      () => props.height ? ns.cssVarBlock({ height: props.height }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "footer",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Footer = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElHeader"
  },
  __name: "header",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "header",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Header = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElMain"
  },
  __name: "main",
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "main",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Main = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);
const ElContainer = withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main
});
withNoopInstall(Aside);
withNoopInstall(Footer);
const ElHeader = withNoopInstall(Header);
const ElMain = withNoopInstall(Main);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = ElContainer;
      const _component_el_header = ElHeader;
      const _component_el_main = ElMain;
      _push(ssrRenderComponent(_component_el_container, mergeProps({ class: "layout-container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_header, { class: "layout-header" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="header-content" data-v-1818cc78${_scopeId2}><h1 class="app-title" data-v-1818cc78${_scopeId2}>${ssrInterpolate(unref(config).public.appName)}</h1></div>`);
                } else {
                  return [
                    createVNode("div", { class: "header-content" }, [
                      createVNode("h1", { class: "app-title" }, toDisplayString(unref(config).public.appName), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_main, { class: "layout-main" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_header, { class: "layout-header" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "header-content" }, [
                    createVNode("h1", { class: "app-title" }, toDisplayString(unref(config).public.appName), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_main, { class: "layout-main" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1818cc78"]]);

export { _default as default };
//# sourceMappingURL=default-SxFq2Fjn.mjs.map

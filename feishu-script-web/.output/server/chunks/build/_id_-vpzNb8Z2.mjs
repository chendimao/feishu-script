import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode, createElementVNode, createBlock, resolveDynamicComponent, normalizeStyle, useSSRContext } from 'vue';
import { E as ElButton, a as ElIcon, r as refresh_default, u as useLocale, b as back_default, i as iconPropType } from './el-button-DEhYiaTs.mjs';
import { w as withInstall, _ as _export_sfc$1, b as buildProps, d as definePropType } from './base-B7YREFnB.mjs';
import { _ as _export_sfc, e as useRoute, u as useRouter, f as __nuxt_component_3, d as useNamespace } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '@vue/shared';
import 'lodash-unified';
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

const dividerProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  }
});
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElDivider"
  },
  __name: "divider",
  props: dividerProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("divider");
    const dividerStyle = computed(() => {
      return ns.cssVar({
        "border-style": props.borderStyle
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).m(_ctx.direction)]),
          style: normalizeStyle(dividerStyle.value),
          role: "separator"
        },
        [
          _ctx.$slots.default && _ctx.direction !== "vertical" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("text"), unref(ns).is(_ctx.contentPosition)])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        6
      );
    };
  }
});
var Divider = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);
const ElDivider = withInstall(Divider);
const pageHeaderProps = buildProps({
  icon: {
    type: iconPropType,
    default: () => back_default
  },
  title: String,
  content: {
    type: String,
    default: ""
  }
});
const pageHeaderEmits = {
  back: () => true
};
const _hoisted_1 = ["aria-label"];
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElPageHeader"
  },
  __name: "page-header",
  props: pageHeaderProps,
  emits: pageHeaderEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("page-header");
    function handleClick() {
      emit("back");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is("contentful", !!_ctx.$slots.default),
            {
              [unref(ns).m("has-breadcrumb")]: !!_ctx.$slots.breadcrumb,
              [unref(ns).m("has-extra")]: !!_ctx.$slots.extra
            }
          ])
        },
        [
          _ctx.$slots.breadcrumb ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("breadcrumb"))
            },
            [
              renderSlot(_ctx.$slots, "breadcrumb")
            ],
            2
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("header"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("left"))
                },
                [
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(unref(ns).e("back")),
                      role: "button",
                      tabindex: "0",
                      onClick: handleClick
                    },
                    [
                      _ctx.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        "aria-label": _ctx.title || unref(t)("el.pageHeader.title"),
                        class: normalizeClass(unref(ns).e("icon"))
                      }, [
                        renderSlot(_ctx.$slots, "icon", {}, () => [
                          _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
                            ]),
                            _: 1
                          })) : createCommentVNode("v-if", true)
                        ])
                      ], 10, _hoisted_1)) : createCommentVNode("v-if", true),
                      createElementVNode(
                        "div",
                        {
                          class: normalizeClass(unref(ns).e("title"))
                        },
                        [
                          renderSlot(_ctx.$slots, "title", {}, () => [
                            createTextVNode(
                              toDisplayString(_ctx.title || unref(t)("el.pageHeader.title")),
                              1
                            )
                          ])
                        ],
                        2
                      )
                    ],
                    2
                  ),
                  createVNode(unref(ElDivider), { direction: "vertical" }),
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(unref(ns).e("content"))
                    },
                    [
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        createTextVNode(
                          toDisplayString(_ctx.content),
                          1
                        )
                      ])
                    ],
                    2
                  )
                ],
                2
              ),
              _ctx.$slots.extra ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("extra"))
                },
                [
                  renderSlot(_ctx.$slots, "extra")
                ],
                2
              )) : createCommentVNode("v-if", true)
            ],
            2
          ),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("main"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var PageHeader = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/page-header/src/page-header.vue"]]);
const ElPageHeader = withInstall(PageHeader);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const scriptId = computed(() => route.params.id);
    const scriptNames = {
      "url-expander": "URL \u77ED\u94FE\u63A5\u6269\u5C55\u5668",
      "data-processor": "\u6570\u636E\u5904\u7406\u5668",
      "batch-export": "\u6279\u91CF\u5BFC\u51FA\u5DE5\u5177",
      "custom-script": "\u81EA\u5B9A\u4E49\u811A\u672C"
    };
    const scriptName = computed(() => scriptNames[scriptId.value] || "\u811A\u672C\u6267\u884C");
    function goBack() {
      router.push("/");
    }
    function refreshData() {
      (void 0).location.reload();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_page_header = ElPageHeader;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_NuxtPage = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "script-page" }, _attrs))} data-v-9fcb071f><div class="page-header" data-v-9fcb071f>`);
      _push(ssrRenderComponent(_component_el_page_header, { onBack: goBack }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="page-title" data-v-9fcb071f${_scopeId}>${ssrInterpolate(unref(scriptName))}</span>`);
          } else {
            return [
              createVNode("span", { class: "page-title" }, toDisplayString(unref(scriptName)), 1)
            ];
          }
        }),
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              plain: "",
              onClick: refreshData
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(refresh_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(refresh_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` \u5237\u65B0 `);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(refresh_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u5237\u65B0 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: refreshData
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_default))
                    ]),
                    _: 1
                  }),
                  createTextVNode(" \u5237\u65B0 ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="page-content" data-v-9fcb071f>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fcb071f"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-vpzNb8Z2.mjs.map

import { E as ElCard, a as ElInput } from './el-input-CX7pz-al.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-DOxNyFnk.mjs';
import { E as ElButton } from './el-button-DEhYiaTs.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './base-B7YREFnB.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import 'async-validator';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    const appToken = ref("test_app_token");
    const tableId = ref("test_table_id");
    const loading = ref(false);
    const result = ref("");
    async function testConnection() {
      loading.value = true;
      result.value = "";
      try {
        if (!appToken.value || !tableId.value) {
          result.value = "\u8BF7\u8F93\u5165 App Token \u548C Table ID";
          return;
        }
        const testResponse = await $fetch("/api/test");
        result.value = `\u57FA\u672CAPI\u6D4B\u8BD5:
${JSON.stringify(testResponse, null, 2)}

`;
        const fieldsResponse = await $fetch("/api/feishu/fields", {
          method: "POST",
          body: {
            appToken: appToken.value,
            tableId: tableId.value
          }
        });
        result.value += `\u5B57\u6BB5API\u6D4B\u8BD5:
${JSON.stringify(fieldsResponse, null, 2)}

`;
        const recordsResponse = await $fetch("/api/feishu/records", {
          method: "POST",
          body: {
            appToken: appToken.value,
            tableId: tableId.value,
            limit: 3
          }
        });
        result.value += `\u8BB0\u5F55API\u6D4B\u8BD5:
${JSON.stringify(recordsResponse, null, 2)}

`;
        const urlResponse = await $fetch("/api/url-expand/batch", {
          method: "POST",
          body: {
            urls: ["https://bit.ly/test1", "https://t.cn/test2"]
          }
        });
        result.value += `URL\u6269\u5C55API\u6D4B\u8BD5:
${JSON.stringify(urlResponse, null, 2)}`;
      } catch (error) {
        result.value = `\u9519\u8BEF: ${error}`;
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-page" }, _attrs))} data-v-2f8b9dae><h1 data-v-2f8b9dae>\u6D4B\u8BD5\u9875\u9762</h1>`);
      _push(ssrRenderComponent(_component_el_card, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-2f8b9dae${_scopeId}>\u57FA\u672C\u529F\u80FD\u6D4B\u8BD5</h3>`);
          } else {
            return [
              createVNode("h3", null, "\u57FA\u672C\u529F\u80FD\u6D4B\u8BD5")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, { "label-width": "120px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "App Token" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: appToken.value,
                          "onUpdate:modelValue": ($event) => appToken.value = $event,
                          placeholder: "\u8F93\u5165app token"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: appToken.value,
                            "onUpdate:modelValue": ($event) => appToken.value = $event,
                            placeholder: "\u8F93\u5165app token"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "Table ID" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: tableId.value,
                          "onUpdate:modelValue": ($event) => tableId.value = $event,
                          placeholder: "\u8F93\u5165table id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: tableId.value,
                            "onUpdate:modelValue": ($event) => tableId.value = $event,
                            placeholder: "\u8F93\u5165table id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          onClick: testConnection,
                          loading: loading.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` \u6D4B\u8BD5\u8FDE\u63A5 `);
                            } else {
                              return [
                                createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: testConnection,
                            loading: loading.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "App Token" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: appToken.value,
                          "onUpdate:modelValue": ($event) => appToken.value = $event,
                          placeholder: "\u8F93\u5165app token"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "Table ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: tableId.value,
                          "onUpdate:modelValue": ($event) => tableId.value = $event,
                          placeholder: "\u8F93\u5165table id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: testConnection,
                          loading: loading.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (result.value) {
              _push2(`<div class="result" data-v-2f8b9dae${_scopeId}><h4 data-v-2f8b9dae${_scopeId}>\u6D4B\u8BD5\u7ED3\u679C\uFF1A</h4><pre data-v-2f8b9dae${_scopeId}>${ssrInterpolate(result.value)}</pre></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_el_form, { "label-width": "120px" }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "App Token" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: appToken.value,
                        "onUpdate:modelValue": ($event) => appToken.value = $event,
                        placeholder: "\u8F93\u5165app token"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "Table ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: tableId.value,
                        "onUpdate:modelValue": ($event) => tableId.value = $event,
                        placeholder: "\u8F93\u5165table id"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: testConnection,
                        loading: loading.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              result.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "result"
              }, [
                createVNode("h4", null, "\u6D4B\u8BD5\u7ED3\u679C\uFF1A"),
                createVNode("pre", null, toDisplayString(result.value), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f8b9dae"]]);

export { test as default };
//# sourceMappingURL=test-ZXf8v1C9.mjs.map

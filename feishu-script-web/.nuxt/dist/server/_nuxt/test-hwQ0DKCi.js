import { _ as __nuxt_component_0 } from "./ScriptHeader-C8kzDdQ5.js";
import { E as ElCard, a as ElInput } from "./el-input-DBN7URoB.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-JOuj7hdo.js";
import { E as ElButton } from "./el-button-CsUG_eNa.js";
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "lodash-unified";
import "./index-DJ0OzA4C.js";
import "@vue/shared";
import "async-validator";
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
          result.value = "请输入 App Token 和 Table ID";
          return;
        }
        const testResponse = await $fetch("/api/test");
        result.value = `基本API测试:
${JSON.stringify(testResponse, null, 2)}

`;
        const fieldsResponse = await $fetch("/api/feishu/fields", {
          method: "POST",
          body: {
            appToken: appToken.value,
            tableId: tableId.value
          }
        });
        result.value += `字段API测试:
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
        result.value += `记录API测试:
${JSON.stringify(recordsResponse, null, 2)}

`;
        const urlResponse = await $fetch("/api/url-expand/batch", {
          method: "POST",
          body: {
            urls: ["https://bit.ly/test1", "https://t.cn/test2"]
          }
        });
        result.value += `URL解析API测试:
${JSON.stringify(urlResponse, null, 2)}`;
      } catch (error) {
        result.value = `错误: ${error}`;
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScriptHeader = __nuxt_component_0;
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-page" }, _attrs))} data-v-72284798>`);
      _push(ssrRenderComponent(_component_ScriptHeader, {
        title: "🧪 API测试工具",
        description: "测试各种API接口的功能和响应"
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_card, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-72284798${_scopeId}>基本功能测试</h3>`);
          } else {
            return [
              createVNode("h3", null, "基本功能测试")
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
                          placeholder: "输入app token"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: appToken.value,
                            "onUpdate:modelValue": ($event) => appToken.value = $event,
                            placeholder: "输入app token"
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
                          placeholder: "输入table id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: tableId.value,
                            "onUpdate:modelValue": ($event) => tableId.value = $event,
                            placeholder: "输入table id"
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
                              _push5(` 测试连接 `);
                            } else {
                              return [
                                createTextVNode(" 测试连接 ")
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
                              createTextVNode(" 测试连接 ")
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
                          placeholder: "输入app token"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "Table ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: tableId.value,
                          "onUpdate:modelValue": ($event) => tableId.value = $event,
                          placeholder: "输入table id"
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
                            createTextVNode(" 测试连接 ")
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
              _push2(`<div class="result" data-v-72284798${_scopeId}><h4 data-v-72284798${_scopeId}>测试结果：</h4><pre data-v-72284798${_scopeId}>${ssrInterpolate(result.value)}</pre></div>`);
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
                        placeholder: "输入app token"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "Table ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: tableId.value,
                        "onUpdate:modelValue": ($event) => tableId.value = $event,
                        placeholder: "输入table id"
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
                          createTextVNode(" 测试连接 ")
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
                createVNode("h4", null, "测试结果："),
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
const test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-72284798"]]);
export {
  test as default
};
//# sourceMappingURL=test-hwQ0DKCi.js.map

import { E as ElAlert, a as ElSelect, b as ElOption, c as ElRadioGroup, d as ElRadio } from './el-radio-group-D81v3l6w.mjs';
import { E as ElCard, a as ElInput } from './el-input-DBN7URoB.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-JOuj7hdo.mjs';
import { E as ElButton } from './el-button-CsUG_eNa.mjs';
import { E as ElCollapse, a as ElCollapseItem } from './el-collapse-item-BD9RZOSV.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '@vueuse/core';
import '@popperjs/core';
import '@vue/shared';
import 'lodash-unified';
import './index-DJ0OzA4C.mjs';
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
  __name: "url-expander-simple",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const processing = ref(false);
    const feishuConfig = reactive({
      appToken: "",
      tableId: ""
    });
    const tableFields = ref([]);
    const selectedFieldId = ref("");
    const replaceMode = ref("newColumn");
    const newColumnName = ref("\u6269\u5C55\u540E\u94FE\u63A5");
    const urlPattern = ref("bit.ly,t.cn,tinyurl.com,short.link");
    const textFields = computed(
      () => tableFields.value.filter(
        (field) => ["text", "singleText", "richText"].includes(field.fieldType)
      )
    );
    async function testFunction() {
      processing.value = true;
      try {
        console.log("\u6D4B\u8BD5\u51FD\u6570\u6267\u884C");
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        console.log("\u6D4B\u8BD5\u5B8C\u6210");
      } finally {
        processing.value = false;
      }
    }
    function onFieldChange() {
      console.log("\u5B57\u6BB5\u53D8\u5316:", selectedFieldId.value);
    }
    async function loadTableData() {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        tableFields.value = [
          { fieldId: "fld1", fieldName: "\u77ED\u94FE\u63A5", fieldType: "text" },
          { fieldId: "fld2", fieldName: "\u6807\u9898", fieldType: "text" },
          { fieldId: "fld3", fieldName: "\u521B\u5EFA\u65F6\u95F4", fieldType: "date" }
        ];
        console.log("\u8868\u683C\u6570\u636E\u52A0\u8F7D\u5B8C\u6210");
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      const _component_el_button = ElButton;
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "url-expander-page" }, _attrs))} data-v-f4c54c93><div class="page-header" data-v-f4c54c93><h2 data-v-f4c54c93>\u77ED\u94FE\u63A5\u6279\u91CF\u6269\u5C55\u5DE5\u5177</h2><p class="page-description" data-v-f4c54c93>\u81EA\u52A8\u83B7\u53D6\u8868\u683C\u4FE1\u606F\uFF0C\u6279\u91CF\u5C06\u77ED\u94FE\u63A5\u8F6C\u6362\u4E3A\u5B9E\u9645\u94FE\u63A5</p></div><div class="connection-status" data-v-f4c54c93>`);
      if (!feishuConfig.appToken) {
        _push(ssrRenderComponent(_component_el_alert, {
          title: "\u63D0\u793A",
          type: "info",
          description: "\u8BF7\u5728\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u73AF\u5883\u4E2D\u4F7F\u7528\u6B64\u529F\u80FD\uFF0C\u6216\u786E\u4FDDURL\u5305\u542B\u6B63\u786E\u7684\u53C2\u6570",
          "show-icon": "",
          class: "status-alert"
        }, null, _parent));
      } else if (feishuConfig.appToken && feishuConfig.tableId) {
        _push(ssrRenderComponent(_component_el_alert, {
          title: "\u2713 \u5DF2\u8FDE\u63A5\u5230\u98DE\u4E66\u8868\u683C",
          type: "success",
          description: `\u8868\u683CID: ${feishuConfig.tableId}`,
          "show-icon": "",
          class: "status-alert"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (feishuConfig.appToken && feishuConfig.tableId) {
        _push(`<div class="main-content" data-v-f4c54c93><div class="operation-grid" data-v-f4c54c93><div class="operation-item" data-v-f4c54c93>`);
        _push(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-f4c54c93${_scopeId}><div class="card-icon" data-v-f4c54c93${_scopeId}>\u{1F3AF}</div><h3 data-v-f4c54c93${_scopeId}>\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("div", { class: "card-icon" }, "\u{1F3AF}"),
                  createVNode("h3", null, "\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-content" data-v-f4c54c93${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form, {
                "label-width": "80px",
                "label-position": "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u57DF\u540D\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="help-text" data-v-f4c54c93${_scopeId3}> \u{1F4A1} \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL </div>`);
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: urlPattern.value,
                              "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                              placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u57DF\u540D\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                              clearable: "",
                              size: "large"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "help-text" }, " \u{1F4A1} \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u57DF\u540D\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "help-text" }, " \u{1F4A1} \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "card-content" }, [
                  createVNode(_component_el_form, {
                    "label-width": "80px",
                    "label-position": "top"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u57DF\u540D\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "help-text" }, " \u{1F4A1} \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="operation-item" data-v-f4c54c93>`);
        _push(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-f4c54c93${_scopeId}><div class="card-icon" data-v-f4c54c93${_scopeId}>\u{1F4CB}</div><h3 data-v-f4c54c93${_scopeId}>\u9009\u62E9\u64CD\u4F5C\u5217</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("div", { class: "card-icon" }, "\u{1F4CB}"),
                  createVNode("h3", null, "\u9009\u62E9\u64CD\u4F5C\u5217")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-content" data-v-f4c54c93${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form, {
                "label-width": "80px",
                "label-position": "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                            filterable: "",
                            size: "large",
                            style: { "width": "100%" },
                            onChange: onFieldChange
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(textFields.value, (field) => {
                                  _push5(ssrRenderComponent(_component_el_option, {
                                    key: field.fieldId,
                                    label: field.fieldName,
                                    value: field.fieldId
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: field.fieldId,
                                      label: field.fieldName,
                                      value: field.fieldId
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_select, {
                              modelValue: selectedFieldId.value,
                              "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                              placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                              filterable: "",
                              size: "large",
                              style: { "width": "100%" },
                              onChange: onFieldChange
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: field.fieldId,
                                    label: field.fieldName,
                                    value: field.fieldId
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u66FF\u6362\u6A21\u5F0F" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_radio_group, {
                            modelValue: replaceMode.value,
                            "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                            size: "large"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_radio, { value: "inplace" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`\u539F\u5217\u66FF\u6362`);
                                    } else {
                                      return [
                                        createTextVNode("\u539F\u5217\u66FF\u6362")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_el_radio, { value: "newColumn" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`\u65B0\u589E\u5217`);
                                    } else {
                                      return [
                                        createTextVNode("\u65B0\u589E\u5217")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_radio, { value: "inplace" }, {
                                    default: withCtx(() => [
                                      createTextVNode("\u539F\u5217\u66FF\u6362")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_el_radio, { value: "newColumn" }, {
                                    default: withCtx(() => [
                                      createTextVNode("\u65B0\u589E\u5217")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_radio_group, {
                              modelValue: replaceMode.value,
                              "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                              size: "large"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_radio, { value: "inplace" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u539F\u5217\u66FF\u6362")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "newColumn" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u65B0\u589E\u5217")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (replaceMode.value === "newColumn") {
                      _push3(ssrRenderComponent(_component_el_form_item, { label: "\u65B0\u5217\u540D\u79F0" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_input, {
                              modelValue: newColumnName.value,
                              "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                              placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                              clearable: "",
                              size: "large"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_input, {
                                modelValue: newColumnName.value,
                                "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                                placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                                clearable: "",
                                size: "large"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                            filterable: "",
                            size: "large",
                            style: { "width": "100%" },
                            onChange: onFieldChange
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: field.fieldId,
                                  label: field.fieldName,
                                  value: field.fieldId
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u66FF\u6362\u6A21\u5F0F" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio_group, {
                            modelValue: replaceMode.value,
                            "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "inplace" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u539F\u5217\u66FF\u6362")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "newColumn" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u65B0\u589E\u5217")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      replaceMode.value === "newColumn" ? (openBlock(), createBlock(_component_el_form_item, {
                        key: 0,
                        label: "\u65B0\u5217\u540D\u79F0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: newColumnName.value,
                            "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                            placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "card-content" }, [
                  createVNode(_component_el_form, {
                    "label-width": "80px",
                    "label-position": "top"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                            filterable: "",
                            size: "large",
                            style: { "width": "100%" },
                            onChange: onFieldChange
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: field.fieldId,
                                  label: field.fieldName,
                                  value: field.fieldId
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u66FF\u6362\u6A21\u5F0F" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio_group, {
                            modelValue: replaceMode.value,
                            "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "inplace" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u539F\u5217\u66FF\u6362")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "newColumn" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u65B0\u589E\u5217")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      replaceMode.value === "newColumn" ? (openBlock(), createBlock(_component_el_form_item, {
                        key: 0,
                        label: "\u65B0\u5217\u540D\u79F0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: newColumnName.value,
                            "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                            placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="action-section" data-v-f4c54c93>`);
        _push(ssrRenderComponent(_component_el_card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-buttons" data-v-f4c54c93${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                size: "large",
                onClick: testFunction,
                loading: processing.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u{1F517} \u6D4B\u8BD5\u8FDE\u63A5 `);
                  } else {
                    return [
                      createTextVNode(" \u{1F517} \u6D4B\u8BD5\u8FDE\u63A5 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "action-buttons" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    onClick: testFunction,
                    loading: processing.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F517} \u6D4B\u8BD5\u8FDE\u63A5 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!feishuConfig.appToken || !feishuConfig.tableId) {
        _push(ssrRenderComponent(_component_el_collapse, { class: "manual-input" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_collapse_item, {
                title: "\u624B\u52A8\u8F93\u5165\u8868\u683C\u4FE1\u606F\uFF08\u5907\u7528\u9009\u9879\uFF09",
                name: "manual"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form, {
                      model: feishuConfig,
                      "label-width": "120px",
                      class: "config-form"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "App Token" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  modelValue: feishuConfig.appToken,
                                  "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u7684 app_token",
                                  clearable: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    modelValue: feishuConfig.appToken,
                                    "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                                    placeholder: "\u8BF7\u8F93\u5165\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u7684 app_token",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "Table ID" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  modelValue: feishuConfig.tableId,
                                  "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u8868\u7684 table_id",
                                  clearable: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    modelValue: feishuConfig.tableId,
                                    "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                                    placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u8868\u7684 table_id",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "primary",
                                  onClick: loadTableData,
                                  loading: loading.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` \u52A0\u8F7D\u8868\u683C\u6570\u636E `);
                                    } else {
                                      return [
                                        createTextVNode(" \u52A0\u8F7D\u8868\u683C\u6570\u636E ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    onClick: loadTableData,
                                    loading: loading.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" \u52A0\u8F7D\u8868\u683C\u6570\u636E ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "App Token" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: feishuConfig.appToken,
                                  "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u7684 app_token",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "Table ID" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: feishuConfig.tableId,
                                  "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u8868\u7684 table_id",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  onClick: loadTableData,
                                  loading: loading.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u52A0\u8F7D\u8868\u683C\u6570\u636E ")
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form, {
                        model: feishuConfig,
                        "label-width": "120px",
                        class: "config-form"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "App Token" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: feishuConfig.appToken,
                                "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                                placeholder: "\u8BF7\u8F93\u5165\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u7684 app_token",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "Table ID" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: feishuConfig.tableId,
                                "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                                placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u8868\u7684 table_id",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: loadTableData,
                                loading: loading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u52A0\u8F7D\u8868\u683C\u6570\u636E ")
                                ]),
                                _: 1
                              }, 8, ["loading"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_collapse_item, {
                  title: "\u624B\u52A8\u8F93\u5165\u8868\u683C\u4FE1\u606F\uFF08\u5907\u7528\u9009\u9879\uFF09",
                  name: "manual"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form, {
                      model: feishuConfig,
                      "label-width": "120px",
                      class: "config-form"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "App Token" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: feishuConfig.appToken,
                              "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                              placeholder: "\u8BF7\u8F93\u5165\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u7684 app_token",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "Table ID" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: feishuConfig.tableId,
                              "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                              placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u8868\u7684 table_id",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "primary",
                              onClick: loadTableData,
                              loading: loading.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u52A0\u8F7D\u8868\u683C\u6570\u636E ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/scripts/url-expander-simple.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const urlExpanderSimple = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4c54c93"]]);

export { urlExpanderSimple as default };
//# sourceMappingURL=url-expander-simple-Cv3cHxQ8.mjs.map

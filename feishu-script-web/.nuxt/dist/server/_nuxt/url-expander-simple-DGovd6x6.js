import { E as ElAlert, a as ElSelect, b as ElOption, c as ElRadioGroup, d as ElRadio } from "./el-radio-group-rSbCBU2-.js";
import { E as ElCard, a as ElInput } from "./el-input-CX7pz-al.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-DOxNyFnk.js";
import { E as ElButton } from "./el-button-DEhYiaTs.js";
import { E as ElCollapse, a as ElCollapseItem } from "./el-collapse-item-JsMPhz3g.js";
import "./base-B7YREFnB.js";
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@popperjs/core";
import "@vue/shared";
import "lodash-unified";
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
    const newColumnName = ref("扩展后链接");
    const urlPattern = ref("bit.ly,t.cn,tinyurl.com,short.link");
    const textFields = computed(
      () => tableFields.value.filter(
        (field) => ["text", "singleText", "richText"].includes(field.fieldType)
      )
    );
    async function testFunction() {
      processing.value = true;
      try {
        console.log("测试函数执行");
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        console.log("测试完成");
      } finally {
        processing.value = false;
      }
    }
    function onFieldChange() {
      console.log("字段变化:", selectedFieldId.value);
    }
    async function loadTableData() {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        tableFields.value = [
          { fieldId: "fld1", fieldName: "短链接", fieldType: "text" },
          { fieldId: "fld2", fieldName: "标题", fieldType: "text" },
          { fieldId: "fld3", fieldName: "创建时间", fieldType: "date" }
        ];
        console.log("表格数据加载完成");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "url-expander-page" }, _attrs))} data-v-18da5ae0><div class="page-header" data-v-18da5ae0><h2 data-v-18da5ae0>短链接批量扩展工具</h2><p class="page-description" data-v-18da5ae0>自动获取表格信息，批量将短链接转换为实际链接</p></div><div class="connection-status" data-v-18da5ae0>`);
      if (!feishuConfig.appToken) {
        _push(ssrRenderComponent(_component_el_alert, {
          title: "提示",
          type: "info",
          description: "请在飞书多维表格环境中使用此功能，或确保URL包含正确的参数",
          "show-icon": "",
          class: "status-alert"
        }, null, _parent));
      } else if (feishuConfig.appToken && feishuConfig.tableId) {
        _push(ssrRenderComponent(_component_el_alert, {
          title: "✓ 已连接到飞书表格",
          type: "success",
          description: `表格ID: ${feishuConfig.tableId}`,
          "show-icon": "",
          class: "status-alert"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (feishuConfig.appToken && feishuConfig.tableId) {
        _push(`<div class="main-content" data-v-18da5ae0><div class="operation-grid" data-v-18da5ae0><div class="operation-item" data-v-18da5ae0>`);
        _push(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-18da5ae0${_scopeId}><div class="card-icon" data-v-18da5ae0${_scopeId}>🎯</div><h3 data-v-18da5ae0${_scopeId}>短链接匹配规则</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("div", { class: "card-icon" }, "🎯"),
                  createVNode("h3", null, "短链接匹配规则")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-content" data-v-18da5ae0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form, {
                "label-width": "80px",
                "label-position": "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "匹配规则" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "输入短链接域名，如：bit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="help-text" data-v-18da5ae0${_scopeId3}> 💡 支持多个域名，用逗号分隔。留空则匹配所有URL </div>`);
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: urlPattern.value,
                              "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                              placeholder: "输入短链接域名，如：bit.ly, t.cn, tinyurl.com",
                              clearable: "",
                              size: "large"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "help-text" }, " 💡 支持多个域名，用逗号分隔。留空则匹配所有URL ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form_item, { label: "匹配规则" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "输入短链接域名，如：bit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "help-text" }, " 💡 支持多个域名，用逗号分隔。留空则匹配所有URL ")
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
                      createVNode(_component_el_form_item, { label: "匹配规则" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: urlPattern.value,
                            "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                            placeholder: "输入短链接域名，如：bit.ly, t.cn, tinyurl.com",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "help-text" }, " 💡 支持多个域名，用逗号分隔。留空则匹配所有URL ")
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
        _push(`</div><div class="operation-item" data-v-18da5ae0>`);
        _push(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-18da5ae0${_scopeId}><div class="card-icon" data-v-18da5ae0${_scopeId}>📋</div><h3 data-v-18da5ae0${_scopeId}>选择操作列</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("div", { class: "card-icon" }, "📋"),
                  createVNode("h3", null, "选择操作列")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-content" data-v-18da5ae0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form, {
                "label-width": "80px",
                "label-position": "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "短链接列" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "选择包含短链接的列",
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
                              placeholder: "选择包含短链接的列",
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
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "替换模式" }, {
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
                                      _push6(`原列替换`);
                                    } else {
                                      return [
                                        createTextVNode("原列替换")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_el_radio, { value: "newColumn" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`新增列`);
                                    } else {
                                      return [
                                        createTextVNode("新增列")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_radio, { value: "inplace" }, {
                                    default: withCtx(() => [
                                      createTextVNode("原列替换")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_el_radio, { value: "newColumn" }, {
                                    default: withCtx(() => [
                                      createTextVNode("新增列")
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
                                    createTextVNode("原列替换")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "newColumn" }, {
                                  default: withCtx(() => [
                                    createTextVNode("新增列")
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
                      _push3(ssrRenderComponent(_component_el_form_item, { label: "新列名称" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_input, {
                              modelValue: newColumnName.value,
                              "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                              placeholder: "输入新列名称",
                              clearable: "",
                              size: "large"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_input, {
                                modelValue: newColumnName.value,
                                "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                                placeholder: "输入新列名称",
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
                      createVNode(_component_el_form_item, { label: "短链接列" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "选择包含短链接的列",
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
                      createVNode(_component_el_form_item, { label: "替换模式" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio_group, {
                            modelValue: replaceMode.value,
                            "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "inplace" }, {
                                default: withCtx(() => [
                                  createTextVNode("原列替换")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "newColumn" }, {
                                default: withCtx(() => [
                                  createTextVNode("新增列")
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
                        label: "新列名称"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: newColumnName.value,
                            "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                            placeholder: "输入新列名称",
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
                      createVNode(_component_el_form_item, { label: "短链接列" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: selectedFieldId.value,
                            "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                            placeholder: "选择包含短链接的列",
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
                      createVNode(_component_el_form_item, { label: "替换模式" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio_group, {
                            modelValue: replaceMode.value,
                            "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "inplace" }, {
                                default: withCtx(() => [
                                  createTextVNode("原列替换")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "newColumn" }, {
                                default: withCtx(() => [
                                  createTextVNode("新增列")
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
                        label: "新列名称"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: newColumnName.value,
                            "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                            placeholder: "输入新列名称",
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
        _push(`</div></div><div class="action-section" data-v-18da5ae0>`);
        _push(ssrRenderComponent(_component_el_card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-buttons" data-v-18da5ae0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                size: "large",
                onClick: testFunction,
                loading: processing.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 🔗 测试连接 `);
                  } else {
                    return [
                      createTextVNode(" 🔗 测试连接 ")
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
                      createTextVNode(" 🔗 测试连接 ")
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
                title: "手动输入表格信息（备用选项）",
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
                                  placeholder: "请输入飞书多维表格的 app_token",
                                  clearable: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    modelValue: feishuConfig.appToken,
                                    "onUpdate:modelValue": ($event) => feishuConfig.appToken = $event,
                                    placeholder: "请输入飞书多维表格的 app_token",
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
                                  placeholder: "请输入数据表的 table_id",
                                  clearable: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    modelValue: feishuConfig.tableId,
                                    "onUpdate:modelValue": ($event) => feishuConfig.tableId = $event,
                                    placeholder: "请输入数据表的 table_id",
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
                                      _push6(` 加载表格数据 `);
                                    } else {
                                      return [
                                        createTextVNode(" 加载表格数据 ")
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
                                      createTextVNode(" 加载表格数据 ")
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
                                  placeholder: "请输入飞书多维表格的 app_token",
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
                                  placeholder: "请输入数据表的 table_id",
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
                                    createTextVNode(" 加载表格数据 ")
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
                                placeholder: "请输入飞书多维表格的 app_token",
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
                                placeholder: "请输入数据表的 table_id",
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
                                  createTextVNode(" 加载表格数据 ")
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
                  title: "手动输入表格信息（备用选项）",
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
                              placeholder: "请输入飞书多维表格的 app_token",
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
                              placeholder: "请输入数据表的 table_id",
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
                                createTextVNode(" 加载表格数据 ")
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
const urlExpanderSimple = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18da5ae0"]]);
export {
  urlExpanderSimple as default
};
//# sourceMappingURL=url-expander-simple-DGovd6x6.js.map

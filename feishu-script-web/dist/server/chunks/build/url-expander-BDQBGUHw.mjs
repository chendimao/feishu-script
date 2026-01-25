import { E as ElAlert, a as ElSelect, b as ElOption, c as ElRadioGroup, d as ElRadio, e as ElTag } from './el-radio-group-Bt7L-KaK.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, toDisplayString, readonly, provide, resolveDynamicComponent, normalizeStyle, normalizeClass, renderSlot, inject, createElementBlock, createElementVNode, useSSRContext } from 'vue';
import { w as withInstall, _ as _export_sfc$1, b as buildProps, d as definePropType } from './base-B7YREFnB.mjs';
import { _ as _export_sfc, f as useNamespace, i as isNumber, g as useId } from './server.mjs';
import { E as ElCard, a as ElInput, m as mutable } from './el-input-C0wHdJAW.mjs';
import { isObject } from '@vue/shared';
import { E as ElForm, a as ElFormItem } from './el-form-item-BhOSByOu.mjs';
import { E as ElTable, a as ElTableColumn, b as ElProgress, c as ElMessage } from './index-DSA7_tCw.mjs';
import { E as ElButton, u as useLocale, a as addUnit } from './el-button-CXDf1alm.mjs';
import { E as ElCollapse, a as ElCollapseItem } from './el-collapse-item-DKAMjHSF.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import '@vueuse/core';
import '@popperjs/core';
import 'lodash-unified';
import './index-DJ0OzA4C.mjs';
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
import 'async-validator';
import 'normalize-wheel-es';
import '@ctrl/tinycolor';

const rowContextKey = /* @__PURE__ */ Symbol("rowContextKey");
const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  align: {
    type: String,
    values: RowAlign
  }
});
const _sfc_main$4 = defineComponent({
  ...{
    name: "ElRow"
  },
  __name: "row",
  props: rowProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, !!props.align)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(rowKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Row = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);
const ElRow = withInstall(Row);
const colProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
const _sfc_main$3 = defineComponent({
  ...{
    name: "ElCol"
  },
  __name: "col",
  props: colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const ns = useNamespace("col");
    const style = computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === "span")
            classes.push(ns.b(`${props[prop]}`));
          else if (size > 0)
            classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`)
            );
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(colKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Col = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
const ElCol = withInstall(Col);
const _hoisted_1$1 = {
  viewBox: "0 0 79 86",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
const _hoisted_2$1 = ["id"];
const _hoisted_3 = ["stop-color"];
const _hoisted_4 = ["stop-color"];
const _hoisted_5 = ["id"];
const _hoisted_6 = ["stop-color"];
const _hoisted_7 = ["stop-color"];
const _hoisted_8 = ["id"];
const _hoisted_9 = {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
};
const _hoisted_10 = { transform: "translate(-1268.000000, -535.000000)" };
const _hoisted_11 = { transform: "translate(1268.000000, 535.000000)" };
const _hoisted_12 = ["fill"];
const _hoisted_13 = ["fill"];
const _hoisted_14 = { transform: "translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)" };
const _hoisted_15 = ["fill"];
const _hoisted_16 = ["fill"];
const _hoisted_17 = ["fill"];
const _hoisted_18 = ["fill"];
const _hoisted_19 = ["fill"];
const _hoisted_20 = { transform: "translate(53.000000, 45.000000)" };
const _hoisted_21 = ["fill", "xlink:href"];
const _hoisted_22 = ["fill", "mask"];
const _hoisted_23 = ["fill"];
const _sfc_main$2 = defineComponent({
  ...{
    name: "ImgEmpty"
  },
  __name: "img-empty",
  setup(__props) {
    const ns = useNamespace("empty");
    const id = useId();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$1, [
        createElementVNode("defs", null, [
          createElementVNode("linearGradient", {
            id: `linearGradient-1-${unref(id)}`,
            x1: "38.8503086%",
            y1: "0%",
            x2: "61.1496914%",
            y2: "100%"
          }, [
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-1")})`,
              offset: "0%"
            }, null, 8, _hoisted_3),
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-4")})`,
              offset: "100%"
            }, null, 8, _hoisted_4)
          ], 8, _hoisted_2$1),
          createElementVNode("linearGradient", {
            id: `linearGradient-2-${unref(id)}`,
            x1: "0%",
            y1: "9.5%",
            x2: "100%",
            y2: "90.5%"
          }, [
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-1")})`,
              offset: "0%"
            }, null, 8, _hoisted_6),
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-6")})`,
              offset: "100%"
            }, null, 8, _hoisted_7)
          ], 8, _hoisted_5),
          createElementVNode("rect", {
            id: `path-3-${unref(id)}`,
            x: "0",
            y: "0",
            width: "17",
            height: "36"
          }, null, 8, _hoisted_8)
        ]),
        createElementVNode("g", _hoisted_9, [
          createElementVNode("g", _hoisted_10, [
            createElementVNode("g", _hoisted_11, [
              createElementVNode("path", {
                d: "M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z",
                fill: `var(${unref(ns).cssVarBlockName("fill-color-3")})`
              }, null, 8, _hoisted_12),
              createElementVNode("polygon", {
                fill: `var(${unref(ns).cssVarBlockName("fill-color-7")})`,
                transform: "translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) ",
                points: "13 58 53 58 42 45 2 45"
              }, null, 8, _hoisted_13),
              createElementVNode("g", _hoisted_14, [
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-7")})`,
                  transform: "translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) ",
                  points: "2.84078316e-14 3 18 3 23 7 5 7"
                }, null, 8, _hoisted_15),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-5")})`,
                  points: "-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43"
                }, null, 8, _hoisted_16),
                createElementVNode("rect", {
                  fill: `url(#linearGradient-1-${unref(id)})`,
                  transform: "translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) ",
                  x: "38",
                  y: "7",
                  width: "17",
                  height: "36"
                }, null, 8, _hoisted_17),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-2")})`,
                  transform: "translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) ",
                  points: "24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12"
                }, null, 8, _hoisted_18)
              ]),
              createElementVNode("rect", {
                fill: `url(#linearGradient-2-${unref(id)})`,
                x: "13",
                y: "45",
                width: "40",
                height: "36"
              }, null, 8, _hoisted_19),
              createElementVNode("g", _hoisted_20, [
                createElementVNode("use", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-8")})`,
                  transform: "translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) ",
                  "xlink:href": `#path-3-${unref(id)}`
                }, null, 8, _hoisted_21),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-9")})`,
                  mask: `url(#mask-4-${unref(id)})`,
                  transform: "translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) ",
                  points: "7 0 24 0 20 18 7 16.5"
                }, null, 8, _hoisted_22)
              ]),
              createElementVNode("polygon", {
                fill: `var(${unref(ns).cssVarBlockName("fill-color-2")})`,
                transform: "translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) ",
                points: "62 45 79 45 70 58 53 58"
              }, null, 8, _hoisted_23)
            ])
          ])
        ])
      ]);
    };
  }
});
var ImgEmpty = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/empty/src/img-empty.vue"]]);
const emptyProps = buildProps({
  image: {
    type: String,
    default: ""
  },
  imageSize: Number,
  description: {
    type: String,
    default: ""
  }
});
const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElEmpty"
  },
  __name: "empty",
  props: emptyProps,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const ns = useNamespace("empty");
    const emptyDescription = computed(
      () => props.description || t("el.table.emptyText")
    );
    const imageStyle = computed(() => ({
      width: addUnit(props.imageSize)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("image")),
              style: normalizeStyle(imageStyle.value)
            },
            [
              _ctx.image ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: _ctx.image,
                ondragstart: "return false"
              }, null, 8, _hoisted_1)) : renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
                createVNode(ImgEmpty)
              ])
            ],
            6
          ),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("description"))
            },
            [
              _ctx.$slots.description ? renderSlot(_ctx.$slots, "description", { key: 0 }) : (openBlock(), createElementBlock(
                "p",
                _hoisted_2,
                toDisplayString(emptyDescription.value),
                1
              ))
            ],
            2
          ),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("bottom"))
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
var Empty = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/empty/src/empty.vue"]]);
const ElEmpty = withInstall(Empty);
const useFeishu = () => {
  const isFeishuEnv = ref(false);
  const selection = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const checkFeishuEnvironment = () => {
    return isFeishuEnv.value;
  };
  const initFeishuSDK = async () => {
    return false;
  };
  const getCurrentSelection = async () => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      const currentSelection = await bitable.base.getSelection();
      selection.value = currentSelection;
      return currentSelection;
    } catch (err) {
      console.error("\u83B7\u53D6\u9009\u62E9\u4FE1\u606F\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u83B7\u53D6\u9009\u62E9\u4FE1\u606F\u5931\u8D25";
      return null;
    } finally {
      loading.value = false;
    }
  };
  const getTableFields = async (tableId) => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      let table;
      if (tableId) {
        table = await bitable.base.getTable(tableId);
      } else {
        table = await bitable.base.getActiveTable();
      }
      const fieldList = await table.getFieldList();
      const fields = [];
      for (const field of fieldList) {
        const fieldMeta = await field.getMeta();
        fields.push({
          fieldId: fieldMeta.id,
          fieldName: fieldMeta.name,
          fieldType: fieldMeta.type
        });
      }
      return fields;
    } catch (err) {
      console.error("\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u83B7\u53D6\u8868\u683C\u5B57\u6BB5\u5931\u8D25";
      return [];
    } finally {
      loading.value = false;
    }
  };
  const getTableRecords = async (tableId, viewId) => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      let table;
      if (tableId) {
        table = await bitable.base.getTable(tableId);
      } else {
        table = await bitable.base.getActiveTable();
      }
      const recordList = await table.getRecords({
        pageSize: 100,
        // 限制每次获取的记录数
        viewId
      });
      const records = recordList.records.map((record) => ({
        recordId: record.recordId,
        fields: record.fields
      }));
      return records;
    } catch (err) {
      console.error("\u83B7\u53D6\u8868\u683C\u8BB0\u5F55\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u83B7\u53D6\u8868\u683C\u8BB0\u5F55\u5931\u8D25";
      return [];
    } finally {
      loading.value = false;
    }
  };
  const updateRecord = async (recordId, fields, tableId) => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      let table;
      if (tableId) {
        table = await bitable.base.getTable(tableId);
      } else {
        table = await bitable.base.getActiveTable();
      }
      await table.setRecord(recordId, fields);
      return true;
    } catch (err) {
      console.error("\u66F4\u65B0\u8BB0\u5F55\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u66F4\u65B0\u8BB0\u5F55\u5931\u8D25";
      return false;
    } finally {
      loading.value = false;
    }
  };
  const batchUpdateRecords = async (updates, tableId) => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      let table;
      if (tableId) {
        table = await bitable.base.getTable(tableId);
      } else {
        table = await bitable.base.getActiveTable();
      }
      const results = [];
      for (const update of updates) {
        try {
          await table.setRecord(update.recordId, update.fields);
          results.push({ success: true, recordId: update.recordId });
        } catch (err) {
          results.push({
            success: false,
            recordId: update.recordId,
            error: err instanceof Error ? err.message : "\u66F4\u65B0\u5931\u8D25"
          });
        }
      }
      return results;
    } catch (err) {
      console.error("\u6279\u91CF\u66F4\u65B0\u8BB0\u5F55\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u6279\u91CF\u66F4\u65B0\u8BB0\u5F55\u5931\u8D25";
      return [];
    } finally {
      loading.value = false;
    }
  };
  const createField = async (fieldName, fieldType, tableId) => {
    loading.value = true;
    error.value = null;
    try {
      const bitable = await initFeishuSDK();
      if (!bitable) {
        throw new Error("\u98DE\u4E66SDK\u4E0D\u53EF\u7528");
      }
      let table;
      if (tableId) {
        table = await bitable.base.getTable(tableId);
      } else {
        table = await bitable.base.getActiveTable();
      }
      const field = await table.addField({
        type: fieldType,
        name: fieldName
      });
      return field;
    } catch (err) {
      console.error("\u521B\u5EFA\u5B57\u6BB5\u5931\u8D25:", err);
      error.value = err instanceof Error ? err.message : "\u521B\u5EFA\u5B57\u6BB5\u5931\u8D25";
      return null;
    } finally {
      loading.value = false;
    }
  };
  const getIdsFromUrl = () => {
    return { baseId: null, tableId: null };
  };
  const autoGetTableInfo = async () => {
    if (!checkFeishuEnvironment()) {
      const urlIds = getIdsFromUrl();
      if (urlIds.baseId && urlIds.tableId) {
        return {
          baseId: urlIds.baseId,
          tableId: urlIds.tableId,
          source: "url"
        };
      }
      error.value = "\u8BF7\u5728\u98DE\u4E66\u591A\u7EF4\u8868\u683C\u73AF\u5883\u4E2D\u4F7F\u7528\u6B64\u529F\u80FD";
      return null;
    }
    const currentSelection = await getCurrentSelection();
    if (currentSelection && currentSelection.baseId && currentSelection.tableId) {
      return {
        baseId: currentSelection.baseId,
        tableId: currentSelection.tableId,
        source: "sdk"
      };
    }
    error.value = "\u65E0\u6CD5\u83B7\u53D6\u8868\u683C\u4FE1\u606F\uFF0C\u8BF7\u786E\u4FDD\u5DF2\u9009\u62E9\u8868\u683C";
    return null;
  };
  return {
    // 状态
    isFeishuEnv: readonly(isFeishuEnv),
    selection: readonly(selection),
    loading: readonly(loading),
    error: readonly(error),
    // 方法
    checkFeishuEnvironment,
    initFeishuSDK,
    getCurrentSelection,
    getTableFields,
    getTableRecords,
    updateRecord,
    batchUpdateRecords,
    createField,
    getIdsFromUrl,
    autoGetTableInfo
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "url-expander",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const processing = ref(false);
    const feishuSDK = useFeishu();
    const feishuConfig = reactive({
      appToken: "",
      tableId: ""
    });
    const tableFields = ref([]);
    const previewRecords = ref([]);
    const selectedFieldId = ref("");
    const replaceMode = ref("newColumn");
    const newColumnName = ref("\u6269\u5C55\u540E\u94FE\u63A5");
    const urlPattern = ref("bit.ly,t.cn,tinyurl.com,short.link");
    const matchingUrls = ref([]);
    const totalCount = ref(0);
    const processedCount = ref(0);
    const successCount = ref(0);
    const failedCount = ref(0);
    const processCompleted = ref(false);
    const writingBack = ref(false);
    const textFields = computed(
      () => tableFields.value.filter(
        (field) => ["text", "singleText", "richText"].includes(field.fieldType)
      )
    );
    const progressPercentage = computed(() => {
      if (totalCount.value === 0) return 0;
      return Math.round(processedCount.value / totalCount.value * 100);
    });
    const progressStatus = computed(() => {
      if (processCompleted.value) {
        return failedCount.value > 0 ? "warning" : "success";
      }
      return "";
    });
    const canStartProcess = computed(() => {
      return selectedFieldId.value && matchingUrls.value.length > 0 && !processing.value;
    });
    async function onFieldChange() {
      if (selectedFieldId.value) {
        await analyzeUrls();
      }
    }
    async function analyzeUrls() {
      if (!selectedFieldId.value || previewRecords.value.length === 0) {
        matchingUrls.value = [];
        return;
      }
      const patterns = urlPattern.value.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
      const matches = [];
      for (const record of previewRecords.value) {
        const url = record[selectedFieldId.value];
        if (typeof url === "string" && url.trim()) {
          const trimmedUrl = url.trim();
          const isMatch = patterns.length === 0 || patterns.some(
            (pattern) => trimmedUrl.includes(pattern)
          );
          if (isMatch && (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://"))) {
            matches.push({
              recordId: record.recordId || "",
              originalUrl: trimmedUrl,
              processing: false,
              expanded: false
            });
          }
        }
      }
      matchingUrls.value = matches;
      ElMessage.success(`\u627E\u5230 ${matches.length} \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5`);
    }
    async function loadTableData() {
      if (!feishuConfig.appToken || !feishuConfig.tableId) {
        ElMessage.error("\u8BF7\u5148\u83B7\u53D6\u8868\u683C\u4FE1\u606F");
        return;
      }
      loading.value = true;
      try {
        if (feishuSDK.isFeishuEnv.value) {
          const fields = await feishuSDK.getTableFields(feishuConfig.tableId);
          tableFields.value = fields;
        } else {
          const response = await $fetch("/api/feishu/fields", {
            method: "POST",
            body: {
              appToken: feishuConfig.appToken,
              tableId: feishuConfig.tableId
            }
          });
          tableFields.value = response.data || [];
        }
        if (tableFields.value.length > 0) {
          ElMessage.success("\u8868\u683C\u6570\u636E\u52A0\u8F7D\u6210\u529F");
        } else {
          ElMessage.warning("\u672A\u627E\u5230\u8868\u683C\u5B57\u6BB5");
        }
      } catch (error) {
        console.error("\u52A0\u8F7D\u8868\u683C\u6570\u636E\u5931\u8D25:", error);
        ElMessage.error("\u52A0\u8F7D\u8868\u683C\u6570\u636E\u5931\u8D25: " + (error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        loading.value = false;
      }
      if (tableFields.value.length > 0) {
        await loadAllRecords();
      }
    }
    async function loadAllRecords() {
      if (!feishuConfig.appToken || !feishuConfig.tableId) {
        return;
      }
      loading.value = true;
      try {
        if (feishuSDK.isFeishuEnv.value) {
          const records = await feishuSDK.getTableRecords(feishuConfig.tableId);
          previewRecords.value = records.map((record) => ({
            recordId: record.recordId,
            ...record.fields
          }));
        } else {
          const response = await $fetch("/api/feishu/records", {
            method: "POST",
            body: {
              appToken: feishuConfig.appToken,
              tableId: feishuConfig.tableId,
              limit: 1e3
              // 获取更多数据
            }
          });
          previewRecords.value = response.data || [];
        }
        if (selectedFieldId.value) {
          await analyzeUrls();
        }
      } catch (error) {
        console.error("\u52A0\u8F7D\u8BB0\u5F55\u5931\u8D25:", error);
        ElMessage.error("\u52A0\u8F7D\u8BB0\u5F55\u5931\u8D25: " + (error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        loading.value = false;
      }
    }
    async function startProcess() {
      if (!canStartProcess.value) {
        ElMessage.error("\u8BF7\u5148\u9009\u62E9\u5B57\u6BB5\u5E76\u786E\u4FDD\u6709\u5339\u914D\u7684\u77ED\u94FE\u63A5");
        return;
      }
      processing.value = true;
      processCompleted.value = false;
      totalCount.value = matchingUrls.value.length;
      processedCount.value = 0;
      successCount.value = 0;
      failedCount.value = 0;
      try {
        const urlsToExpand = matchingUrls.value.map((item) => item.originalUrl);
        const response = await $fetch("/api/url-expand/batch", {
          method: "POST",
          body: {
            urls: urlsToExpand
          }
        });
        if (response.success && response.results) {
          for (let i = 0; i < response.results.length; i++) {
            const result = response.results[i];
            const matchItem = matchingUrls.value[i];
            if (result.success && result.expandedUrl) {
              matchItem.expandedUrl = result.expandedUrl;
              matchItem.expanded = true;
              successCount.value++;
            } else {
              matchItem.error = result.error || "\u6269\u5C55\u5931\u8D25";
              failedCount.value++;
            }
            matchItem.processing = false;
            processedCount.value++;
          }
        }
        processCompleted.value = true;
        ElMessage.success(`\u5904\u7406\u5B8C\u6210\uFF01\u6210\u529F ${successCount.value} \u6761\uFF0C\u5931\u8D25 ${failedCount.value} \u6761`);
      } catch (error) {
        console.error("\u5904\u7406\u5931\u8D25:", error);
        ElMessage.error("\u5904\u7406\u5931\u8D25: " + (error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        processing.value = false;
      }
    }
    async function writeBackResults() {
      writingBack.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      } catch (error) {
        console.error("\u5199\u56DE\u5931\u8D25:", error);
      } finally {
        writingBack.value = false;
      }
    }
    function exportResults() {
      console.log("\u5BFC\u51FA\u7ED3\u679C");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_empty = ElEmpty;
      const _component_el_button = ElButton;
      const _component_el_progress = ElProgress;
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "url-expander-page" }, _attrs))} data-v-df25b716><div class="page-header" data-v-df25b716><h2 data-v-df25b716>\u77ED\u94FE\u63A5\u6279\u91CF\u6269\u5C55\u5DE5\u5177</h2><p class="page-description" data-v-df25b716>\u81EA\u52A8\u83B7\u53D6\u8868\u683C\u4FE1\u606F\uFF0C\u6279\u91CF\u5C06\u77ED\u94FE\u63A5\u8F6C\u6362\u4E3A\u5B9E\u9645\u94FE\u63A5</p></div><div class="connection-status" data-v-df25b716>`);
      if (!unref(feishuSDK).isFeishuEnv.value && !feishuConfig.appToken) {
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
      } else if (unref(feishuSDK).error.value) {
        _push(ssrRenderComponent(_component_el_alert, {
          title: "\u8FDE\u63A5\u5931\u8D25",
          type: "error",
          description: unref(feishuSDK).error.value,
          "show-icon": "",
          class: "status-alert"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (feishuConfig.appToken && feishuConfig.tableId) {
        _push(`<div class="main-content" data-v-df25b716>`);
        _push(ssrRenderComponent(_component_el_row, { gutter: 24 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h3 data-v-df25b716${_scopeId3}>\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219</h3>`);
                        } else {
                          return [
                            createVNode("h3", null, "\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form, { "label-width": "100px" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_input, {
                                        modelValue: urlPattern.value,
                                        "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                        placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                        clearable: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<div class="help-text" data-v-df25b716${_scopeId5}> \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL </div>`);
                                    } else {
                                      return [
                                        createVNode(_component_el_input, {
                                          modelValue: urlPattern.value,
                                          "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                          placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("div", { class: "help-text" }, " \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input, {
                                        modelValue: urlPattern.value,
                                        "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                        placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "help-text" }, " \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
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
                            createVNode(_component_el_form, { "label-width": "100px" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: urlPattern.value,
                                      "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                      placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "help-text" }, " \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                                  ]),
                                  _: 1
                                })
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
                      createVNode(_component_el_card, { class: "operation-card" }, {
                        header: withCtx(() => [
                          createVNode("h3", null, "\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_form, { "label-width": "100px" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: urlPattern.value,
                                    "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                    placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "help-text" }, " \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, { class: "operation-card" }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h3 data-v-df25b716${_scopeId3}>\u9009\u62E9\u64CD\u4F5C\u5217</h3>`);
                        } else {
                          return [
                            createVNode("h3", null, "\u9009\u62E9\u64CD\u4F5C\u5217")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form, { "label-width": "100px" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_select, {
                                        modelValue: selectedFieldId.value,
                                        "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                                        placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                                        filterable: "",
                                        style: { "width": "100%" },
                                        onChange: onFieldChange
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(textFields.value, (field) => {
                                              _push7(ssrRenderComponent(_component_el_option, {
                                                key: field.fieldId,
                                                label: field.fieldName,
                                                value: field.fieldId
                                              }, null, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_select, {
                                          modelValue: selectedFieldId.value,
                                          "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                                          placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                                          filterable: "",
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
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_el_form_item, { label: "\u66FF\u6362\u6A21\u5F0F" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_radio_group, {
                                        modelValue: replaceMode.value,
                                        "onUpdate:modelValue": ($event) => replaceMode.value = $event
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_el_radio, { value: "inplace" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`\u539F\u5217\u66FF\u6362`);
                                                } else {
                                                  return [
                                                    createTextVNode("\u539F\u5217\u66FF\u6362")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_el_radio, { value: "newColumn" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`\u65B0\u589E\u5217`);
                                                } else {
                                                  return [
                                                    createTextVNode("\u65B0\u589E\u5217")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_radio_group, {
                                          modelValue: replaceMode.value,
                                          "onUpdate:modelValue": ($event) => replaceMode.value = $event
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
                                }, _parent5, _scopeId4));
                                if (replaceMode.value === "newColumn") {
                                  _push5(ssrRenderComponent(_component_el_form_item, { label: "\u65B0\u5217\u540D\u79F0" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_el_input, {
                                          modelValue: newColumnName.value,
                                          "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                                          placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                                          clearable: ""
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_el_input, {
                                            modelValue: newColumnName.value,
                                            "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                                            placeholder: "\u8F93\u5165\u65B0\u5217\u540D\u79F0",
                                            clearable: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
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
                                        "onUpdate:modelValue": ($event) => replaceMode.value = $event
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
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form, { "label-width": "100px" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: selectedFieldId.value,
                                      "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                                      placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                                      filterable: "",
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
                                      "onUpdate:modelValue": ($event) => replaceMode.value = $event
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
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
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
                      createVNode(_component_el_card, { class: "operation-card" }, {
                        header: withCtx(() => [
                          createVNode("h3", null, "\u9009\u62E9\u64CD\u4F5C\u5217")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_form, { "label-width": "100px" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: selectedFieldId.value,
                                    "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                                    placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                                    filterable: "",
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
                                    "onUpdate:modelValue": ($event) => replaceMode.value = $event
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
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_col, { span: 12 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, { class: "operation-card" }, {
                      header: withCtx(() => [
                        createVNode("h3", null, "\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_form, { "label-width": "100px" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u5339\u914D\u89C4\u5219" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: urlPattern.value,
                                  "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                                  placeholder: "\u8F93\u5165\u77ED\u94FE\u63A5\u5339\u914D\u89C4\u5219\uFF0C\u5982\uFF1Abit.ly, t.cn, tinyurl.com",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "help-text" }, " \u652F\u6301\u591A\u4E2A\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u5219\u5339\u914D\u6240\u6709URL ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_col, { span: 12 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, { class: "operation-card" }, {
                      header: withCtx(() => [
                        createVNode("h3", null, "\u9009\u62E9\u64CD\u4F5C\u5217")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_form, { "label-width": "100px" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u77ED\u94FE\u63A5\u5217" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedFieldId.value,
                                  "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                                  placeholder: "\u9009\u62E9\u5305\u542B\u77ED\u94FE\u63A5\u7684\u5217",
                                  filterable: "",
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
                                  "onUpdate:modelValue": ($event) => replaceMode.value = $event
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
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (selectedFieldId.value) {
          _push(`<div class="preview-section" data-v-df25b716>`);
          _push(ssrRenderComponent(_component_el_card, null, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="preview-header" data-v-df25b716${_scopeId}><h3 data-v-df25b716${_scopeId}>\u6570\u636E\u9884\u89C8</h3>`);
                if (matchingUrls.value.length > 0) {
                  _push2(`<div class="preview-stats" data-v-df25b716${_scopeId}> \u627E\u5230 ${ssrInterpolate(matchingUrls.value.length)} \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5 </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "preview-header" }, [
                    createVNode("h3", null, "\u6570\u636E\u9884\u89C8"),
                    matchingUrls.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "preview-stats"
                    }, " \u627E\u5230 " + toDisplayString(matchingUrls.value.length) + " \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5 ", 1)) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (matchingUrls.value.length > 0) {
                  _push2(`<div class="matching-urls" data-v-df25b716${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_table, {
                    data: matchingUrls.value.slice(0, 10),
                    stripe: "",
                    "max-height": "300"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_el_table_column, {
                          label: "\u5E8F\u53F7",
                          type: "index",
                          width: "60"
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_el_table_column, {
                          label: "\u77ED\u94FE\u63A5",
                          prop: "originalUrl",
                          "min-width": "200",
                          "show-overflow-tooltip": ""
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_el_table_column, {
                          label: "\u72B6\u6001",
                          width: "100"
                        }, {
                          default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (row.expanded) {
                                _push4(ssrRenderComponent(_component_el_tag, { type: "success" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`\u5DF2\u6269\u5C55`);
                                    } else {
                                      return [
                                        createTextVNode("\u5DF2\u6269\u5C55")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else if (row.processing) {
                                _push4(ssrRenderComponent(_component_el_tag, { type: "warning" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`\u5904\u7406\u4E2D`);
                                    } else {
                                      return [
                                        createTextVNode("\u5904\u7406\u4E2D")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(ssrRenderComponent(_component_el_tag, { type: "info" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`\u5F85\u5904\u7406`);
                                    } else {
                                      return [
                                        createTextVNode("\u5F85\u5904\u7406")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              }
                            } else {
                              return [
                                row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                                  key: 0,
                                  type: "success"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5DF2\u6269\u5C55")
                                  ]),
                                  _: 1
                                })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                                  key: 1,
                                  type: "warning"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5904\u7406\u4E2D")
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock(_component_el_tag, {
                                  key: 2,
                                  type: "info"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5F85\u5904\u7406")
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_el_table_column, {
                          label: "\u6269\u5C55\u540E\u94FE\u63A5",
                          prop: "expandedUrl",
                          "min-width": "300",
                          "show-overflow-tooltip": ""
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_el_table_column, {
                            label: "\u5E8F\u53F7",
                            type: "index",
                            width: "60"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u77ED\u94FE\u63A5",
                            prop: "originalUrl",
                            "min-width": "200",
                            "show-overflow-tooltip": ""
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u72B6\u6001",
                            width: "100"
                          }, {
                            default: withCtx(({ row }) => [
                              row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                                key: 0,
                                type: "success"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5DF2\u6269\u5C55")
                                ]),
                                _: 1
                              })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                                key: 1,
                                type: "warning"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5904\u7406\u4E2D")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(_component_el_tag, {
                                key: 2,
                                type: "info"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5F85\u5904\u7406")
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u6269\u5C55\u540E\u94FE\u63A5",
                            prop: "expandedUrl",
                            "min-width": "300",
                            "show-overflow-tooltip": ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  if (matchingUrls.value.length > 10) {
                    _push2(`<div class="more-info" data-v-df25b716${_scopeId}> \u8FD8\u6709 ${ssrInterpolate(matchingUrls.value.length - 10)} \u6761\u6570\u636E... </div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else if (previewRecords.value.length > 0) {
                  _push2(`<div class="no-match" data-v-df25b716${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_empty, { description: "\u672A\u627E\u5230\u5339\u914D\u7684\u77ED\u94FE\u63A5" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  matchingUrls.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "matching-urls"
                  }, [
                    createVNode(_component_el_table, {
                      data: matchingUrls.value.slice(0, 10),
                      stripe: "",
                      "max-height": "300"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          label: "\u5E8F\u53F7",
                          type: "index",
                          width: "60"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u77ED\u94FE\u63A5",
                          prop: "originalUrl",
                          "min-width": "200",
                          "show-overflow-tooltip": ""
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u72B6\u6001",
                          width: "100"
                        }, {
                          default: withCtx(({ row }) => [
                            row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                              key: 0,
                              type: "success"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5DF2\u6269\u5C55")
                              ]),
                              _: 1
                            })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                              key: 1,
                              type: "warning"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5904\u7406\u4E2D")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(_component_el_tag, {
                              key: 2,
                              type: "info"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5F85\u5904\u7406")
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u6269\u5C55\u540E\u94FE\u63A5",
                          prop: "expandedUrl",
                          "min-width": "300",
                          "show-overflow-tooltip": ""
                        })
                      ]),
                      _: 1
                    }, 8, ["data"]),
                    matchingUrls.value.length > 10 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "more-info"
                    }, " \u8FD8\u6709 " + toDisplayString(matchingUrls.value.length - 10) + " \u6761\u6570\u636E... ", 1)) : createCommentVNode("", true)
                  ])) : previewRecords.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "no-match"
                  }, [
                    createVNode(_component_el_empty, { description: "\u672A\u627E\u5230\u5339\u914D\u7684\u77ED\u94FE\u63A5" })
                  ])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="action-section" data-v-df25b716>`);
        _push(ssrRenderComponent(_component_el_card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-buttons" data-v-df25b716${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                size: "large",
                onClick: startProcess,
                disabled: !canStartProcess.value,
                loading: processing.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u{1F517} ${ssrInterpolate(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5")}`);
                  } else {
                    return [
                      createTextVNode(" \u{1F517} " + toDisplayString(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (processCompleted.value) {
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "success",
                  size: "large",
                  onClick: writeBackResults,
                  loading: writingBack.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u2705 ${ssrInterpolate(replaceMode.value === "inplace" ? "\u5199\u56DE\u539F\u5217" : "\u521B\u5EFA\u65B0\u5217\u5E76\u5199\u56DE")}`);
                    } else {
                      return [
                        createTextVNode(" \u2705 " + toDisplayString(replaceMode.value === "inplace" ? "\u5199\u56DE\u539F\u5217" : "\u521B\u5EFA\u65B0\u5217\u5E76\u5199\u56DE"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (processCompleted.value) {
                _push2(ssrRenderComponent(_component_el_button, {
                  size: "large",
                  onClick: exportResults
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u{1F4BE} \u5BFC\u51FA\u7ED3\u679C `);
                    } else {
                      return [
                        createTextVNode(" \u{1F4BE} \u5BFC\u51FA\u7ED3\u679C ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (processing.value || processCompleted.value) {
                _push2(`<div class="progress-section" data-v-df25b716${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_progress, {
                  percentage: progressPercentage.value,
                  status: progressStatus.value,
                  "stroke-width": 8
                }, null, _parent2, _scopeId));
                _push2(`<p class="progress-info" data-v-df25b716${_scopeId}> \u5DF2\u5904\u7406 ${ssrInterpolate(processedCount.value)} / ${ssrInterpolate(totalCount.value)} \u6761\u8BB0\u5F55 `);
                if (processCompleted.value) {
                  _push2(`<span data-v-df25b716${_scopeId}> \uFF08\u6210\u529F ${ssrInterpolate(successCount.value)} \u6761\uFF0C\u5931\u8D25 ${ssrInterpolate(failedCount.value)} \u6761\uFF09 </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (replaceMode.value === "inplace" && selectedFieldId.value) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u6CE8\u610F",
                  type: "warning",
                  description: "\u539F\u5217\u66FF\u6362\u5C06\u76F4\u63A5\u8986\u76D6\u539F\u6570\u636E\uFF0C\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002\u5EFA\u8BAE\u5148\u5907\u4EFD\u6570\u636E\u3002",
                  "show-icon": "",
                  class: "warning-alert"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "action-buttons" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    onClick: startProcess,
                    disabled: !canStartProcess.value,
                    loading: processing.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F517} " + toDisplayString(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"]),
                  processCompleted.value ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "success",
                    size: "large",
                    onClick: writeBackResults,
                    loading: writingBack.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u2705 " + toDisplayString(replaceMode.value === "inplace" ? "\u5199\u56DE\u539F\u5217" : "\u521B\u5EFA\u65B0\u5217\u5E76\u5199\u56DE"), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])) : createCommentVNode("", true),
                  processCompleted.value ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    size: "large",
                    onClick: exportResults
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F4BE} \u5BFC\u51FA\u7ED3\u679C ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                processing.value || processCompleted.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "progress-section"
                }, [
                  createVNode(_component_el_progress, {
                    percentage: progressPercentage.value,
                    status: progressStatus.value,
                    "stroke-width": 8
                  }, null, 8, ["percentage", "status"]),
                  createVNode("p", { class: "progress-info" }, [
                    createTextVNode(" \u5DF2\u5904\u7406 " + toDisplayString(processedCount.value) + " / " + toDisplayString(totalCount.value) + " \u6761\u8BB0\u5F55 ", 1),
                    processCompleted.value ? (openBlock(), createBlock("span", { key: 0 }, " \uFF08\u6210\u529F " + toDisplayString(successCount.value) + " \u6761\uFF0C\u5931\u8D25 " + toDisplayString(failedCount.value) + " \u6761\uFF09 ", 1)) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                replaceMode.value === "inplace" && selectedFieldId.value ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "\u6CE8\u610F",
                  type: "warning",
                  description: "\u539F\u5217\u66FF\u6362\u5C06\u76F4\u63A5\u8986\u76D6\u539F\u6570\u636E\uFF0C\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002\u5EFA\u8BAE\u5148\u5907\u4EFD\u6570\u636E\u3002",
                  "show-icon": "",
                  class: "warning-alert"
                })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/scripts/url-expander.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const urlExpander = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-df25b716"]]);

export { urlExpander as default };
//# sourceMappingURL=url-expander-BDQBGUHw.mjs.map

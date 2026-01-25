import { _ as __nuxt_component_0 } from './ScriptHeader-C8kzDdQ5.mjs';
import { E as ElCard, a as ElInput } from './el-input-DBN7URoB.mjs';
import { a as ElSelect, b as ElOption, c as ElRadioGroup, d as ElRadio, e as ElTag, E as ElAlert } from './el-radio-group-D81v3l6w.mjs';
import { E as ElTable, a as ElTableColumn, b as ElProgress, c as ElMessage } from './index-DJKk1awE.mjs';
import { E as ElButton } from './el-button-CsUG_eNa.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createTextVNode, createVNode, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './v3-BpubyMc7.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vueuse/core';
import 'lodash-unified';
import './index-DJ0OzA4C.mjs';
import '@vue/shared';
import '@popperjs/core';
import 'normalize-wheel-es';
import '@ctrl/tinycolor';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "url-expander-plugin",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u77ED\u94FE\u63A5\u6269\u5C55\u5668 - \u591A\u7EF4\u8868\u683C\u811A\u672C\u7BA1\u7406"
    });
    let currentTable = null;
    const isReady = ref(false);
    ref("\u6B63\u5728\u521D\u59CB\u5316\u98DE\u4E66SDK...");
    ref("");
    const processing = ref(false);
    const tableFields = ref([]);
    const tableRecords = ref([]);
    const selectedFieldId = ref("");
    const replaceMode = ref("inplace");
    const newColumnName = ref("\u6269\u5C55\u540E\u94FE\u63A5");
    const urlPattern = ref("");
    const matchingUrls = ref([]);
    const totalCount = ref(0);
    const processedCount = ref(0);
    const successCount = ref(0);
    const failedCount = ref(0);
    const processCompleted = ref(false);
    const writingBack = ref(false);
    const retrying = ref(false);
    const textFields = computed(() => {
      console.log("\u6240\u6709\u5B57\u6BB5:", tableFields.value);
      return tableFields.value.filter((field) => {
        const urlCompatibleTypes = [
          "Text",
          "Url",
          "SingleLineText",
          "MultiLineText",
          "RichText",
          "Email",
          "Phone",
          "Link",
          "Formula",
          "Attachment",
          "SingleLink",
          "DuplexLink"
        ];
        const isUrlCompatible = urlCompatibleTypes.some(
          (type) => {
            var _a, _b, _c, _d;
            return field.type === type || ((_a = field.type) == null ? void 0 : _a.toString().toLowerCase().includes("text")) || ((_b = field.type) == null ? void 0 : _b.toString().toLowerCase().includes("url")) || ((_c = field.type) == null ? void 0 : _c.toString().toLowerCase().includes("link")) || ((_d = field.type) == null ? void 0 : _d.toString().toLowerCase().includes("rich"));
          }
        );
        console.log(`\u5B57\u6BB5 ${field.name} (${field.type}): ${isUrlCompatible ? "\u2713 \u53EF\u80FD\u5305\u542BURL" : "\u2717 \u4E0D\u652F\u6301"}`);
        return isUrlCompatible;
      });
    });
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
    function extractUrlFromField(fieldValue) {
      console.log("\u63D0\u53D6URL\uFF0C\u8F93\u5165\u503C:", fieldValue, typeof fieldValue);
      if (!fieldValue) return [];
      const urls = [];
      const urlRegex = /https?:\/\/[^\s\u4e00-\u9fff]+/g;
      function extractUrlsFromText(text) {
        const matches = text.match(urlRegex) || [];
        return matches.map((url) => url.trim());
      }
      if (typeof fieldValue === "string") {
        const extractedUrls = extractUrlsFromText(fieldValue);
        urls.push(...extractedUrls);
      }
      if (Array.isArray(fieldValue)) {
        for (const item of fieldValue) {
          if (typeof item === "string") {
            const extractedUrls = extractUrlsFromText(item);
            urls.push(...extractedUrls);
          } else if (item && typeof item === "object") {
            const possibleKeys = ["text", "link", "url", "href", "content", "value"];
            for (const key of possibleKeys) {
              if (item[key] && typeof item[key] === "string") {
                console.log(`\u4ECE ${key} \u5C5E\u6027\u63D0\u53D6\u6587\u672C:`, item[key]);
                const extractedUrls = extractUrlsFromText(item[key]);
                urls.push(...extractedUrls);
              }
            }
            if (item.content && Array.isArray(item.content)) {
              const nestedUrls = extractUrlFromField(item.content);
              urls.push(...nestedUrls);
            }
          }
        }
      }
      if (typeof fieldValue === "object") {
        const possibleKeys = ["text", "link", "url", "href", "content", "value"];
        for (const key of possibleKeys) {
          if (fieldValue[key]) {
            const extractedUrls = extractUrlFromField(fieldValue[key]);
            urls.push(...extractedUrls);
          }
        }
      }
      return [...new Set(urls)];
    }
    async function onFieldChange() {
      if (selectedFieldId.value) {
        await analyzeUrls();
      }
    }
    async function analyzeUrls() {
      console.log("\u5F00\u59CB\u5206\u6790URL\u5339\u914D");
      console.log("selectedFieldId:", selectedFieldId.value);
      console.log("tableRecords\u6570\u91CF:", tableRecords.value.length);
      console.log("urlPattern:", urlPattern.value);
      if (!selectedFieldId.value || tableRecords.value.length === 0) {
        console.log("\u6761\u4EF6\u4E0D\u6EE1\u8DB3\uFF0C\u9000\u51FA\u5206\u6790");
        matchingUrls.value = [];
        return;
      }
      const patterns = urlPattern.value.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
      console.log("\u89E3\u6790\u540E\u7684\u5339\u914D\u6A21\u5F0F:", patterns);
      const matches = [];
      for (let i = 0; i < tableRecords.value.length; i++) {
        const record = tableRecords.value[i];
        console.log(`\u68C0\u67E5\u8BB0\u5F55 ${i}:`, record);
        const fieldValue = record[selectedFieldId.value];
        console.log(`\u5B57\u6BB5 ${selectedFieldId.value} \u7684\u503C:`, fieldValue, typeof fieldValue);
        const extractedUrls = extractUrlFromField(fieldValue);
        console.log("\u63D0\u53D6\u5230\u7684URLs:", extractedUrls);
        for (const extractedUrl of extractedUrls) {
          if (extractedUrl && extractedUrl.trim()) {
            const trimmedUrl = extractedUrl.trim();
            console.log("\u5904\u7406\u540E\u7684URL:", trimmedUrl);
            const isValidUrl = trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://");
            console.log("\u662F\u5426\u4E3AHTTP/HTTPS:", isValidUrl);
            if (!isValidUrl) {
              console.log("\u8DF3\u8FC7\u975EURL\u5185\u5BB9:", trimmedUrl);
              continue;
            }
            let isMatch = true;
            if (patterns.length > 0) {
              isMatch = patterns.some((pattern) => {
                const match = trimmedUrl.includes(pattern);
                console.log(`\u6A21\u5F0F "${pattern}" \u5339\u914D\u7ED3\u679C:`, match);
                return match;
              });
            } else {
              console.log("\u6CA1\u6709\u8BBE\u7F6E\u5339\u914D\u6A21\u5F0F\uFF0C\u5339\u914D\u6240\u6709URL");
            }
            console.log("\u6700\u7EC8\u5339\u914D\u7ED3\u679C:", isMatch);
            if (isMatch) {
              console.log("\u6DFB\u52A0\u5230\u5339\u914D\u5217\u8868:", trimmedUrl);
              matches.push({
                recordId: record.recordId || `record_${i}`,
                originalUrl: trimmedUrl,
                processing: false,
                expanded: false
              });
            }
          }
        }
      }
      console.log("\u6700\u7EC8\u5339\u914D\u7ED3\u679C:", matches);
      matchingUrls.value = matches;
      ElMessage.success(`\u627E\u5230 ${matches.length} \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5`);
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
        for (let i = 0; i < matchingUrls.value.length; i++) {
          const item = matchingUrls.value[i];
          item.processing = true;
          try {
            console.log(`\u6B63\u5728\u6269\u5C55URL: ${item.originalUrl}`);
            const response = await $fetch("/api/url-expand/batch", {
              method: "POST",
              body: {
                urls: [item.originalUrl]
              }
            });
            console.log(`API\u54CD\u5E94:`, response);
            if (response.success && response.results && response.results[0]) {
              const result = response.results[0];
              console.log(`\u5904\u7406\u7ED3\u679C:`, result);
              if (result.success && result.expandedUrl) {
                item.expandedUrl = result.expandedUrl;
                item.expanded = true;
                successCount.value++;
                console.log(`\u2705 \u6269\u5C55\u6210\u529F: ${item.originalUrl} -> ${result.expandedUrl}`);
              } else {
                item.error = result.error || "\u6269\u5C55\u5931\u8D25";
                failedCount.value++;
                console.log(`\u274C \u6269\u5C55\u5931\u8D25: ${item.originalUrl}, \u9519\u8BEF: ${item.error}`);
              }
            } else {
              item.error = "API\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF";
              failedCount.value++;
              console.log(`\u274C API\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF:`, response);
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "\u6269\u5C55\u5931\u8D25";
            item.error = errorMessage;
            failedCount.value++;
            console.error(`\u274C \u8BF7\u6C42\u5931\u8D25: ${item.originalUrl}, \u9519\u8BEF:`, err);
          }
          item.processing = false;
          processedCount.value++;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        processCompleted.value = true;
        ElMessage.success(`\u5904\u7406\u5B8C\u6210\uFF01\u6210\u529F ${successCount.value} \u6761\uFF0C\u5931\u8D25 ${failedCount.value} \u6761`);
      } catch (error2) {
        console.error("\u5904\u7406\u5931\u8D25:", error2);
        ElMessage.error("\u5904\u7406\u5931\u8D25: " + (error2 instanceof Error ? error2.message : "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        processing.value = false;
      }
    }
    async function retryFailedUrls() {
      const failedItems = matchingUrls.value.filter((item) => !item.expanded && item.error);
      if (failedItems.length === 0) {
        ElMessage.info("\u6CA1\u6709\u9700\u8981\u91CD\u8BD5\u7684\u5931\u8D25\u9879");
        return;
      }
      retrying.value = true;
      try {
        ElMessage.info(`\u5F00\u59CB\u91CD\u8BD5 ${failedItems.length} \u4E2A\u5931\u8D25\u7684URL`);
        let retrySuccessCount = 0;
        let retryFailedCount = 0;
        for (let i = 0; i < failedItems.length; i++) {
          const item = failedItems[i];
          item.processing = true;
          item.error = void 0;
          try {
            console.log(`\u91CD\u8BD5\u6269\u5C55URL: ${item.originalUrl}`);
            const response = await $fetch("/api/url-expand/batch", {
              method: "POST",
              body: {
                urls: [item.originalUrl]
              }
            });
            console.log(`\u91CD\u8BD5API\u54CD\u5E94:`, response);
            if (response.success && response.results && response.results[0]) {
              const result = response.results[0];
              console.log(`\u91CD\u8BD5\u5904\u7406\u7ED3\u679C:`, result);
              if (result.success && result.expandedUrl) {
                item.expandedUrl = result.expandedUrl;
                item.expanded = true;
                retrySuccessCount++;
                successCount.value++;
                failedCount.value--;
                console.log(`\u2705 \u91CD\u8BD5\u6210\u529F: ${item.originalUrl} -> ${result.expandedUrl}`);
              } else {
                item.error = result.error || "\u91CD\u8BD5\u6269\u5C55\u5931\u8D25";
                retryFailedCount++;
                console.log(`\u274C \u91CD\u8BD5\u5931\u8D25: ${item.originalUrl}, \u9519\u8BEF: ${item.error}`);
              }
            } else {
              item.error = "API\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF";
              retryFailedCount++;
              console.log(`\u274C \u91CD\u8BD5API\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF:`, response);
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "\u91CD\u8BD5\u6269\u5C55\u5931\u8D25";
            item.error = errorMessage;
            retryFailedCount++;
            console.error(`\u274C \u91CD\u8BD5\u8BF7\u6C42\u5931\u8D25: ${item.originalUrl}, \u9519\u8BEF:`, err);
          }
          item.processing = false;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (retrySuccessCount > 0) {
          ElMessage.success(`\u91CD\u8BD5\u5B8C\u6210\uFF01\u6210\u529F ${retrySuccessCount} \u6761\uFF0C\u5931\u8D25 ${retryFailedCount} \u6761`);
        } else {
          ElMessage.warning(`\u91CD\u8BD5\u5B8C\u6210\uFF0C\u4F46\u6CA1\u6709\u6210\u529F\u7684\u9879\u76EE\u3002\u5931\u8D25 ${retryFailedCount} \u6761`);
        }
      } catch (error2) {
        console.error("\u91CD\u8BD5\u8FC7\u7A0B\u51FA\u9519:", error2);
        ElMessage.error("\u91CD\u8BD5\u8FC7\u7A0B\u51FA\u9519: " + (error2 instanceof Error ? error2.message : "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        retrying.value = false;
      }
    }
    async function writeBackResults() {
      {
        ElMessage.error("\u98DE\u4E66SDK\u672A\u521D\u59CB\u5316");
        return;
      }
    }
    function exportResults() {
      const results = matchingUrls.value.map((item) => ({
        \u539F\u94FE\u63A5: item.originalUrl,
        \u6269\u5C55\u540E\u94FE\u63A5: item.expandedUrl || "\u6269\u5C55\u5931\u8D25",
        \u72B6\u6001: item.expanded ? "\u6210\u529F" : "\u5931\u8D25",
        \u9519\u8BEF\u4FE1\u606F: item.error || ""
      }));
      const csv = [
        Object.keys(results[0]).join(","),
        ...results.map((row) => Object.values(row).join(","))
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = (void 0).createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `\u77ED\u94FE\u63A5\u6269\u5C55\u7ED3\u679C_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
      link.click();
      ElMessage.success("\u7ED3\u679C\u5DF2\u5BFC\u51FA");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScriptHeader = __nuxt_component_0;
      const _component_el_card = ElCard;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      const _component_el_progress = ElProgress;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "url-expander-plugin" }, _attrs))} data-v-5cb8d904>`);
      _push(ssrRenderComponent(_component_ScriptHeader, {
        title: "\u77ED\u94FE\u63A5\u6279\u91CF\u6269\u5C55\u5DE5\u5177",
        description: "\u667A\u80FD\u8BC6\u522B\u5E76\u6269\u5C55\u77ED\u94FE\u63A5\uFF0C\u652F\u6301\u6279\u91CF\u5904\u7406\u548C\u539F\u5217\u66FF\u6362"
      }, null, _parent));
      if (isReady.value && unref(currentTable)) {
        _push(`<div class="main-content" data-v-5cb8d904><div class="operation-grid" data-v-5cb8d904>`);
        _push(ssrRenderComponent(_component_el_card, { class: "config-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-5cb8d904${_scopeId}><div class="header-icon" data-v-5cb8d904${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb8d904${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-5cb8d904${_scopeId}></path></svg></div><div class="header-content" data-v-5cb8d904${_scopeId}><h3 class="header-title" data-v-5cb8d904${_scopeId}>\u5904\u7406\u914D\u7F6E</h3><p class="header-desc" data-v-5cb8d904${_scopeId}>\u8BBE\u7F6EURL\u5339\u914D\u89C4\u5219\u548C\u5904\u7406\u65B9\u5F0F</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("div", { class: "header-icon" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "header-content" }, [
                    createVNode("h3", { class: "header-title" }, "\u5904\u7406\u914D\u7F6E"),
                    createVNode("p", { class: "header-desc" }, "\u8BBE\u7F6EURL\u5339\u914D\u89C4\u5219\u548C\u5904\u7406\u65B9\u5F0F")
                  ])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="config-form" data-v-5cb8d904${_scopeId}><div class="form-group" data-v-5cb8d904${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: urlPattern.value,
                "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                placeholder: "\u5339\u914D\u89C4\u5219: bit.ly, t.cn (\u7559\u7A7A\u5339\u914D\u6240\u6709URL)",
                clearable: "",
                size: "default"
              }, null, _parent2, _scopeId));
              _push2(`<div class="help-text" data-v-5cb8d904${_scopeId}> \u591A\u4E2A\u57DF\u540D\u7528\u9017\u53F7\u5206\u9694\uFF0C\u7559\u7A7A\u5339\u914D\u6240\u6709URL </div></div><div class="form-group" data-v-5cb8d904${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_select, {
                modelValue: selectedFieldId.value,
                "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                placeholder: "\u9009\u62E9\u77ED\u94FE\u63A5\u5217",
                filterable: "",
                size: "default",
                style: { "width": "100%" },
                onChange: onFieldChange
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(textFields.value, (field) => {
                      _push3(ssrRenderComponent(_component_el_option, {
                        key: field.id,
                        label: field.name,
                        value: field.id
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: field.id,
                          label: field.name,
                          value: field.id
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (textFields.value.length === 0) {
                _push2(`<div class="help-text warning" data-v-5cb8d904${_scopeId}> \u672A\u627E\u5230\u6587\u672C\u7C7B\u578B\u7684\u5217 </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-group" data-v-5cb8d904${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_radio_group, {
                modelValue: replaceMode.value,
                "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                size: "default"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_radio, { value: "inplace" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u539F\u5217\u66FF\u6362`);
                        } else {
                          return [
                            createTextVNode("\u539F\u5217\u66FF\u6362")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio, { value: "newColumn" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u65B0\u589E\u5217`);
                        } else {
                          return [
                            createTextVNode("\u65B0\u589E\u5217")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (replaceMode.value === "newColumn") {
                _push2(`<div class="form-group" data-v-5cb8d904${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: newColumnName.value,
                  "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                  placeholder: "\u65B0\u5217\u540D\u79F0: \u6269\u5C55\u540E\u94FE\u63A5",
                  clearable: "",
                  size: "default"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "config-form" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode(_component_el_input, {
                      modelValue: urlPattern.value,
                      "onUpdate:modelValue": ($event) => urlPattern.value = $event,
                      placeholder: "\u5339\u914D\u89C4\u5219: bit.ly, t.cn (\u7559\u7A7A\u5339\u914D\u6240\u6709URL)",
                      clearable: "",
                      size: "default"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "help-text" }, " \u591A\u4E2A\u57DF\u540D\u7528\u9017\u53F7\u5206\u9694\uFF0C\u7559\u7A7A\u5339\u914D\u6240\u6709URL ")
                  ]),
                  createVNode("div", { class: "form-group" }, [
                    createVNode(_component_el_select, {
                      modelValue: selectedFieldId.value,
                      "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                      placeholder: "\u9009\u62E9\u77ED\u94FE\u63A5\u5217",
                      filterable: "",
                      size: "default",
                      style: { "width": "100%" },
                      onChange: onFieldChange
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(textFields.value, (field) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: field.id,
                            label: field.name,
                            value: field.id
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    textFields.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "help-text warning"
                    }, " \u672A\u627E\u5230\u6587\u672C\u7C7B\u578B\u7684\u5217 ")) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "form-group" }, [
                    createVNode(_component_el_radio_group, {
                      modelValue: replaceMode.value,
                      "onUpdate:modelValue": ($event) => replaceMode.value = $event,
                      size: "default"
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
                  replaceMode.value === "newColumn" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "form-group"
                  }, [
                    createVNode(_component_el_input, {
                      modelValue: newColumnName.value,
                      "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                      placeholder: "\u65B0\u5217\u540D\u79F0: \u6269\u5C55\u540E\u94FE\u63A5",
                      clearable: "",
                      size: "default"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (selectedFieldId.value && matchingUrls.value.length > 0) {
          _push(`<div class="preview-section" data-v-5cb8d904>`);
          _push(ssrRenderComponent(_component_el_card, null, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="preview-header" data-v-5cb8d904${_scopeId}><h3 data-v-5cb8d904${_scopeId}>\u{1F4CA} \u6570\u636E\u9884\u89C8</h3><div class="preview-stats" data-v-5cb8d904${_scopeId}> \u627E\u5230 ${ssrInterpolate(matchingUrls.value.length)} \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5 </div></div>`);
              } else {
                return [
                  createVNode("div", { class: "preview-header" }, [
                    createVNode("h3", null, "\u{1F4CA} \u6570\u636E\u9884\u89C8"),
                    createVNode("div", { class: "preview-stats" }, " \u627E\u5230 " + toDisplayString(matchingUrls.value.length) + " \u4E2A\u5339\u914D\u7684\u77ED\u94FE\u63A5 ", 1)
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_table, {
                  data: matchingUrls.value,
                  stripe: "",
                  "max-height": "300",
                  size: "small"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "\u5E8F\u53F7",
                        type: "index",
                        width: "50"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "\u77ED\u94FE\u63A5",
                        prop: "originalUrl",
                        "min-width": "150",
                        "show-overflow-tooltip": ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "\u72B6\u6001",
                        width: "80"
                      }, {
                        default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (row.expanded) {
                              _push4(ssrRenderComponent(_component_el_tag, {
                                type: "success",
                                size: "small"
                              }, {
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
                              _push4(ssrRenderComponent(_component_el_tag, {
                                type: "warning",
                                size: "small"
                              }, {
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
                              _push4(ssrRenderComponent(_component_el_tag, {
                                type: "info",
                                size: "small"
                              }, {
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
                                type: "success",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5DF2\u6269\u5C55")
                                ]),
                                _: 1
                              })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                                key: 1,
                                type: "warning",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5904\u7406\u4E2D")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(_component_el_tag, {
                                key: 2,
                                type: "info",
                                size: "small"
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
                        "min-width": "200",
                        "show-overflow-tooltip": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_table_column, {
                          label: "\u5E8F\u53F7",
                          type: "index",
                          width: "50"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u77ED\u94FE\u63A5",
                          prop: "originalUrl",
                          "min-width": "150",
                          "show-overflow-tooltip": ""
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u72B6\u6001",
                          width: "80"
                        }, {
                          default: withCtx(({ row }) => [
                            row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                              key: 0,
                              type: "success",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5DF2\u6269\u5C55")
                              ]),
                              _: 1
                            })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                              key: 1,
                              type: "warning",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5904\u7406\u4E2D")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(_component_el_tag, {
                              key: 2,
                              type: "info",
                              size: "small"
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
                          "min-width": "200",
                          "show-overflow-tooltip": ""
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_table, {
                    data: matchingUrls.value,
                    stripe: "",
                    "max-height": "300",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_table_column, {
                        label: "\u5E8F\u53F7",
                        type: "index",
                        width: "50"
                      }),
                      createVNode(_component_el_table_column, {
                        label: "\u77ED\u94FE\u63A5",
                        prop: "originalUrl",
                        "min-width": "150",
                        "show-overflow-tooltip": ""
                      }),
                      createVNode(_component_el_table_column, {
                        label: "\u72B6\u6001",
                        width: "80"
                      }, {
                        default: withCtx(({ row }) => [
                          row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                            key: 0,
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5DF2\u6269\u5C55")
                            ]),
                            _: 1
                          })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                            key: 1,
                            type: "warning",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5904\u7406\u4E2D")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(_component_el_tag, {
                            key: 2,
                            type: "info",
                            size: "small"
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
                        "min-width": "200",
                        "show-overflow-tooltip": ""
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="action-section" data-v-5cb8d904>`);
        _push(ssrRenderComponent(_component_el_card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-buttons" data-v-5cb8d904${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                size: "large",
                onClick: startProcess,
                disabled: !canStartProcess.value,
                loading: processing.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u{1F680} ${ssrInterpolate(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5")}`);
                  } else {
                    return [
                      createTextVNode(" \u{1F680} " + toDisplayString(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (processCompleted.value && failedCount.value > 0) {
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "warning",
                  size: "large",
                  onClick: retryFailedUrls,
                  loading: retrying.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u{1F504} \u91CD\u8BD5\u5931\u8D25\u7684 ${ssrInterpolate(failedCount.value)} \u6761 `);
                    } else {
                      return [
                        createTextVNode(" \u{1F504} \u91CD\u8BD5\u5931\u8D25\u7684 " + toDisplayString(failedCount.value) + " \u6761 ", 1)
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
                _push2(`<div class="progress-section" data-v-5cb8d904${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_progress, {
                  percentage: progressPercentage.value,
                  status: progressStatus.value,
                  "stroke-width": 8
                }, null, _parent2, _scopeId));
                _push2(`<p class="progress-info" data-v-5cb8d904${_scopeId}> \u5DF2\u5904\u7406 ${ssrInterpolate(processedCount.value)} / ${ssrInterpolate(totalCount.value)} \u6761\u8BB0\u5F55 `);
                if (processCompleted.value) {
                  _push2(`<span data-v-5cb8d904${_scopeId}> \uFF08\u6210\u529F ${ssrInterpolate(successCount.value)} \u6761\uFF0C\u5931\u8D25 ${ssrInterpolate(failedCount.value)} \u6761\uFF09 </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (replaceMode.value === "inplace" && selectedFieldId.value) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u{1F504} \u667A\u80FD\u66FF\u6362\u6A21\u5F0F",
                  type: "info",
                  description: "\u539F\u5217\u66FF\u6362\u5C06\u667A\u80FD\u66FF\u6362\uFF1A\u4FDD\u7559\u539F\u59CB\u6570\u636E\u5185\u5BB9\uFF0C\u4EC5\u5C06\u77ED\u94FE\u63A5\u66FF\u6362\u4E3A\u6269\u5C55\u540E\u7684\u94FE\u63A5\u3002\u5EFA\u8BAE\u5148\u5907\u4EFD\u91CD\u8981\u6570\u636E\u3002",
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
                      createTextVNode(" \u{1F680} " + toDisplayString(processing.value ? "\u6B63\u5728\u5904\u7406..." : "\u5F00\u59CB\u6269\u5C55\u77ED\u94FE\u63A5"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"]),
                  processCompleted.value && failedCount.value > 0 ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "warning",
                    size: "large",
                    onClick: retryFailedUrls,
                    loading: retrying.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F504} \u91CD\u8BD5\u5931\u8D25\u7684 " + toDisplayString(failedCount.value) + " \u6761 ", 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])) : createCommentVNode("", true),
                  processCompleted.value ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
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
                    key: 2,
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
                  title: "\u{1F504} \u667A\u80FD\u66FF\u6362\u6A21\u5F0F",
                  type: "info",
                  description: "\u539F\u5217\u66FF\u6362\u5C06\u667A\u80FD\u66FF\u6362\uFF1A\u4FDD\u7559\u539F\u59CB\u6570\u636E\u5185\u5BB9\uFF0C\u4EC5\u5C06\u77ED\u94FE\u63A5\u66FF\u6362\u4E3A\u6269\u5C55\u540E\u7684\u94FE\u63A5\u3002\u5EFA\u8BAE\u5148\u5907\u4EFD\u91CD\u8981\u6570\u636E\u3002",
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/scripts/url-expander-plugin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const urlExpanderPlugin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5cb8d904"]]);

export { urlExpanderPlugin as default };
//# sourceMappingURL=url-expander-plugin-BDQ2OZnM.mjs.map

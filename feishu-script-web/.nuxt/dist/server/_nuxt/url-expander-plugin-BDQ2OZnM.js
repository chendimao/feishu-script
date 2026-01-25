import { _ as __nuxt_component_0 } from "./ScriptHeader-C8kzDdQ5.js";
import { E as ElCard, a as ElInput } from "./el-input-DBN7URoB.js";
import { a as ElSelect, b as ElOption, c as ElRadioGroup, d as ElRadio, e as ElTag, E as ElAlert } from "./el-radio-group-D81v3l6w.js";
import { E as ElTable, a as ElTableColumn, b as ElProgress, c as ElMessage } from "./index-DJKk1awE.js";
import { E as ElButton } from "./el-button-CsUG_eNa.js";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createTextVNode, createVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-BpubyMc7.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "lodash-unified";
import "./index-DJ0OzA4C.js";
import "@vue/shared";
import "@popperjs/core";
import "normalize-wheel-es";
import "@ctrl/tinycolor";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/@unhead/vue/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/unctx/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/defu/dist/defu.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/ufo/dist/index.mjs";
import "E:/phpStudy/WWW/feishuScript/feishu-script-web/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "url-expander-plugin",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "短链接解析器 - 多维表格脚本管理"
    });
    let currentTable = null;
    const isReady = ref(false);
    ref("正在初始化飞书SDK...");
    ref("");
    const processing = ref(false);
    const tableFields = ref([]);
    const tableRecords = ref([]);
    const selectedFieldId = ref("");
    const replaceMode = ref("inplace");
    const newColumnName = ref("解析后链接");
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
      console.log("所有字段:", tableFields.value);
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
          (type) => field.type === type || field.type?.toString().toLowerCase().includes("text") || field.type?.toString().toLowerCase().includes("url") || field.type?.toString().toLowerCase().includes("link") || field.type?.toString().toLowerCase().includes("rich")
        );
        console.log(`字段 ${field.name} (${field.type}): ${isUrlCompatible ? "✓ 可能包含URL" : "✗ 不支持"}`);
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
      console.log("提取URL，输入值:", fieldValue, typeof fieldValue);
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
                console.log(`从 ${key} 属性提取文本:`, item[key]);
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
      console.log("开始分析URL匹配");
      console.log("selectedFieldId:", selectedFieldId.value);
      console.log("tableRecords数量:", tableRecords.value.length);
      console.log("urlPattern:", urlPattern.value);
      if (!selectedFieldId.value || tableRecords.value.length === 0) {
        console.log("条件不满足，退出分析");
        matchingUrls.value = [];
        return;
      }
      const patterns = urlPattern.value.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
      console.log("解析后的匹配模式:", patterns);
      const matches = [];
      for (let i = 0; i < tableRecords.value.length; i++) {
        const record = tableRecords.value[i];
        console.log(`检查记录 ${i}:`, record);
        const fieldValue = record[selectedFieldId.value];
        console.log(`字段 ${selectedFieldId.value} 的值:`, fieldValue, typeof fieldValue);
        const extractedUrls = extractUrlFromField(fieldValue);
        console.log("提取到的URLs:", extractedUrls);
        for (const extractedUrl of extractedUrls) {
          if (extractedUrl && extractedUrl.trim()) {
            const trimmedUrl = extractedUrl.trim();
            console.log("处理后的URL:", trimmedUrl);
            const isValidUrl = trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://");
            console.log("是否为HTTP/HTTPS:", isValidUrl);
            if (!isValidUrl) {
              console.log("跳过非URL内容:", trimmedUrl);
              continue;
            }
            let isMatch = true;
            if (patterns.length > 0) {
              isMatch = patterns.some((pattern) => {
                const match = trimmedUrl.includes(pattern);
                console.log(`模式 "${pattern}" 匹配结果:`, match);
                return match;
              });
            } else {
              console.log("没有设置匹配模式，匹配所有URL");
            }
            console.log("最终匹配结果:", isMatch);
            if (isMatch) {
              console.log("添加到匹配列表:", trimmedUrl);
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
      console.log("最终匹配结果:", matches);
      matchingUrls.value = matches;
      ElMessage.success(`找到 ${matches.length} 个匹配的短链接`);
    }
    async function startProcess() {
      if (!canStartProcess.value) {
        ElMessage.error("请先选择字段并确保有匹配的短链接");
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
            console.log(`正在解析URL: ${item.originalUrl}`);
            const response = await $fetch("/api/url-expand/batch", {
              method: "POST",
              body: {
                urls: [item.originalUrl]
              }
            });
            console.log(`API响应:`, response);
            if (response.success && response.results && response.results[0]) {
              const result = response.results[0];
              console.log(`处理结果:`, result);
              if (result.success && result.expandedUrl) {
                item.expandedUrl = result.expandedUrl;
                item.expanded = true;
                successCount.value++;
                console.log(`✅ 解析成功: ${item.originalUrl} -> ${result.expandedUrl}`);
              } else {
                item.error = result.error || "解析失败";
                failedCount.value++;
                console.log(`❌ 解析失败: ${item.originalUrl}, 错误: ${item.error}`);
              }
            } else {
              item.error = "API响应格式错误";
              failedCount.value++;
              console.log(`❌ API响应格式错误:`, response);
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "解析失败";
            item.error = errorMessage;
            failedCount.value++;
            console.error(`❌ 请求失败: ${item.originalUrl}, 错误:`, err);
          }
          item.processing = false;
          processedCount.value++;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        processCompleted.value = true;
        ElMessage.success(`处理完成！成功 ${successCount.value} 条，失败 ${failedCount.value} 条`);
      } catch (error2) {
        console.error("处理失败:", error2);
        ElMessage.error("处理失败: " + (error2 instanceof Error ? error2.message : "未知错误"));
      } finally {
        processing.value = false;
      }
    }
    async function retryFailedUrls() {
      const failedItems = matchingUrls.value.filter((item) => !item.expanded && item.error);
      if (failedItems.length === 0) {
        ElMessage.info("没有需要重试的失败项");
        return;
      }
      retrying.value = true;
      try {
        ElMessage.info(`开始重试 ${failedItems.length} 个失败的URL`);
        let retrySuccessCount = 0;
        let retryFailedCount = 0;
        for (let i = 0; i < failedItems.length; i++) {
          const item = failedItems[i];
          item.processing = true;
          item.error = void 0;
          try {
            console.log(`重试解析URL: ${item.originalUrl}`);
            const response = await $fetch("/api/url-expand/batch", {
              method: "POST",
              body: {
                urls: [item.originalUrl]
              }
            });
            console.log(`重试API响应:`, response);
            if (response.success && response.results && response.results[0]) {
              const result = response.results[0];
              console.log(`重试处理结果:`, result);
              if (result.success && result.expandedUrl) {
                item.expandedUrl = result.expandedUrl;
                item.expanded = true;
                retrySuccessCount++;
                successCount.value++;
                failedCount.value--;
                console.log(`✅ 重试成功: ${item.originalUrl} -> ${result.expandedUrl}`);
              } else {
                item.error = result.error || "重试解析失败";
                retryFailedCount++;
                console.log(`❌ 重试失败: ${item.originalUrl}, 错误: ${item.error}`);
              }
            } else {
              item.error = "API响应格式错误";
              retryFailedCount++;
              console.log(`❌ 重试API响应格式错误:`, response);
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "重试解析失败";
            item.error = errorMessage;
            retryFailedCount++;
            console.error(`❌ 重试请求失败: ${item.originalUrl}, 错误:`, err);
          }
          item.processing = false;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (retrySuccessCount > 0) {
          ElMessage.success(`重试完成！成功 ${retrySuccessCount} 条，失败 ${retryFailedCount} 条`);
        } else {
          ElMessage.warning(`重试完成，但没有成功的项目。失败 ${retryFailedCount} 条`);
        }
      } catch (error2) {
        console.error("重试过程出错:", error2);
        ElMessage.error("重试过程出错: " + (error2 instanceof Error ? error2.message : "未知错误"));
      } finally {
        retrying.value = false;
      }
    }
    async function writeBackResults() {
      {
        ElMessage.error("飞书SDK未初始化");
        return;
      }
    }
    function exportResults() {
      const results = matchingUrls.value.map((item) => ({
        原链接: item.originalUrl,
        解析后链接: item.expandedUrl || "解析失败",
        状态: item.expanded ? "成功" : "失败",
        错误信息: item.error || ""
      }));
      const csv = [
        Object.keys(results[0]).join(","),
        ...results.map((row) => Object.values(row).join(","))
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = (void 0).createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `短链接解析结果_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
      link.click();
      ElMessage.success("结果已导出");
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
        title: "短链接批量解析工具",
        description: "智能识别并解析短链接，支持批量处理和原列替换"
      }, null, _parent));
      if (isReady.value && unref(currentTable)) {
        _push(`<div class="main-content" data-v-5cb8d904><div class="operation-grid" data-v-5cb8d904>`);
        _push(ssrRenderComponent(_component_el_card, { class: "config-card" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-5cb8d904${_scopeId}><div class="header-icon" data-v-5cb8d904${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb8d904${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-5cb8d904${_scopeId}></path></svg></div><div class="header-content" data-v-5cb8d904${_scopeId}><h3 class="header-title" data-v-5cb8d904${_scopeId}>处理配置</h3><p class="header-desc" data-v-5cb8d904${_scopeId}>设置URL匹配规则和处理方式</p></div></div>`);
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
                    createVNode("h3", { class: "header-title" }, "处理配置"),
                    createVNode("p", { class: "header-desc" }, "设置URL匹配规则和处理方式")
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
                placeholder: "匹配规则: bit.ly, t.cn (留空匹配所有URL)",
                clearable: "",
                size: "default"
              }, null, _parent2, _scopeId));
              _push2(`<div class="help-text" data-v-5cb8d904${_scopeId}> 多个域名用逗号分隔，留空匹配所有URL </div></div><div class="form-group" data-v-5cb8d904${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_select, {
                modelValue: selectedFieldId.value,
                "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                placeholder: "选择短链接列",
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
                _push2(`<div class="help-text warning" data-v-5cb8d904${_scopeId}> 未找到文本类型的列 </div>`);
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
                          _push4(`原列替换`);
                        } else {
                          return [
                            createTextVNode("原列替换")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio, { value: "newColumn" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`新增列`);
                        } else {
                          return [
                            createTextVNode("新增列")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (replaceMode.value === "newColumn") {
                _push2(`<div class="form-group" data-v-5cb8d904${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: newColumnName.value,
                  "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                  placeholder: "新列名称: 解析后链接",
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
                      placeholder: "匹配规则: bit.ly, t.cn (留空匹配所有URL)",
                      clearable: "",
                      size: "default"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "help-text" }, " 多个域名用逗号分隔，留空匹配所有URL ")
                  ]),
                  createVNode("div", { class: "form-group" }, [
                    createVNode(_component_el_select, {
                      modelValue: selectedFieldId.value,
                      "onUpdate:modelValue": ($event) => selectedFieldId.value = $event,
                      placeholder: "选择短链接列",
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
                    }, " 未找到文本类型的列 ")) : createCommentVNode("", true)
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
                  replaceMode.value === "newColumn" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "form-group"
                  }, [
                    createVNode(_component_el_input, {
                      modelValue: newColumnName.value,
                      "onUpdate:modelValue": ($event) => newColumnName.value = $event,
                      placeholder: "新列名称: 解析后链接",
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
                _push2(`<div class="preview-header" data-v-5cb8d904${_scopeId}><h3 data-v-5cb8d904${_scopeId}>📊 数据预览</h3><div class="preview-stats" data-v-5cb8d904${_scopeId}> 找到 ${ssrInterpolate(matchingUrls.value.length)} 个匹配的短链接 </div></div>`);
              } else {
                return [
                  createVNode("div", { class: "preview-header" }, [
                    createVNode("h3", null, "📊 数据预览"),
                    createVNode("div", { class: "preview-stats" }, " 找到 " + toDisplayString(matchingUrls.value.length) + " 个匹配的短链接 ", 1)
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
                        label: "序号",
                        type: "index",
                        width: "50"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "短链接",
                        prop: "originalUrl",
                        "min-width": "150",
                        "show-overflow-tooltip": ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "状态",
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
                                    _push5(`已解析`);
                                  } else {
                                    return [
                                      createTextVNode("已解析")
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
                                    _push5(`处理中`);
                                  } else {
                                    return [
                                      createTextVNode("处理中")
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
                                    _push5(`待处理`);
                                  } else {
                                    return [
                                      createTextVNode("待处理")
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
                                  createTextVNode("已解析")
                                ]),
                                _: 1
                              })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                                key: 1,
                                type: "warning",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("处理中")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(_component_el_tag, {
                                key: 2,
                                type: "info",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("待处理")
                                ]),
                                _: 1
                              }))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_table_column, {
                        label: "解析后链接",
                        prop: "expandedUrl",
                        "min-width": "200",
                        "show-overflow-tooltip": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_table_column, {
                          label: "序号",
                          type: "index",
                          width: "50"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "短链接",
                          prop: "originalUrl",
                          "min-width": "150",
                          "show-overflow-tooltip": ""
                        }),
                        createVNode(_component_el_table_column, {
                          label: "状态",
                          width: "80"
                        }, {
                          default: withCtx(({ row }) => [
                            row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                              key: 0,
                              type: "success",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("已解析")
                              ]),
                              _: 1
                            })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                              key: 1,
                              type: "warning",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("处理中")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(_component_el_tag, {
                              key: 2,
                              type: "info",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("待处理")
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "解析后链接",
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
                        label: "序号",
                        type: "index",
                        width: "50"
                      }),
                      createVNode(_component_el_table_column, {
                        label: "短链接",
                        prop: "originalUrl",
                        "min-width": "150",
                        "show-overflow-tooltip": ""
                      }),
                      createVNode(_component_el_table_column, {
                        label: "状态",
                        width: "80"
                      }, {
                        default: withCtx(({ row }) => [
                          row.expanded ? (openBlock(), createBlock(_component_el_tag, {
                            key: 0,
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("已解析")
                            ]),
                            _: 1
                          })) : row.processing ? (openBlock(), createBlock(_component_el_tag, {
                            key: 1,
                            type: "warning",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("处理中")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(_component_el_tag, {
                            key: 2,
                            type: "info",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("待处理")
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "解析后链接",
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
                    _push3(` 🚀 ${ssrInterpolate(processing.value ? "正在处理..." : "开始解析短链接")}`);
                  } else {
                    return [
                      createTextVNode(" 🚀 " + toDisplayString(processing.value ? "正在处理..." : "开始解析短链接"), 1)
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
                      _push3(` 🔄 重试失败的 ${ssrInterpolate(failedCount.value)} 条 `);
                    } else {
                      return [
                        createTextVNode(" 🔄 重试失败的 " + toDisplayString(failedCount.value) + " 条 ", 1)
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
                      _push3(` ✅ ${ssrInterpolate(replaceMode.value === "inplace" ? "写回原列" : "创建新列并写回")}`);
                    } else {
                      return [
                        createTextVNode(" ✅ " + toDisplayString(replaceMode.value === "inplace" ? "写回原列" : "创建新列并写回"), 1)
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
                      _push3(` 💾 导出结果 `);
                    } else {
                      return [
                        createTextVNode(" 💾 导出结果 ")
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
                _push2(`<p class="progress-info" data-v-5cb8d904${_scopeId}> 已处理 ${ssrInterpolate(processedCount.value)} / ${ssrInterpolate(totalCount.value)} 条记录 `);
                if (processCompleted.value) {
                  _push2(`<span data-v-5cb8d904${_scopeId}> （成功 ${ssrInterpolate(successCount.value)} 条，失败 ${ssrInterpolate(failedCount.value)} 条） </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (replaceMode.value === "inplace" && selectedFieldId.value) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "🔄 智能替换模式",
                  type: "info",
                  description: "原列替换将智能替换：保留原始数据内容，仅将短链接替换为解析后的链接。建议先备份重要数据。",
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
                      createTextVNode(" 🚀 " + toDisplayString(processing.value ? "正在处理..." : "开始解析短链接"), 1)
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
                      createTextVNode(" 🔄 重试失败的 " + toDisplayString(failedCount.value) + " 条 ", 1)
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
                      createTextVNode(" ✅ " + toDisplayString(replaceMode.value === "inplace" ? "写回原列" : "创建新列并写回"), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])) : createCommentVNode("", true),
                  processCompleted.value ? (openBlock(), createBlock(_component_el_button, {
                    key: 2,
                    size: "large",
                    onClick: exportResults
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 💾 导出结果 ")
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
                    createTextVNode(" 已处理 " + toDisplayString(processedCount.value) + " / " + toDisplayString(totalCount.value) + " 条记录 ", 1),
                    processCompleted.value ? (openBlock(), createBlock("span", { key: 0 }, " （成功 " + toDisplayString(successCount.value) + " 条，失败 " + toDisplayString(failedCount.value) + " 条） ", 1)) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                replaceMode.value === "inplace" && selectedFieldId.value ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "🔄 智能替换模式",
                  type: "info",
                  description: "原列替换将智能替换：保留原始数据内容，仅将短链接替换为解析后的链接。建议先备份重要数据。",
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
export {
  urlExpanderPlugin as default
};
//# sourceMappingURL=url-expander-plugin-BDQ2OZnM.js.map

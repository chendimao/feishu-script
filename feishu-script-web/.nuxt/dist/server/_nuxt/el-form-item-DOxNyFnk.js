import { ref, computed, defineComponent, reactive, watch, provide, toRefs, openBlock, createElementBlock, normalizeClass, renderSlot, inject, createVNode, Fragment, nextTick, useSlots, unref, withCtx, createBlock, resolveDynamicComponent, normalizeStyle, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, TransitionGroup } from "vue";
import { castArray, has, clone } from "lodash-unified";
import { H as componentSizes, k as useFormSize, f as formContextKey, g as getProp, I as formItemContextKey, d as addUnit } from "./el-button-DEhYiaTs.js";
import { b as buildProps, d as definePropType, _ as _export_sfc, w as withInstall, a as withNoopInstall } from "./base-B7YREFnB.js";
import { isArray, isString, isFunction } from "@vue/shared";
import { j as isBoolean, l as debugWarn, d as useNamespace, h as throwError, g as useId } from "../server.mjs";
import AsyncValidator from "async-validator";
import { useResizeObserver, refDebounced } from "@vueuse/core";
const formMetaProps = buildProps({
  size: {
    type: String,
    values: componentSizes
  },
  disabled: Boolean
});
const formProps = buildProps({
  ...formMetaProps,
  model: Object,
  rules: {
    type: definePropType(Object)
  },
  labelPosition: {
    type: String,
    values: ["left", "right", "top"],
    default: "right"
  },
  requireAsteriskPosition: {
    type: String,
    values: ["left", "right"],
    default: "left"
  },
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  labelSuffix: {
    type: String,
    default: ""
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  hideRequiredAsterisk: Boolean,
  scrollToError: Boolean,
  scrollIntoViewOptions: {
    type: definePropType([Object, Boolean]),
    default: true
  }
});
const formEmits = {
  validate: (prop, isValid, message) => (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message)
};
const SCOPE = "ElForm";
function useFormLabelWidth() {
  const potentialLabelWidthArr = ref([]);
  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length)
      return "0";
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : "";
  });
  function getLabelWidthIndex(width) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1 && autoLabelWidth.value === "0") {
      debugWarn(SCOPE, `unexpected width ${width}`);
    }
    return index;
  }
  function registerLabelWidth(val, oldVal) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }
  function deregisterLabelWidth(val) {
    const index = getLabelWidthIndex(val);
    if (index > -1) {
      potentialLabelWidthArr.value.splice(index, 1);
    }
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  };
}
const filterFields = (fields, props) => {
  const normalized = castArray(props).map(
    (prop) => isArray(prop) ? prop.join(".") : prop
  );
  return normalized.length > 0 ? fields.filter(
    (field) => field.propString && normalized.includes(field.propString)
  ) : fields;
};
const COMPONENT_NAME$1 = "ElForm";
const _sfc_main$1 = defineComponent({
  ...{
    name: COMPONENT_NAME$1
  },
  __name: "form",
  props: formProps,
  emits: formEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formRef = ref();
    const fields = reactive([]);
    const formSize = useFormSize();
    const ns = useNamespace("form");
    const formClasses = computed(() => {
      const { labelPosition, inline } = props;
      return [
        ns.b(),
        ns.m(formSize.value || "default"),
        {
          [ns.m(`label-${labelPosition}`)]: labelPosition,
          [ns.m("inline")]: inline
        }
      ];
    });
    const getField = (prop) => {
      return filterFields(fields, [prop])[0];
    };
    const addField = (field) => {
      fields.push(field);
    };
    const removeField = (field) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    };
    const setInitialValues = (initModel) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME$1, "model is required for setInitialValues to work.");
        return;
      }
      if (!initModel) {
        debugWarn(
          COMPONENT_NAME$1,
          "initModel is required for setInitialValues to work."
        );
        return;
      }
      fields.forEach((field) => {
        if (field.prop) {
          if (has(initModel, field.prop)) {
            const initValue = getProp(initModel, field.prop).value;
            field.setInitialValue(initValue);
          }
        }
      });
    };
    const resetFields = (properties = []) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME$1, "model is required for resetFields to work.");
        return;
      }
      filterFields(fields, properties).forEach((field) => field.resetField());
    };
    const clearValidate = (props2 = []) => {
      filterFields(fields, props2).forEach((field) => field.clearValidate());
    };
    const isValidatable = computed(() => {
      const hasModel = !!props.model;
      if (!hasModel) {
        debugWarn(COMPONENT_NAME$1, "model is required for validate to work.");
      }
      return hasModel;
    });
    const obtainValidateFields = (props2) => {
      if (fields.length === 0)
        return [];
      const filteredFields = filterFields(fields, props2);
      if (!filteredFields.length) {
        debugWarn(COMPONENT_NAME$1, "please pass correct props!");
        return [];
      }
      return filteredFields;
    };
    const validate = async (callback) => validateField(void 0, callback);
    const doValidateField = async (props2 = []) => {
      if (!isValidatable.value)
        return false;
      const fields2 = obtainValidateFields(props2);
      if (fields2.length === 0)
        return true;
      let validationErrors = {};
      for (const field of fields2) {
        try {
          await field.validate("");
          if (field.validateState === "error" && !field.error)
            field.resetField();
        } catch (fields3) {
          validationErrors = {
            ...validationErrors,
            ...fields3
          };
        }
      }
      if (Object.keys(validationErrors).length === 0)
        return true;
      return Promise.reject(validationErrors);
    };
    const validateField = async (modelProps = [], callback) => {
      let result = false;
      const shouldThrow = !isFunction(callback);
      try {
        result = await doValidateField(modelProps);
        if (result === true) {
          await (callback == null ? void 0 : callback(result));
        }
        return result;
      } catch (e) {
        if (e instanceof Error)
          throw e;
        const invalidFields = e;
        if (props.scrollToError) {
          if (formRef.value) {
            const formItem = formRef.value.querySelector(`.${ns.b()}-item.is-error`);
            formItem == null ? void 0 : formItem.scrollIntoView(props.scrollIntoViewOptions);
          }
        }
        !result && await (callback == null ? void 0 : callback(false, invalidFields));
        return shouldThrow && Promise.reject(invalidFields);
      }
    };
    const scrollToField = (prop) => {
      var _a;
      const field = getField(prop);
      if (field) {
        (_a = field.$el) == null ? void 0 : _a.scrollIntoView(props.scrollIntoViewOptions);
      }
    };
    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate().catch((err) => debugWarn(err));
        }
      },
      { deep: true, flush: "post" }
    );
    provide(
      formContextKey,
      reactive({
        ...toRefs(props),
        emit,
        resetFields,
        clearValidate,
        validateField,
        getField,
        addField,
        removeField,
        setInitialValues,
        ...useFormLabelWidth()
      })
    );
    __expose({
      validate,
      validateField,
      resetFields,
      clearValidate,
      scrollToField,
      getField,
      fields,
      setInitialValues
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "form",
        {
          ref_key: "formRef",
          ref: formRef,
          class: normalizeClass(formClasses.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);
const formItemValidateStates = [
  "",
  "error",
  "validating",
  "success"
];
const formItemProps = buildProps({
  label: String,
  labelWidth: {
    type: [String, Number]
  },
  labelPosition: {
    type: String,
    values: ["left", "right", "top", ""],
    default: ""
  },
  prop: {
    type: definePropType([String, Array])
  },
  required: {
    type: Boolean,
    default: void 0
  },
  rules: {
    type: definePropType([Object, Array])
  },
  error: String,
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  for: String,
  inlineMessage: {
    type: Boolean,
    default: void 0
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    values: componentSizes
  }
});
const COMPONENT_NAME = "ElLabelWrap";
var FormLabelWrap = defineComponent({
  name: COMPONENT_NAME,
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  setup(props, {
    slots
  }) {
    const formContext = inject(formContextKey, void 0);
    const formItemContext = inject(formItemContextKey);
    if (!formItemContext)
      throwError(COMPONENT_NAME, "usage: <el-form-item><label-wrap /></el-form-item>");
    const ns = useNamespace("form");
    const el = ref();
    const computedWidth = ref(0);
    const getLabelWidth = () => {
      var _a;
      if ((_a = el.value) == null ? void 0 : _a.firstElementChild) {
        const width = (void 0).getComputedStyle(el.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(width));
      } else {
        return 0;
      }
    };
    const updateLabelWidth = (action = "update") => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === "update") {
            computedWidth.value = getLabelWidth();
          } else if (action === "remove") {
            formContext == null ? void 0 : formContext.deregisterLabelWidth(computedWidth.value);
          }
        }
      });
    };
    const updateLabelWidthFn = () => updateLabelWidth("update");
    watch(computedWidth, (val, oldVal) => {
      if (props.updateAll) {
        formContext == null ? void 0 : formContext.registerLabelWidth(val, oldVal);
      }
    });
    useResizeObserver(computed(() => {
      var _a, _b;
      return (_b = (_a = el.value) == null ? void 0 : _a.firstElementChild) != null ? _b : null;
    }), updateLabelWidthFn);
    return () => {
      var _a, _b;
      if (!slots)
        return null;
      const {
        isAutoWidth
      } = props;
      if (isAutoWidth) {
        const autoLabelWidth = formContext == null ? void 0 : formContext.autoLabelWidth;
        const hasLabel = formItemContext == null ? void 0 : formItemContext.hasLabel;
        const style = {};
        if (hasLabel && autoLabelWidth && autoLabelWidth !== "auto") {
          const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
          const labelPosition = formItemContext.labelPosition || formContext.labelPosition;
          const marginPosition = labelPosition === "left" ? "marginRight" : "marginLeft";
          if (marginWidth) {
            style[marginPosition] = `${marginWidth}px`;
          }
        }
        return createVNode("div", {
          "ref": el,
          "class": [ns.be("item", "label-wrap")],
          "style": style
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      } else {
        return createVNode(Fragment, {
          "ref": el
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
      }
    };
  }
});
const _hoisted_1 = ["role", "aria-labelledby"];
const _sfc_main = defineComponent({
  ...{
    name: "ElFormItem"
  },
  __name: "form-item",
  props: formItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    const formContext = inject(formContextKey, void 0);
    const parentFormItemContext = inject(formItemContextKey, void 0);
    const _size = useFormSize(void 0, { formItem: false });
    const ns = useNamespace("form-item");
    const labelId = useId().value;
    const inputIds = ref([]);
    const validateState = ref("");
    const validateStateDebounced = refDebounced(validateState, 100);
    const validateMessage = ref("");
    const formItemRef = ref();
    let initialValue = void 0;
    let isResettingField = false;
    const labelPosition = computed(
      () => props.labelPosition || (formContext == null ? void 0 : formContext.labelPosition)
    );
    const labelStyle = computed(() => {
      var _a;
      if (labelPosition.value === "top") {
        return {};
      }
      const labelWidth = addUnit((_a = props.labelWidth) != null ? _a : formContext == null ? void 0 : formContext.labelWidth);
      return { width: labelWidth };
    });
    const contentStyle = computed(() => {
      var _a;
      if (labelPosition.value === "top" || (formContext == null ? void 0 : formContext.inline)) {
        return {};
      }
      if (!props.label && !props.labelWidth && isNested) {
        return {};
      }
      const labelWidth = addUnit((_a = props.labelWidth) != null ? _a : formContext == null ? void 0 : formContext.labelWidth);
      if (!props.label && !slots.label) {
        return { marginLeft: labelWidth };
      }
      return {};
    });
    const formItemClasses = computed(() => [
      ns.b(),
      ns.m(_size.value),
      ns.is("error", validateState.value === "error"),
      ns.is("validating", validateState.value === "validating"),
      ns.is("success", validateState.value === "success"),
      ns.is("required", isRequired.value || props.required),
      ns.is("no-asterisk", formContext == null ? void 0 : formContext.hideRequiredAsterisk),
      (formContext == null ? void 0 : formContext.requireAsteriskPosition) === "right" ? "asterisk-right" : "asterisk-left",
      {
        [ns.m("feedback")]: formContext == null ? void 0 : formContext.statusIcon,
        [ns.m(`label-${labelPosition.value}`)]: labelPosition.value
      }
    ]);
    const _inlineMessage = computed(
      () => isBoolean(props.inlineMessage) ? props.inlineMessage : (formContext == null ? void 0 : formContext.inlineMessage) || false
    );
    const validateClasses = computed(() => [
      ns.e("error"),
      { [ns.em("error", "inline")]: _inlineMessage.value }
    ]);
    const propString = computed(() => {
      if (!props.prop)
        return "";
      return isArray(props.prop) ? props.prop.join(".") : props.prop;
    });
    const hasLabel = computed(() => {
      return !!(props.label || slots.label);
    });
    const labelFor = computed(() => {
      var _a;
      return (_a = props.for) != null ? _a : inputIds.value.length === 1 ? inputIds.value[0] : void 0;
    });
    const isGroup = computed(() => {
      return !labelFor.value && hasLabel.value;
    });
    const isNested = !!parentFormItemContext;
    const fieldValue = computed(() => {
      const model = formContext == null ? void 0 : formContext.model;
      if (!model || !props.prop) {
        return;
      }
      return getProp(model, props.prop).value;
    });
    const normalizedRules = computed(() => {
      const { required } = props;
      const rules = [];
      if (props.rules) {
        rules.push(...castArray(props.rules));
      }
      const formRules = formContext == null ? void 0 : formContext.rules;
      if (formRules && props.prop) {
        const _rules = getProp(
          formRules,
          props.prop
        ).value;
        if (_rules) {
          rules.push(...castArray(_rules));
        }
      }
      if (required !== void 0) {
        const requiredRules = rules.map((rule, i) => [rule, i]).filter(([rule]) => "required" in rule);
        if (requiredRules.length > 0) {
          for (const [rule, i] of requiredRules) {
            if (rule.required === required)
              continue;
            rules[i] = { ...rule, required };
          }
        } else {
          rules.push({ required });
        }
      }
      return rules;
    });
    const validateEnabled = computed(() => normalizedRules.value.length > 0);
    const getFilteredRule = (trigger) => {
      const rules = normalizedRules.value;
      return rules.filter((rule) => {
        if (!rule.trigger || !trigger)
          return true;
        if (isArray(rule.trigger)) {
          return rule.trigger.includes(trigger);
        } else {
          return rule.trigger === trigger;
        }
      }).map(({ trigger: trigger2, ...rule }) => rule);
    };
    const isRequired = computed(
      () => normalizedRules.value.some((rule) => rule.required)
    );
    const shouldShowError = computed(
      () => {
        var _a;
        return validateStateDebounced.value === "error" && props.showMessage && ((_a = formContext == null ? void 0 : formContext.showMessage) != null ? _a : true);
      }
    );
    const currentLabel = computed(
      () => `${props.label || ""}${(formContext == null ? void 0 : formContext.labelSuffix) || ""}`
    );
    const setValidationState = (state) => {
      validateState.value = state;
    };
    const onValidationFailed = (error) => {
      var _a, _b;
      const { errors, fields } = error;
      if (!errors || !fields) {
        console.error(error);
      }
      setValidationState("error");
      validateMessage.value = errors ? (_b = (_a = errors == null ? void 0 : errors[0]) == null ? void 0 : _a.message) != null ? _b : `${props.prop} is required` : "";
      formContext == null ? void 0 : formContext.emit("validate", props.prop, false, validateMessage.value);
    };
    const onValidationSucceeded = () => {
      setValidationState("success");
      formContext == null ? void 0 : formContext.emit("validate", props.prop, true, "");
    };
    const doValidate = async (rules) => {
      const modelName = propString.value;
      const validator = new AsyncValidator({
        [modelName]: rules
      });
      return validator.validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
        onValidationSucceeded();
        return true;
      }).catch((err) => {
        onValidationFailed(err);
        return Promise.reject(err);
      });
    };
    const validate = async (trigger, callback) => {
      if (isResettingField || !props.prop) {
        return false;
      }
      const hasCallback = isFunction(callback);
      if (!validateEnabled.value) {
        callback == null ? void 0 : callback(false);
        return false;
      }
      const rules = getFilteredRule(trigger);
      if (rules.length === 0) {
        callback == null ? void 0 : callback(true);
        return true;
      }
      setValidationState("validating");
      return doValidate(rules).then(() => {
        callback == null ? void 0 : callback(true);
        return true;
      }).catch((err) => {
        const { fields } = err;
        callback == null ? void 0 : callback(false, fields);
        return hasCallback ? false : Promise.reject(fields);
      });
    };
    const clearValidate = () => {
      setValidationState("");
      validateMessage.value = "";
      isResettingField = false;
    };
    const resetField = async () => {
      const model = formContext == null ? void 0 : formContext.model;
      if (!model || !props.prop)
        return;
      const computedValue = getProp(model, props.prop);
      isResettingField = true;
      computedValue.value = clone(initialValue);
      await nextTick();
      clearValidate();
      isResettingField = false;
    };
    const addInputId = (id) => {
      if (!inputIds.value.includes(id)) {
        inputIds.value.push(id);
      }
    };
    const removeInputId = (id) => {
      inputIds.value = inputIds.value.filter((listId) => listId !== id);
    };
    const setInitialValue = (value) => {
      initialValue = clone(value);
    };
    watch(
      () => props.error,
      (val) => {
        validateMessage.value = val || "";
        setValidationState(val ? "error" : "");
      },
      { immediate: true }
    );
    watch(
      () => props.validateStatus,
      (val) => setValidationState(val || "")
    );
    const context = reactive({
      ...toRefs(props),
      $el: formItemRef,
      size: _size,
      validateMessage,
      validateState,
      labelId,
      inputIds,
      isGroup,
      hasLabel,
      fieldValue,
      addInputId,
      removeInputId,
      resetField,
      clearValidate,
      validate,
      propString,
      setInitialValue
    });
    provide(formItemContextKey, context);
    __expose({
      size: _size,
      validateMessage,
      validateState,
      validate,
      clearValidate,
      resetField,
      setInitialValue
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: formItemRef,
        class: normalizeClass(formItemClasses.value),
        role: isGroup.value ? "group" : void 0,
        "aria-labelledby": isGroup.value ? unref(labelId) : void 0
      }, [
        createVNode(unref(FormLabelWrap), {
          "is-auto-width": labelStyle.value.width === "auto",
          "update-all": ((_a = unref(formContext)) == null ? void 0 : _a.labelWidth) === "auto"
        }, {
          default: withCtx(() => [
            !!(_ctx.label || _ctx.$slots.label) ? (openBlock(), createBlock(resolveDynamicComponent(labelFor.value ? "label" : "div"), {
              key: 0,
              id: unref(labelId),
              for: labelFor.value,
              class: normalizeClass(unref(ns).e("label")),
              style: normalizeStyle(labelStyle.value)
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "label", { label: currentLabel.value }, () => [
                  createTextVNode(
                    toDisplayString(currentLabel.value),
                    1
                  )
                ])
              ]),
              _: 3
            }, 8, ["id", "for", "class", "style"])) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["is-auto-width", "update-all"]),
        createElementVNode(
          "div",
          {
            class: normalizeClass(unref(ns).e("content")),
            style: normalizeStyle(contentStyle.value)
          },
          [
            renderSlot(_ctx.$slots, "default"),
            createVNode(TransitionGroup, {
              name: `${unref(ns).namespace.value}-zoom-in-top`
            }, {
              default: withCtx(() => [
                shouldShowError.value ? renderSlot(_ctx.$slots, "error", {
                  key: 0,
                  error: validateMessage.value
                }, () => [
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(validateClasses.value)
                    },
                    toDisplayString(validateMessage.value),
                    3
                  )
                ]) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["name"])
          ],
          6
        )
      ], 10, _hoisted_1);
    };
  }
});
var FormItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);
const ElForm = withInstall(Form, {
  FormItem
});
const ElFormItem = withNoopInstall(FormItem);
export {
  ElForm as E,
  ElFormItem as a
};
//# sourceMappingURL=el-form-item-DOxNyFnk.js.map

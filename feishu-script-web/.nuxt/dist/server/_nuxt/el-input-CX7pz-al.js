import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeStyle, computed, getCurrentInstance, shallowRef, ref, watch, nextTick, useAttrs as useAttrs$1, useSlots, toRef, Fragment, createBlock, withCtx, resolveDynamicComponent, mergeProps, withModifiers } from "vue";
import { b as buildProps, d as definePropType, _ as _export_sfc, w as withInstall } from "./base-B7YREFnB.js";
import { L as useGlobalConfig, i as iconPropType, z as circle_close_default, e as useSizeProp, j as useFormItem, l as useFormItemInputId, k as useFormSize, h as useFormDisabled, V as ValidateComponentsMap, M as view_default, N as hide_default, a as ElIcon } from "./el-button-DEhYiaTs.js";
import { d as useNamespace, i as isNumber, l as debugWarn } from "../server.mjs";
import { isClient, useEventListener, useResizeObserver } from "@vueuse/core";
import { pick, fromPairs, isNil } from "lodash-unified";
import { isString, isFunction, NOOP, isObject } from "@vue/shared";
const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElCard"
  },
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is(`${_ctx.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.header),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
              style: normalizeStyle(_ctx.bodyStyle)
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            6
          ),
          _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.footer),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);
const ElCard = withInstall(Card);
const isFirefox = () => isClient && /firefox/i.test((void 0).navigator.userAgent);
const isAndroid = () => isClient && /android/i.test((void 0).navigator.userAgent);
let hiddenTextarea = void 0;
const HIDDEN_STYLE = {
  height: "0",
  visibility: "hidden",
  overflow: isFirefox() ? "" : "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];
const looseToNumber = (val) => {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
};
function calculateNodeStyling(targetElement) {
  const style = (void 0).getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => [
    name,
    style.getPropertyValue(name)
  ]);
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a, _b;
  if (!hiddenTextarea) {
    hiddenTextarea = (void 0).createElement("textarea");
    ((_a = targetElement.parentNode) != null ? _a : (void 0).body).appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  contextStyle.forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value)
  );
  Object.entries(HIDDEN_STYLE).forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value, "important")
  );
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_b = hiddenTextarea.parentNode) == null ? void 0 : _b.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}
const mutable = (val) => val;
const ariaProps = buildProps({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};
const UPDATE_MODEL_EVENT = "update:modelValue";
const CHANGE_EVENT = "change";
const INPUT_EVENT = "input";
const inputProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  size: useSizeProp,
  disabled: {
    type: Boolean,
    default: void 0
  },
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  modelModifiers: {
    type: definePropType(Object),
    default: () => ({})
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: definePropType(String),
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: definePropType([Boolean, Object]),
    default: false
  },
  autocomplete: {
    type: definePropType(String),
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: iconPropType,
    default: circle_close_default
  },
  showPassword: Boolean,
  showWordLimit: Boolean,
  wordLimitPosition: {
    type: String,
    values: ["inside", "outside"],
    default: "inside"
  },
  suffixIcon: {
    type: iconPropType
  },
  prefixIcon: {
    type: iconPropType
  },
  containerRole: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: definePropType([Object, Array, String]),
    default: () => mutable({})
  },
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...useAriaProps(["ariaLabel"]),
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  name: String
});
const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  input: (value) => isString(value),
  change: (value, evt) => isString(value) && (evt instanceof Event || evt === void 0),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed(() => {
    return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
  });
  const instance = getCurrentInstance();
  if (!instance) {
    debugWarn(
      "use-attrs",
      "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"
    );
    return computed(() => ({}));
  }
  return computed(
    () => {
      var _a;
      return fromPairs(
        Object.entries((_a = instance.proxy) == null ? void 0 : _a.$attrs).filter(
          ([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))
        )
      );
    }
  );
};
const isHTMLElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") {
    return false;
  }
  switch (element.nodeName) {
    case "A": {
      return !!element.href && element.rel !== "ignore";
    }
    case "INPUT": {
      return !(element.type === "hidden" || element.type === "file");
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA": {
      return true;
    }
    default: {
      return false;
    }
  }
};
const focusElement = (el, options) => {
  if (!el || !el.focus)
    return;
  let cleanup = false;
  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
    cleanup = true;
  }
  el.focus(options);
  if (isHTMLElement(el) && cleanup) {
    el.removeAttribute("tabindex");
  }
};
function useFocusController(target, {
  disabled,
  beforeFocus,
  afterFocus,
  beforeBlur,
  afterBlur
} = {}) {
  const instance = getCurrentInstance();
  const { emit } = instance;
  const wrapperRef = shallowRef();
  const isFocused = ref(false);
  const handleFocus = (event) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
    if (unref(disabled) || isFocused.value || cancelFocus)
      return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus == null ? void 0 : afterFocus();
  };
  const handleBlur = (event) => {
    var _a;
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (unref(disabled) || event.relatedTarget && ((_a = wrapperRef.value) == null ? void 0 : _a.contains(event.relatedTarget)) || cancelBlur)
      return;
    isFocused.value = false;
    emit("blur", event);
    afterBlur == null ? void 0 : afterBlur();
  };
  const handleClick = (event) => {
    var _a, _b;
    if (unref(disabled) || isFocusable(event.target) || ((_a = wrapperRef.value) == null ? void 0 : _a.contains((void 0).activeElement)) && wrapperRef.value !== (void 0).activeElement)
      return;
    (_b = target.value) == null ? void 0 : _b.focus();
  };
  watch([wrapperRef, () => unref(disabled)], ([el, disabled2]) => {
    if (!el)
      return;
    if (disabled2) {
      el.removeAttribute("tabindex");
    } else {
      el.setAttribute("tabindex", "-1");
    }
  });
  useEventListener(wrapperRef, "focus", handleFocus, true);
  useEventListener(wrapperRef, "blur", handleBlur, true);
  useEventListener(wrapperRef, "click", handleClick, true);
  if (process.env.NODE_ENV === "test") ;
  return {
    isFocused,
    wrapperRef,
    handleFocus,
    handleBlur
  };
}
const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
function useComposition({
  afterComposition,
  emit
}) {
  const isComposing = ref(false);
  const handleCompositionStart = (event) => {
    emit == null ? void 0 : emit("compositionstart", event);
    isComposing.value = true;
  };
  const handleCompositionUpdate = (event) => {
    var _a;
    emit == null ? void 0 : emit("compositionupdate", event);
    const text = (_a = event.target) == null ? void 0 : _a.value;
    const lastCharacter = text[text.length - 1] || "";
    isComposing.value = !isKorean(lastCharacter);
  };
  const handleCompositionEnd = (event) => {
    emit == null ? void 0 : emit("compositionend", event);
    if (isComposing.value) {
      isComposing.value = false;
      nextTick(() => afterComposition(event));
    }
  };
  const handleComposition = (event) => {
    event.type === "compositionend" ? handleCompositionEnd(event) : handleCompositionUpdate(event);
  };
  return {
    isComposing,
    handleComposition,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  };
}
function useCursor(input) {
  let selectionInfo;
  function recordCursor() {
    if (input.value == void 0)
      return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null)
      return;
    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));
    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt
    };
  }
  function setCursor() {
    if (input.value == void 0 || selectionInfo == void 0)
      return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo;
    if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
      return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    input.value.setSelectionRange(startPos, startPos);
  }
  return [recordCursor, setCursor];
}
const _hoisted_1 = ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode"];
const _hoisted_2 = ["id", "name", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role"];
const COMPONENT_NAME = "ElInput";
const _sfc_main = defineComponent({
  ...{
    name: COMPONENT_NAME,
    inheritAttrs: false
  },
  __name: "input",
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rawAttrs = useAttrs$1();
    const attrs = useAttrs();
    const slots = useSlots();
    const containerKls = computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value)
    ]);
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = shallowRef();
    const textarea = shallowRef();
    const hovering = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref();
    const textareaCalcStyle = shallowRef(props.inputStyle);
    const _ref = computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
      _ref,
      {
        disabled: inputDisabled,
        afterBlur() {
          var _a;
          if (props.validateEvent) {
            (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => debugWarn(err));
          }
        }
      }
    );
    const needStatusIcon = computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateIcon = computed(
      () => validateState.value && ValidateComponentsMap[validateState.value]
    );
    const passwordIcon = computed(
      () => passwordVisible.value ? view_default : hide_default
    );
    const containerStyle = computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = computed(
      () => isNil(props.modelValue) ? "" : String(props.modelValue)
    );
    const showClear = computed(
      () => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value)
    );
    const showPwdVisible = computed(
      () => props.showPassword && !inputDisabled.value && !!nativeInputValue.value
    );
    const isWordLimitVisible = computed(
      () => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword
    );
    const textLength = computed(() => nativeInputValue.value.length);
    const inputExceed = computed(
      () => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength)
    );
    const suffixVisible = computed(
      () => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value
    );
    const hasModelModifiers = computed(
      () => !!Object.keys(props.modelModifiers).length
    );
    const [recordCursor, setCursor] = useCursor(input);
    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value || props.resize !== "both" && props.resize !== "horizontal")
        return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        right: `calc(100% - ${width + 22 - 10}px)`
      };
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!isClient || type !== "textarea" || !textarea.value)
        return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        var _a;
        if (isInit || !props.autosize)
          return;
        const isElHidden = ((_a = textarea.value) == null ? void 0 : _a.offsetParent) === null;
        if (!isElHidden) {
          setTimeout(resizeTextarea2);
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue || props.type === "file")
        return;
      input2.value = formatterValue;
    };
    const formatValue = (value) => {
      const { trim, number } = props.modelModifiers;
      if (trim) {
        value = value.trim();
      }
      if (number) {
        value = `${looseToNumber(value)}`;
      }
      if (props.formatter && props.parser) {
        value = props.parser(value);
      }
      return value;
    };
    const handleInput = async (event) => {
      if (isComposing.value)
        return;
      const { lazy } = props.modelModifiers;
      let { value } = event.target;
      if (lazy) {
        emit(INPUT_EVENT, value);
        return;
      }
      value = formatValue(value);
      if (String(value) === nativeInputValue.value) {
        if (props.formatter) {
          setNativeInputValue();
        }
        return;
      }
      recordCursor();
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
      await nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) {
        setNativeInputValue();
      }
      setCursor();
    };
    const handleChange = async (event) => {
      let { value } = event.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) {
        emit(UPDATE_MODEL_EVENT, value);
      }
      emit(CHANGE_EVENT, value, event);
      await nextTick();
      setNativeInputValue();
    };
    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    } = useComposition({ emit, afterComposition: handleInput });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const focus = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.blur();
    };
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      var _a;
      (_a = _ref.value) == null ? void 0 : _a.select();
    };
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, "");
      emit(CHANGE_EVENT, "");
      emit("clear");
      emit(INPUT_EVENT, "");
    };
    watch(
      () => props.modelValue,
      () => {
        var _a;
        nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn(err));
        }
      }
    );
    watch(nativeInputValue, (newValue) => {
      if (!_ref.value) {
        return;
      }
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
      if (displayValue === newValue) {
        return;
      }
      if ((void 0).activeElement === _ref.value && _ref.value.type !== "range") {
        if (trim && displayValue.trim() === newValue) {
          return;
        }
      }
      setNativeInputValue();
    });
    watch(
      () => props.type,
      async () => {
        await nextTick();
        setNativeInputValue();
        resizeTextarea();
      }
    );
    __expose({
      input,
      textarea,
      ref: _ref,
      textareaStyle,
      autosize: toRef(props, "autosize"),
      isComposing,
      focus,
      blur,
      select,
      clear,
      resizeTextarea
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            containerKls.value,
            {
              [unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
              [unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
            }
          ]),
          style: normalizeStyle(containerStyle.value),
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        },
        [
          createCommentVNode(" input "),
          _ctx.type !== "textarea" ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              createCommentVNode(" prepend slot "),
              _ctx.$slots.prepend ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(nsInput).be("group", "prepend"))
                },
                [
                  renderSlot(_ctx.$slots, "prepend")
                ],
                2
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  class: normalizeClass(wrapperKls.value)
                },
                [
                  createCommentVNode(" prefix slot "),
                  _ctx.$slots.prefix || _ctx.prefixIcon ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass(unref(nsInput).e("prefix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("prefix-inner"))
                        },
                        [
                          renderSlot(_ctx.$slots, "prefix"),
                          _ctx.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 0,
                            class: normalizeClass(unref(nsInput).e("icon"))
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                      )
                    ],
                    2
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("input", mergeProps({
                    id: unref(inputId),
                    ref_key: "input",
                    ref: input,
                    class: unref(nsInput).e("inner")
                  }, unref(attrs), {
                    name: _ctx.name,
                    minlength: _ctx.minlength,
                    maxlength: _ctx.maxlength,
                    type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                    disabled: unref(inputDisabled),
                    readonly: _ctx.readonly,
                    autocomplete: _ctx.autocomplete,
                    tabindex: _ctx.tabindex,
                    "aria-label": _ctx.ariaLabel,
                    placeholder: _ctx.placeholder,
                    style: _ctx.inputStyle,
                    form: _ctx.form,
                    autofocus: _ctx.autofocus,
                    role: _ctx.containerRole,
                    inputmode: _ctx.inputmode,
                    onCompositionstart: _cache[0] || (_cache[0] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                    onCompositionupdate: _cache[1] || (_cache[1] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                    onCompositionend: _cache[2] || (_cache[2] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                    onInput: handleInput,
                    onChange: handleChange,
                    onKeydown: handleKeydown
                  }), null, 16, _hoisted_1),
                  createCommentVNode(" suffix slot "),
                  suffixVisible.value ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 1,
                      class: normalizeClass(unref(nsInput).e("suffix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("suffix-inner"))
                        },
                        [
                          !showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              renderSlot(_ctx.$slots, "suffix"),
                              _ctx.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                                key: 0,
                                class: normalizeClass(unref(nsInput).e("icon"))
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.suffixIcon)))
                                ]),
                                _: 1
                              }, 8, ["class"])) : createCommentVNode("v-if", true)
                            ],
                            64
                          )) : createCommentVNode("v-if", true),
                          showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 1,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onClick: clear
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                            ]),
                            _: 1
                          }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
                          showPwdVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 2,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
                            onClick: handlePasswordVisible,
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onMouseup: withModifiers(unref(NOOP), ["prevent"])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(passwordIcon.value)))
                            ]),
                            _: 1
                          }, 8, ["class", "onMousedown", "onMouseup"])) : createCommentVNode("v-if", true),
                          isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            "span",
                            {
                              key: 3,
                              class: normalizeClass([
                                unref(nsInput).e("count"),
                                unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                              ])
                            },
                            [
                              createElementVNode(
                                "span",
                                {
                                  class: normalizeClass(unref(nsInput).e("count-inner"))
                                },
                                toDisplayString(textLength.value) + " / " + toDisplayString(_ctx.maxlength),
                                3
                              )
                            ],
                            2
                          )) : createCommentVNode("v-if", true),
                          validateState.value && validateIcon.value && needStatusIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 4,
                            class: normalizeClass([
                              unref(nsInput).e("icon"),
                              unref(nsInput).e("validateIcon"),
                              unref(nsInput).is("loading", validateState.value === "validating")
                            ])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(validateIcon.value)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                      )
                    ],
                    2
                  )) : createCommentVNode("v-if", true)
                ],
                2
              ),
              createCommentVNode(" append slot "),
              _ctx.$slots.append ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(nsInput).be("group", "append"))
                },
                [
                  renderSlot(_ctx.$slots, "append")
                ],
                2
              )) : createCommentVNode("v-if", true)
            ],
            64
          )) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createCommentVNode(" textarea "),
              createElementVNode("textarea", mergeProps({
                id: unref(inputId),
                ref_key: "textarea",
                ref: textarea,
                class: [unref(nsTextarea).e("inner"), unref(nsInput).is("focus", unref(isFocused))]
              }, unref(attrs), {
                name: _ctx.name,
                minlength: _ctx.minlength,
                maxlength: _ctx.maxlength,
                tabindex: _ctx.tabindex,
                disabled: unref(inputDisabled),
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                style: textareaStyle.value,
                "aria-label": _ctx.ariaLabel,
                placeholder: _ctx.placeholder,
                form: _ctx.form,
                autofocus: _ctx.autofocus,
                rows: _ctx.rows,
                role: _ctx.containerRole,
                onCompositionstart: _cache[3] || (_cache[3] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                onCompositionupdate: _cache[4] || (_cache[4] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                onCompositionend: _cache[5] || (_cache[5] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                onInput: handleInput,
                onFocus: _cache[6] || (_cache[6] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
                onBlur: _cache[7] || (_cache[7] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_2),
              isWordLimitVisible.value ? (openBlock(), createElementBlock(
                "span",
                {
                  key: 0,
                  style: normalizeStyle(countStyle.value),
                  class: normalizeClass([
                    unref(nsInput).e("count"),
                    unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                  ])
                },
                toDisplayString(textLength.value) + " / " + toDisplayString(_ctx.maxlength),
                7
              )) : createCommentVNode("v-if", true)
            ],
            64
          ))
        ],
        38
      );
    };
  }
});
var Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const ElInput = withInstall(Input);
export {
  CHANGE_EVENT as C,
  ElCard as E,
  UPDATE_MODEL_EVENT as U,
  ElInput as a,
  useComposition as b,
  useFocusController as c,
  focusElement as f,
  isAndroid as i,
  mutable as m,
  useAriaProps as u
};
//# sourceMappingURL=el-input-CX7pz-al.js.map

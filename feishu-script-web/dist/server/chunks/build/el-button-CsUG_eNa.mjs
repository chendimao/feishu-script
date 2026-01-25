import { ref, defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot, createBlock, resolveDynamicComponent, withCtx, Fragment, normalizeClass, createCommentVNode, provide, reactive, toRef, warn, inject, useSlots, Text, watch, getCurrentInstance, isRef } from 'vue';
import { fromPairs, set, get, isEqual } from 'lodash-unified';
import { isObject, hasOwn, isString, NOOP, isFunction, isArray } from '@vue/shared';
import { f as useNamespace, i as isNumber, A as isStringNumber, y as namespaceContextKey, z as zIndexContextKey, w as defaultNamespace, q as useZIndex, x as defaultInitialZIndex } from './server.mjs';
import { l as loading_default, b as circle_close_default, a as circle_check_default, k as info_filled_default, m as circle_close_filled_default, w as warning_filled_default, n as success_filled_default, e as close_default } from './index-DJ0OzA4C.mjs';
import { TinyColor } from '@ctrl/tinycolor';

const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!isObject(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(
        `Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(
          val
        )}.`
      );
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ])
);
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const configProviderContextKey = /* @__PURE__ */ Symbol();
var English = {
  name: "en",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
    },
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color.",
      alphaLabel: "pick alpha value",
      alphaDescription: "alpha {alpha}, current color is {color}",
      hueLabel: "pick hue value",
      hueDescription: "hue {hue}, current color is {color}",
      svLabel: "pick saturation and brightness value",
      svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
      predefineDescription: "select {value} as the color"
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    mention: {
      loading: "Loading"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      selectAllLabel: "Select all rows",
      selectRowLabel: "Select this row",
      expandRowLabel: "Expand this row",
      collapseRowLabel: "Collapse this row",
      sortLabel: "Sort by {column}",
      filterLabel: "Filter by {column}"
    },
    tag: {
      close: "Close this tag"
    },
    tour: {
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      close: "Close this dialog"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      rightArrow: "Carousel arrow right",
      indicator: "Carousel switch to index {index}"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(
  /\{(\w+)\}/g,
  (_, key) => {
    var _a;
    return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
  }
);
const buildLocaleContext = (locale) => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const localeContextKey = /* @__PURE__ */ Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = localeOverrides || inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => locale.value || English));
};
const componentSizes = ["", "default", "small", "large"];
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = /* @__PURE__ */ Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const emptyValuesContextKey = /* @__PURE__ */ Symbol("emptyValuesContextKey");
const DEFAULT_EMPTY_VALUES = ["", void 0, null];
const DEFAULT_VALUE_ON_CLEAR = void 0;
const useEmptyValuesProps = buildProps({
  emptyValues: Array,
  valueOnClear: {
    type: definePropType([
      String,
      Number,
      Boolean,
      Function
    ]),
    default: void 0,
    validator: (val) => {
      val = isFunction(val) ? val() : val;
      if (isArray(val)) {
        return val.every((item) => !item);
      }
      return !val;
    }
  }
});
const useEmptyValues = (props, defaultValue) => {
  const config = getCurrentInstance() ? inject(emptyValuesContextKey, ref({})) : ref({});
  const emptyValues = computed(
    () => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES
  );
  const valueOnClear = computed(() => {
    if (isFunction(props.valueOnClear)) {
      return props.valueOnClear();
    } else if (props.valueOnClear !== void 0) {
      return props.valueOnClear;
    } else if (isFunction(config.value.valueOnClear)) {
      return config.value.valueOnClear();
    } else if (config.value.valueOnClear !== void 0) {
      return config.value.valueOnClear;
    }
    return DEFAULT_VALUE_ON_CLEAR;
  });
  const isEmptyValue = (value) => {
    let result = true;
    if (isArray(value)) {
      result = emptyValues.value.some((emptyValue) => {
        return isEqual(value, emptyValue);
      });
    } else {
      result = emptyValues.value.includes(value);
    }
    return result;
  };
  if (!isEmptyValue(valueOnClear.value)) ;
  return {
    emptyValues,
    valueOnClear,
    isEmptyValue
  };
};
const keysOf = (arr) => Object.keys(arr);
const getProp = (obj, path, defaultValue) => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val) {
      set(obj, path, val);
    }
  };
};
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => {
      var _a, _b;
      return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
function useGlobalComponentSettings(block, sizeFallback) {
  const config = useGlobalConfig();
  const ns = useNamespace(
    block,
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.namespace) || defaultNamespace;
    })
  );
  const locale = useLocale(computed(() => {
    var _a;
    return (_a = config.value) == null ? void 0 : _a.locale;
  }));
  const zIndex = useZIndex(
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.zIndex) || defaultInitialZIndex;
    })
  );
  const size = computed(() => {
    var _a;
    return unref(sizeFallback) || ((_a = config.value) == null ? void 0 : _a.size) || "";
  });
  provideGlobalConfig(computed(() => unref(config) || {}));
  return {
    ns,
    locale,
    zIndex,
    size
  };
}
const provideGlobalConfig = (config, app, global = false) => {
  var _a;
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : void 0;
  const provideFn = (_a = void 0) != null ? _a : inSetup ? provide : void 0;
  if (!provideFn) {
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!(oldConfig == null ? void 0 : oldConfig.value))
      return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(
    localeContextKey,
    computed(() => context.value.locale)
  );
  provideFn(
    namespaceContextKey,
    computed(() => context.value.namespace)
  );
  provideFn(
    zIndexContextKey,
    computed(() => context.value.zIndex)
  );
  provideFn(SIZE_INJECTION_KEY, {
    size: computed(() => context.value.size || "")
  });
  provideFn(
    emptyValuesContextKey,
    computed(() => ({
      emptyValues: context.value.emptyValues,
      valueOnClear: context.value.valueOnClear
    }))
  );
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
const mergeConfig = (a, b) => {
  const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] !== void 0 ? b[key] : a[key];
  }
  return obj;
};
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const withNoopInstall = (component) => {
  component.install = NOOP;
  return component;
};
const formContextKey = /* @__PURE__ */ Symbol("formContextKey");
const formItemContextKey = /* @__PURE__ */ Symbol("formItemContextKey");
const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => {
    var _a, _b;
    return (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$props) == null ? void 0 : _b[name];
  });
};
const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(
    () => size.value || unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || ""
  );
};
const useFormDisabled = (fallback) => {
  const disabled = useProp("disabled");
  const form = inject(formContextKey, void 0);
  return computed(() => {
    var _a, _b, _c;
    return (_c = (_b = (_a = disabled.value) != null ? _a : unref(fallback)) != null ? _b : form == null ? void 0 : form.disabled) != null ? _c : false;
  });
};
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
function addUnit(value, defaultUnit = "px") {
  if (!value && value !== 0)
    return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}
const useFormItem = () => {
  const form = inject(formContextKey, void 0);
  const formItem = inject(formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};
const useFormItemInputId = (props, {
  formItemContext,
  disableIdGeneration,
  disableIdManagement
}) => {
  if (!disableIdGeneration) {
    disableIdGeneration = ref(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = ref(false);
  }
  getCurrentInstance();
  const inputId = ref();
  const isLabeledByFormItem = computed(() => {
    var _a;
    return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && ((_a = formItemContext.inputIds) == null ? void 0 : _a.length) <= 1);
  });
  return {
    isLabeledByFormItem,
    inputId
  };
};
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElIcon",
    inheritAttrs: false
  },
  __name: "icon",
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      const fontSize = addUnit(size);
      if (!fontSize && !color)
        return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "i",
        mergeProps({
          class: unref(ns).b(),
          style: style.value
        }, _ctx.$attrs),
        [
          renderSlot(_ctx.$slots, "default")
        ],
        16
      );
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ElIcon = withInstall(Icon);
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const TypeComponents = {
  Close: close_default
};
const TypeComponentsMap = {
  primary: info_filled_default,
  success: success_filled_default,
  warning: warning_filled_default,
  error: circle_close_filled_default,
  info: info_filled_default
};
const ValidateComponentsMap = {
  validating: loading_default,
  success: circle_check_default,
  error: circle_close_default
};
const buttonGroupContextKey = /* @__PURE__ */ Symbol(
  "buttonGroupContextKey"
);
const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
  watch(
    () => unref(condition),
    (val) => {
    },
    {
      immediate: true
    }
  );
};
const useButton = (props, emit) => {
  useDeprecated(
    {
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    },
    computed(() => props.type === "text")
  );
  const buttonGroupContext = inject(buttonGroupContextKey, void 0);
  const globalConfig2 = useGlobalConfig("button");
  const { form } = useFormItem();
  const _size = useFormSize(computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
  const _disabled = useFormDisabled();
  const _ref = ref();
  const slots = useSlots();
  const _type = computed(
    () => {
      var _a;
      return props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || ((_a = globalConfig2.value) == null ? void 0 : _a.type) || "";
    }
  );
  const autoInsertSpace = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a = globalConfig2.value) == null ? void 0 : _a.autoInsertSpace) != null ? _c : false;
    }
  );
  const _plain = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.plain) != null ? _b : (_a = globalConfig2.value) == null ? void 0 : _a.plain) != null ? _c : false;
    }
  );
  const _round = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.round) != null ? _b : (_a = globalConfig2.value) == null ? void 0 : _a.round) != null ? _c : false;
    }
  );
  const _text = computed(() => {
    var _a, _b, _c;
    return (_c = (_b = props.text) != null ? _b : (_a = globalConfig2.value) == null ? void 0 : _a.text) != null ? _c : false;
  });
  const _props = computed(() => {
    if (props.tag === "button") {
      return {
        ariaDisabled: _disabled.value || props.loading,
        disabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType
      };
    }
    return {};
  });
  const shouldAddSpace = computed(() => {
    var _a;
    const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
      const slot = defaultSlot[0];
      if ((slot == null ? void 0 : slot.type) === Text) {
        const text = slot.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(text.trim());
      }
    }
    return false;
  });
  const handleClick = (evt) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation();
      return;
    }
    if (props.nativeType === "reset") {
      form == null ? void 0 : form.resetFields();
    }
    emit("click", evt);
  };
  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    _plain,
    _round,
    _text,
    shouldAddSpace,
    handleClick
  };
};
const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonNativeTypes = ["button", "submit", "reset"];
const buttonProps = buildProps({
  size: useSizeProp,
  disabled: {
    type: Boolean,
    default: void 0
  },
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  plain: {
    type: Boolean,
    default: void 0
  },
  text: {
    type: Boolean,
    default: void 0
  },
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: {
    type: Boolean,
    default: void 0
  },
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
});
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};
function darken(color, amount = 20) {
  return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
  const _disabled = useFormDisabled();
  const ns = useNamespace("button");
  return computed(() => {
    let styles = {};
    let buttonColor = props.color;
    if (buttonColor) {
      const match = buttonColor.match(/var\((.*?)\)/);
      if (match) {
        buttonColor = (void 0).getComputedStyle((void 0).document.documentElement).getPropertyValue(match[1]);
      }
      const color = new TinyColor(buttonColor);
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
      if (props.plain) {
        styles = ns.cssVarBlock({
          "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
          "text-color": buttonColor,
          "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
          "hover-text-color": `var(${ns.cssVarName("color-white")})`,
          "hover-bg-color": buttonColor,
          "hover-border-color": buttonColor,
          "active-bg-color": activeBgColor,
          "active-text-color": `var(${ns.cssVarName("color-white")})`,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
        }
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
        styles = ns.cssVarBlock({
          "bg-color": buttonColor,
          "text-color": textColor,
          "border-color": buttonColor,
          "hover-bg-color": hoverBgColor,
          "hover-text-color": textColor,
          "hover-border-color": hoverBgColor,
          "active-bg-color": activeBgColor,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
          styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
        }
      }
    }
    return styles;
  });
}
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElButton"
  },
  __name: "button",
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const buttonStyle = useButtonCustomStyle(props);
    const ns = useNamespace("button");
    const {
      _ref,
      _size,
      _type,
      _disabled,
      _props,
      _plain,
      _round,
      _text,
      shouldAddSpace,
      handleClick
    } = useButton(props, emit);
    const buttonKls = computed(() => [
      ns.b(),
      ns.m(_type.value),
      ns.m(_size.value),
      ns.is("disabled", _disabled.value),
      ns.is("loading", props.loading),
      ns.is("plain", _plain.value),
      ns.is("round", _round.value),
      ns.is("circle", props.circle),
      ns.is("text", _text.value),
      ns.is("link", props.link),
      ns.is("has-bg", props.bg)
    ]);
    __expose({
      ref: _ref,
      size: _size,
      type: _type,
      disabled: _disabled,
      shouldAddSpace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
        ref_key: "_ref",
        ref: _ref
      }, unref(_props), {
        class: buttonKls.value,
        style: unref(buttonStyle),
        onClick: unref(handleClick)
      }), {
        default: withCtx(() => [
          _ctx.loading ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                class: normalizeClass(unref(ns).is("loading"))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon)))
                ]),
                _: 1
              }, 8, ["class"]))
            ],
            64
          )) : _ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              _ctx.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
          })) : createCommentVNode("v-if", true),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "span",
            {
              key: 2,
              class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 16, ["class", "style", "onClick"]);
    };
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type,
  direction: {
    type: definePropType(String),
    values: ["horizontal", "vertical"],
    default: "horizontal"
  }
};
const _sfc_main = defineComponent({
  ...{
    name: "ElButtonGroup"
  },
  __name: "button-group",
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    provide(
      buttonGroupContextKey,
      reactive({
        size: toRef(props, "size"),
        type: toRef(props, "type")
      })
    );
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("group"), unref(ns).bm("group", props.direction)])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);

export { keysOf as A, useEmptyValues as B, buildProp as C, useGlobalConfig as D, ElButton as E, TypeComponentsMap as T, ValidateComponentsMap as V, _export_sfc as _, addUnit as a, buildProps as b, withNoopInstall as c, definePropType as d, withInstallFunction as e, useSizeProp as f, ElIcon as g, addClass as h, useFormSize as i, useFormDisabled as j, useFormItem as k, useFormItemInputId as l, getProp as m, useDeprecated as n, hasClass as o, formContextKey as p, useEmptyValuesProps as q, removeClass as r, provideGlobalConfig as s, iconPropType as t, useLocale as u, useGlobalComponentSettings as v, withInstall as w, TypeComponents as x, formItemContextKey as y, componentSizes as z };
//# sourceMappingURL=el-button-CsUG_eNa.mjs.map

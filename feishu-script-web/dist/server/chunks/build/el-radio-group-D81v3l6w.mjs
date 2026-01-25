import { defineComponent, useSlots, ref, computed, openBlock, createBlock, Transition, unref, withCtx, withDirectives, createElementVNode, normalizeClass, renderSlot, resolveDynamicComponent, createCommentVNode, createElementBlock, createTextVNode, toDisplayString, Fragment, createVNode, vShow, getCurrentInstance, provide, reactive, toRefs, withModifiers, resolveComponent, resolveDirective, mergeProps, toHandlerKey, renderList, normalizeStyle, vModelText, watch, isRef, vModelRadio, isVNode, Comment, inject, toRaw, watchEffect, nextTick, shallowRef, toRef, readonly, cloneVNode, Teleport as Teleport$1, Text } from 'vue';
import { w as withInstall, c as withNoopInstall, _ as _export_sfc, T as TypeComponentsMap, g as ElIcon, x as TypeComponents, k as useFormItem, l as useFormItemInputId, i as useFormSize, u as useLocale, b as buildProps, A as keysOf, q as useEmptyValuesProps, t as iconPropType, f as useSizeProp, d as definePropType, B as useEmptyValues, j as useFormDisabled, V as ValidateComponentsMap, n as useDeprecated, z as componentSizes, a as addUnit, C as buildProp, y as formItemContextKey } from './el-button-CsUG_eNa.mjs';
import { f as useNamespace, g as useId, l as debugWarn, h as throwError, v as isEmpty, k as isUndefined, i as isNumber, j as isBoolean, m as isPropAbsent, o as isElement, s as useGetDerivedNamespace, p as useIdInjection, q as useZIndex } from './server.mjs';
import { useMutationObserver, isIOS, isClient, useDebounceFn, useResizeObserver, useEventListener, tryOnScopeDispose, computedEager, onClickOutside, unrefElement } from '@vueuse/core';
import { placements, createPopper } from '@popperjs/core';
import { U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT, u as useAriaProps, b as useComposition, c as useFocusController, i as isAndroid, f as focusElement } from './el-input-DBN7URoB.mjs';
import { isArray, isObject, isFunction, isPlainObject, isString, NOOP } from '@vue/shared';
import { isEqual, castArray as castArray$1, get, omit, isNil, clamp, findLastIndex, isUndefined as isUndefined$1, fromPairs } from 'lodash-unified';
import { e as close_default, h as arrow_down_default, b as circle_close_default } from './index-DJ0OzA4C.mjs';

const alertEffects = ["light", "dark"];
const alertProps = buildProps({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    values: keysOf(TypeComponentsMap),
    default: "info"
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeText: {
    type: String,
    default: ""
  },
  showIcon: Boolean,
  center: Boolean,
  effect: {
    type: String,
    values: alertEffects,
    default: "light"
  },
  showAfter: Number,
  hideAfter: Number,
  autoClose: Number
});
const alertEmits = {
  close: (evt) => evt instanceof MouseEvent
};
function isComment(node) {
  return isVNode(node) && node.type === Comment;
}
const flattedChildren = (children) => {
  const vNodes = isArray(children) ? children : [children];
  const result = [];
  vNodes.forEach((child) => {
    var _a;
    if (isArray(child)) {
      result.push(...flattedChildren(child));
    } else if (isVNode(child) && ((_a = child.component) == null ? void 0 : _a.subTree)) {
      result.push(child, ...flattedChildren(child.component.subTree));
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children));
    } else if (isVNode(child) && child.shapeFlag === 2) {
      result.push(...flattedChildren(child.type()));
    } else {
      result.push(child);
    }
  });
  return result;
};
const _sfc_main$k = defineComponent({
  ...{
    name: "ElAlert"
  },
  __name: "alert",
  props: alertProps,
  emits: alertEmits,
  setup(__props, { emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("alert");
    const visible = ref(true);
    const iconComponent = computed(() => TypeComponentsMap[props.type]);
    const hasDesc = computed(() => {
      var _a;
      if (props.description)
        return true;
      const slotContent = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (!slotContent)
        return false;
      const children = flattedChildren(slotContent);
      return children.some((child) => !isComment(child));
    });
    const close = (evt) => {
      visible.value = false;
      emit("close", evt);
    };
    if (props.showAfter || props.hideAfter || props.autoClose) ;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).b(), unref(ns).m(_ctx.type), unref(ns).is("center", _ctx.center), unref(ns).is(_ctx.effect)]),
              role: "alert"
            },
            [
              _ctx.showIcon && (_ctx.$slots.icon || iconComponent.value) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass([unref(ns).e("icon"), unref(ns).is("big", hasDesc.value)])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
                  ])
                ]),
                _: 3
              }, 8, ["class"])) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  _ctx.title || _ctx.$slots.title ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass([unref(ns).e("title"), { "with-description": hasDesc.value }])
                    },
                    [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createTextVNode(
                          toDisplayString(_ctx.title),
                          1
                        )
                      ])
                    ],
                    2
                  )) : createCommentVNode("v-if", true),
                  hasDesc.value ? (openBlock(), createElementBlock(
                    "p",
                    {
                      key: 1,
                      class: normalizeClass(unref(ns).e("description"))
                    },
                    [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createTextVNode(
                          toDisplayString(_ctx.description),
                          1
                        )
                      ])
                    ],
                    2
                  )) : createCommentVNode("v-if", true),
                  _ctx.closable ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      _ctx.closeText ? (openBlock(), createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: normalizeClass([unref(ns).e("close-btn"), unref(ns).is("customed")]),
                          onClick: close
                        },
                        toDisplayString(_ctx.closeText),
                        3
                      )) : (openBlock(), createBlock(unref(ElIcon), {
                        key: 1,
                        class: normalizeClass(unref(ns).e("close-btn")),
                        onClick: close
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Close))
                        ]),
                        _: 1
                      }, 8, ["class"]))
                    ],
                    64
                  )) : createCommentVNode("v-if", true)
                ],
                2
              )
            ],
            2
          ), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/alert/src/alert.vue"]]);
const ElAlert = withInstall(Alert);
const POPPER_INJECTION_KEY = /* @__PURE__ */ Symbol("popper");
const POPPER_CONTENT_INJECTION_KEY = /* @__PURE__ */ Symbol("popperContent");
const roleTypes = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
];
const popperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: "tooltip"
  }
});
const _sfc_main$j = defineComponent({
  ...{
    name: "ElPopper",
    inheritAttrs: false
  },
  __name: "popper",
  props: popperProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const triggerRef = ref();
    const popperInstanceRef = ref();
    const contentRef = ref();
    const referenceRef = ref();
    const role = computed(() => props.role);
    const popperProvides = {
      triggerRef,
      popperInstanceRef,
      contentRef,
      referenceRef,
      role
    };
    __expose(popperProvides);
    provide(POPPER_INJECTION_KEY, popperProvides);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const _sfc_main$i = defineComponent({
  ...{
    name: "ElPopperArrow",
    inheritAttrs: false
  },
  __name: "arrow",
  setup(__props, { expose: __expose }) {
    const ns = useNamespace("popper");
    const { arrowRef, arrowStyle } = inject(
      POPPER_CONTENT_INJECTION_KEY,
      void 0
    );
    __expose({
      arrowRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          ref_key: "arrowRef",
          ref: arrowRef,
          class: normalizeClass(unref(ns).e("arrow")),
          style: normalizeStyle(unref(arrowStyle)),
          "data-popper-arrow": ""
        },
        null,
        6
      );
    };
  }
});
var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const popperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType(Function)
  },
  onMouseleave: {
    type: definePropType(Function)
  },
  onClick: {
    type: definePropType(Function)
  },
  onKeydown: {
    type: definePropType(Function)
  },
  onFocus: {
    type: definePropType(Function)
  },
  onBlur: {
    type: definePropType(Function)
  },
  onContextmenu: {
    type: definePropType(Function)
  },
  id: String,
  open: Boolean
});
const FORWARD_REF_INJECTION_KEY = /* @__PURE__ */ Symbol("elForwardRef");
const useForwardRef = (forwardRef) => {
  const setForwardRef = (el) => {
    forwardRef.value = el;
  };
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  });
};
const useForwardRefDirective = (setForwardRef) => {
  return {
    mounted(el) {
      setForwardRef(el);
    },
    updated(el) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    }
  };
};
const NAME = "ElOnlyChild";
const OnlyChild = defineComponent({
  name: NAME,
  setup(_, {
    slots,
    attrs
  }) {
    var _a;
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective((_a = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a : NOOP);
    return () => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
      if (!defaultSlot)
        return null;
      const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        return null;
      }
      return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  }
});
function findFirstLegitChild(node) {
  if (!node)
    return [null, 0];
  const children = node;
  const len = children.filter((c) => c.type !== Comment).length;
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return [wrapTextContent(child), len];
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return [child, len];
      }
    }
    return [wrapTextContent(child), len];
  }
  return [null, 0];
}
function wrapTextContent(s) {
  const ns = useNamespace("only-child");
  return createVNode("span", {
    "class": ns.e("content")
  }, [s]);
}
const _sfc_main$h = defineComponent({
  ...{
    name: "ElPopperTrigger",
    inheritAttrs: false
  },
  __name: "trigger",
  props: popperTriggerProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { role, triggerRef } = inject(POPPER_INJECTION_KEY, void 0);
    useForwardRef(triggerRef);
    const ariaControls = computed(() => {
      return ariaHaspopup.value ? props.id : void 0;
    });
    const ariaDescribedby = computed(() => {
      if (role && role.value === "tooltip") {
        return props.open && props.id ? props.id : void 0;
      }
      return void 0;
    });
    const ariaHaspopup = computed(() => {
      if (role && role.value !== "tooltip") {
        return role.value;
      }
      return void 0;
    });
    const ariaExpanded = computed(() => {
      return ariaHaspopup.value ? `${props.open}` : void 0;
    });
    __expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return !_ctx.virtualTriggering ? (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, _ctx.$attrs, {
        "aria-controls": ariaControls.value,
        "aria-describedby": ariaDescribedby.value,
        "aria-expanded": ariaExpanded.value,
        "aria-haspopup": ariaHaspopup.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : createCommentVNode("v-if", true);
    };
  }
});
var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
const FOCUSOUT_PREVENTED_OPTS = {
  cancelable: true,
  bubbles: false
};
const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
const FOCUS_TRAP_INJECTION_KEY = /* @__PURE__ */ Symbol("elFocusTrap");
const focusReason = ref();
const lastUserFocusTimestamp = ref(0);
const lastAutomatedFocusTimestamp = ref(0);
const obtainAllFocusableElements = (element) => {
  const nodes = [];
  const walker = (void 0).createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === (void 0).activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
};
const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container))
      return element;
  }
};
const isHidden = (element, container) => {
  if (getComputedStyle(element).visibility === "hidden")
    return true;
  while (element) {
    if (container && element === container)
      return false;
    if (getComputedStyle(element).display === "none")
      return true;
    element = element.parentElement;
  }
  return false;
};
const getEdges = (container) => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last = getVisibleElement(focusable.reverse(), container);
  return [first, last];
};
const isSelectable = (element) => {
  return element instanceof HTMLInputElement && "select" in element;
};
const tryFocus = (element, shouldSelect) => {
  if (element) {
    const prevFocusedElement = (void 0).activeElement;
    focusElement(element, { preventScroll: true });
    lastAutomatedFocusTimestamp.value = (void 0).performance.now();
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};
const useFocusReason = () => {
  return {
    focusReason,
    lastUserFocusTimestamp,
    lastAutomatedFocusTimestamp
  };
};
const createFocusOutPreventedEvent = (detail) => {
  return new CustomEvent(FOCUSOUT_PREVENTED, {
    ...FOCUSOUT_PREVENTED_OPTS,
    detail
  });
};
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler == null ? void 0 : oursHandler(event);
    }
  };
  return handleEvent;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified")
    return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(EVENT_CODE).includes(key))
      return key;
    switch (key) {
      case " ":
        return EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};
const _sfc_main$g = defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: false,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(props, { emit }) {
    const forwardRef = ref();
    let lastFocusAfterTrapped;
    const { focusReason: focusReason2 } = useFocusReason();
    const onKeydown = (e) => {
      if (!props.loop && !props.trapped)
        return;
      const { altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = props;
      const code = getEventCode(e);
      const isTabbing = code === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
      const currentFocusingEl = (void 0).activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget;
        const [first, last] = getEdges(container);
        const isTabbable = first && last;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
            }
          } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(last, true);
            }
          }
        }
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef,
      onKeydown
    });
    watch(
      () => props.focusTrapEl,
      (focusTrapEl) => {
        if (focusTrapEl) {
          forwardRef.value = focusTrapEl;
        }
      },
      { immediate: true }
    );
    watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
      if (forwardRef2) {
        forwardRef2.addEventListener("keydown", onKeydown);
        forwardRef2.addEventListener("focusin", onFocusIn);
        forwardRef2.addEventListener("focusout", onFocusOut);
      }
      if (oldForwardRef) {
        oldForwardRef.removeEventListener("keydown", onKeydown);
        oldForwardRef.removeEventListener("focusin", onFocusIn);
        oldForwardRef.removeEventListener("focusout", onFocusOut);
      }
    });
    const onFocusIn = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!props.trapped) {
        relatedTarget && trapContainer.contains(relatedTarget);
      }
      if (isFocusedInTrap)
        emit("focusin", e);
      if (props.trapped) {
        if (isFocusedInTrap) {
          lastFocusAfterTrapped = target;
        } else {
          tryFocus(lastFocusAfterTrapped, true);
        }
      }
    };
    const onFocusOut = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      if (props.trapped) {
        const relatedTarget = e.relatedTarget;
        if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
          setTimeout(() => {
            if (props.trapped) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          }, 0);
        }
      } else {
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!isFocusedInTrap)
          emit("focusout", e);
      }
    };
    return {
      onKeydown
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$4], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
});
const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: placements,
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  ...popperArrowProps,
  id: String,
  style: {
    type: definePropType([String, Array, Object])
  },
  className: {
    type: definePropType([String, Array, Object])
  },
  effect: {
    type: definePropType(String),
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: definePropType([String, Array, Object])
  },
  popperStyle: {
    type: definePropType([String, Array, Object])
  },
  referenceEl: {
    type: definePropType(Object)
  },
  triggerTargetEl: {
    type: definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...useAriaProps(["ariaLabel"]),
  loop: Boolean
});
const popperContentEmits = {
  mouseenter: (evt) => evt instanceof MouseEvent,
  mouseleave: (evt) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true
};
const usePopperContentFocusTrap = (props, emit) => {
  const trapped = ref(false);
  const focusStartRef = ref();
  const onFocusAfterTrapped = () => {
    emit("focus");
  };
  const onFocusAfterReleased = (event) => {
    var _a;
    if (((_a = event.detail) == null ? void 0 : _a.focusReason) !== "pointer") {
      focusStartRef.value = "first";
      emit("blur");
    }
  };
  const onFocusInTrap = (event) => {
    if (props.visible && !trapped.value) {
      if (event.target) {
        focusStartRef.value = event.target;
      }
      trapped.value = true;
    }
  };
  const onFocusoutPrevented = (event) => {
    if (!props.trapping) {
      if (event.detail.focusReason === "pointer") {
        event.preventDefault();
      }
      trapped.value = false;
    }
  };
  const onReleaseRequested = () => {
    trapped.value = false;
    emit("close");
  };
  return {
    focusStartRef,
    trapped,
    onFocusAfterReleased,
    onFocusAfterTrapped,
    onFocusInTrap,
    onFocusoutPrevented,
    onReleaseRequested
  };
};
const buildPopperOptions = (props, modifiers = []) => {
  const { placement, strategy, popperOptions } = props;
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  };
  deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
  return options;
};
const unwrapMeasurableEl = ($el) => {
  if (!isClient)
    return;
  return unrefElement($el);
};
function genModifiers(options) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: "offset",
      options: {
        offset: [0, offset != null ? offset : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration
      }
    }
  ];
}
function deriveExtraModifiers(options, modifiers) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
  }
}
const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
  const stateUpdater = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => {
      const derivedState = deriveState(state);
      Object.assign(states.value, derivedState);
    },
    requires: ["computeStyles"]
  };
  const options = computed(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [
        ...modifiers || [],
        stateUpdater,
        { name: "applyStyles", enabled: false }
      ]
    };
  });
  const instanceRef = shallowRef();
  const states = ref({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  });
  const destroy = () => {
    if (!instanceRef.value)
      return;
    instanceRef.value.destroy();
    instanceRef.value = void 0;
  };
  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef);
      if (instance) {
        instance.setOptions(newOptions);
      }
    },
    {
      deep: true
    }
  );
  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy();
      if (!referenceElement || !popperElement)
        return;
      instanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options)
      );
    }
  );
  return {
    state: computed(() => {
      var _a;
      return { ...((_a = unref(instanceRef)) == null ? void 0 : _a.state) || {} };
    }),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.update();
    },
    forceUpdate: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.forceUpdate();
    },
    instanceRef: computed(() => unref(instanceRef))
  };
};
function deriveState(state) {
  const elements = Object.keys(state.elements);
  const styles = fromPairs(
    elements.map(
      (element) => [element, state.styles[element] || {}]
    )
  );
  const attributes = fromPairs(
    elements.map(
      (element) => [element, state.attributes[element]]
    )
  );
  return {
    styles,
    attributes
  };
}
const DEFAULT_ARROW_OFFSET = 0;
const usePopperContent = (props) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    POPPER_INJECTION_KEY,
    void 0
  );
  const arrowRef = ref();
  const arrowOffset = computed(() => props.arrowOffset);
  const eventListenerModifier = computed(() => {
    return {
      name: "eventListeners",
      enabled: !!props.visible
    };
  });
  const arrowModifier = computed(() => {
    var _a;
    const arrowEl = unref(arrowRef);
    const offset = (_a = unref(arrowOffset)) != null ? _a : DEFAULT_ARROW_OFFSET;
    return {
      name: "arrow",
      enabled: !isUndefined$1(arrowEl),
      options: {
        element: arrowEl,
        padding: offset
      }
    };
  });
  const options = computed(() => {
    return {
      onFirstUpdate: () => {
        update();
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier)
      ])
    };
  });
  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
  );
  const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
  watch(instanceRef, (instance) => popperInstanceRef.value = instance, {
    flush: "sync"
  });
  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,
    forceUpdate,
    update
  };
};
const usePopperContentDOM = (props, {
  attributes,
  styles,
  role
}) => {
  const { nextZIndex } = useZIndex();
  const ns = useNamespace("popper");
  const contentAttrs = computed(() => unref(attributes).popper);
  const contentZIndex = ref(
    isNumber(props.zIndex) ? props.zIndex : nextZIndex()
  );
  const contentClass = computed(() => [
    ns.b(),
    ns.is("pure", props.pure),
    ns.is(props.effect),
    props.popperClass
  ]);
  const contentStyle = computed(() => {
    return [
      { zIndex: unref(contentZIndex) },
      unref(styles).popper,
      props.popperStyle || {}
    ];
  });
  const ariaModal = computed(
    () => role.value === "dialog" ? "false" : void 0
  );
  const arrowStyle = computed(
    () => unref(styles).arrow || {}
  );
  const updateZIndex = () => {
    contentZIndex.value = isNumber(props.zIndex) ? props.zIndex : nextZIndex();
  };
  return {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentClass,
    contentStyle,
    contentZIndex,
    updateZIndex
  };
};
const _sfc_main$f = defineComponent({
  ...{
    name: "ElPopperContent"
  },
  __name: "content",
  props: popperContentProps,
  emits: popperContentEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const {
      focusStartRef,
      trapped,
      onFocusAfterReleased,
      onFocusAfterTrapped,
      onFocusInTrap,
      onFocusoutPrevented,
      onReleaseRequested
    } = usePopperContentFocusTrap(props, emit);
    const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
    const {
      arrowStyle,
      contentAttrs,
      contentClass,
      contentStyle,
      updateZIndex
    } = usePopperContentDOM(props, {
      styles,
      attributes,
      role
    });
    const formItemContext = inject(formItemContextKey, void 0);
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowStyle,
      arrowRef
    });
    if (formItemContext) {
      provide(formItemContextKey, {
        ...formItemContext,
        addInputId: NOOP,
        removeInputId: NOOP
      });
    }
    const updatePopper = (shouldUpdateZIndex = true) => {
      update();
      shouldUpdateZIndex && updateZIndex();
    };
    __expose({
      popperContentRef: contentRef,
      popperInstanceRef: instanceRef,
      updatePopper,
      contentStyle
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        mergeProps({
          ref_key: "contentRef",
          ref: contentRef
        }, unref(contentAttrs), {
          style: unref(contentStyle),
          class: unref(contentClass),
          tabindex: "-1",
          onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
          onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
        }),
        [
          createVNode(unref(ElFocusTrap), {
            loop: _ctx.loop,
            trapped: unref(trapped),
            "trap-on-focus-in": true,
            "focus-trap-el": unref(contentRef),
            "focus-start-el": unref(focusStartRef),
            onFocusAfterTrapped: unref(onFocusAfterTrapped),
            onFocusAfterReleased: unref(onFocusAfterReleased),
            onFocusin: unref(onFocusInTrap),
            onFocusoutPrevented: unref(onFocusoutPrevented),
            onReleaseRequested: unref(onReleaseRequested)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["loop", "trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
        ],
        16
      );
    };
  }
});
var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const ElPopper = withInstall(Popper);
const TOOLTIP_INJECTION_KEY = /* @__PURE__ */ Symbol("elTooltip");
function useTimeout() {
  let timeoutHandle;
  const registerTimeout = (fn, delay) => {
    cancelTimeout();
    timeoutHandle = (void 0).setTimeout(fn, delay);
  };
  const cancelTimeout = () => (void 0).clearTimeout(timeoutHandle);
  tryOnScopeDispose(() => cancelTimeout());
  return {
    registerTimeout,
    cancelTimeout
  };
}
const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
});
const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}) => {
  const { registerTimeout } = useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout();
  const onOpen = (event, delay = unref(showAfter)) => {
    registerTimeout(() => {
      open(event);
      const _autoClose = unref(autoClose);
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event);
        }, _autoClose);
      }
    }, delay);
  };
  const onClose = (event, delay = unref(hideAfter)) => {
    cancelTimeoutForAutoClose();
    registerTimeout(() => {
      close(event);
    }, delay);
  };
  return {
    onOpen,
    onClose
  };
};
const teleportProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    required: true
  },
  disabled: Boolean
});
const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: teleportProps.to.type
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: Boolean,
  persistent: Boolean,
  visible: {
    type: definePropType(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  ...useAriaProps(["ariaLabel"])
});
const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space]
  },
  focusOnTarget: Boolean
});
const _prop = buildProp({
  type: definePropType(Boolean),
  default: null
});
const _event = buildProp({
  type: definePropType(Function)
});
const createModelToggleComposable = (name) => {
  const updateEventKey = `update:${name}`;
  const updateEventKeyRaw = `onUpdate:${name}`;
  const useModelToggleEmits2 = [updateEventKey];
  const useModelToggleProps2 = {
    [name]: _prop,
    [updateEventKeyRaw]: _event
  };
  const useModelToggle2 = ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }) => {
    const instance = getCurrentInstance();
    const { emit } = instance;
    const props = instance.props;
    const hasUpdateHandler = computed(
      () => isFunction(props[updateEventKeyRaw])
    );
    const isModelBindingAbsent = computed(() => props[name] === null);
    const doShow = (event) => {
      if (indicator.value === true) {
        return;
      }
      indicator.value = true;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (isFunction(onShow)) {
        onShow(event);
      }
    };
    const doHide = (event) => {
      if (indicator.value === false) {
        return;
      }
      indicator.value = false;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (isFunction(onHide)) {
        onHide(event);
      }
    };
    const show = (event) => {
      if (props.disabled === true || isFunction(shouldProceed) && !shouldProceed())
        return;
      const shouldEmit = hasUpdateHandler.value && isClient;
      if (shouldEmit) {
        emit(updateEventKey, true);
      }
      if (isModelBindingAbsent.value || !shouldEmit) {
        doShow(event);
      }
    };
    const hide = (event) => {
      if (props.disabled === true || !isClient)
        return;
      const shouldEmit = hasUpdateHandler.value && isClient;
      if (shouldEmit) {
        emit(updateEventKey, false);
      }
      if (isModelBindingAbsent.value || !shouldEmit) {
        doHide(event);
      }
    };
    const onChange = (val) => {
      if (!isBoolean(val))
        return;
      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false);
        }
      } else if (indicator.value !== val) {
        if (val) {
          doShow();
        } else {
          doHide();
        }
      }
    };
    const toggle = () => {
      if (indicator.value) {
        hide();
      } else {
        show();
      }
    };
    watch(() => props[name], onChange);
    if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
      watch(
        () => ({
          ...instance.proxy.$route
        }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide();
          }
        }
      );
    }
    return {
      hide,
      show,
      toggle,
      hasUpdateHandler
    };
  };
  return {
    useModelToggle: useModelToggle2,
    useModelToggleProps: useModelToggleProps2,
    useModelToggleEmits: useModelToggleEmits2
  };
};
const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable("visible");
const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true
  }
});
const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
];
const isTriggerType = (trigger, type) => {
  if (isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
};
const whenTrigger = (trigger, type, handler) => {
  return (e) => {
    isTriggerType(unref(trigger), type) && handler(e);
  };
};
const _sfc_main$e = defineComponent({
  ...{
    name: "ElTooltipTrigger"
  },
  __name: "trigger",
  props: useTooltipTriggerProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("tooltip");
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(
      TOOLTIP_INJECTION_KEY,
      void 0
    );
    const triggerRef = ref(null);
    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true;
      }
    };
    const trigger = toRef(props, "trigger");
    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "hover", (e) => {
        onOpen(e);
        if (props.focusOnTarget && e.target) {
          nextTick(() => {
            focusElement(e.target, { preventScroll: true });
          });
        }
      })
    );
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "hover", onClose)
    );
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "click", (e) => {
        if (e.button === 0) {
          onToggle(e);
        }
      })
    );
    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "focus", onOpen)
    );
    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "focus", onClose)
    );
    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "contextmenu", (e) => {
        e.preventDefault();
        onToggle(e);
      })
    );
    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e) => {
        const code = getEventCode(e);
        if (props.triggerKeys.includes(code)) {
          e.preventDefault();
          onToggle(e);
        }
      }
    );
    __expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopperTrigger), {
        id: unref(id),
        "virtual-ref": _ctx.virtualRef,
        open: unref(open),
        "virtual-triggering": _ctx.virtualTriggering,
        class: normalizeClass(unref(ns).e("trigger")),
        onBlur: unref(onBlur),
        onClick: unref(onClick),
        onContextmenu: unref(onContextMenu),
        onFocus: unref(onFocus),
        onMouseenter: unref(onMouseenter),
        onMouseleave: unref(onMouseleave),
        onKeydown: unref(onKeydown)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
    };
  }
});
var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const _sfc_main$d = defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport$1, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});
var Teleport = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/teleport/src/teleport.vue"]]);
const ElTeleport = withInstall(Teleport);
const usePopperContainerId = () => {
  const namespace = useGetDerivedNamespace();
  const idInjection = useIdInjection();
  const id = computed(() => {
    return `${namespace.value}-popper-container-${idInjection.prefix}`;
  });
  const selector = computed(() => `#${id.value}`);
  return {
    id,
    selector
  };
};
const usePopperContainer = () => {
  const { id, selector } = usePopperContainerId();
  return {
    id,
    selector
  };
};
const castArray = (arr) => {
  if (!arr && arr !== 0)
    return [];
  return isArray(arr) ? arr : [arr];
};
const _sfc_main$c = defineComponent({
  ...{
    name: "ElTooltipContent",
    inheritAttrs: false
  },
  __name: "content",
  props: useTooltipContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { selector } = usePopperContainerId();
    const ns = useNamespace("tooltip");
    const contentRef = ref();
    const popperContentRef = computedEager(() => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
    });
    let stopHandle;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide
    } = inject(TOOLTIP_INJECTION_KEY, void 0);
    const transitionClass = computed(() => {
      return props.transition || `${ns.namespace.value}-fade-in-linear`;
    });
    const persistentRef = computed(() => {
      return props.persistent;
    });
    const shouldRender = computed(() => {
      return unref(persistentRef) ? true : unref(open);
    });
    const shouldShow = computed(() => {
      return props.disabled ? false : unref(open);
    });
    const appendTo = computed(() => {
      return props.appendTo || selector.value;
    });
    const contentStyle = computed(() => {
      var _a;
      return (_a = props.style) != null ? _a : {};
    });
    const ariaHidden = ref(true);
    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && focusElement((void 0).body, { preventScroll: true });
      ariaHidden.value = true;
    };
    const stopWhenControlled = () => {
      if (unref(controlled))
        return true;
    };
    const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && isTriggerType(unref(trigger), "hover")) {
        onOpen();
      }
    });
    const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
      if (isTriggerType(unref(trigger), "hover")) {
        onClose();
      }
    });
    const onBeforeEnter = () => {
      var _a, _b;
      (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      onBeforeShow == null ? void 0 : onBeforeShow();
    };
    const onBeforeLeave = () => {
      onBeforeHide == null ? void 0 : onBeforeHide();
    };
    const onAfterShow = () => {
      onShow();
    };
    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };
    const isFocusInsideContent = (event) => {
      var _a;
      const popperContent = (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
      const activeElement = (event == null ? void 0 : event.relatedTarget) || (void 0).activeElement;
      return popperContent == null ? void 0 : popperContent.contains(activeElement);
    };
    watch(
      () => unref(open),
      (val) => {
        if (!val) {
          stopHandle == null ? void 0 : stopHandle();
        } else {
          ariaHidden.value = false;
          stopHandle = onClickOutside(
            popperContentRef,
            () => {
              if (unref(controlled))
                return;
              const needClose = castArray(unref(trigger)).every((item) => {
                return item !== "hover" && item !== "focus";
              });
              if (needClose) {
                onClose();
              }
            },
            { detectIframe: true }
          );
        }
      },
      {
        flush: "post"
      }
    );
    watch(
      () => props.content,
      () => {
        var _a, _b;
        (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      }
    );
    __expose({
      contentRef,
      isFocusInsideContent
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        disabled: !_ctx.teleported,
        to: appendTo.value
      }, {
        default: withCtx(() => [
          shouldRender.value || !ariaHidden.value ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: transitionClass.value,
            appear: !persistentRef.value,
            onAfterLeave: onTransitionLeave,
            onBeforeEnter,
            onAfterEnter: onAfterShow,
            onBeforeLeave,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(unref(ElPopperContent), mergeProps({
                id: unref(id),
                ref_key: "contentRef",
                ref: contentRef
              }, _ctx.$attrs, {
                "aria-label": _ctx.ariaLabel,
                "aria-hidden": ariaHidden.value,
                "boundaries-padding": _ctx.boundariesPadding,
                "fallback-placements": _ctx.fallbackPlacements,
                "gpu-acceleration": _ctx.gpuAcceleration,
                offset: _ctx.offset,
                placement: _ctx.placement,
                "popper-options": _ctx.popperOptions,
                "arrow-offset": _ctx.arrowOffset,
                strategy: _ctx.strategy,
                effect: _ctx.effect,
                enterable: _ctx.enterable,
                pure: _ctx.pure,
                "popper-class": _ctx.popperClass,
                "popper-style": [_ctx.popperStyle, contentStyle.value],
                "reference-el": _ctx.referenceEl,
                "trigger-target-el": _ctx.triggerTargetEl,
                visible: shouldShow.value,
                "z-index": _ctx.zIndex,
                loop: _ctx.loop,
                onMouseenter: unref(onContentEnter),
                onMouseleave: unref(onContentLeave),
                onBlur,
                onClose: unref(onClose)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "loop", "onMouseenter", "onMouseleave", "onClose"]), [
                [vShow, shouldShow.value]
              ])
            ]),
            _: 3
          }, 8, ["name", "appear"])) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["disabled", "to"]);
    };
  }
});
var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const _hoisted_1$7 = ["innerHTML"];
const _hoisted_2$2 = { key: 1 };
const _sfc_main$b = defineComponent({
  ...{
    name: "ElTooltip"
  },
  __name: "tooltip",
  props: useTooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    usePopperContainer();
    const ns = useNamespace("tooltip");
    const id = useId();
    const popperRef = ref();
    const contentRef = ref();
    const updatePopper = () => {
      var _a;
      const popperComponent = unref(popperRef);
      if (popperComponent) {
        (_a = popperComponent.popperInstanceRef) == null ? void 0 : _a.update();
      }
    };
    const open = ref(false);
    const toggleReason = ref();
    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason
    });
    const { onOpen, onClose } = useDelayedToggle({
      showAfter: toRef(props, "showAfter"),
      hideAfter: toRef(props, "hideAfter"),
      autoClose: toRef(props, "autoClose"),
      open: show,
      close: hide
    });
    const controlled = computed(
      () => isBoolean(props.visible) && !hasUpdateHandler.value
    );
    const kls = computed(() => {
      return [ns.b(), props.popperClass];
    });
    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: readonly(open),
      trigger: toRef(props, "trigger"),
      onOpen,
      onClose,
      onToggle: (event) => {
        if (unref(open)) {
          onClose(event);
        } else {
          onOpen(event);
        }
      },
      onShow: () => {
        emit("show", toggleReason.value);
      },
      onHide: () => {
        emit("hide", toggleReason.value);
      },
      onBeforeShow: () => {
        emit("before-show", toggleReason.value);
      },
      onBeforeHide: () => {
        emit("before-hide", toggleReason.value);
      },
      updatePopper
    });
    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled && open.value) {
          open.value = false;
        }
      }
    );
    const isFocusInsideContent = (event) => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
    };
    __expose({
      popperRef,
      contentRef,
      isFocusInsideContent,
      updatePopper,
      onOpen,
      onClose,
      hide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopper), {
        ref_key: "popperRef",
        ref: popperRef,
        role: _ctx.role
      }, {
        default: withCtx(() => [
          createVNode(ElTooltipTrigger, {
            disabled: _ctx.disabled,
            trigger: _ctx.trigger,
            "trigger-keys": _ctx.triggerKeys,
            "virtual-ref": _ctx.virtualRef,
            "virtual-triggering": _ctx.virtualTriggering,
            "focus-on-target": _ctx.focusOnTarget
          }, {
            default: withCtx(() => [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
          createVNode(ElTooltipContent, {
            ref_key: "contentRef",
            ref: contentRef,
            "aria-label": _ctx.ariaLabel,
            "boundaries-padding": _ctx.boundariesPadding,
            content: _ctx.content,
            disabled: _ctx.disabled,
            effect: _ctx.effect,
            enterable: _ctx.enterable,
            "fallback-placements": _ctx.fallbackPlacements,
            "hide-after": _ctx.hideAfter,
            "gpu-acceleration": _ctx.gpuAcceleration,
            offset: _ctx.offset,
            persistent: _ctx.persistent,
            "popper-class": kls.value,
            "popper-style": _ctx.popperStyle,
            placement: _ctx.placement,
            "popper-options": _ctx.popperOptions,
            "arrow-offset": _ctx.arrowOffset,
            pure: _ctx.pure,
            "raw-content": _ctx.rawContent,
            "reference-el": _ctx.referenceEl,
            "trigger-target-el": _ctx.triggerTargetEl,
            "show-after": _ctx.showAfter,
            strategy: _ctx.strategy,
            teleported: _ctx.teleported,
            transition: _ctx.transition,
            "virtual-triggering": _ctx.virtualTriggering,
            "z-index": _ctx.zIndex,
            "append-to": _ctx.appendTo,
            loop: _ctx.loop
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "content", {}, () => [
                _ctx.rawContent ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  innerHTML: _ctx.content
                }, null, 8, _hoisted_1$7)) : (openBlock(), createElementBlock(
                  "span",
                  _hoisted_2$2,
                  toDisplayString(_ctx.content),
                  1
                ))
              ]),
              _ctx.showArrow ? (openBlock(), createBlock(unref(ElPopperArrow), { key: 0 })) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "arrow-offset", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to", "loop"])
        ]),
        _: 3
      }, 8, ["role"]);
    };
  }
});
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const ElTooltip = withInstall(Tooltip);
const GAP = 4;
const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};
const renderThumbStyle = ({
  move,
  size,
  bar
}) => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`
});
const scrollbarContextKey = /* @__PURE__ */ Symbol(
  "scrollbarContextKey"
);
const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});
const COMPONENT_NAME$3 = "Thumb";
const _sfc_main$a = defineComponent({
  __name: "thumb",
  props: thumbProps,
  setup(__props) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const ns = useNamespace("scrollbar");
    if (!scrollbar)
      throwError(COMPONENT_NAME$3, "can not inject scrollbar context");
    const instance = ref();
    const thumb = ref();
    const thumbState = ref({});
    const visible = ref(false);
    let cursorDown = false;
    let cursorLeave = false;
    let baseScrollHeight = 0;
    let baseScrollWidth = 0;
    let originalOnSelectStart = isClient ? (void 0).onselectstart : null;
    const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const thumbStyle = computed(
      () => renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    );
    const offsetRatio = computed(
      () => instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]
    );
    const clickThumbHandler = (e) => {
      var _a;
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button))
        return;
      (_a = (void 0).getSelection()) == null ? void 0 : _a.removeAllRanges();
      startDrag(e);
      const el = e.currentTarget;
      if (!el)
        return;
      thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };
    const clickTrackHandler = (e) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement)
        return;
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      baseScrollHeight = scrollbar.wrapElement.scrollHeight;
      baseScrollWidth = scrollbar.wrapElement.scrollWidth;
      (void 0).addEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).addEventListener("mouseup", mouseUpDocumentHandler);
      originalOnSelectStart = (void 0).onselectstart;
      (void 0).onselectstart = () => false;
    };
    const mouseMoveDocumentHandler = (e) => {
      if (!instance.value || !thumb.value)
        return;
      if (cursorDown === false)
        return;
      const prevPage = thumbState.value[bar.value.axis];
      if (!prevPage)
        return;
      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      if (bar.value.scroll === "scrollLeft") {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollWidth / 100;
      } else {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollHeight / 100;
      }
    };
    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      thumbState.value[bar.value.axis] = 0;
      (void 0).removeEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).removeEventListener("mouseup", mouseUpDocumentHandler);
      restoreOnselectstart();
      if (cursorLeave)
        visible.value = false;
    };
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = !!props.size;
    };
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };
    const restoreOnselectstart = () => {
      if ((void 0).onselectstart !== originalOnSelectStart)
        (void 0).onselectstart = originalOnSelectStart;
    };
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mousemove",
      mouseMoveScrollbarHandler
    );
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mouseleave",
      mouseLeaveScrollbarHandler
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              ref_key: "instance",
              ref: instance,
              class: normalizeClass([unref(ns).e("bar"), unref(ns).is(bar.value.key)]),
              onMousedown: clickTrackHandler,
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              createElementVNode(
                "div",
                {
                  ref_key: "thumb",
                  ref: thumb,
                  class: normalizeClass(unref(ns).e("thumb")),
                  style: normalizeStyle(thumbStyle.value),
                  onMousedown: clickThumbHandler
                },
                null,
                38
              )
            ],
            34
          ), [
            [vShow, _ctx.always || visible.value]
          ])
        ]),
        _: 1
      }, 8, ["name"]);
    };
  }
});
var Thumb = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const barProps = buildProps({
  always: {
    type: Boolean,
    default: true
  },
  minSize: {
    type: Number,
    required: true
  }
});
const _sfc_main$9 = defineComponent({
  __name: "bar",
  props: barProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const moveX = ref(0);
    const moveY = ref(0);
    const sizeWidth = ref("");
    const sizeHeight = ref("");
    const ratioY = ref(1);
    const ratioX = ref(1);
    const handleScroll = (wrap) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP;
        const offsetWidth = wrap.offsetWidth - GAP;
        moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
        moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
      }
    };
    const update = () => {
      const wrap = scrollbar == null ? void 0 : scrollbar.wrapElement;
      if (!wrap)
        return;
      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;
      const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
    };
    __expose({
      handleScroll,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createVNode(Thumb, {
            move: moveX.value,
            ratio: ratioX.value,
            size: sizeWidth.value,
            always: _ctx.always
          }, null, 8, ["move", "ratio", "size", "always"]),
          createVNode(Thumb, {
            move: moveY.value,
            ratio: ratioY.value,
            size: sizeHeight.value,
            vertical: "",
            always: _ctx.always
          }, null, 8, ["move", "ratio", "size", "always"])
        ],
        64
      );
    };
  }
});
var Bar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const scrollbarProps = buildProps({
  distance: {
    type: Number,
    default: 0
  },
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: Boolean,
  wrapStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  },
  tabindex: {
    type: [String, Number],
    default: void 0
  },
  id: String,
  role: String,
  ...useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
  "end-reached": (direction) => ["left", "right", "top", "bottom"].includes(direction),
  scroll: ({
    scrollTop,
    scrollLeft
  }) => [scrollTop, scrollLeft].every(isNumber)
};
const _hoisted_1$6 = ["tabindex"];
const COMPONENT_NAME$2 = "ElScrollbar";
const _sfc_main$8 = defineComponent({
  ...{
    name: COMPONENT_NAME$2
  },
  __name: "scrollbar",
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("scrollbar");
    let stopResizeObserver = void 0;
    let stopWrapResizeObserver = void 0;
    let stopResizeListener = void 0;
    let wrapScrollTop = 0;
    let wrapScrollLeft = 0;
    let direction = "";
    const distanceScrollState = {
      bottom: false,
      top: false,
      right: false,
      left: false
    };
    const scrollbarRef = ref();
    const wrapRef = ref();
    const resizeRef = ref();
    const barRef = ref();
    const wrapStyle = computed(() => {
      const style = {};
      const height = addUnit(props.height);
      const maxHeight = addUnit(props.maxHeight);
      if (height)
        style.height = height;
      if (maxHeight)
        style.maxHeight = maxHeight;
      return [props.wrapStyle, style];
    });
    const wrapKls = computed(() => {
      return [
        props.wrapClass,
        ns.e("wrap"),
        { [ns.em("wrap", "hidden-default")]: !props.native }
      ];
    });
    const resizeKls = computed(() => {
      return [ns.e("view"), props.viewClass];
    });
    const shouldSkipDirection = (direction2) => {
      var _a;
      return (_a = distanceScrollState[direction2]) != null ? _a : false;
    };
    const DIRECTION_PAIRS = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const updateTriggerStatus = (arrivedStates) => {
      const oppositeDirection = DIRECTION_PAIRS[direction];
      if (!oppositeDirection)
        return;
      const arrived = arrivedStates[direction];
      const oppositeArrived = arrivedStates[oppositeDirection];
      if (arrived && !distanceScrollState[direction]) {
        distanceScrollState[direction] = true;
      }
      if (!oppositeArrived && distanceScrollState[oppositeDirection]) {
        distanceScrollState[oppositeDirection] = false;
      }
    };
    const handleScroll = () => {
      var _a;
      if (wrapRef.value) {
        (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
        const prevTop = wrapScrollTop;
        const prevLeft = wrapScrollLeft;
        wrapScrollTop = wrapRef.value.scrollTop;
        wrapScrollLeft = wrapRef.value.scrollLeft;
        const arrivedStates = {
          bottom: wrapScrollTop + wrapRef.value.clientHeight >= wrapRef.value.scrollHeight - props.distance,
          top: wrapScrollTop <= props.distance && prevTop !== 0,
          right: wrapScrollLeft + wrapRef.value.clientWidth >= wrapRef.value.scrollWidth - props.distance && prevLeft !== wrapScrollLeft,
          left: wrapScrollLeft <= props.distance && prevLeft !== 0
        };
        emit("scroll", {
          scrollTop: wrapScrollTop,
          scrollLeft: wrapScrollLeft
        });
        if (prevTop !== wrapScrollTop) {
          direction = wrapScrollTop > prevTop ? "bottom" : "top";
        }
        if (prevLeft !== wrapScrollLeft) {
          direction = wrapScrollLeft > prevLeft ? "right" : "left";
        }
        if (props.distance > 0) {
          if (shouldSkipDirection(direction)) {
            return;
          }
          updateTriggerStatus(arrivedStates);
        }
        if (arrivedStates[direction])
          emit("end-reached", direction);
      }
    };
    function scrollTo(arg1, arg2) {
      if (isObject(arg1)) {
        wrapRef.value.scrollTo(arg1);
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrapRef.value.scrollTo(arg1, arg2);
      }
    }
    const setScrollTop = (value) => {
      if (!isNumber(value)) {
        return;
      }
      wrapRef.value.scrollTop = value;
    };
    const setScrollLeft = (value) => {
      if (!isNumber(value)) {
        return;
      }
      wrapRef.value.scrollLeft = value;
    };
    const update = () => {
      var _a;
      (_a = barRef.value) == null ? void 0 : _a.update();
      distanceScrollState[direction] = false;
    };
    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver == null ? void 0 : stopResizeObserver();
          stopWrapResizeObserver == null ? void 0 : stopWrapResizeObserver();
          stopResizeListener == null ? void 0 : stopResizeListener();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
          ({ stop: stopWrapResizeObserver } = useResizeObserver(wrapRef, update));
          stopResizeListener = useEventListener("resize", update);
        }
      },
      { immediate: true }
    );
    watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          nextTick(() => {
            var _a;
            update();
            if (wrapRef.value) {
              (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
            }
          });
      }
    );
    provide(
      scrollbarContextKey,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef
      })
    );
    __expose({
      wrapRef,
      update,
      scrollTo,
      setScrollTop,
      setScrollLeft,
      handleScroll
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode("div", {
            ref_key: "wrapRef",
            ref: wrapRef,
            class: normalizeClass(wrapKls.value),
            style: normalizeStyle(wrapStyle.value),
            tabindex: _ctx.tabindex,
            onScroll: handleScroll
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
              id: _ctx.id,
              ref_key: "resizeRef",
              ref: resizeRef,
              class: normalizeClass(resizeKls.value),
              style: normalizeStyle(_ctx.viewStyle),
              role: _ctx.role,
              "aria-label": _ctx.ariaLabel,
              "aria-orientation": _ctx.ariaOrientation
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
          ], 46, _hoisted_1$6),
          !_ctx.native ? (openBlock(), createBlock(Bar, {
            key: 0,
            ref_key: "barRef",
            ref: barRef,
            always: _ctx.always,
            "min-size": _ctx.minSize
          }, null, 8, ["always", "min-size"])) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const ElScrollbar = withInstall(Scrollbar);
const tagProps = buildProps({
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger"],
    default: "primary"
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: String,
  size: {
    type: String,
    values: componentSizes
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
});
const tagEmits = {
  close: (evt) => evt instanceof MouseEvent,
  click: (evt) => evt instanceof MouseEvent
};
const _hoisted_1$5 = ["aria-label"];
const _hoisted_2$1 = ["aria-label"];
const _sfc_main$7 = defineComponent({
  ...{
    name: "ElTag"
  },
  __name: "tag",
  props: tagProps,
  emits: tagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagSize = useFormSize();
    const { t } = useLocale();
    const ns = useNamespace("tag");
    const containerKls = computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is("closable", closable),
        ns.m(type || "primary"),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is("hit", hit),
        ns.is("round", round)
      ];
    });
    const handleClose = (event) => {
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    const handleVNodeMounted = (vnode) => {
      var _a, _b, _c;
      if ((_c = (_b = (_a = vnode == null ? void 0 : vnode.component) == null ? void 0 : _a.subTree) == null ? void 0 : _b.component) == null ? void 0 : _c.bum) {
        vnode.component.subTree.component.bum = null;
      }
    };
    return (_ctx, _cache) => {
      return _ctx.disableTransitions ? (openBlock(), createElementBlock(
        "span",
        {
          key: 0,
          class: normalizeClass(containerKls.value),
          style: normalizeStyle({ backgroundColor: _ctx.color }),
          onClick: handleClick
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("content"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
          ),
          _ctx.closable ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.tag.close"),
            class: normalizeClass(unref(ns).e("close")),
            type: "button",
            onClick: withModifiers(handleClose, ["stop"])
          }, [
            createVNode(unref(ElIcon), null, {
              default: withCtx(() => [
                createVNode(unref(close_default))
              ]),
              _: 1
            })
          ], 10, _hoisted_1$5)) : createCommentVNode("v-if", true)
        ],
        6
      )) : (openBlock(), createBlock(Transition, {
        key: 1,
        name: `${unref(ns).namespace.value}-zoom-in-center`,
        appear: "",
        onVnodeMounted: handleVNodeMounted
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(containerKls.value),
              style: normalizeStyle({ backgroundColor: _ctx.color }),
              onClick: handleClick
            },
            [
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
              ),
              _ctx.closable ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.tag.close"),
                class: normalizeClass(unref(ns).e("close")),
                type: "button",
                onClick: withModifiers(handleClose, ["stop"])
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_2$1)) : createCommentVNode("v-if", true)
            ],
            6
          )
        ]),
        _: 3
      }, 8, ["name"]));
    };
  }
});
var Tag = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
const ElTag = withInstall(Tag);
const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled",
  options: "options"
};
function useProps(props) {
  const aliasProps = ref({ ...defaultProps, ...props.props });
  let cache = { ...props.props };
  watch(
    () => props.props,
    (val) => {
      if (!isEqual(val, cache)) {
        aliasProps.value = { ...defaultProps, ...val };
        cache = { ...val };
      }
    },
    { deep: true }
  );
  const getLabel = (option) => get(option, aliasProps.value.label);
  const getValue = (option) => get(option, aliasProps.value.value);
  const getDisabled = (option) => get(option, aliasProps.value.disabled);
  const getOptions = (option) => get(option, aliasProps.value.options);
  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions
  };
}
const selectGroupKey = /* @__PURE__ */ Symbol("ElSelectGroup");
const selectKey = /* @__PURE__ */ Symbol("ElSelect");
const COMPONENT_NAME$1 = "ElOption";
const optionProps = buildProps({
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  label: {
    type: [String, Number]
  },
  created: Boolean,
  disabled: Boolean
});
const escapeStringRegexp = (string = "") => string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
function useOption(props, states) {
  const select = inject(selectKey);
  if (!select) {
    throwError(COMPONENT_NAME$1, "usage: <el-select><el-option /></el-select/>");
  }
  const selectGroup = inject(selectGroupKey, { disabled: false });
  const itemSelected = computed(() => {
    return contains(castArray$1(select.props.modelValue), props.value);
  });
  const limitReached = computed(() => {
    var _a;
    if (select.props.multiple) {
      const modelValue = castArray$1((_a = select.props.modelValue) != null ? _a : []);
      return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
    } else {
      return false;
    }
  });
  const currentLabel = computed(() => {
    var _a;
    return (_a = props.label) != null ? _a : isObject(props.value) ? "" : props.value;
  });
  const currentValue = computed(() => {
    return props.value || props.label || "";
  });
  const isDisabled = computed(() => {
    return props.disabled || states.groupDisabled || limitReached.value;
  });
  const instance = getCurrentInstance();
  const contains = (arr = [], target) => {
    if (!isObject(props.value)) {
      return arr && arr.includes(target);
    } else {
      const valueKey = select.props.valueKey;
      return arr && arr.some((item) => {
        return toRaw(get(item, valueKey)) === get(target, valueKey);
      });
    }
  };
  const hoverItem = () => {
    if (!isDisabled.value) {
      select.states.hoveringIndex = select.optionsArray.indexOf(instance.proxy);
    }
  };
  const updateOption = (query) => {
    const regexp = new RegExp(escapeStringRegexp(query), "i");
    states.visible = regexp.test(String(currentLabel.value)) || props.created;
  };
  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !select.props.remote)
        select.setSelected();
    }
  );
  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = select.props;
      const shouldUpdate = remote ? val !== oldVal : !isEqual(val, oldVal);
      if (shouldUpdate) {
        select.onOptionDestroy(oldVal, instance.proxy);
        select.onOptionCreate(instance.proxy);
      }
      if (!props.created && !remote) {
        if (valueKey && isObject(val) && isObject(oldVal) && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        select.setSelected();
      }
    }
  );
  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled;
    },
    { immediate: true }
  );
  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
    updateOption
  };
}
const _sfc_main$6 = defineComponent({
  name: COMPONENT_NAME$1,
  componentName: COMPONENT_NAME$1,
  props: optionProps,
  setup(props) {
    const ns = useNamespace("select");
    const id = useId();
    const containerKls = computed(() => [
      ns.be("dropdown", "item"),
      ns.is("disabled", unref(isDisabled)),
      ns.is("selected", unref(itemSelected)),
      ns.is("hovering", unref(hover))
    ]);
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hover: false
    });
    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      updateOption
    } = useOption(props, states);
    const { visible, hover } = toRefs(states);
    const vm = getCurrentInstance().proxy;
    select.onOptionCreate(vm);
    function selectOptionClick() {
      if (!isDisabled.value) {
        select.handleOptionSelect(vm);
      }
    }
    return {
      ns,
      id,
      containerKls,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      visible,
      hover,
      states,
      hoverItem,
      updateOption,
      selectOptionClick
    };
  }
});
const _hoisted_1$4 = ["id", "aria-disabled", "aria-selected"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("li", {
    id: _ctx.id,
    class: normalizeClass(_ctx.containerKls),
    role: "option",
    "aria-disabled": _ctx.isDisabled || void 0,
    "aria-selected": _ctx.itemSelected,
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createElementVNode(
        "span",
        null,
        toDisplayString(_ctx.currentLabel),
        1
      )
    ])
  ], 42, _hoisted_1$4)), [
    [vShow, _ctx.visible]
  ]);
}
var Option = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);
const MINIMUM_INPUT_WIDTH = 11;
const _sfc_main$5 = defineComponent({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const select = inject(selectKey);
    const ns = useNamespace("select");
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = ref("");
    return {
      ns,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass([_ctx.ns.b("dropdown"), _ctx.ns.is("multiple", _ctx.isMultiple), _ctx.popperClass]),
      style: normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
    },
    [
      _ctx.$slots.header ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.ns.be("dropdown", "header"))
        },
        [
          renderSlot(_ctx.$slots, "header")
        ],
        2
      )) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default"),
      _ctx.$slots.footer ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(_ctx.ns.be("dropdown", "footer"))
        },
        [
          renderSlot(_ctx.$slots, "footer")
        ],
        2
      )) : createCommentVNode("v-if", true)
    ],
    6
  );
}
var ElSelectMenu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);
function scrollIntoView(container, selected) {
  if (!isClient)
    return;
  if (!selected) {
    container.scrollTop = 0;
    return;
  }
  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;
  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
const useSelect = (props, emit) => {
  const { t } = useLocale();
  const slots = useSlots();
  const contentId = useId();
  const nsSelect = useNamespace("select");
  const nsInput = useNamespace("input");
  const states = reactive({
    inputValue: "",
    options: /* @__PURE__ */ new Map(),
    cachedOptions: /* @__PURE__ */ new Map(),
    optionValues: [],
    selected: [],
    selectionWidth: 0,
    collapseItemWidth: 0,
    selectedLabel: "",
    hoveringIndex: -1,
    previousQuery: null,
    inputHovering: false,
    menuVisibleOnFocus: false,
    isBeforeHide: false
  });
  const selectRef = ref();
  const selectionRef = ref();
  const tooltipRef = ref();
  const tagTooltipRef = ref();
  const inputRef = ref();
  const prefixRef = ref();
  const suffixRef = ref();
  const menuRef = ref();
  const tagMenuRef = ref();
  const collapseItemRef = ref();
  const scrollbarRef = ref();
  const expanded = ref(false);
  const hoverOption = ref();
  const debouncing = ref(false);
  const { form, formItem } = useFormItem();
  const { inputId } = useFormItemInputId(props, {
    formItemContext: formItem
  });
  const { valueOnClear, isEmptyValue } = useEmptyValues(props);
  const {
    isComposing,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  } = useComposition({
    afterComposition: (e) => onInput(e)
  });
  const selectDisabled = useFormDisabled();
  const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
    disabled: selectDisabled,
    afterFocus() {
      if (props.automaticDropdown && !expanded.value) {
        expanded.value = true;
        states.menuVisibleOnFocus = true;
      }
    },
    beforeBlur(event) {
      var _a, _b;
      return ((_a = tooltipRef.value) == null ? void 0 : _a.isFocusInsideContent(event)) || ((_b = tagTooltipRef.value) == null ? void 0 : _b.isFocusInsideContent(event));
    },
    afterBlur() {
      var _a;
      expanded.value = false;
      states.menuVisibleOnFocus = false;
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => debugWarn());
      }
    }
  });
  const hasModelValue = computed(() => {
    return isArray(props.modelValue) ? props.modelValue.length > 0 : !isEmptyValue(props.modelValue);
  });
  const needStatusIcon = computed(() => {
    var _a;
    return (_a = form == null ? void 0 : form.statusIcon) != null ? _a : false;
  });
  const showClearBtn = computed(() => {
    return props.clearable && !selectDisabled.value && hasModelValue.value && (isFocused.value || states.inputHovering);
  });
  const iconComponent = computed(
    () => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon
  );
  const iconReverse = computed(
    () => nsSelect.is("reverse", !!(iconComponent.value && expanded.value))
  );
  const validateState = computed(() => (formItem == null ? void 0 : formItem.validateState) || "");
  const validateIcon = computed(
    () => validateState.value && ValidateComponentsMap[validateState.value]
  );
  const debounce = computed(() => props.remote ? props.debounce : 0);
  const isRemoteSearchEmpty = computed(
    () => props.remote && !states.inputValue && states.options.size === 0
  );
  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || t("el.select.loading");
    } else {
      if (props.filterable && states.inputValue && states.options.size > 0 && filteredOptionsCount.value === 0) {
        return props.noMatchText || t("el.select.noMatch");
      }
      if (states.options.size === 0) {
        return props.noDataText || t("el.select.noData");
      }
    }
    return null;
  });
  const filteredOptionsCount = computed(
    () => optionsArray.value.filter((option) => option.visible).length
  );
  const optionsArray = computed(() => {
    const list = Array.from(states.options.values());
    const newList = [];
    states.optionValues.forEach((item) => {
      const index = list.findIndex((i) => i.value === item);
      if (index > -1) {
        newList.push(list[index]);
      }
    });
    return newList.length >= list.length ? newList : list;
  });
  const cachedOptionsArray = computed(
    () => Array.from(states.cachedOptions.values())
  );
  const showNewOption = computed(() => {
    const hasExistingOption = optionsArray.value.filter((option) => {
      return !option.created;
    }).some((option) => {
      return option.currentLabel === states.inputValue;
    });
    return props.filterable && props.allowCreate && states.inputValue !== "" && !hasExistingOption;
  });
  const updateOptions = () => {
    if (props.filterable && isFunction(props.filterMethod))
      return;
    if (props.filterable && props.remote && isFunction(props.remoteMethod))
      return;
    optionsArray.value.forEach((option) => {
      var _a;
      (_a = option.updateOption) == null ? void 0 : _a.call(option, states.inputValue);
    });
  };
  const selectSize = useFormSize();
  const collapseTagSize = computed(
    () => ["small"].includes(selectSize.value) ? "small" : "default"
  );
  const dropdownMenuVisible = computed({
    get() {
      return expanded.value && (props.loading || !isRemoteSearchEmpty.value || props.remote && !!slots.empty) && (!debouncing.value || !isEmpty(states.previousQuery));
    },
    set(val) {
      expanded.value = val;
    }
  });
  const shouldShowPlaceholder = computed(() => {
    if (props.multiple && !isUndefined(props.modelValue)) {
      return castArray$1(props.modelValue).length === 0 && !states.inputValue;
    }
    const value = isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
    return props.filterable || isUndefined(value) ? !states.inputValue : true;
  });
  const currentPlaceholder = computed(() => {
    var _a;
    const _placeholder = (_a = props.placeholder) != null ? _a : t("el.select.placeholder");
    return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
  });
  const mouseEnterEventName = computed(() => isIOS ? null : "mouseenter");
  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        if (props.filterable && !props.reserveKeyword) {
          states.inputValue = "";
          handleQueryChange("");
        }
      }
      setSelected();
      if (!isEqual(val, oldVal) && props.validateEvent) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
      }
    },
    {
      flush: "post",
      deep: true
    }
  );
  watch(
    () => expanded.value,
    (val) => {
      if (val) {
        handleQueryChange(states.inputValue);
      } else {
        states.inputValue = "";
        states.previousQuery = null;
        states.isBeforeHide = true;
      }
    }
  );
  watch(
    () => states.options.entries(),
    () => {
      if (!isClient)
        return;
      setSelected();
      if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
        checkDefaultFirstOption();
      }
    },
    {
      flush: "post"
    }
  );
  watch([() => states.hoveringIndex, optionsArray], ([val]) => {
    if (isNumber(val) && val > -1) {
      hoverOption.value = optionsArray.value[val] || {};
    } else {
      hoverOption.value = {};
    }
    optionsArray.value.forEach((option) => {
      option.hover = hoverOption.value === option;
    });
  });
  watchEffect(() => {
    if (states.isBeforeHide)
      return;
    updateOptions();
  });
  const handleQueryChange = (val) => {
    if (states.previousQuery === val || isComposing.value) {
      return;
    }
    states.previousQuery = val;
    if (props.filterable && isFunction(props.filterMethod)) {
      props.filterMethod(val);
    } else if (props.filterable && props.remote && isFunction(props.remoteMethod)) {
      props.remoteMethod(val);
    }
    if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
      nextTick(checkDefaultFirstOption);
    } else {
      nextTick(updateHoveringIndex);
    }
  };
  const checkDefaultFirstOption = () => {
    const optionsInDropdown = optionsArray.value.filter(
      (n) => n.visible && !n.disabled && !n.states.groupDisabled
    );
    const userCreatedOption = optionsInDropdown.find((n) => n.created);
    const firstOriginOption = optionsInDropdown[0];
    const valueList = optionsArray.value.map((item) => item.value);
    states.hoveringIndex = getValueIndex(
      valueList,
      userCreatedOption || firstOriginOption
    );
  };
  const setSelected = () => {
    if (!props.multiple) {
      const value = isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      const option = getOption(value);
      states.selectedLabel = option.currentLabel;
      states.selected = [option];
      return;
    } else {
      states.selectedLabel = "";
    }
    const result = [];
    if (!isUndefined(props.modelValue)) {
      castArray$1(props.modelValue).forEach((value) => {
        result.push(getOption(value));
      });
    }
    states.selected = result;
  };
  const getOption = (value) => {
    let option;
    const isObjectValue = isPlainObject(value);
    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.value[i];
      const isEqualValue = isObjectValue ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey) : cachedOption.value === value;
      if (isEqualValue) {
        option = {
          index: optionsArray.value.filter((opt) => !opt.created).indexOf(cachedOption),
          value,
          currentLabel: cachedOption.currentLabel,
          get isDisabled() {
            return cachedOption.isDisabled;
          }
        };
        break;
      }
    }
    if (option)
      return option;
    const label = isObjectValue ? value.label : value != null ? value : "";
    const newOption = {
      index: -1,
      value,
      currentLabel: label
    };
    return newOption;
  };
  const updateHoveringIndex = () => {
    const length = states.selected.length;
    if (length > 0) {
      const lastOption = states.selected[length - 1];
      states.hoveringIndex = optionsArray.value.findIndex(
        (item) => getValueKey(lastOption) === getValueKey(item)
      );
    } else {
      states.hoveringIndex = -1;
    }
  };
  const resetSelectionWidth = () => {
    states.selectionWidth = Number.parseFloat(
      (void 0).getComputedStyle(selectionRef.value).width
    );
  };
  const resetCollapseItemWidth = () => {
    states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
  };
  const updateTooltip = () => {
    var _a, _b;
    (_b = (_a = tooltipRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
  };
  const updateTagTooltip = () => {
    var _a, _b;
    (_b = (_a = tagTooltipRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
  };
  const onInputChange = () => {
    if (states.inputValue.length > 0 && !expanded.value) {
      expanded.value = true;
    }
    handleQueryChange(states.inputValue);
  };
  const onInput = (event) => {
    states.inputValue = event.target.value;
    if (props.remote) {
      debouncing.value = true;
      debouncedOnInputChange();
    } else {
      return onInputChange();
    }
  };
  const debouncedOnInputChange = useDebounceFn(() => {
    onInputChange();
    debouncing.value = false;
  }, debounce);
  const emitChange = (val) => {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val);
    }
  };
  const getLastNotDisabledIndex = (value) => findLastIndex(value, (it) => {
    const option = states.cachedOptions.get(it);
    return !(option == null ? void 0 : option.disabled) && !(option == null ? void 0 : option.states.groupDisabled);
  });
  const deletePrevTag = (e) => {
    const code = getEventCode(e);
    if (!props.multiple)
      return;
    if (code === EVENT_CODE.delete)
      return;
    if (e.target.value.length <= 0) {
      const value = castArray$1(props.modelValue).slice();
      const lastNotDisabledIndex = getLastNotDisabledIndex(value);
      if (lastNotDisabledIndex < 0)
        return;
      const removeTagValue = value[lastNotDisabledIndex];
      value.splice(lastNotDisabledIndex, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit("remove-tag", removeTagValue);
    }
  };
  const deleteTag = (event, tag) => {
    const index = states.selected.indexOf(tag);
    if (index > -1 && !selectDisabled.value) {
      const value = castArray$1(props.modelValue).slice();
      value.splice(index, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit("remove-tag", tag.value);
    }
    event.stopPropagation();
    focus();
  };
  const deleteSelected = (event) => {
    event.stopPropagation();
    const value = props.multiple ? [] : valueOnClear.value;
    if (props.multiple) {
      for (const item of states.selected) {
        if (item.isDisabled)
          value.push(item.value);
      }
    }
    emit(UPDATE_MODEL_EVENT, value);
    emitChange(value);
    states.hoveringIndex = -1;
    expanded.value = false;
    emit("clear");
    focus();
  };
  const handleOptionSelect = (option) => {
    var _a;
    if (props.multiple) {
      const value = castArray$1((_a = props.modelValue) != null ? _a : []).slice();
      const optionIndex = getValueIndex(value, option);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) {
        value.push(option.value);
      }
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      if (option.created) {
        handleQueryChange("");
      }
      if (props.filterable && !props.reserveKeyword) {
        states.inputValue = "";
      }
    } else {
      !isEqual(props.modelValue, option.value) && emit(UPDATE_MODEL_EVENT, option.value);
      emitChange(option.value);
      expanded.value = false;
    }
    focus();
    if (expanded.value)
      return;
    nextTick(() => {
      scrollToOption(option);
    });
  };
  const getValueIndex = (arr, option) => {
    if (isUndefined(option))
      return -1;
    if (!isObject(option.value))
      return arr.indexOf(option.value);
    return arr.findIndex((item) => {
      return isEqual(get(item, props.valueKey), getValueKey(option));
    });
  };
  const scrollToOption = (option) => {
    var _a, _b, _c, _d, _e;
    const targetOption = isArray(option) ? option[option.length - 1] : option;
    let target = null;
    if (!isNil(targetOption == null ? void 0 : targetOption.value)) {
      const options = optionsArray.value.filter(
        (item) => item.value === targetOption.value
      );
      if (options.length > 0) {
        target = options[0].$el;
      }
    }
    if (tooltipRef.value && target) {
      const menu = (_d = (_c = (_b = (_a = tooltipRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef) == null ? void 0 : _c.querySelector) == null ? void 0 : _d.call(
        _c,
        `.${nsSelect.be("dropdown", "wrap")}`
      );
      if (menu) {
        scrollIntoView(menu, target);
      }
    }
    (_e = scrollbarRef.value) == null ? void 0 : _e.handleScroll();
  };
  const onOptionCreate = (vm) => {
    states.options.set(vm.value, vm);
    states.cachedOptions.set(vm.value, vm);
  };
  const onOptionDestroy = (key, vm) => {
    if (states.options.get(key) === vm) {
      states.options.delete(key);
    }
  };
  const popperRef = computed(() => {
    var _a, _b;
    return (_b = (_a = tooltipRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
  });
  const handleMenuEnter = () => {
    states.isBeforeHide = false;
    nextTick(() => {
      var _a;
      (_a = scrollbarRef.value) == null ? void 0 : _a.update();
      scrollToOption(states.selected);
    });
  };
  const focus = () => {
    var _a;
    (_a = inputRef.value) == null ? void 0 : _a.focus();
  };
  const blur = () => {
    var _a;
    if (expanded.value) {
      expanded.value = false;
      nextTick(() => {
        var _a2;
        return (_a2 = inputRef.value) == null ? void 0 : _a2.blur();
      });
      return;
    }
    (_a = inputRef.value) == null ? void 0 : _a.blur();
  };
  const handleClearClick = (event) => {
    deleteSelected(event);
  };
  const handleClickOutside = (event) => {
    expanded.value = false;
    if (isFocused.value) {
      const _event2 = new FocusEvent("blur", event);
      nextTick(() => handleBlur(_event2));
    }
  };
  const handleEsc = () => {
    if (states.inputValue.length > 0) {
      states.inputValue = "";
    } else {
      expanded.value = false;
    }
  };
  const toggleMenu = (event) => {
    var _a;
    if (selectDisabled.value || props.filterable && expanded.value && event && !((_a = suffixRef.value) == null ? void 0 : _a.contains(event.target)))
      return;
    if (isIOS)
      states.inputHovering = true;
    if (states.menuVisibleOnFocus) {
      states.menuVisibleOnFocus = false;
    } else {
      expanded.value = !expanded.value;
    }
  };
  const selectOption = () => {
    if (!expanded.value) {
      toggleMenu();
    } else {
      const option = optionsArray.value[states.hoveringIndex];
      if (option && !option.isDisabled) {
        handleOptionSelect(option);
      }
    }
  };
  const getValueKey = (item) => {
    return isObject(item.value) ? get(item.value, props.valueKey) : item.value;
  };
  const optionsAllDisabled = computed(
    () => optionsArray.value.filter((option) => option.visible).every((option) => option.isDisabled)
  );
  const showTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags ? states.selected.slice(0, props.maxCollapseTags) : states.selected;
  });
  const collapseTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags ? states.selected.slice(props.maxCollapseTags) : [];
  });
  const navigateOptions = (direction) => {
    if (!expanded.value) {
      expanded.value = true;
      return;
    }
    if (states.options.size === 0 || filteredOptionsCount.value === 0 || isComposing.value)
      return;
    if (!optionsAllDisabled.value) {
      if (direction === "next") {
        states.hoveringIndex++;
        if (states.hoveringIndex === states.options.size) {
          states.hoveringIndex = 0;
        }
      } else if (direction === "prev") {
        states.hoveringIndex--;
        if (states.hoveringIndex < 0) {
          states.hoveringIndex = states.options.size - 1;
        }
      }
      const option = optionsArray.value[states.hoveringIndex];
      if (option.isDisabled || !option.visible) {
        navigateOptions(direction);
      }
      nextTick(() => scrollToOption(hoverOption.value));
    }
  };
  const findFocusableIndex = (arr, start, step, len) => {
    for (let i = start; i >= 0 && i < len; i += step) {
      const obj = arr[i];
      if (!(obj == null ? void 0 : obj.isDisabled) && (obj == null ? void 0 : obj.visible)) {
        return i;
      }
    }
    return null;
  };
  const focusOption = (targetIndex, mode) => {
    var _a;
    const len = states.options.size;
    if (len === 0)
      return;
    const start = clamp(targetIndex, 0, len - 1);
    const options = optionsArray.value;
    const direction = mode === "up" ? -1 : 1;
    const newIndex = (_a = findFocusableIndex(options, start, direction, len)) != null ? _a : findFocusableIndex(options, start - direction, -direction, len);
    if (newIndex != null) {
      states.hoveringIndex = newIndex;
      nextTick(() => scrollToOption(hoverOption.value));
    }
  };
  const handleKeydown = (e) => {
    const code = getEventCode(e);
    let isPreventDefault = true;
    switch (code) {
      case EVENT_CODE.up:
        navigateOptions("prev");
        break;
      case EVENT_CODE.down:
        navigateOptions("next");
        break;
      case EVENT_CODE.enter:
      case EVENT_CODE.numpadEnter:
        if (!isComposing.value) {
          selectOption();
        }
        break;
      case EVENT_CODE.esc:
        handleEsc();
        break;
      case EVENT_CODE.backspace:
        isPreventDefault = false;
        deletePrevTag(e);
        return;
      case EVENT_CODE.home:
        if (!expanded.value)
          return;
        focusOption(0, "down");
        break;
      case EVENT_CODE.end:
        if (!expanded.value)
          return;
        focusOption(states.options.size - 1, "up");
        break;
      case EVENT_CODE.pageUp:
        if (!expanded.value)
          return;
        focusOption(states.hoveringIndex - 10, "up");
        break;
      case EVENT_CODE.pageDown:
        if (!expanded.value)
          return;
        focusOption(states.hoveringIndex + 10, "down");
        break;
      default:
        isPreventDefault = false;
        break;
    }
    if (isPreventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const getGapWidth = () => {
    if (!selectionRef.value)
      return 0;
    const style = (void 0).getComputedStyle(selectionRef.value);
    return Number.parseFloat(style.gap || "6px");
  };
  const tagStyle = computed(() => {
    const gapWidth = getGapWidth();
    const inputSlotWidth = props.filterable ? gapWidth + MINIMUM_INPUT_WIDTH : 0;
    const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.selectionWidth - inputSlotWidth;
    return { maxWidth: `${maxWidth}px` };
  });
  const collapseTagStyle = computed(() => {
    return { maxWidth: `${states.selectionWidth}px` };
  });
  const popupScroll = (data) => {
    emit("popup-scroll", data);
  };
  useResizeObserver(selectionRef, resetSelectionWidth);
  useResizeObserver(wrapperRef, updateTooltip);
  useResizeObserver(tagMenuRef, updateTagTooltip);
  useResizeObserver(collapseItemRef, resetCollapseItemWidth);
  let stop;
  watch(
    () => dropdownMenuVisible.value,
    (newVal) => {
      if (newVal) {
        stop = useResizeObserver(menuRef, updateTooltip).stop;
      } else {
        stop == null ? void 0 : stop();
        stop = void 0;
      }
      emit("visible-change", newVal);
    }
  );
  return {
    inputId,
    contentId,
    nsSelect,
    nsInput,
    states,
    isFocused,
    expanded,
    optionsArray,
    hoverOption,
    selectSize,
    filteredOptionsCount,
    updateTooltip,
    updateTagTooltip,
    debouncedOnInputChange,
    onInput,
    deletePrevTag,
    deleteTag,
    deleteSelected,
    handleOptionSelect,
    scrollToOption,
    hasModelValue,
    shouldShowPlaceholder,
    currentPlaceholder,
    mouseEnterEventName,
    needStatusIcon,
    showClearBtn,
    iconComponent,
    iconReverse,
    validateState,
    validateIcon,
    showNewOption,
    updateOptions,
    collapseTagSize,
    setSelected,
    selectDisabled,
    emptyText,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
    handleKeydown,
    onOptionCreate,
    onOptionDestroy,
    handleMenuEnter,
    focus,
    blur,
    handleClearClick,
    handleClickOutside,
    handleEsc,
    toggleMenu,
    selectOption,
    getValueKey,
    navigateOptions,
    dropdownMenuVisible,
    showTagList,
    collapseTagList,
    popupScroll,
    getOption,
    tagStyle,
    collapseTagStyle,
    popperRef,
    inputRef,
    tooltipRef,
    tagTooltipRef,
    prefixRef,
    suffixRef,
    selectRef,
    wrapperRef,
    selectionRef,
    scrollbarRef,
    menuRef,
    tagMenuRef,
    collapseItemRef
  };
};
var ElOptions = defineComponent({
  name: "ElOptions",
  setup(_, { slots }) {
    const select = inject(selectKey);
    let cachedValueList = [];
    return () => {
      var _a, _b;
      const children = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const valueList = [];
      function filterOptions(children2) {
        if (!isArray(children2))
          return;
        children2.forEach((item) => {
          var _a2, _b2, _c, _d;
          const name = (_a2 = (item == null ? void 0 : item.type) || {}) == null ? void 0 : _a2.name;
          if (name === "ElOptionGroup") {
            filterOptions(
              !isString(item.children) && !isArray(item.children) && isFunction((_b2 = item.children) == null ? void 0 : _b2.default) ? (_c = item.children) == null ? void 0 : _c.default() : item.children
            );
          } else if (name === "ElOption") {
            valueList.push((_d = item.props) == null ? void 0 : _d.value);
          } else if (isArray(item.children)) {
            filterOptions(item.children);
          }
        });
      }
      if (children.length) {
        filterOptions((_b = children[0]) == null ? void 0 : _b.children);
      }
      if (!isEqual(valueList, cachedValueList)) {
        cachedValueList = valueList;
        if (select) {
          select.states.optionValues = valueList;
        }
      }
      return children;
    };
  }
});
const selectProps = buildProps({
  name: String,
  id: String,
  modelValue: {
    type: definePropType([
      Array,
      String,
      Number,
      Boolean,
      Object
    ]),
    default: void 0
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  automaticDropdown: Boolean,
  size: useSizeProp,
  effect: {
    type: definePropType(String),
    default: "light"
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: ""
  },
  popperStyle: {
    type: definePropType([String, Object])
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  remote: Boolean,
  debounce: {
    type: Number,
    default: 300
  },
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: {
    type: definePropType(Function)
  },
  filterMethod: {
    type: definePropType(Function)
  },
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: true
  },
  valueKey: {
    type: String,
    default: "value"
  },
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  teleported: useTooltipContentProps.teleported,
  persistent: {
    type: Boolean,
    default: true
  },
  clearIcon: {
    type: iconPropType,
    default: circle_close_default
  },
  fitInputWidth: Boolean,
  suffixIcon: {
    type: iconPropType,
    default: arrow_down_default
  },
  tagType: { ...tagProps.type, default: "info" },
  tagEffect: { ...tagProps.effect, default: "light" },
  validateEvent: {
    type: Boolean,
    default: true
  },
  remoteShowSuffix: Boolean,
  showArrow: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: definePropType(String),
    values: placements,
    default: "bottom-start"
  },
  fallbackPlacements: {
    type: definePropType(Array),
    default: ["bottom-start", "top-start", "right", "left"]
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  appendTo: useTooltipContentProps.appendTo,
  options: {
    type: definePropType(Array)
  },
  props: {
    type: definePropType(Object),
    default: () => defaultProps
  },
  ...useEmptyValuesProps,
  ...useAriaProps(["ariaLabel"])
});
({
  "popup-scroll": scrollbarEmits.scroll
});
const _sfc_main$4 = defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(props) {
    const ns = useNamespace("select");
    const groupRef = ref();
    const instance = getCurrentInstance();
    const children = ref([]);
    provide(
      selectGroupKey,
      reactive({
        ...toRefs(props)
      })
    );
    const visible = computed(
      () => children.value.some((option) => option.visible === true)
    );
    const isOption = (node) => {
      var _a;
      return node.type.name === "ElOption" && !!((_a = node.component) == null ? void 0 : _a.proxy);
    };
    const flattedChildren2 = (node) => {
      const nodes = castArray$1(node);
      const children2 = [];
      nodes.forEach((child) => {
        var _a;
        if (!isVNode(child))
          return;
        if (isOption(child)) {
          children2.push(child.component.proxy);
        } else if (isArray(child.children) && child.children.length) {
          children2.push(...flattedChildren2(child.children));
        } else if ((_a = child.component) == null ? void 0 : _a.subTree) {
          children2.push(...flattedChildren2(child.component.subTree));
        }
      });
      return children2;
    };
    const updateChildren = () => {
      children.value = flattedChildren2(instance.subTree);
    };
    useMutationObserver(groupRef, updateChildren, {
      attributes: true,
      subtree: true,
      childList: true
    });
    return {
      groupRef,
      visible,
      ns
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock(
    "ul",
    {
      ref: "groupRef",
      class: normalizeClass(_ctx.ns.be("group", "wrap"))
    },
    [
      createElementVNode(
        "li",
        {
          class: normalizeClass(_ctx.ns.be("group", "title"))
        },
        toDisplayString(_ctx.label),
        3
      ),
      createElementVNode("li", null, [
        createElementVNode(
          "ul",
          {
            class: normalizeClass(_ctx.ns.b("group"))
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
        )
      ])
    ],
    2
  )), [
    [vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);
const nodeList = /* @__PURE__ */ new Map();
if (isClient) {
  let startClick;
  (void 0).addEventListener("mousedown", (e) => startClick = e);
  (void 0).addEventListener("mouseup", (e) => {
    if (startClick) {
      for (const handlers of nodeList.values()) {
        for (const { documentHandler } of handlers) {
          documentHandler(e, startClick);
        }
      }
      startClick = void 0;
    }
  });
}
function createDocumentHandler(el, binding) {
  let excludes = [];
  if (isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (isElement(binding.arg)) {
    excludes.push(binding.arg);
  }
  return function(mouseup, mousedown) {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
}
const ClickOutside = {
  beforeMount(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    const handlers = nodeList.get(el);
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    );
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    };
    if (oldHandlerIndex >= 0) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};
function useCalcInputWidth() {
  const calculatorRef = shallowRef();
  const calculatorWidth = ref(0);
  const inputStyle = computed(() => ({
    minWidth: `${Math.max(calculatorWidth.value, MINIMUM_INPUT_WIDTH)}px`
  }));
  const resetCalculatorWidth = () => {
    var _a, _b;
    calculatorWidth.value = (_b = (_a = calculatorRef.value) == null ? void 0 : _a.getBoundingClientRect().width) != null ? _b : 0;
  };
  useResizeObserver(calculatorRef, resetCalculatorWidth);
  return {
    calculatorRef,
    calculatorWidth,
    inputStyle
  };
}
const COMPONENT_NAME = "ElSelect";
const warnHandlerMap = /* @__PURE__ */ new WeakMap();
const createSelectWarnHandler = (appContext) => {
  return (...args) => {
    var _a, _b;
    const message = args[0];
    if (!message || message.includes(
      'Slot "default" invoked outside of the render function'
    ) && ((_a = args[2]) == null ? void 0 : _a.includes("ElTreeSelect")))
      return;
    const original = (_b = warnHandlerMap.get(appContext)) == null ? void 0 : _b.originalWarnHandler;
    if (original) {
      original(...args);
      return;
    }
    console.warn(...args);
  };
};
const getWarnHandlerRecord = (appContext) => {
  let record = warnHandlerMap.get(appContext);
  if (!record) {
    record = {
      originalWarnHandler: appContext.config.warnHandler,
      handler: createSelectWarnHandler(appContext),
      count: 0
    };
    warnHandlerMap.set(appContext, record);
  }
  return record;
};
const _sfc_main$3 = defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElSelectMenu,
    ElOption: Option,
    ElOptions,
    ElOptionGroup: OptionGroup,
    ElTag,
    ElScrollbar,
    ElTooltip,
    ElIcon
  },
  directives: { ClickOutside },
  props: selectProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur",
    "popup-scroll"
  ],
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance();
    const warnRecord = getWarnHandlerRecord(instance.appContext);
    warnRecord.count += 1;
    instance.appContext.config.warnHandler = warnRecord.handler;
    const modelValue = computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const _props = reactive({
      ...toRefs(props),
      modelValue
    });
    const API = useSelect(_props, emit);
    const { calculatorRef, inputStyle } = useCalcInputWidth();
    const { getLabel, getValue, getOptions, getDisabled } = useProps(props);
    const getOptionProps = (option) => ({
      label: getLabel(option),
      value: getValue(option),
      disabled: getDisabled(option)
    });
    const flatTreeSelectData = (data) => {
      return data.reduce((acc, item) => {
        acc.push(item);
        if (item.children && item.children.length > 0) {
          acc.push(...flatTreeSelectData(item.children));
        }
        return acc;
      }, []);
    };
    const manuallyRenderSlots = (vnodes) => {
      const children = flattedChildren(vnodes || []);
      children.forEach((item) => {
        var _a;
        if (isObject(item) && (item.type.name === "ElOption" || item.type.name === "ElTree")) {
          const _name = item.type.name;
          if (_name === "ElTree") {
            const treeData = ((_a = item.props) == null ? void 0 : _a.data) || [];
            const flatData = flatTreeSelectData(treeData);
            flatData.forEach((treeItem) => {
              treeItem.currentLabel = treeItem.label || (isObject(treeItem.value) ? "" : treeItem.value);
              API.onOptionCreate(treeItem);
            });
          } else if (_name === "ElOption") {
            const obj = { ...item.props };
            obj.currentLabel = obj.label || (isObject(obj.value) ? "" : obj.value);
            API.onOptionCreate(obj);
          }
        }
      });
    };
    watch(
      () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots), modelValue.value];
      },
      () => {
        var _a;
        if (props.persistent || API.expanded.value) {
          return;
        }
        API.states.options.clear();
        manuallyRenderSlots((_a = slots.default) == null ? void 0 : _a.call(slots));
      },
      {
        immediate: true
      }
    );
    provide(
      selectKey,
      reactive({
        props: _props,
        states: API.states,
        selectRef: API.selectRef,
        optionsArray: API.optionsArray,
        setSelected: API.setSelected,
        handleOptionSelect: API.handleOptionSelect,
        onOptionCreate: API.onOptionCreate,
        onOptionDestroy: API.onOptionDestroy
      })
    );
    const selectedLabel = computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.selected.map((i) => i.currentLabel);
    });
    return {
      ...API,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      getLabel,
      getValue,
      getOptions,
      getDisabled,
      getOptionProps
    };
  }
});
const _hoisted_1$3 = ["id", "name", "disabled", "autocomplete", "tabindex", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_option_group = resolveComponent("el-option-group");
  const _component_el_options = resolveComponent("el-options");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_select_menu = resolveComponent("el-select-menu");
  const _directive_click_outside = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock(
    "div",
    mergeProps({
      ref: "selectRef",
      class: [_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]
    }, {
      [toHandlerKey(_ctx.mouseEnterEventName)]: _cache[11] || (_cache[11] = ($event) => _ctx.states.inputHovering = true)
    }, {
      onMouseleave: _cache[12] || (_cache[12] = ($event) => _ctx.states.inputHovering = false)
    }),
    [
      createVNode(_component_el_tooltip, {
        ref: "tooltipRef",
        visible: _ctx.dropdownMenuVisible,
        placement: _ctx.placement,
        teleported: _ctx.teleported,
        "popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        "popper-options": _ctx.popperOptions,
        "fallback-placements": _ctx.fallbackPlacements,
        effect: _ctx.effect,
        pure: "",
        trigger: "click",
        transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
        "stop-popper-mouse-event": false,
        "gpu-acceleration": false,
        persistent: _ctx.persistent,
        "append-to": _ctx.appendTo,
        "show-arrow": _ctx.showArrow,
        offset: _ctx.offset,
        onBeforeShow: _ctx.handleMenuEnter,
        onHide: _cache[10] || (_cache[10] = ($event) => _ctx.states.isBeforeHide = false)
      }, {
        default: withCtx(() => {
          var _a;
          return [
            createElementVNode(
              "div",
              {
                ref: "wrapperRef",
                class: normalizeClass([
                  _ctx.nsSelect.e("wrapper"),
                  _ctx.nsSelect.is("focused", _ctx.isFocused),
                  _ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
                  _ctx.nsSelect.is("filterable", _ctx.filterable),
                  _ctx.nsSelect.is("disabled", _ctx.selectDisabled)
                ]),
                onClick: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent"]))
              },
              [
                _ctx.$slots.prefix ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    ref: "prefixRef",
                    class: normalizeClass(_ctx.nsSelect.e("prefix"))
                  },
                  [
                    renderSlot(_ctx.$slots, "prefix")
                  ],
                  2
                )) : createCommentVNode("v-if", true),
                createElementVNode(
                  "div",
                  {
                    ref: "selectionRef",
                    class: normalizeClass([
                      _ctx.nsSelect.e("selection"),
                      _ctx.nsSelect.is(
                        "near",
                        _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length
                      )
                    ])
                  },
                  [
                    _ctx.multiple ? renderSlot(_ctx.$slots, "tag", {
                      key: 0,
                      data: _ctx.states.selected,
                      deleteTag: _ctx.deleteTag,
                      selectDisabled: _ctx.selectDisabled
                    }, () => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.showTagList, (item) => {
                          return openBlock(), createElementBlock(
                            "div",
                            {
                              key: _ctx.getValueKey(item),
                              class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                            },
                            [
                              createVNode(_component_el_tag, {
                                closable: !_ctx.selectDisabled && !item.isDisabled,
                                size: _ctx.collapseTagSize,
                                type: _ctx.tagType,
                                effect: _ctx.tagEffect,
                                "disable-transitions": "",
                                style: normalizeStyle(_ctx.tagStyle),
                                onClose: ($event) => _ctx.deleteTag($event, item)
                              }, {
                                default: withCtx(() => [
                                  createElementVNode(
                                    "span",
                                    {
                                      class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                                    },
                                    [
                                      renderSlot(_ctx.$slots, "label", {
                                        index: item.index,
                                        label: item.currentLabel,
                                        value: item.value
                                      }, () => [
                                        createTextVNode(
                                          toDisplayString(item.currentLabel),
                                          1
                                        )
                                      ])
                                    ],
                                    2
                                  )
                                ]),
                                _: 2
                              }, 1032, ["closable", "size", "type", "effect", "style", "onClose"])
                            ],
                            2
                          );
                        }),
                        128
                      )),
                      _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (openBlock(), createBlock(_component_el_tooltip, {
                        key: 0,
                        ref: "tagTooltipRef",
                        disabled: _ctx.dropdownMenuVisible || !_ctx.collapseTagsTooltip,
                        "fallback-placements": ["bottom", "top", "right", "left"],
                        effect: _ctx.effect,
                        placement: "bottom",
                        "popper-class": _ctx.popperClass,
                        "popper-style": _ctx.popperStyle,
                        teleported: _ctx.teleported,
                        "popper-options": _ctx.popperOptions
                      }, {
                        default: withCtx(() => [
                          createElementVNode(
                            "div",
                            {
                              ref: "collapseItemRef",
                              class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                            },
                            [
                              createVNode(_component_el_tag, {
                                closable: false,
                                size: _ctx.collapseTagSize,
                                type: _ctx.tagType,
                                effect: _ctx.tagEffect,
                                "disable-transitions": "",
                                style: normalizeStyle(_ctx.collapseTagStyle)
                              }, {
                                default: withCtx(() => [
                                  createElementVNode(
                                    "span",
                                    {
                                      class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                                    },
                                    " + " + toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags),
                                    3
                                  )
                                ]),
                                _: 1
                              }, 8, ["size", "type", "effect", "style"])
                            ],
                            2
                          )
                        ]),
                        content: withCtx(() => [
                          createElementVNode(
                            "div",
                            {
                              ref: "tagMenuRef",
                              class: normalizeClass(_ctx.nsSelect.e("selection"))
                            },
                            [
                              (openBlock(true), createElementBlock(
                                Fragment,
                                null,
                                renderList(_ctx.collapseTagList, (item) => {
                                  return openBlock(), createElementBlock(
                                    "div",
                                    {
                                      key: _ctx.getValueKey(item),
                                      class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                                    },
                                    [
                                      createVNode(_component_el_tag, {
                                        class: "in-tooltip",
                                        closable: !_ctx.selectDisabled && !item.isDisabled,
                                        size: _ctx.collapseTagSize,
                                        type: _ctx.tagType,
                                        effect: _ctx.tagEffect,
                                        "disable-transitions": "",
                                        onClose: ($event) => _ctx.deleteTag($event, item)
                                      }, {
                                        default: withCtx(() => [
                                          createElementVNode(
                                            "span",
                                            {
                                              class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                                            },
                                            [
                                              renderSlot(_ctx.$slots, "label", {
                                                index: item.index,
                                                label: item.currentLabel,
                                                value: item.value
                                              }, () => [
                                                createTextVNode(
                                                  toDisplayString(item.currentLabel),
                                                  1
                                                )
                                              ])
                                            ],
                                            2
                                          )
                                        ]),
                                        _: 2
                                      }, 1032, ["closable", "size", "type", "effect", "onClose"])
                                    ],
                                    2
                                  );
                                }),
                                128
                              ))
                            ],
                            2
                          )
                        ]),
                        _: 3
                      }, 8, ["disabled", "effect", "popper-class", "popper-style", "teleported", "popper-options"])) : createCommentVNode("v-if", true)
                    ]) : createCommentVNode("v-if", true),
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass([
                          _ctx.nsSelect.e("selected-item"),
                          _ctx.nsSelect.e("input-wrapper"),
                          _ctx.nsSelect.is("hidden", !_ctx.filterable || _ctx.selectDisabled)
                        ])
                      },
                      [
                        withDirectives(createElementVNode("input", {
                          id: _ctx.inputId,
                          ref: "inputRef",
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.states.inputValue = $event),
                          type: "text",
                          name: _ctx.name,
                          class: normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                          disabled: _ctx.selectDisabled,
                          autocomplete: _ctx.autocomplete,
                          style: normalizeStyle(_ctx.inputStyle),
                          tabindex: _ctx.tabindex,
                          role: "combobox",
                          readonly: !_ctx.filterable,
                          spellcheck: "false",
                          "aria-activedescendant": ((_a = _ctx.hoverOption) == null ? void 0 : _a.id) || "",
                          "aria-controls": _ctx.contentId,
                          "aria-expanded": _ctx.dropdownMenuVisible,
                          "aria-label": _ctx.ariaLabel,
                          "aria-autocomplete": "none",
                          "aria-haspopup": "listbox",
                          onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args)),
                          onCompositionstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
                          onCompositionupdate: _cache[3] || (_cache[3] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
                          onCompositionend: _cache[4] || (_cache[4] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
                          onInput: _cache[5] || (_cache[5] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
                        }, null, 46, _hoisted_1$3), [
                          [vModelText, _ctx.states.inputValue]
                        ]),
                        _ctx.filterable ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          ref: "calculatorRef",
                          "aria-hidden": "true",
                          class: normalizeClass(_ctx.nsSelect.e("input-calculator")),
                          textContent: toDisplayString(_ctx.states.inputValue)
                        }, null, 10, _hoisted_2)) : createCommentVNode("v-if", true)
                      ],
                      2
                    ),
                    _ctx.shouldShowPlaceholder ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 1,
                        class: normalizeClass([
                          _ctx.nsSelect.e("selected-item"),
                          _ctx.nsSelect.e("placeholder"),
                          _ctx.nsSelect.is(
                            "transparent",
                            !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue
                          )
                        ])
                      },
                      [
                        _ctx.hasModelValue ? renderSlot(_ctx.$slots, "label", {
                          key: 0,
                          index: _ctx.getOption(_ctx.modelValue).index,
                          label: _ctx.currentPlaceholder,
                          value: _ctx.modelValue
                        }, () => [
                          createElementVNode(
                            "span",
                            null,
                            toDisplayString(_ctx.currentPlaceholder),
                            1
                          )
                        ]) : (openBlock(), createElementBlock(
                          "span",
                          _hoisted_3,
                          toDisplayString(_ctx.currentPlaceholder),
                          1
                        ))
                      ],
                      2
                    )) : createCommentVNode("v-if", true)
                  ],
                  2
                ),
                createElementVNode(
                  "div",
                  {
                    ref: "suffixRef",
                    class: normalizeClass(_ctx.nsSelect.e("suffix"))
                  },
                  [
                    _ctx.iconComponent && !_ctx.showClearBtn ? (openBlock(), createBlock(_component_el_icon, {
                      key: 0,
                      class: normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon"), _ctx.iconReverse])
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : createCommentVNode("v-if", true),
                    _ctx.showClearBtn && _ctx.clearIcon ? (openBlock(), createBlock(_component_el_icon, {
                      key: 1,
                      class: normalizeClass([
                        _ctx.nsSelect.e("caret"),
                        _ctx.nsSelect.e("icon"),
                        _ctx.nsSelect.e("clear")
                      ]),
                      onClick: _ctx.handleClearClick
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
                    _ctx.validateState && _ctx.validateIcon && _ctx.needStatusIcon ? (openBlock(), createBlock(_component_el_icon, {
                      key: 2,
                      class: normalizeClass([
                        _ctx.nsInput.e("icon"),
                        _ctx.nsInput.e("validateIcon"),
                        _ctx.nsInput.is("loading", _ctx.validateState === "validating")
                      ])
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.validateIcon)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : createCommentVNode("v-if", true)
                  ],
                  2
                )
              ],
              2
            )
          ];
        }),
        content: withCtx(() => [
          createVNode(
            _component_el_select_menu,
            { ref: "menuRef" },
            {
              default: withCtx(() => [
                _ctx.$slots.header ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
                    onClick: _cache[8] || (_cache[8] = withModifiers(() => {
                    }, ["stop"]))
                  },
                  [
                    renderSlot(_ctx.$slots, "header")
                  ],
                  2
                )) : createCommentVNode("v-if", true),
                withDirectives(createVNode(_component_el_scrollbar, {
                  id: _ctx.contentId,
                  ref: "scrollbarRef",
                  tag: "ul",
                  "wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
                  "view-class": _ctx.nsSelect.be("dropdown", "list"),
                  class: normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
                  role: "listbox",
                  "aria-label": _ctx.ariaLabel,
                  "aria-orientation": "vertical",
                  onScroll: _ctx.popupScroll
                }, {
                  default: withCtx(() => [
                    _ctx.showNewOption ? (openBlock(), createBlock(_component_el_option, {
                      key: 0,
                      value: _ctx.states.inputValue,
                      created: true
                    }, null, 8, ["value"])) : createCommentVNode("v-if", true),
                    createVNode(_component_el_options, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default", {}, () => [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(_ctx.options, (option, index) => {
                              var _a;
                              return openBlock(), createElementBlock(
                                Fragment,
                                { key: index },
                                [
                                  ((_a = _ctx.getOptions(option)) == null ? void 0 : _a.length) ? (openBlock(), createBlock(_component_el_option_group, {
                                    key: 0,
                                    label: _ctx.getLabel(option),
                                    disabled: _ctx.getDisabled(option)
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createElementBlock(
                                        Fragment,
                                        null,
                                        renderList(_ctx.getOptions(option), (item) => {
                                          return openBlock(), createBlock(
                                            _component_el_option,
                                            mergeProps({
                                              key: _ctx.getValue(item)
                                            }, { ref_for: true }, _ctx.getOptionProps(item)),
                                            null,
                                            16
                                          );
                                        }),
                                        128
                                      ))
                                    ]),
                                    _: 2
                                  }, 1032, ["label", "disabled"])) : (openBlock(), createBlock(
                                    _component_el_option,
                                    mergeProps({
                                      key: 1,
                                      ref_for: true
                                    }, _ctx.getOptionProps(option)),
                                    null,
                                    16
                                  ))
                                ],
                                64
                              );
                            }),
                            128
                          ))
                        ])
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                }, 8, ["id", "wrap-class", "view-class", "class", "aria-label", "onScroll"]), [
                  [vShow, _ctx.states.options.size > 0 && !_ctx.loading]
                ]),
                _ctx.$slots.loading && _ctx.loading ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
                  },
                  [
                    renderSlot(_ctx.$slots, "loading")
                  ],
                  2
                )) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 2,
                    class: normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
                  },
                  [
                    renderSlot(_ctx.$slots, "empty", {}, () => [
                      createElementVNode(
                        "span",
                        null,
                        toDisplayString(_ctx.emptyText),
                        1
                      )
                    ])
                  ],
                  2
                )) : createCommentVNode("v-if", true),
                _ctx.$slots.footer ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 3,
                    class: normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
                    onClick: _cache[9] || (_cache[9] = withModifiers(() => {
                    }, ["stop"]))
                  },
                  [
                    renderSlot(_ctx.$slots, "footer")
                  ],
                  2
                )) : createCommentVNode("v-if", true)
              ]),
              _: 3
            },
            512
          )
        ]),
        _: 3
      }, 8, ["visible", "placement", "teleported", "popper-class", "popper-style", "popper-options", "fallback-placements", "effect", "transition", "persistent", "append-to", "show-arrow", "offset", "onBeforeShow"])
    ],
    16
  )), [
    [_directive_click_outside, _ctx.handleClickOutside, _ctx.popperRef]
  ]);
}
var Select = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);
const ElSelect = withInstall(Select, {
  Option,
  OptionGroup
});
const ElOption = withNoopInstall(Option);
withNoopInstall(OptionGroup);
const radioPropsBase = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  size: useSizeProp,
  disabled: {
    type: Boolean,
    default: void 0
  },
  label: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  name: {
    type: String,
    default: void 0
  }
});
const radioProps = buildProps({
  ...radioPropsBase,
  border: Boolean
});
const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const radioGroupKey = /* @__PURE__ */ Symbol("radioGroupKey");
const useRadio = (props, emit) => {
  const radioRef = ref();
  const radioGroup = inject(radioGroupKey, void 0);
  const isGroup = computed(() => !!radioGroup);
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const modelValue = computed({
    get() {
      return isGroup.value ? radioGroup.modelValue : props.modelValue;
    },
    set(val) {
      if (isGroup.value) {
        radioGroup.changeEvent(val);
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val);
      }
      radioRef.value.checked = props.modelValue === actualValue.value;
    }
  });
  const size = useFormSize(computed(() => radioGroup == null ? void 0 : radioGroup.size));
  const disabled = useFormDisabled(computed(() => radioGroup == null ? void 0 : radioGroup.disabled));
  const focus = ref(false);
  const tabIndex = computed(() => {
    return disabled.value || isGroup.value && modelValue.value !== actualValue.value ? -1 : 0;
  });
  useDeprecated(
    {
      from: "label act as value",
      replacement: "value",
      version: "3.0.0",
      scope: "el-radio",
      ref: "https://element-plus.org/en-US/component/radio.html"
    },
    computed(() => isGroup.value && isPropAbsent(props.value))
  );
  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue,
    actualValue
  };
};
const _hoisted_1$2 = ["value", "name", "disabled", "checked"];
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElRadio"
  },
  __name: "radio",
  props: radioProps,
  emits: radioEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).is("bordered", _ctx.border),
            unref(ns).is("checked", unref(modelValue) === unref(actualValue)),
            unref(ns).m(unref(size))
          ])
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass([
                unref(ns).e("input"),
                unref(ns).is("disabled", unref(disabled)),
                unref(ns).is("checked", unref(modelValue) === unref(actualValue))
              ])
            },
            [
              withDirectives(createElementVNode("input", {
                ref_key: "radioRef",
                ref: radioRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
                class: normalizeClass(unref(ns).e("original")),
                value: unref(actualValue),
                name: _ctx.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
                disabled: unref(disabled),
                checked: unref(modelValue) === unref(actualValue),
                type: "radio",
                onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
                onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
                onChange: handleChange,
                onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                }, ["stop"]))
              }, null, 42, _hoisted_1$2), [
                [vModelRadio, unref(modelValue)]
              ]),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("inner"))
                },
                null,
                2
              )
            ],
            2
          ),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("label")),
              onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                )
              ])
            ],
            34
          )
        ],
        2
      );
    };
  }
});
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);
const radioButtonProps = buildProps({
  ...radioPropsBase
});
const _hoisted_1$1 = ["value", "name", "disabled"];
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElRadioButton"
  },
  __name: "radio-button",
  props: radioButtonProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("radio");
    const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio(props);
    const activeStyle = computed(() => {
      return {
        backgroundColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        borderColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        boxShadow: (radioGroup == null ? void 0 : radioGroup.fill) ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: (radioGroup == null ? void 0 : radioGroup.textColor) || ""
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b("button"),
            unref(ns).is("active", unref(modelValue) === unref(actualValue)),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).bm("button", unref(size))
          ])
        },
        [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
            class: normalizeClass(unref(ns).be("button", "original-radio")),
            value: unref(actualValue),
            type: "radio",
            name: _ctx.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: unref(disabled),
            onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
            onClick: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"]))
          }, null, 42, _hoisted_1$1), [
            [vModelRadio, unref(modelValue)]
          ]),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(modelValue) === unref(actualValue) ? activeStyle.value : {}),
              onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                )
              ])
            ],
            38
          )
        ],
        2
      );
    };
  }
});
var RadioButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);
const radioGroupProps = buildProps({
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
    type: [String, Number, Boolean],
    default: void 0
  },
  fill: {
    type: String,
    default: ""
  },
  textColor: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: void 0
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  options: {
    type: definePropType(Array)
  },
  props: {
    type: definePropType(Object),
    default: () => radioDefaultProps
  },
  type: {
    type: String,
    values: ["radio", "button"],
    default: "radio"
  },
  ...useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radioEmits;
const radioDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
const _sfc_main = defineComponent({
  ...{
    name: "ElRadioGroup"
  },
  __name: "radio-group",
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const radioId = useId();
    const radioGroupRef = ref();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit(CHANGE_EVENT, value));
    };
    const name = computed(() => {
      return props.name || radioId.value;
    });
    const aliasProps = computed(() => ({
      ...radioDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return { ...omit(option, [label, value, disabled]), ...base };
    };
    const optionComponent = computed(
      () => props.type === "button" ? RadioButton : Radio
    );
    provide(
      radioGroupKey,
      reactive({
        ...toRefs(props),
        changeEvent,
        name
      })
    );
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(groupId),
        ref_key: "radioGroupRef",
        ref: radioGroupRef,
        class: normalizeClass(unref(ns).b("group")),
        role: "radiogroup",
        "aria-label": !unref(isLabeledByFormItem) ? _ctx.ariaLabel || "radio-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.options, (item, index) => {
              return openBlock(), createBlock(
                resolveDynamicComponent(optionComponent.value),
                mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)),
                null,
                16
              );
            }),
            128
          ))
        ])
      ], 10, _hoisted_1);
    };
  }
});
var RadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);
const ElRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup
});
const ElRadioGroup = withNoopInstall(RadioGroup);
withNoopInstall(RadioButton);

export { ElAlert as E, ElSelect as a, ElOption as b, ElRadioGroup as c, ElRadio as d, ElTag as e, ElScrollbar as f, ElTooltip as g, getEventCode as h, EVENT_CODE as i, useTooltipContentProps as u };
//# sourceMappingURL=el-radio-group-D81v3l6w.mjs.map

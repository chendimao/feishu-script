import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withKeys, withModifiers, renderSlot, createTextVNode, toDisplayString, createVNode, withCtx, createBlock, resolveDynamicComponent, withDirectives, vShow, inject, ref, computed, watch, provide, Transition, mergeProps, toHandlers } from 'vue';
import { w as withInstall, a as withNoopInstall, _ as _export_sfc, b as buildProps, d as definePropType } from './base-B7YREFnB.mjs';
import { d as useNamespace, p as useIdInjection, i as isNumber, j as isBoolean, h as throwError } from './server.mjs';
import { isString, isArray, isPromise } from '@vue/shared';
import { C as CHANGE_EVENT, U as UPDATE_MODEL_EVENT, m as mutable } from './el-input-CX7pz-al.mjs';
import { castArray } from 'lodash-unified';
import { a as ElIcon, t as arrow_right_default, i as iconPropType } from './el-button-DEhYiaTs.mjs';

const emitChangeFn = (value) => isNumber(value) || isString(value) || isArray(value);
const collapseProps = buildProps({
  accordion: Boolean,
  modelValue: {
    type: definePropType([Array, String, Number]),
    default: () => mutable([])
  },
  expandIconPosition: {
    type: definePropType([String]),
    default: "right"
  },
  beforeCollapse: {
    type: definePropType(
      Function
    )
  }
});
const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn
};
const collapseContextKey = /* @__PURE__ */ Symbol("collapseContextKey");
const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
  const activeNames = ref(castArray(props.modelValue));
  const setActiveNames = (_activeNames) => {
    activeNames.value = _activeNames;
    const value = props.accordion ? activeNames.value[0] : activeNames.value;
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value);
  };
  const handleChange = (name) => {
    if (props.accordion) {
      setActiveNames([activeNames.value[0] === name ? "" : name]);
    } else {
      const _activeNames = [...activeNames.value];
      const index = _activeNames.indexOf(name);
      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      setActiveNames(_activeNames);
    }
  };
  const handleItemClick = async (name) => {
    const { beforeCollapse } = props;
    if (!beforeCollapse) {
      handleChange(name);
      return;
    }
    const shouldChange = beforeCollapse(name);
    const isPromiseOrBool = [
      isPromise(shouldChange),
      isBoolean(shouldChange)
    ].includes(true);
    if (!isPromiseOrBool) {
      throwError(
        SCOPE,
        "beforeCollapse must return type `Promise<boolean>` or `boolean`"
      );
    }
    if (isPromise(shouldChange)) {
      shouldChange.then((result) => {
        if (result !== false) {
          handleChange(name);
        }
      }).catch((e) => {
      });
    } else if (shouldChange) {
      handleChange(name);
    }
  };
  watch(
    () => props.modelValue,
    () => activeNames.value = castArray(props.modelValue),
    { deep: true }
  );
  provide(collapseContextKey, {
    activeNames,
    handleItemClick
  });
  return {
    activeNames,
    setActiveNames
  };
};
const useCollapseDOM = (props) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b(),
    ns.b(`icon-position-${props.expandIconPosition}`)
  ]);
  return {
    rootKls
  };
};
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElCollapse"
  },
  __name: "collapse",
  props: collapseProps,
  emits: collapseEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { activeNames, setActiveNames } = useCollapse(props, emit);
    const { rootKls } = useCollapseDOM(props);
    __expose({
      activeNames,
      setActiveNames
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse.vue"]]);
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElCollapseTransition"
  },
  __name: "collapse-transition",
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on = {
      beforeEnter(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height)
          el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({
        name: unref(ns).b()
      }, toHandlers(on)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var CollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);
const ElCollapseTransition = withInstall(CollapseTransition);
const collapseItemProps = buildProps({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: definePropType([String, Number]),
    default: void 0
  },
  icon: {
    type: iconPropType,
    default: arrow_right_default
  },
  disabled: Boolean
});
const useCollapseItem = (props) => {
  const collapse = inject(collapseContextKey);
  const { namespace } = useNamespace("collapse");
  const focusing = ref(false);
  const isClick = ref(false);
  const idInjection = useIdInjection();
  const id = computed(() => idInjection.current++);
  const name = computed(() => {
    var _a;
    return (_a = props.name) != null ? _a : `${namespace.value}-id-${idInjection.prefix}-${unref(id)}`;
  });
  const isActive = computed(
    () => collapse == null ? void 0 : collapse.activeNames.value.includes(unref(name))
  );
  const handleFocus = () => {
    setTimeout(() => {
      if (!isClick.value) {
        focusing.value = true;
      } else {
        isClick.value = false;
      }
    }, 50);
  };
  const handleHeaderClick = (e) => {
    if (props.disabled)
      return;
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select"))
      return;
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
    focusing.value = false;
    isClick.value = true;
  };
  const handleEnterClick = (e) => {
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select"))
      return;
    e.preventDefault();
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
  };
  return {
    focusing,
    id,
    isActive,
    handleFocus,
    handleHeaderClick,
    handleEnterClick
  };
};
const useCollapseItemDOM = (props, { focusing, isActive, id }) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b("item"),
    ns.is("active", unref(isActive)),
    ns.is("disabled", props.disabled)
  ]);
  const headKls = computed(() => [
    ns.be("item", "header"),
    ns.is("active", unref(isActive)),
    { focusing: unref(focusing) && !props.disabled }
  ]);
  const arrowKls = computed(() => [
    ns.be("item", "arrow"),
    ns.is("active", unref(isActive))
  ]);
  const itemTitleKls = computed(() => [ns.be("item", "title")]);
  const itemWrapperKls = computed(() => ns.be("item", "wrap"));
  const itemContentKls = computed(() => ns.be("item", "content"));
  const scopedContentId = computed(() => ns.b(`content-${unref(id)}`));
  const scopedHeadId = computed(() => ns.b(`head-${unref(id)}`));
  return {
    itemTitleKls,
    arrowKls,
    headKls,
    rootKls,
    itemWrapperKls,
    itemContentKls,
    scopedContentId,
    scopedHeadId
  };
};
const _hoisted_1 = ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex", "aria-disabled"];
const _hoisted_2 = ["id", "aria-hidden", "aria-labelledby"];
const _sfc_main = defineComponent({
  ...{
    name: "ElCollapseItem"
  },
  __name: "collapse-item",
  props: collapseItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      focusing,
      id,
      isActive,
      handleFocus,
      handleHeaderClick,
      handleEnterClick
    } = useCollapseItem(props);
    const {
      arrowKls,
      headKls,
      rootKls,
      itemTitleKls,
      itemWrapperKls,
      itemContentKls,
      scopedContentId,
      scopedHeadId
    } = useCollapseItemDOM(props, { focusing, isActive, id });
    __expose({
      isActive
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode("div", {
            id: unref(scopedHeadId),
            class: normalizeClass(unref(headKls)),
            "aria-expanded": unref(isActive),
            "aria-controls": unref(scopedContentId),
            "aria-describedby": unref(scopedContentId),
            tabindex: _ctx.disabled ? void 0 : 0,
            "aria-disabled": _ctx.disabled,
            role: "button",
            onClick: _cache[0] || (_cache[0] = (...args) => unref(handleHeaderClick) && unref(handleHeaderClick)(...args)),
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(
              (...args) => unref(handleEnterClick) && unref(handleEnterClick)(...args),
              ["stop"]
            ), ["space", "enter"])),
            onFocus: _cache[2] || (_cache[2] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
            onBlur: _cache[3] || (_cache[3] = ($event) => focusing.value = false)
          }, [
            createElementVNode(
              "span",
              {
                class: normalizeClass(unref(itemTitleKls))
              },
              [
                renderSlot(_ctx.$slots, "title", { isActive: unref(isActive) }, () => [
                  createTextVNode(
                    toDisplayString(_ctx.title),
                    1
                  )
                ])
              ],
              2
            ),
            renderSlot(_ctx.$slots, "icon", { isActive: unref(isActive) }, () => [
              createVNode(unref(ElIcon), {
                class: normalizeClass(unref(arrowKls))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
                ]),
                _: 1
              }, 8, ["class"])
            ])
          ], 42, _hoisted_1),
          createVNode(unref(ElCollapseTransition), null, {
            default: withCtx(() => [
              withDirectives(createElementVNode("div", {
                id: unref(scopedContentId),
                role: "region",
                class: normalizeClass(unref(itemWrapperKls)),
                "aria-hidden": !unref(isActive),
                "aria-labelledby": unref(scopedHeadId)
              }, [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(itemContentKls))
                  },
                  [
                    renderSlot(_ctx.$slots, "default")
                  ],
                  2
                )
              ], 10, _hoisted_2), [
                [vShow, unref(isActive)]
              ])
            ]),
            _: 3
          })
        ],
        2
      );
    };
  }
});
var CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse-item.vue"]]);
const ElCollapse = withInstall(Collapse, {
  CollapseItem
});
const ElCollapseItem = withNoopInstall(CollapseItem);

export { ElCollapse as E, ElCollapseItem as a };
//# sourceMappingURL=el-collapse-item-JsMPhz3g.mjs.map

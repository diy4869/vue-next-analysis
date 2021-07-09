## 静态提升

```vue-next```只会对静态节点和文本进行提升，对于动态的都不会提升。

```ts
export function hoistStatic(root: RootNode, context: TransformContext) {
  walk(
    root,
    context,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    isSingleElementRoot(root, root.children[0])
  )
}
// 是否单元素根节点
export function isSingleElementRoot(
  root: RootNode,
  child: TemplateChildNode
): child is PlainElementNode | ComponentNode | TemplateNode {
  const { children } = root
  // children.length === 1 && child.type === element && 并且不是slot
  return (
    children.length === 1 &&
    child.type === NodeTypes.ELEMENT && 
    !isSlotOutlet(child)
  )
}

function walk(
  node: ParentNode,
  context: TransformContext,
  doNotHoistNode: boolean = false
) {
  let hasHoistedNode = false
  // Some transforms, e.g. transformAssetUrls from @vue/compiler-sfc, replaces
  // static bindings with expressions. These expressions are guaranteed to be
  // constant so they are still eligible for hoisting, but they are only
  // available at runtime and therefore cannot be evaluated ahead of time.
  // This is only a concern for pre-stringification (via transformHoist by
  // @vue/compiler-dom), but doing it here allows us to perform only one full
  // walk of the AST and allow `stringifyStatic` to stop walking as soon as its
  // stringficiation threshold is met.

  let canStringify = true

  const { children } = node
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    // only plain elements & text calls are eligible for hoisting. 
    // 只有普通元素和文本才会被提升
    if (
      child.type === NodeTypes.ELEMENT &&
      child.tagType === ElementTypes.ELEMENT
    ) {
      const constantType = doNotHoistNode
        ? ConstantTypes.NOT_CONSTANT
        : getConstantType(child, context)
      if (constantType > ConstantTypes.NOT_CONSTANT) {
        if (constantType < ConstantTypes.CAN_STRINGIFY) {
          canStringify = false
        }
        if (constantType >= ConstantTypes.CAN_HOIST) {
          ;(child.codegenNode as VNodeCall).patchFlag =
            PatchFlags.HOISTED + (__DEV__ ? ` /* HOISTED */` : ``)
          child.codegenNode = context.hoist(child.codegenNode!)
          hasHoistedNode = true
          continue
        }
      } else {
        // 节点可能包含动态子节点，但是props可以被提升
        const codegenNode = child.codegenNode!
        if (codegenNode.type === NodeTypes.VNODE_CALL) {
          const flag = getPatchFlag(codegenNode)
          if (
            (!flag ||
              flag === PatchFlags.NEED_PATCH ||
              flag === PatchFlags.TEXT) &&
            getGeneratedPropsConstantType(child, context) >=
              ConstantTypes.CAN_HOIST
          ) {
            const props = getNodeProps(child)
            if (props) {
              codegenNode.props = context.hoist(props)
            }
          }
        }
      }
    } else if (child.type === NodeTypes.TEXT_CALL) {
      const contentType = getConstantType(child.content, context)
      if (contentType > 0) {
        if (contentType < ConstantTypes.CAN_STRINGIFY) {
          canStringify = false
        }
        if (contentType >= ConstantTypes.CAN_HOIST) {
          child.codegenNode = context.hoist(child.codegenNode)
          hasHoistedNode = true
        }
      }
    }

    // walk further
    if (child.type === NodeTypes.ELEMENT) {
      const isComponent = child.tagType === ElementTypes.COMPONENT
      if (isComponent) {
        context.scopes.vSlot++
      }
      walk(child, context)
      if (isComponent) {
        context.scopes.vSlot--
      }
    } else if (child.type === NodeTypes.FOR) {
      // v-for不要提升，他是个块
      walk(child, context, child.children.length === 1)
    } else if (child.type === NodeTypes.IF) {
      for (let i = 0; i < child.branches.length; i++) {
        // v-if 不会提升，因为他是个block
        walk(
          child.branches[i],
          context,
          child.branches[i].children.length === 1
        )
      }
    }
  }

  if (canStringify && hasHoistedNode && context.transformHoist) {
    context.transformHoist(children, context, node)
  }
}

```

## 最终提升的一个例子

可以看到只有```div```进行了提升，提升的会以```hoisted```标明，因为这2个是静态的节点，至于```render```这块可以不用考虑。

```ts
import { 
  toDisplayString as _toDisplayString, 
  createVNode as _createVNode, 
  vModelText as _vModelText, 
  withDirectives as _withDirectives, 
  resolveComponent as _resolveComponent, 
  renderList as _renderList, 
  Fragment as _Fragment, 
  openBlock as _openBlock, 
  createBlock as _createBlock, 
  Suspense as _Suspense, 
  withCtx as _withCtx, 
  Teleport as _Teleport 
} from "vue"

const _hoisted_1 = /*#__PURE__*/_createVNode("div", { id: "suspense" }, "supense组件", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("div", null, "telport组件", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_test = _resolveComponent("test")

  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("span", {
      class: _ctx.count % 2 === 0 ? 'red' : 'blue',
      style: 'font-size: 14px; font-weight: bold;'
    }, _toDisplayString(_ctx.count), 3 /* TEXT, CLASS */),
    _withDirectives(_createVNode("input", {
      ref: "inputRef",
      "onUpdate:modelValue": $event => (_ctx.inputVal = $event)
    }, null, 8 /* PROPS */, ["onUpdate:modelValue"]), [
      [_vModelText, _ctx.inputVal]
    ]),
    _createVNode("button", {
      onClick: _ctx.add,
      style: {
            color: 'red'
        }
    }, "增加", 8 /* PROPS */, ["onClick"]),
    _createVNode(_component_test, { count: _ctx.count }, null, 8 /* PROPS */, ["count"]),
    _createVNode("ul", null, [
      (_openBlock(), _createBlock(_Fragment, null, _renderList(10, (item) => {
        return _createVNode("li", null, _toDisplayString(item), 1 /* TEXT */)
      }), 64 /* STABLE_FRAGMENT */))
    ]),
    (_openBlock(), _createBlock(_Suspense, null, {
      default: _withCtx(() => [
        _hoisted_1
      ], undefined, true),
      _: 1 /* STABLE */
    })),
    (_openBlock(), _createBlock(_Teleport, { to: "body #suspense" }, [
      _hoisted_2
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}

// Check the console for the AST
```
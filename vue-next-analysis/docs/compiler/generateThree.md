## 模板转换 render function

```ts
function compileToFunction(
  template: string | HTMLElement,
  options?: CompilerOptions
): RenderFunction {
  // 如果template不是string
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML
    } else {
      __DEV__ && warn(`invalid template option: `, template)
      return NOOP
    }
  }

  const key = template
  // 保存编译结果，如果已经编译过则直接返回
  const cached = compileCache[key]
  if (cached) {
    return cached
  }

  if (template[0] === '#') {
    const el = document.querySelector(template)
    if (__DEV__ && !el) {
      warn(`Template element not found or is empty: ${template}`)
    }
    // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's rendered
    // by the server, the template should not contain any user data.
    template = el ? el.innerHTML : ``
  }

  // 编译模板，生成代码
  const { code } = compile(
    template,
    extend(
      {
        hoistStatic: true,
        onError: __DEV__ ? onError : undefined,
        onWarn: __DEV__ ? e => onError(e, true) : NOOP
      } as CompilerOptions,
      options
    )
  )

  function onError(err: CompilerError, asWarning = false) {
    const message = asWarning
      ? err.message
      : `Template compilation error: ${err.message}`
    const codeFrame =
      err.loc &&
      generateCodeFrame(
        template as string,
        err.loc.start.offset,
        err.loc.end.offset
      )
    warn(codeFrame ? `${message}\n${codeFrame}` : message)
  }

  // The wildcard import results in a huge object with every export
  // with keys that cannot be mangled, and can be quite heavy size-wise.
  // In the global build we know `Vue` is available globally so we can avoid
  // the wildcard object.
  // 生成的代码通过new Function进行包装
  const render = (__GLOBAL__
    ? new Function(code)()
    : new Function('Vue', code)(runtimeDom)) as RenderFunction

  // mark the function as runtime compiled 标记为运行时已编译
  ;(render as InternalRenderFunction)._rc = true

  return (compileCache[key] = render)
}
```

## 总结
可以看到最后对生成的代码通过```new Function```去做了一层包装，并返回了出去，简单看下最终生成的代码：

```js
(function anonymous() {
  const _Vue = Vue
  const { createVNode: _createVNode } = _Vue

  const _hoisted_1 = /*#__PURE__*/_createVNode("div", { id: "suspense" }, "supense组件", -1 /* HOISTED */)
  const _hoisted_2 = /*#__PURE__*/_createVNode("div", null, "telport组件", -1 /* HOISTED */)

  return function render(_ctx, _cache) {
    with (_ctx) {
      const {
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
      } = _Vue

      const _component_test = _resolveComponent("test")

      return (
        _openBlock(), 
        _createBlock(_Fragment, null, [
          _createVNode("span", {
            class: count % 2 === 0 ? 'red' : 'blue',
            style: 'font-size: 14px; font-weight: bold;'
          }, _toDisplayString(count), 7 /* TEXT, CLASS, STYLE */),
          _withDirectives(_createVNode("input", {
            ref: "inputRef",
            "onUpdate:modelValue": $event => (inputVal = $event)
          }, null, 8 /* PROPS */, ["onUpdate:modelValue"]), [
            [_vModelText, inputVal]
          ]),
          _createVNode("button", {
            onClick: add,
            style: {
                color: 'red'
            }
          }, "增加", 12 /* STYLE, PROPS */, ["onClick"]),
          _createVNode(_component_test, { count: count }, null, 8 /* PROPS */, ["count"]),
          _createVNode("ul", null, [
            (
              _openBlock(true), 
              _createBlock(_Fragment, null, 
              _renderList(10, (item) => {
                // v-for生成的代码
                return (_openBlock(), _createBlock("li", null, _toDisplayString(item), 1 /* TEXT */))
              }), 256 /* UNKEYED_FRAGMENT */))
          ]),
          (_openBlock(), _createBlock(_Suspense, null, {
            default: _withCtx(() => [
              _hoisted_1
            ]),
            _: 1 /* STABLE */
          })),
          (_openBlock(), _createBlock(_Teleport, { to: "body #suspense" }, [
            _hoisted_2
          ])
        )
      ], 64 /* STABLE_FRAGMENT */))
    }
  }
})
```
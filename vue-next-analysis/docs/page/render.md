## render

本篇属于渲染部分，该内容过于硬核，源码一个函数长达2k行将近。这部分也会涉及到diff更新对比计算。这部分源码在```packages/runtime-core/src/renderer.ts```


### baseCreateRenderer

在上一部分，```mount```内部去调用了```render```，而这个```render```就是```baseCreateRenderer```返回的，在[ createApp ](/page/createApp)这一部分也简单提到过，现在就来具体看下这玩意。

```ts
function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
) {
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    // 如果vnode不存在
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    flushPostFlushCbs()
    container._vnode = vnode
  }

  // ...
  return {
    render, // 渲染相关
    hydrate, // SSR
    createApp: createAppAPI(render, hydrate) // creteApp本体
  }
}

```

由于是首次渲染，```Vnode```肯定会存在，而且在```mount```的时候，已经创建过一个```Vnode```，所以现在直接来看```patch```。

### patch
可以看到官方通过[ shapeFlag ](/page/bitOperators.html#shapflags)来判断当前类型，由于是首次，所以直接执行```processComponent```。
```ts
  /**
   * Note: functions inside this closure should use `const xxx = () => {}`
   * style in order to prevent being inlined by minifiers.
   * n1 旧节点
   * n2 新节点
   * anchor telport相关
  */
  const patch: PatchFn = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = false
  ) => {
    // ...
    const { type, ref, shapeFlag } = n2
    switch (type) { // type为vnode的类型，首次为component
      // ...
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // ...
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.TELEPORT) {
          // ...
        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          // ...
        } else if (__DEV__) {
          warn('Invalid VNode type:', type, `(${typeof type})`)
        }
    }
    // ...
  }
```

### processComponent

processComponent具体也就判断旧节点是否为空，然后判断是否为```keepAlive```组件，否则就挂载组件
```ts
  const processComponent = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    n2.slotScopeIds = slotScopeIds
    if (n1 == null) {
      // 是否keepAlive组件
      if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
        ;(parentComponent!.ctx as KeepAliveContext).activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        )
      } else {
        // 挂载组件
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        )
      }
    } else {
      updateComponent(n1, n2, optimized)
    }
  }
```
这部分暂时先到这里，下一部分来看组件是怎么挂载的。
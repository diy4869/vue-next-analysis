## mountComponent 挂载组件

这部分代码在```packages/runtime-core/src/renderer.ts```，组件挂载有以下过程：

- ```createComponentInstance``` 创建组件实例
- ```setupComponent``` 安装组件
- ```setupRenderEffect``` 渲染组件

```ts
 const mountComponent: MountComponentFn = (
    initialVNode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // 2.x 在实际创建组件之前，预先创建了组件实例
    // 2.x compat may pre-creaate the component instance before actually
    // mounting
    const compatMountInstance = __COMPAT__ && initialVNode.component
    // 创建组件
    const instance: ComponentInternalInstance =
      compatMountInstance ||
      (initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      ))

    // ... 
  
    // inject renderer internals for keepAlive
    // 是否keepAlive组件，是否存在__isKeepAlive属性
    if (isKeepAlive(initialVNode)) {
      ;(instance.ctx as KeepAliveContext).renderer = internals
    }

    // resolve props and slots for setup context
    if (!(__COMPAT__ && compatMountInstance)) {
      if (__DEV__) {
        // 性能统计
        startMeasure(instance, `init`)
      }
      // 安装组件
      setupComponent(instance)
      if (__DEV__) {
        endMeasure(instance, `init`)
      }
    }

    // setup() is async. This component relies on async logic to be resolved
    // before proceeding
    if (__FEATURE_SUSPENSE__ && instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect)

      // Give it a placeholder if this is not hydration
      // TODO handle self-defined fallback
      if (!initialVNode.el) {
        const placeholder = (instance.subTree = createVNode(Comment))
        processCommentNode(null, placeholder, container!, anchor)
      }
      return
    }

    // 渲染组件
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    )

    if (__DEV__) {
      popWarningContext()
      endMeasure(instance, `mount`)
    }
  }
```

### createComponentInstance  创建组件实例

这部分代码在```packages/runtime-core/src/component.ts```，由于类型声明有点多，这里就不贴出来了。
```ts
export function createComponentInstance(
  vnode: VNode,
  parent: ComponentInternalInstance | null,
  suspense: SuspenseBoundary | null
) {
  const type = vnode.type as ConcreteComponent
  // inherit parent app context - or - if root, adopt from root vnode
  // 如果有父组件，则用父组件的appContext 否则用当前vnode的，或者就重新创建一个appContext
  // 初次渲染是不存在parent的，所以这里为vnode.appContext
  const appContext =
    (parent ? parent.appContext : vnode.appContext) || emptyAppContext

  const instance: ComponentInternalInstance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null!, // to be immediately set
    next: null,
    subTree: null!, // 重点，最终需要根据这个去渲染DOM
    update: null!, // will be set synchronously right after creation
    render: null,
    proxy: null,
    exposed: null,
    withProxy: null,
    effects: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null!,
    renderCache: [],

    // local resovled assets
    components: null,
    directives: null,

    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),

    // emit
    emit: null as any, // to be set immediately
    emitted: null,

    // props default value
    propsDefaults: EMPTY_OBJ,

    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,

    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,

    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null, // beforeCreate
    c: null, // created
    bm: null, // beforeMount
    m: null, // mounted
    bu: null, //beforeUpdate
    u: null, // updated
    um: null, // unMounted
    bum: null, // beforeUnMount
    da: null, // deactivated
    a: null, // activated
    rtg: null, // RENDER_TRIGGERED
    rtc: null, // RENDER_TRACKED
    ec: null // ERROR_CAPTURED
  }
  if (__DEV__) {
    instance.ctx = createRenderContext(instance)
  } else {
    instance.ctx = { _: instance }
  }
  instance.root = parent ? parent.root : instance
  instance.emit = emit.bind(null, instance)

  return instance
}
```
组件其实就是一个对象，里面去维护了一些数据，用于渲染。


## 总结

暂时就到这里，下一篇来说如何安装组件。
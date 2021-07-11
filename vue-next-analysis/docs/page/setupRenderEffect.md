## setupRenderEffect 准备渲染

在上一篇说明了组件是怎么安装的，这一篇来说组件在渲染前都做了哪些工作，没有看过组件编译过程的建议先去看完编译过程再来看这个。

- [组件编译过程传送门](/compiler/baseCompile)
- [渲染过程传送门](/render/patch)
- [生命周期传送门](/page/lifeCycle)

```ts
const setupRenderEffect: SetupRenderEffectFn = (
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // create reactive effect for rendering
    instance.update = effect(function componentEffect() {
      // 如果没有渲染
      if (!instance.isMounted) {
        let vnodeHook: VNodeHook | null | undefined
        const { el, props } = initialVNode
        // 获取组件上挂载的beforeMount onMounted parent parent为父组件
        const { bm, m, parent } = instance 

        // beforeMount hook 调用beforeMount
        if (bm) {
          invokeArrayFns(bm)
        }
        // onVnodeBeforeMount
        if ((vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode)
        }

        // ... v2兼容

        // render
        if (__DEV__) {
          // 开始统计render
          startMeasure(instance, `render`)
        }
        // 把之前renderFunction生成的模板编译为vnode，并生成subtree
        const subTree = (instance.subTree = renderComponentRoot(instance))
        if (__DEV__) {
          // 结束统计render
          endMeasure(instance, `render`)
        }

        if (el && hydrateNode) {
          // ... ssr
        } else {
          if (__DEV__) {
            // 开始统计patch
            startMeasure(instance, `patch`)
          }
          // 初始渲染DOM
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          )
          if (__DEV__) {
            endMeasure(instance, `patch`)
          }
          initialVNode.el = subTree.el
        }
        // mounted hook 调用mounted 钩子
        if (m) {
          queuePostRenderEffect(m, parentSuspense)
        }
        // ... 

        // 标记为该组件已渲染
        instance.isMounted = true

        if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(instance)
        }

        // #2458: deference mount-only object parameters to prevent memleaks
        initialVNode = container = anchor = null as any
      } else {
        // ... 组件更新过程
      }
    }, __DEV__ ? createDevEffectOptions(instance) : prodEffectOptions)

    if (__DEV__) {
      // @ts-ignore
      instance.update.ownerInstance = instance
    }
  }

```

这里只需要关注```instance.update```内的内容就行，```effect```可能是因为响应式的副作用，才进行了包裹？具体不清楚。

接着往下看，通过```instance.isMounted```判断了组件是否有没有渲染，如果已经渲染，就执行更新逻辑，否则执行渲染过程。这一步也执行了组件的生命周期，然后调用```renderComponentRoot```生成了```subtree```，之后调用了```patch```去渲染组件（更新也是这个函数），并在结束后，调用```Mounted```钩子，标志渲染完成。

### 一个大概的流程：

- 获取组件内的```beforeMount、Mounted、parent```
- 调用```beforeMount hook```
- 调用```renderComponentRoot```生成```subtree```
- 调用```patch```对组件进行渲染
- 调用```mounted hook```
- 标记组件已经渲染完成

### 注意：

在组件渲染过程中，如果遇到子组件会重新执行编译，编译完成后，继续执行上述流程。

## 总结

组件渲染之前的准备工作到这就结束了，这里对于如何生成```subtree```的过程没有说明，有兴趣的自己去研究。

- [渲染过程传送门](/render/patch)
- [生命周期传送门](/page/lifeCycle)

## subtree

```json
{
  anchor: null
  appContext: null
  children: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  component: null
  dirs: null
  dynamicChildren: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  dynamicProps: null
  el: null
  key: null
  patchFlag: 64
  props: null
  ref: null
  scopeId: null
  shapeFlag: 16
  slotScopeIds: null
  ssContent: null
  ssFallback: null
  staticCount: 0
  suspense: null
  target: null
  targetAnchor: null
  transition: null
  type: Symbol(Fragment)
  __v_isVNode: true
  __v_skip: true
}
```
## mount挂载


mount主要就做了判断是否已经渲染，如果没有渲染则创建Vnode，并把context挂载到```vnode.appContext```上，接下来判断是否SSR渲染，如果不是则调用```render```函数进行渲染（diff操作也是执行的这块），最后渲染结束，初始化```devtools```即可。

```ts
export interface AppContext {
  app: App // for devtools 应用于 vue devtools
  config: AppConfig
  mixins: ComponentOptions[]
  components: Record<string, Component>
  directives: Record<string, Directive>
  provides: Record<string | symbol, any>
  /**
   * Flag for de-optimizing props normalization
   * @internal
   */
  deopt?: boolean
  /**
   * HMR only
   * @internal
   */
  reload?: () => void
  /**
   * v2 compat only
   * @internal
   */
  filters?: Record<string, Function>
}

export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }
    // 创建AppContext
    const context = createAppContext()
    // 已安装的插件
    const installedPlugins = new Set()

    // 是否渲染
    let isMounted = false

    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,

      version,
      // ...
      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        if (!isMounted) {
          // 创建Vnode
          const vnode = createVNode(
            rootComponent as ConcreteComponent,
            rootProps
          )
          // store app context on the root VNode.
          // this will be set on the root instance on initial mount.
          // 将context挂载到根节点
          vnode.appContext = context

          // HMR root reload
          if (__DEV__) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG)
            }
          }
          // ssr渲染
          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            // 普通渲染
            render(vnode, rootContainer, isSVG)
          }

          isMounted = true
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app
          // 初始化devtools
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            devtoolsInitApp(app, version)
          }

          return vnode.component!.proxy
        } else if (__DEV__) {
          warn(
            `App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``
          )
        }
      },
    })

    // ...
    return app
  }
}
```
整体代码不算复杂，主要核心是```render函数```，这部分下面说。至于Vnode在准备工作的章节已经说过了，这里不在叙述。
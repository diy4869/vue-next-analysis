## createApp

当我们引入```createApp```的时候，它实际上是执行了下面这段代码，代码在```packages/runtime-dom/src/index.ts```

```ts
// args是你调用createApp里面传的参数
export const createApp = ((...args) => {
  // 渲染核心，重点
  const app = ensureRenderer().createApp(...args)

  if (__DEV__) {
    // 检查是否原生标签
    injectNativeTagCheck(app)
    // 检查是否自定义标签
    injectCompilerOptionsCheck(app)
  }

  // ...
  return app
}) as CreateAppFunction<Element>
```

我们可以看到该函数调用了```ensureRenderer```，该函数返回了一个```createRender```，该函数接受一个```rendererOptions```，这个我们暂时先不考虑，我们只用知道该函数调用了```createRenderer```这个函数，并返回了出去。


我们找到这个函数，这块代码在```packages/runtime-core/src/renderer/ts```，发现```createRenderer```内部又调用了一次```baseCreateRenderer```。

```ts
function ensureRenderer() {
  return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
}

export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}

function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
) {
  // 以上省略近2k行，该函数主要负责渲染部分相关，后续再说。
  return {
    render, // 渲染相关
    hydrate, // SSR
    createApp: createAppAPI(render, hydrate) // creteApp本体
  }
}
```

### createAppAPI

这时候我们去看下```createAppAPI```，该代码位于```packages/runtime-core/src/apiCreateApp.ts```

```ts
// 这是createApp的类型定义
export interface App<HostElement = any> {
  version: string
  config: AppConfig
  use(plugin: Plugin, ...options: any[]): this
  mixin(mixin: ComponentOptions): this
  component(name: string): Component | undefined
  component(name: string, component: Component): this
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
  mount(
    rootContainer: HostElement | string,
    isHydrate?: boolean,
    isSVG?: boolean
  ): ComponentPublicInstance
  unmount(): void
  provide<T>(key: InjectionKey<T> | string, value: T): this

  // internal, but we need to expose these for the server-renderer and devtools
  _uid: number
  _component: ConcreteComponent
  _props: Data | null
  _container: HostElement | null
  _context: AppContext

  /**
   * v2 compat only
   */
  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this

  /**
   * @internal v3 compat only
   */
  _createRoot?(options: ComponentOptions): ComponentPublicInstance
}

// 具体实现
let uid = 0

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
          vnode.appContext = context

          // HMR root reload
          if (__DEV__) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG)
            }
          }

          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, isSVG)
          }
          isMounted = true
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app

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


``normalizeContainer``用于判断el是否存在
```ts
function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)

    if (__DEV__ && !res) {
      // 确保el元素存在
      warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }

  if (
    __DEV__ &&
    container instanceof window.ShadowRoot &&
    container.mode === 'closed'
  ) {
    // 如果是ShadowRoot并且mode为mode可能会导致未知的bug
    warn(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    )
  }

  return container as any
}
```

## mount 挂载

```ts
export const createApp = ((...args) => {
  // ...
  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // 获取mount所挂载的节点
    const container = normalizeContainer(containerOrSelector)
    if (!container) return

    const component = app._component

    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
      component.template = container.innerHTML
      // 2.x compat check
      console.log('兼容', __COMPAT__)
      /**
       * __COMPAT__ 是启动的时候通过rollup去注入进去的
       * 用来判断是否向下兼容
       */
      if (__COMPAT__ && __DEV__) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i]
          if (attr.name !== 'v-cloak' && /^(v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
              null
            )
            break
          }
        }
      }
    }
    // 渲染前清空html
    container.innerHTML = ''
    // 挂载元素进行渲染
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      // vue2的话，会给#app设置一个v-cloak属性，在render的时候清空掉
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
}) as CreateAppFunction<Element>

```
这部分是```vue```的初次渲染逻辑，首先官方解构了```mount```方法， 然后又重写了```app.mount```，并调用```normalizeContainer```校验挂载元素，临时保存了需要渲染的内容。接下来并对```vue2```的写法做了兼容处理。

## 总结

至此，```createApp```的流程大概到此结束，下一部分来分析```mount```渲染部分，由于这部分比较复杂，可能会更新的比较慢。
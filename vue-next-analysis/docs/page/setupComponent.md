## setupComponent 安装组件

这部分代码在```packages/runtime-core/src/renderer.ts```

```setupComponent```首先从```Vnode```获取```props、children```，并对```props、children```做了初始化。并判断是否有状态，有就执行```setupStatefulComponent```，否则就为```undefined```，并最终返回```setup```函数执行结果。

```ts
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  isInSSRComponentSetup = isSSR

  const { props, children } = instance.vnode
  // 是否是有状态的组件
  const isStateful = isStatefulComponent(instance)
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  isInSSRComponentSetup = false
  return setupResult
}
```

### 获取setup状态
```ts
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions

  if (__DEV__) {
    // 如果存在组件名称
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config)
    }
    // 如果有注册组件，则进行校验
    if (Component.components) {
      const names = Object.keys(Component.components)
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config)
      }
    }
    // 如果有注册指令
    if (Component.directives) {
      const names = Object.keys(Component.directives)
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i])
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn(
        `"compilerOptions" is only supported when using a build of Vue that ` +
          `includes the runtime compiler. Since you are using a runtime-only ` +
          `build, the options should be passed via your build tool config instead.`
      )
    }
  }
  // 0. create render proxy property access cache
  instance.accessCache = Object.create(null)
  // 1. create public instance / render proxy
  // also mark it raw so it's never observed
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  if (__DEV__) {
    exposePropsOnRenderContext(instance)
  }
  // 2. call setup()
  const { setup } = Component
  if (setup) {
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)

    currentInstance = instance
    pauseTracking()
    // 调用组件内的setup函数执行，并拿到返回结果
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [__DEV__ ? shallowReadonly(instance.props) : instance.props, setupContext]
    )
    resetTracking()
    currentInstance = null

    // 如果setup返回的结果是promise
    if (isPromise(setupResult)) {
      // 如果是服务端渲染
      if (isSSR) {
        // 返回Promise 以便在SSR期间处理
        return setupResult
          .then((resolvedResult: unknown) => {
            handleSetupResult(instance, resolvedResult, isSSR)
          })
          .catch(e => {
            handleError(e, instance, ErrorCodes.SETUP_FUNCTION)
          })
      }
    } else {
      // 否则
      handleSetupResult(instance, setupResult, isSSR)
    }
  } else {
    // 完成组件安装
    finishComponentSetup(instance, isSSR)
  }
}
```
### 对setup返回的结果进行处理
```ts
export function handleSetupResult(
  instance: ComponentInternalInstance,
  setupResult: unknown,
  isSSR: boolean
) {
  // setup可能返回一个render function
  if (isFunction(setupResult)) {
    // setup returned an inline render function 如果是node ssr，则返回一个内联渲染函数
    if (__NODE_JS__ && (instance.type as ComponentOptions).__ssrInlineRender) {
      // when the function's name is `ssrRender` (compiled by SFC inline mode),
      // set it as ssrRender instead.
      instance.ssrRender = setupResult
    } else {
      instance.render = setupResult as InternalRenderFunction
    }
  } else if (isObject(setupResult)) {
    // 如果是vnode
    if (__DEV__ && isVNode(setupResult)) {
      // setup不应返回一个vnode 应该是render function
      warn(
        `setup() should not return VNodes directly - ` +
          `return a render function instead.`
      )
    }
    // setup returned bindings.
    // assuming a render function compiled from template is present.
    // 如果存在devtools 就把setup返回结果赋值给devtoolsRawSetupState
    if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
      instance.devtoolsRawSetupState = setupResult
    }
    // 这步会把setup的返回结果在进一步通过proxy进行包装
    instance.setupState = proxyRefs(setupResult)
    if (__DEV__) {
      exposeSetupStateOnRenderContext(instance)
    }
  } else if (__DEV__ && setupResult !== undefined) {
    warn(
      `setup() should return an object. Received: ${
        setupResult === null ? 'null' : typeof setupResult
      }`
    )
  }
  // 完成组件安装
  finishComponentSetup(instance, isSSR)
}
```

### finishComponentSetup 完成组件设置

```finishComponentSetup```这块，主要完成了组件的安装处理，并初始化了编译选项，对```setup```返回```render Function```和普通结果做了处理。并对v2做了兼容处理。
```ts
// 完成组件设置
export function finishComponentSetup(
  instance: ComponentInternalInstance,
  isSSR: boolean,
  skipOptions?: boolean
) {
  const Component = instance.type as ComponentOptions

  // 针对v2进行兼容
  if (__COMPAT__) {
    convertLegacyRenderFn(instance)

    if (__DEV__ && Component.compatConfig) {
      validateCompatConfig(Component.compatConfig)
    }
  }

  // template / render function normalization
  if (__NODE_JS__ && isSSR) {
    // 1. the render function may already exist, returned by `setup`
    // 2. otherwise try to use the `Component.render`
    // 3. if the component doesn't have a render function,
    //    set `instance.render` to NOOP so that it can inherit the render
    //    function from mixins/extend
    // render函数可能由setup进行返回，否则就用Component.render
    instance.render = (instance.render ||
      Component.render ||
      NOOP) as InternalRenderFunction
  } else if (!instance.render) {
    // could be set from setup()
    if (compile && !Component.render) {
      // 获取模板
      const template =
        (__COMPAT__ &&
          instance.vnode.props &&
          instance.vnode.props['inline-template']) ||
        Component.template
      if (template) {
        if (__DEV__) {
          // 编译性能统计
          startMeasure(instance, `compile`)
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config
        const {
          delimiters,
          compilerOptions: componentCompilerOptions
        } = Component
        // 合并最终编译选项
        const finalCompilerOptions: CompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        )
        if (__COMPAT__) {
          // pass runtime compat config into the compiler
          finalCompilerOptions.compatConfig = Object.create(globalCompatConfig)
          if (Component.compatConfig) {
            extend(finalCompilerOptions.compatConfig, Component.compatConfig)
          }
        }
        // 编译模板 生成render function，这一步只是生成了createVnode
        Component.render = compile(template, finalCompilerOptions)
        if (__DEV__) {
          // 编译结束
          endMeasure(instance, `compile`)
        }
      }
    }

    instance.render = (Component.render || NOOP) as InternalRenderFunction

    // for runtime-compiled render functions using `with` blocks, the render
    // proxy used needs a different `has` handler which is more performant and
    // also only allows a whitelist of globals to fallthrough.
    /**
     * vue在生成render function的时候，vue是通过new Function() 实现的
     * 从而通过需要proxy 进行代理 提高性能
     */
    if (instance.render._rc) {
      instance.withProxy = new Proxy(
        instance.ctx,
        RuntimeCompiledPublicInstanceProxyHandlers
      )
    }
  }

  // support for 2.x options
  if (__FEATURE_OPTIONS_API__ && !(__COMPAT__ && skipOptions)) {
    currentInstance = instance
    pauseTracking()
    applyOptions(instance, Component)
    resetTracking()
    currentInstance = null
  }

  // warn missing template/render
  // the runtime compilation of template in SSR is done by server-render
  if (__DEV__ && !Component.render && instance.render === NOOP && !isSSR) {
    /* istanbul ignore if */
    if (!compile && Component.template) {
      warn(
        `Component provided template option but ` +
          `runtime compilation is not supported in this build of Vue.` +
          (__ESM_BUNDLER__
            ? ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
            : __ESM_BROWSER__
              ? ` Use "vue.esm-browser.js" instead.`
              : __GLOBAL__
                ? ` Use "vue.global.js" instead.`
                : ``) /* should not happen */
      )
    } else {
      warn(`Component is missing template or render function.`)
    }
  }
}

```

## 总结

至此，组件已经完成安装，下一部分将开始说明```template```是如何编译的，需要懂一点简单的编译原理。由于本人例子是通过template实现的，所以和直接返回```render Function```的会有部分区别，可能以后会去写```render Function```的处理方案吧。

[组件编译过程传送门](/compiler/baseCompile)
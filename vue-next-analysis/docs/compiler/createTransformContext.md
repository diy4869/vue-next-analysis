## createTransformContext 创建转换器上下文

这部分主要就是通过一个对象，内部去维护了一些数据，用于在之后的过程中进行转换，整体并没什么太多内容。
```ts
export function createTransformContext(
  root: RootNode,
  {
    filename = '',
    prefixIdentifiers = false,
    hoistStatic = false,
    cacheHandlers = false,
    nodeTransforms = [],
    directiveTransforms = {},
    transformHoist = null,
    isBuiltInComponent = NOOP,
    isCustomElement = NOOP,
    expressionPlugins = [],
    scopeId = null,
    slotted = true,
    ssr = false,
    ssrCssVars = ``,
    bindingMetadata = EMPTY_OBJ,
    inline = false,
    isTS = false,
    onError = defaultOnError,
    onWarn = defaultOnWarn,
    compatConfig
  }: TransformOptions
): TransformContext {
  // 匹配文件名，应该是用于.vue文件
  const nameMatch = filename.replace(/\?.*$/, '').match(/([^/\\]+)\.\w+$/) 
  const context: TransformContext = {
    // options
    selfName: nameMatch && capitalize(camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic,
    cacheHandlers,
    nodeTransforms, // 内置一些需要转换的方法
    /**
     * bind、cloak、html、model、on、show、text
    */
    directiveTransforms, // 内置一些需要转换的一个指令
    transformHoist,
    isBuiltInComponent, // 是否内置组件
    isCustomElement, // 是否自定义元素
    expressionPlugins,
    scopeId,
    slotted,
    ssr, // 是否ssr
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS, // 是否ts
    onError,
    onWarn,
    compatConfig, // V2的兼容配置

    // state
    root, // AST的一个根节点
    /**
     * 转换的过程，用于维护的一个帮助函数，用于后面生成render funciton
     * 
     * Symbol(toDisplayString)
     * Symbol(createVNode)
     * Symbol(vModelText)
     * Symbol(withDirectives)
     * Symbol(resolveComponent)
     * Symbol(renderList)
     * Symbol(Fragment)
     * Symbol(openBlock)
     * Symbol(createBlock)
     * Symbol(Suspense)
     * Symbol(withCtx)
     * Symbol(Teleport)
    */
    helpers: new Map(),
    components: new Set(), // 转换过程，组件内注册的组件
    directives: new Set(), // 转换过程，组件内注册的指令
    hoists: [],
    imports: [],
    constantCache: new Map(),
    temps: 0,
    cached: 0,
    identifiers: Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null, // 父级AST节点
    currentNode: root, // 当前转换过程的AST节点
    childIndex: 0, // 当前转换过程的Index

    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0
      context.helpers.set(name, count + 1)
      return name
    }
  }

  //...

  return context
}
```
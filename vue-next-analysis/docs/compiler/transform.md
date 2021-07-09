## transform 转换
前面的部分，对整个```parse```过程做了说明，这一系列，将对```transform```阶段做说明，依然会涉及多个部分，看到这里就完成了整个编译过程三分之一的内容了，这部分也算整个编译过程的一个重点，毕竟```Vue```提供了比较多的语法糖，都会在这一步做处理。

由于```transform```阶段整体过于复杂，将不会像```parse```阶段一样说的比较详细，之后将对这3个部分做一个简单的说明。有兴趣的话可以自己去研究下，代码在```packages/compiler-core/src/transform.ts```。本人能力有限，就不做说明了。

```ts
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {

  // 获取ast
  const ast = isString(template) ? baseParse(template, options) : template

  // 转换
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(
    prefixIdentifiers
  )

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [
        ...nodeTransforms,
        ...(options.nodeTransforms || []) // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      )
    })
  )

  // 生成block tree 用于最终渲染
  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers
    })
  )
}
```
从上面可以知道先去执行了```getBaseTransformPreset```，并且做了解构赋值，之后调用了```transform```方法，把上一步拿到的AST和一些配置去做了合并去执行了```transform```。下面就先看下```getBaseTransformPreset```干了啥。

## 获取基本转换预设
```ts
// 获取基本转换预设
export function getBaseTransformPreset(
  prefixIdentifiers?: boolean
): TransformPreset {
  return [
    [
      transformOnce,
      transformIf,
      transformFor,
      ...(__COMPAT__ ? [transformFilter] : []),
      ...(!__BROWSER__ && prefixIdentifiers
        ? [
            // order is important
            trackVForSlotScopes,
            transformExpression
          ]
        : __BROWSER__ && __DEV__
          ? [transformExpression]
          : []),
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel
    }
  ]
}
```
从上面可以看到```getBaseTransformPreset```提供了```once、if、for、slot、slotScope、on、bind、model```的一个转换。现在再来看下```transform```的实现。

## transform

```ts
export function transform(root: RootNode, options: TransformOptions) {
  // 创建转换器上下文
  const context = createTransformContext(root, options)
  // 针对生成好的AST去做转换
  traverseNode(root, context)
  if (options.hoistStatic) {
    // 静态提升
    hoistStatic(root, context)
  }
  if (!options.ssr) {
    // 创建跟节点代码生成
    createRootCodegen(root, context)
  }
  // finalize meta information
  root.helpers = [...context.helpers.keys()]
  root.components = [...context.components]
  root.directives = [...context.directives]
  root.imports = context.imports
  root.hoists = context.hoists
  root.temps = context.temps
  root.cached = context.cached

  if (__COMPAT__) {
    root.filters = [...context.filters!]
  }
}
```

## 总结

```transform```内部主要干了几件事：

- 创建转换器上下文
- 对节点进行转换
- 静态提升
- 创建根节点代码生成

下面将对这些内容，做简单说明。
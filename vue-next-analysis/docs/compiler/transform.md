## transform 转换
前面的部分，对整个```parse```过程做了说明，这一系列，将对```transform```阶段做说明，依然会涉及多个部分，看到这里就完成了整个编译过程三分之一的内容了。

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
从上面可以知道获取了基本的转换预设，而且做了解构赋值。并且调用了```transform```方法，把上一步拿到的AST和一些配置去做了合并去执行了```transform```。下面就先看下```getBaseTransformPreset```干了啥。

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

## 总结
从上面可以看到```once、if、for、slot、slotScope、on、bind、model```等去做了一个转换，下面将针对这些内容去做一个简单的说明。


## 步骤
- step zero
```
git clone https://github.com/vuejs/vue-next.git
```
- step one
```
npm install
```

- step two

执行完这个命令后，vue会在```packages/vue/dist```下生成一个```vue.global.js```
```
npm run dev
```
- step three
创建一个debug目录，然后创建index.html，引入刚才生成的文件
```shell
mkdir debug
touch index.html
```
- step four

然后在```index.html```写下如下内容就可以愉快的debug源码了，注意npm run dev启动的服务不要关，他会监听你在当前目录下所做的所有更改。

```createApp```入口在```packages/runtime-core/src/index.ts```下。

新手教程到此结束，然就可以尽情的```debug```了，如果要提交代码到自己仓库的话，注意commit规范，详细可以百度搜索```commitlint```。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        {{ count }}
        <button @click="add">增加</button>
    </div>
</body>
<script src="../packages/vue/dist/vue.global.js"></script>
<script>
    const { createApp, reactive, ref } = Vue

    const app = createApp({
        setup () {
            const count = ref(0)
            const add = () => {
                console.log(count)
                count.value++
            }
            return {
                count,
                add
            }
        }
    }).mount('#app')

    console.log('app', app)
</script>
</html>
```


## vue-next源码结构
```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── api-extractor.json
├── example // 我写的（用于debug）
│   └── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── packages
│   ├── compiler-core // 编译核心
│   ├── compiler-dom  // 编译dom
│   ├── compiler-sfc 
│   ├── compiler-ssr // 编译ssr
│   ├── global.d.ts
│   ├── reactivity // 响应式
│   ├── runtime-core // 运行核心
│   ├── runtime-dom // 运行时的dom
│   ├── runtime-test // test
│   ├── server-renderer // ssr部分
│   ├── shared // dalao的工具库（dalao喜欢的命名，cli也是这个名字）
│   ├── size-check
│   ├── template-explorer
│   └── vue // build后生成的vue目录
├── rollup.config.js
├── scripts // 一些脚本
│   ├── bootstrap.js // 自动生成package.json、readme.md
│   ├── build.js // 打包
│   ├── checkYarn.js // 校验yarn版本
│   ├── dev.js
│   ├── release.js // 发布
│   ├── setupJestEnv.ts
│   ├── utils.js
│   └── verifyCommit.js // commit校验
├── test-dts // 一些测试
│   ├── README.md
│   ├── component.test-d.ts
│   ├── componentTypeExtensions.test-d.tsx
│   ├── defineComponent.test-d.tsx
│   ├── functionalComponent.test-d.tsx
│   ├── h.test-d.ts
│   ├── index.d.ts
│   ├── inject.test-d.ts
│   ├── reactivity.test-d.ts
│   ├── ref.test-d.ts
│   ├── setupHelpers.test-d.ts
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   ├── tsx.test-d.tsx
│   └── watch.test-d.ts
├── tsconfig.json
└── yarn.lock
```
## 完整目录
```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── api-extractor.json
├── example
│   └── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── packages
│   ├── compiler-core
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   │   ├── codegen.spec.ts.snap
│   │   │   │   ├── compile.spec.ts.snap
│   │   │   │   ├── parse.spec.ts.snap
│   │   │   │   └── scopeId.spec.ts.snap
│   │   │   ├── codegen.spec.ts
│   │   │   ├── compile.spec.ts
│   │   │   ├── parse.spec.ts
│   │   │   ├── scopeId.spec.ts
│   │   │   ├── testUtils.ts
│   │   │   ├── transform.spec.ts
│   │   │   ├── transforms
│   │   │   │   ├── __snapshots__
│   │   │   │   │   ├── hoistStatic.spec.ts.snap
│   │   │   │   │   ├── transformExpressions.spec.ts.snap
│   │   │   │   │   ├── transformText.spec.ts.snap
│   │   │   │   │   ├── vFor.spec.ts.snap
│   │   │   │   │   ├── vIf.spec.ts.snap
│   │   │   │   │   ├── vModel.spec.ts.snap
│   │   │   │   │   ├── vOnce.spec.ts.snap
│   │   │   │   │   └── vSlot.spec.ts.snap
│   │   │   │   ├── hoistStatic.spec.ts
│   │   │   │   ├── noopDirectiveTransform.spec.ts
│   │   │   │   ├── transformElement.spec.ts
│   │   │   │   ├── transformExpressions.spec.ts
│   │   │   │   ├── transformSlotOutlet.spec.ts
│   │   │   │   ├── transformText.spec.ts
│   │   │   │   ├── vBind.spec.ts
│   │   │   │   ├── vFor.spec.ts
│   │   │   │   ├── vIf.spec.ts
│   │   │   │   ├── vModel.spec.ts
│   │   │   │   ├── vOn.spec.ts
│   │   │   │   ├── vOnce.spec.ts
│   │   │   │   └── vSlot.spec.ts
│   │   │   └── utils.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── ast.ts
│   │       ├── codegen.ts
│   │       ├── compile.ts
│   │       ├── errors.ts
│   │       ├── index.ts
│   │       ├── options.ts
│   │       ├── parse.ts
│   │       ├── runtimeHelpers.ts
│   │       ├── transform.ts
│   │       ├── transforms
│   │       │   ├── hoistStatic.ts
│   │       │   ├── noopDirectiveTransform.ts
│   │       │   ├── transformElement.ts
│   │       │   ├── transformExpression.ts
│   │       │   ├── transformSlotOutlet.ts
│   │       │   ├── transformText.ts
│   │       │   ├── vBind.ts
│   │       │   ├── vFor.ts
│   │       │   ├── vIf.ts
│   │       │   ├── vModel.ts
│   │       │   ├── vOn.ts
│   │       │   ├── vOnce.ts
│   │       │   └── vSlot.ts
│   │       ├── utils.ts
│   │       └── validateExpression.ts
│   ├── compiler-dom
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   │   └── index.spec.ts.snap
│   │   │   ├── index.spec.ts
│   │   │   ├── parse.spec.ts
│   │   │   └── transforms
│   │   │       ├── __snapshots__
│   │   │       │   ├── vModel.spec.ts.snap
│   │   │       │   └── vShow.spec.ts.snap
│   │   │       ├── ignoreSideEffectTags.spec.ts
│   │   │       ├── stringifyStatic.spec.ts
│   │   │       ├── transformStyle.spec.ts
│   │   │       ├── vHtml.spec.ts
│   │   │       ├── vModel.spec.ts
│   │   │       ├── vOn.spec.ts
│   │   │       ├── vShow.spec.ts
│   │   │       ├── vText.spec.ts
│   │   │       └── warnTransitionChildren.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── decodeHtml.ts
│   │       ├── decodeHtmlBrowser.ts
│   │       ├── errors.ts
│   │       ├── index.ts
│   │       ├── namedChars.json
│   │       ├── parserOptions.ts
│   │       ├── runtimeHelpers.ts
│   │       └── transforms
│   │           ├── ignoreSideEffectTags.ts
│   │           ├── stringifyStatic.ts
│   │           ├── transformStyle.ts
│   │           ├── vHtml.ts
│   │           ├── vModel.ts
│   │           ├── vOn.ts
│   │           ├── vShow.ts
│   │           ├── vText.ts
│   │           └── warnTransitionChildren.ts
│   ├── compiler-sfc
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   │   ├── compileScript.spec.ts.snap
│   │   │   │   ├── compileTemplate.spec.ts.snap
│   │   │   │   ├── cssVars.spec.ts.snap
│   │   │   │   ├── templateTransformAssetUrl.spec.ts.snap
│   │   │   │   └── templateTransformSrcset.spec.ts.snap
│   │   │   ├── compileScript.spec.ts
│   │   │   ├── compileStyle.spec.ts
│   │   │   ├── compileTemplate.spec.ts
│   │   │   ├── cssVars.spec.ts
│   │   │   ├── fixture
│   │   │   │   └── import.scss
│   │   │   ├── parse.spec.ts
│   │   │   ├── rewriteDefault.spec.ts
│   │   │   ├── templateTransformAssetUrl.spec.ts
│   │   │   ├── templateTransformSrcset.spec.ts
│   │   │   ├── templateUtils.spec.ts
│   │   │   └── utils.ts
│   │   ├── api-extractor.json
│   │   ├── package.json
│   │   └── src
│   │       ├── compileScript.ts
│   │       ├── compileStyle.ts
│   │       ├── compileTemplate.ts
│   │       ├── cssVars.ts
│   │       ├── index.ts
│   │       ├── parse.ts
│   │       ├── rewriteDefault.ts
│   │       ├── shims.d.ts
│   │       ├── stylePluginScoped.ts
│   │       ├── stylePluginTrim.ts
│   │       ├── stylePreprocessors.ts
│   │       ├── templateTransformAssetUrl.ts
│   │       ├── templateTransformSrcset.ts
│   │       ├── templateUtils.ts
│   │       └── warn.ts
│   ├── compiler-ssr
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── ssrComponent.spec.ts
│   │   │   ├── ssrElement.spec.ts
│   │   │   ├── ssrInjectCssVars.spec.ts
│   │   │   ├── ssrPortal.spec.ts
│   │   │   ├── ssrScopeId.spec.ts
│   │   │   ├── ssrSlotOutlet.spec.ts
│   │   │   ├── ssrSuspense.spec.ts
│   │   │   ├── ssrText.spec.ts
│   │   │   ├── ssrVFor.spec.ts
│   │   │   ├── ssrVIf.spec.ts
│   │   │   ├── ssrVModel.spec.ts
│   │   │   ├── ssrVShow.spec.ts
│   │   │   └── utils.ts
│   │   ├── api-extractor.json
│   │   ├── package.json
│   │   └── src
│   │       ├── errors.ts
│   │       ├── index.ts
│   │       ├── runtimeHelpers.ts
│   │       ├── ssrCodegenTransform.ts
│   │       └── transforms
│   │           ├── ssrInjectCssVars.ts
│   │           ├── ssrInjectFallthroughAttrs.ts
│   │           ├── ssrTransformComponent.ts
│   │           ├── ssrTransformElement.ts
│   │           ├── ssrTransformSlotOutlet.ts
│   │           ├── ssrTransformSuspense.ts
│   │           ├── ssrTransformTeleport.ts
│   │           ├── ssrTransformTransitionGroup.ts
│   │           ├── ssrVFor.ts
│   │           ├── ssrVIf.ts
│   │           ├── ssrVModel.ts
│   │           └── ssrVShow.ts
│   ├── global.d.ts
│   ├── reactivity
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── collections
│   │   │   │   ├── Map.spec.ts
│   │   │   │   ├── Set.spec.ts
│   │   │   │   ├── WeakMap.spec.ts
│   │   │   │   └── WeakSet.spec.ts
│   │   │   ├── computed.spec.ts
│   │   │   ├── effect.spec.ts
│   │   │   ├── reactive.spec.ts
│   │   │   ├── reactiveArray.spec.ts
│   │   │   ├── readonly.spec.ts
│   │   │   ├── ref.spec.ts
│   │   │   └── shallowReactive.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── baseHandlers.ts
│   │       ├── collectionHandlers.ts
│   │       ├── computed.ts
│   │       ├── effect.ts
│   │       ├── index.ts
│   │       ├── operations.ts
│   │       ├── reactive.ts
│   │       └── ref.ts
│   ├── runtime-core
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── apiAsyncComponent.spec.ts
│   │   │   ├── apiCreateApp.spec.ts
│   │   │   ├── apiExpose.spec.ts
│   │   │   ├── apiInject.spec.ts
│   │   │   ├── apiLifecycle.spec.ts
│   │   │   ├── apiOptions.spec.ts
│   │   │   ├── apiSetupContext.spec.ts
│   │   │   ├── apiSetupHelpers.spec.ts
│   │   │   ├── apiTemplateRef.spec.ts
│   │   │   ├── apiWatch.spec.ts
│   │   │   ├── componentEmits.spec.ts
│   │   │   ├── componentProps.spec.ts
│   │   │   ├── componentPublicInstance.spec.ts
│   │   │   ├── componentSlots.spec.ts
│   │   │   ├── components
│   │   │   │   ├── BaseTransition.spec.ts
│   │   │   │   ├── KeepAlive.spec.ts
│   │   │   │   ├── Suspense.spec.ts
│   │   │   │   └── Teleport.spec.ts
│   │   │   ├── directives.spec.ts
│   │   │   ├── errorHandling.spec.ts
│   │   │   ├── h.spec.ts
│   │   │   ├── helpers
│   │   │   │   ├── createSlots.spec.ts
│   │   │   │   ├── renderList.spec.ts
│   │   │   │   ├── renderSlot.spec.ts
│   │   │   │   ├── resolveAssets.spec.ts
│   │   │   │   └── toHandlers.spec.ts
│   │   │   ├── hmr.spec.ts
│   │   │   ├── hydration.spec.ts
│   │   │   ├── misc.spec.ts
│   │   │   ├── rendererAttrsFallthrough.spec.ts
│   │   │   ├── rendererChildren.spec.ts
│   │   │   ├── rendererComponent.spec.ts
│   │   │   ├── rendererElement.spec.ts
│   │   │   ├── rendererFragment.spec.ts
│   │   │   ├── rendererOptimizedMode.spec.ts
│   │   │   ├── scheduler.spec.ts
│   │   │   ├── scopeId.spec.ts
│   │   │   ├── vnode.spec.ts
│   │   │   └── vnodeHooks.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── apiAsyncComponent.ts
│   │   │   ├── apiComputed.ts
│   │   │   ├── apiCreateApp.ts
│   │   │   ├── apiDefineComponent.ts
│   │   │   ├── apiInject.ts
│   │   │   ├── apiLifecycle.ts
│   │   │   ├── apiSetupHelpers.ts
│   │   │   ├── apiWatch.ts
│   │   │   ├── component.ts
│   │   │   ├── componentEmits.ts
│   │   │   ├── componentOptions.ts
│   │   │   ├── componentProps.ts
│   │   │   ├── componentPublicInstance.ts
│   │   │   ├── componentRenderContext.ts
│   │   │   ├── componentRenderUtils.ts
│   │   │   ├── componentSlots.ts
│   │   │   ├── components
│   │   │   │   ├── BaseTransition.ts
│   │   │   │   ├── KeepAlive.ts
│   │   │   │   ├── Suspense.ts
│   │   │   │   └── Teleport.ts
│   │   │   ├── customFormatter.ts
│   │   │   ├── devtools.ts
│   │   │   ├── directives.ts
│   │   │   ├── errorHandling.ts
│   │   │   ├── featureFlags.ts
│   │   │   ├── h.ts
│   │   │   ├── helpers
│   │   │   │   ├── createSlots.ts
│   │   │   │   ├── renderList.ts
│   │   │   │   ├── renderSlot.ts
│   │   │   │   ├── resolveAssets.ts
│   │   │   │   ├── toHandlers.ts
│   │   │   │   ├── typeUtils.ts
│   │   │   │   └── useSsrContext.ts
│   │   │   ├── hmr.ts
│   │   │   ├── hydration.ts
│   │   │   ├── index.ts
│   │   │   ├── profiling.ts
│   │   │   ├── renderer.ts
│   │   │   ├── scheduler.ts
│   │   │   ├── vnode.ts
│   │   │   └── warning.ts
│   │   └── types
│   │       └── refBail.d.ts
│   ├── runtime-dom
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── createApp.spec.ts
│   │   │   ├── customizedBuiltIn.spec.ts
│   │   │   ├── directives
│   │   │   │   ├── vCloak.spec.ts
│   │   │   │   ├── vModel.spec.ts
│   │   │   │   ├── vOn.spec.ts
│   │   │   │   └── vShow.spec.ts
│   │   │   ├── helpers
│   │   │   │   ├── useCssModule.spec.ts
│   │   │   │   └── useCssVars.spec.ts
│   │   │   ├── patchAttrs.spec.ts
│   │   │   ├── patchClass.spec.ts
│   │   │   ├── patchEvents.spec.ts
│   │   │   ├── patchProps.spec.ts
│   │   │   ├── patchStyle.spec.ts
│   │   │   └── rendererStaticNode.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── Transition.ts
│   │   │   │   └── TransitionGroup.ts
│   │   │   ├── directives
│   │   │   │   ├── vModel.ts
│   │   │   │   ├── vOn.ts
│   │   │   │   └── vShow.ts
│   │   │   ├── helpers
│   │   │   │   ├── useCssModule.ts
│   │   │   │   └── useCssVars.ts
│   │   │   ├── index.ts
│   │   │   ├── modules
│   │   │   │   ├── attrs.ts
│   │   │   │   ├── class.ts
│   │   │   │   ├── events.ts
│   │   │   │   ├── props.ts
│   │   │   │   └── style.ts
│   │   │   ├── nodeOps.ts
│   │   │   └── patchProp.ts
│   │   └── types
│   │       ├── jsx.d.ts
│   │       └── refBail.d.ts
│   ├── runtime-test
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   └── testRuntime.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── index.ts
│   │       ├── nodeOps.ts
│   │       ├── patchProp.ts
│   │       ├── serialize.ts
│   │       └── triggerEvent.ts
│   ├── server-renderer
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── render.spec.ts
│   │   │   ├── ssrAttrFallthrough.spec.ts
│   │   │   ├── ssrDirectives.spec.ts
│   │   │   ├── ssrDynamicComponent.spec.ts
│   │   │   ├── ssrInterpolate.spec.ts
│   │   │   ├── ssrRenderAttrs.spec.ts
│   │   │   ├── ssrRenderList.spec.ts
│   │   │   ├── ssrScopeId.spec.ts
│   │   │   ├── ssrSuspense.spec.ts
│   │   │   ├── ssrTeleport.spec.ts
│   │   │   └── ssrVModelHelpers.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── helpers
│   │       │   ├── ssrCompile.ts
│   │       │   ├── ssrInterpolate.ts
│   │       │   ├── ssrRenderAttrs.ts
│   │       │   ├── ssrRenderComponent.ts
│   │       │   ├── ssrRenderList.ts
│   │       │   ├── ssrRenderSlot.ts
│   │       │   ├── ssrRenderSuspense.ts
│   │       │   ├── ssrRenderTeleport.ts
│   │       │   └── ssrVModelHelpers.ts
│   │       ├── index.ts
│   │       ├── render.ts
│   │       ├── renderToStream.ts
│   │       └── renderToString.ts
│   ├── shared
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   │   └── codeframe.spec.ts.snap
│   │   │   ├── codeframe.spec.ts
│   │   │   ├── escapeHtml.spec.ts
│   │   │   ├── looseEqual.spec.ts
│   │   │   ├── normalizeProp.spec.ts
│   │   │   └── toDisplayString.spec.ts
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── codeframe.ts
│   │       ├── domAttrConfig.ts
│   │       ├── domTagConfig.ts
│   │       ├── escapeHtml.ts
│   │       ├── globalsWhitelist.ts
│   │       ├── index.ts
│   │       ├── looseEqual.ts
│   │       ├── makeMap.ts
│   │       ├── normalizeProp.ts
│   │       ├── patchFlags.ts
│   │       ├── shapeFlags.ts
│   │       ├── slotFlags.ts
│   │       └── toDisplayString.ts
│   ├── size-check
│   │   ├── README.md
│   │   ├── package.json
│   │   └── src
│   │       └── index.ts
│   ├── template-explorer
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── local.html
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── options.ts
│   │   │   └── theme.ts
│   │   └── style.css
│   └── vue
│       ├── LICENSE
│       ├── README.md
│       ├── __tests__
│       │   ├── Transition.spec.ts
│       │   ├── TransitionGroup.spec.ts
│       │   ├── e2eUtils.ts
│       │   ├── index.spec.ts
│       │   ├── svgNamespace.spec.ts
│       │   └── transition.html
│       ├── api-extractor.json
│       ├── dist
│       │   └── vue.global.js
│       ├── examples
│       │   ├── __tests__
│       │   │   ├── commits.mock.ts
│       │   │   ├── commits.spec.ts
│       │   │   ├── grid.spec.ts
│       │   │   ├── markdown.spec.ts
│       │   │   ├── svg.spec.ts
│       │   │   ├── todomvc.spec.ts
│       │   │   └── tree.spec.ts
│       │   ├── classic
│       │   │   ├── commits.html
│       │   │   ├── grid.html
│       │   │   ├── markdown.html
│       │   │   ├── svg.html
│       │   │   ├── todomvc.html
│       │   │   └── tree.html
│       │   ├── composition
│       │   │   ├── commits.html
│       │   │   ├── grid.html
│       │   │   ├── markdown.html
│       │   │   ├── svg.html
│       │   │   ├── todomvc.html
│       │   │   └── tree.html
│       │   └── transition
│       │       ├── list.html
│       │       └── modal.html
│       ├── index.js
│       ├── package.json
│       └── src
│           ├── dev.ts
│           ├── index.ts
│           └── runtime.ts
├── rollup.config.js
├── scripts
│   ├── bootstrap.js
│   ├── build.js
│   ├── checkYarn.js
│   ├── dev.js
│   ├── release.js
│   ├── setupJestEnv.ts
│   ├── utils.js
│   └── verifyCommit.js
├── test-dts
│   ├── README.md
│   ├── component.test-d.ts
│   ├── componentTypeExtensions.test-d.tsx
│   ├── defineComponent.test-d.tsx
│   ├── functionalComponent.test-d.tsx
│   ├── h.test-d.ts
│   ├── index.d.ts
│   ├── inject.test-d.ts
│   ├── reactivity.test-d.ts
│   ├── ref.test-d.ts
│   ├── setupHelpers.test-d.ts
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   ├── tsx.test-d.tsx
│   └── watch.test-d.ts
├── tsconfig.json
└── yarn.lock
```

## 生成目录树
只要通过```tree```命令，就可以生成目录树，具体操作如下
```bash
sudo apt-get update && sudo apt-get install tree

// 生成目录树
tree

// 过滤掉node_modules
tree -I "node_modules"

// 生成指定层级的目录tree
tree -L 2
```


该命令需要在```wsl```下执行，如果在cmd下执行会报参数过长，其他命令自行执行```tree --help```
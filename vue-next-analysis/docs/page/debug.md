## 步骤
- step zero

```bash
git clone https://github.com/vuejs/vue-next.git
```
- step one

```bash
npm install
```

- step two
执行完这个命令后，vue会在```packages/vue/dist```下生成一个```vue.global.js```

```bash
npm run dev --sourcemap
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
## 生成目录树

只要通过```tree```命令，就可以生成目录树，具体操作如下
```bash
sudo apt-get update && sudo apt-get install tree

# 生成目录树
tree

# 过滤掉node_modules
tree -I "node_modules"

# 生成指定层级的目录tree
tree -L 2
```


该命令需要在```wsl```下执行，如果在cmd下执行会报参数过长，其他命令自行执行```tree --help```

## vue-next源码结构

```bash
├── CHANGELOG.md
├── LICENSE
├── README.md
├── api-extractor.json
├── example # 我写的（用于debug）
│   └── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── packages
│   ├── compiler-core # 编译核心
│   ├── compiler-dom  # 编译dom
│   ├── compiler-sfc 
│   ├── compiler-ssr # 编译ssr
│   ├── global.d.ts
│   ├── reactivity # 响应式
│   ├── runtime-core # 运行核心
│   ├── runtime-dom # 运行时的 dom
│   ├── runtime-test # test
│   ├── server-renderer # ssr部分
│   ├── shared # dalao的工具库（dalao 喜欢的命名，cli也是这个名字）
│   ├── size-check
│   ├── template-explorer
│   └── vue # build后生成的vue目录
├── rollup.config.js
├── scripts # 一些脚本
│   ├── bootstrap.js # 自动生成package.json、readme.md
│   ├── build.js # 打包
│   ├── checkYarn.js # 校验yarn版本
│   ├── dev.js # 启动脚本
│   ├── release.js # 发布
│   ├── setupJestEnv.ts
│   ├── utils.js
│   └── verifyCommit.js # commit 校验
├── test-dts # 一些测试
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
```bash
├── CHANGELOG.md
├── LICENSE
├── README.md
├── api-extractor.json
├── example
│   ├── index.html
│   └── test.html
├── jest.config.js
├── package-lock.json
├── package.json
├── packages
│   ├── compiler-core # 编译核心
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js 
│   │   ├── package.json
│   │   └── src
│   │       ├── ast.ts #  AST 类型
│   │       ├── codegen.ts # 代码生成
│   │       ├── compat # 兼容
│   │       │   ├── compatConfig.ts
│   │       │   └── transformFilter.ts
│   │       ├── compile.ts # 编译入口
│   │       ├── errors.ts # 编译的错误代码
│   │       ├── index.ts
│   │       ├── options.ts # 编译选项
│   │       ├── parse.ts # AST 解析
│   │       ├── runtimeHelpers.ts # 代码生成期间的帮助函数 （这个会在转换期间就会生成对应的帮助函数，从而在生成阶段进行调用）
│   │       ├── transform.ts # 转换入口
│   │       ├── transforms
│   │       │   ├── hoistStatic.ts # 静态提升
│   │       │   ├── noopDirectiveTransform.ts
│   │       │   ├── transformElement.ts # 转换元素 (所有指令、文本都会在这一个阶段进行调用，并生成 patchFlag)
│   │       │   ├── transformExpression.ts # 转换表达式
│   │       │   ├── transformSlotOutlet.ts # 转换 slot
│   │       │   ├── transformText.ts # 转换 文本
│   │       │   ├── vBind.ts
│   │       │   ├── vFor.ts
│   │       │   ├── vIf.ts
│   │       │   ├── vModel.ts
│   │       │   ├── vOn.ts
│   │       │   ├── vOnce.ts
│   │       │   └── vSlot.ts
│   │       ├── utils.ts # 解析期间的一些工具函数
│   │       └── validateExpression.ts # 解析期间去校验 class 等一些表达式
│   ├── compiler-dom
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── decodeHtml.ts
│   │       ├── decodeHtmlBrowser.ts
│   │       ├── errors.ts
│   │       ├── index.ts
│   │       ├── namedChars.json
│   │       ├── parserOptions.ts
│   │       ├── runtimeHelpers.ts
│   │       └── transforms
│   │           ├── ignoreSideEffectTags.ts
│   │           ├── stringifyStatic.ts
│   │           ├── transformStyle.ts
│   │           ├── vHtml.ts
│   │           ├── vModel.ts
│   │           ├── vOn.ts
│   │           ├── vShow.ts
│   │           ├── vText.ts
│   │           └── warnTransitionChildren.ts
│   ├── compiler-sfc # SFC 新功能 没看过，所以就不标注了
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── compileScript.ts
│   │       ├── compileStyle.ts
│   │       ├── compileTemplate.ts
│   │       ├── cssVars.ts
│   │       ├── index.ts
│   │       ├── parse.ts
│   │       ├── rewriteDefault.ts
│   │       ├── shims.d.ts
│   │       ├── stylePluginScoped.ts
│   │       ├── stylePluginTrim.ts
│   │       ├── stylePreprocessors.ts
│   │       ├── templateTransformAssetUrl.ts
│   │       ├── templateTransformSrcset.ts
│   │       ├── templateUtils.ts
│   │       └── warn.ts
│   ├── compiler-ssr  # SSR 服务端渲染 没看过，所以就不标注了
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── errors.ts
│   │       ├── index.ts
│   │       ├── runtimeHelpers.ts
│   │       ├── ssrCodegenTransform.ts
│   │       └── transforms
│   │           ├── ssrInjectCssVars.ts
│   │           ├── ssrInjectFallthroughAttrs.ts
│   │           ├── ssrTransformComponent.ts
│   │           ├── ssrTransformElement.ts
│   │           ├── ssrTransformSlotOutlet.ts
│   │           ├── ssrTransformSuspense.ts
│   │           ├── ssrTransformTeleport.ts
│   │           ├── ssrTransformTransitionGroup.ts
│   │           ├── ssrVFor.ts
│   │           ├── ssrVIf.ts
│   │           ├── ssrVModel.ts
│   │           └── ssrVShow.ts
│   ├── global.d.ts
│   ├── reactivity # 响应式
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── baseHandlers.ts
│   │       ├── collectionHandlers.ts
│   │       ├── computed.ts
│   │       ├── effect.ts
│   │       ├── index.ts
│   │       ├── operations.ts
│   │       ├── reactive.ts
│   │       └── ref.ts
│   ├── runtime-core
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── apiAsyncComponent.ts
│   │   │   ├── apiComputed.ts # computed
│   │   │   ├── apiCreateApp.ts # createApp 实例
│   │   │   ├── apiDefineComponent.ts # defineComponent 组件
│   │   │   ├── apiInject.ts # provide inject
│   │   │   ├── apiLifecycle.ts # 生命周期
│   │   │   ├── apiSetupHelpers.ts
│   │   │   ├── apiWatch.ts # watch watchEffect
│   │   │   ├── compat # 兼容
│   │   │   │   ├── attrsFallthrough.ts
│   │   │   │   ├── compatConfig.ts
│   │   │   │   ├── component.ts
│   │   │   │   ├── customDirective.ts
│   │   │   │   ├── data.ts
│   │   │   │   ├── filter.ts
│   │   │   │   ├── global.ts
│   │   │   │   ├── globalConfig.ts
│   │   │   │   ├── instance.ts
│   │   │   │   ├── instanceChildren.ts
│   │   │   │   ├── instanceEventEmitter.ts
│   │   │   │   ├── instanceListeners.ts
│   │   │   │   ├── props.ts
│   │   │   │   ├── ref.ts
│   │   │   │   ├── renderFn.ts
│   │   │   │   ├── renderHelpers.ts
│   │   │   │   └── vModel.ts
│   │   │   ├── component.ts # 组件相关（创建组件、执行 setup 安装组件、渲染组件、更新组件）
│   │   │   ├── componentEmits.ts
│   │   │   ├── componentOptions.ts
│   │   │   ├── componentProps.ts
│   │   │   ├── componentPublicInstance.ts
│   │   │   ├── componentRenderContext.ts
│   │   │   ├── componentRenderUtils.ts
│   │   │   ├── componentSlots.ts
│   │   │   ├── components
│   │   │   │   ├── BaseTransition.ts
│   │   │   │   ├── KeepAlive.ts
│   │   │   │   ├── Suspense.ts
│   │   │   │   └── Teleport.ts
│   │   │   ├── customFormatter.ts
│   │   │   ├── devtools.ts
│   │   │   ├── directives.ts # 指令
│   │   │   ├── errorHandling.ts
│   │   │   ├── featureFlags.ts
│   │   │   ├── h.ts # 渲染函数
│   │   │   ├── helpers
│   │   │   │   ├── createSlots.ts
│   │   │   │   ├── renderList.ts
│   │   │   │   ├── renderSlot.ts
│   │   │   │   ├── resolveAssets.ts
│   │   │   │   ├── toHandlers.ts
│   │   │   │   ├── typeUtils.ts
│   │   │   │   └── useSsrContext.ts
│   │   │   ├── hmr.ts
│   │   │   ├── hydration.ts
│   │   │   ├── index.ts
│   │   │   ├── profiling.ts
│   │   │   ├── renderer.ts # 核心 (用于渲染、更新组件，并且  createApp 也是由该文件返回)
│   │   │   ├── scheduler.ts
│   │   │   ├── vnode.ts # vnode 相关
│   │   │   └── warning.ts
│   │   └── types
│   │       └── refBail.d.ts
│   ├── runtime-dom # 运行 dom 生成 vnode 后，会掉用这块的函数用来创建标签 节点、渲染你等
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── Transition.ts
│   │   │   │   └── TransitionGroup.ts
│   │   │   ├── directives
│   │   │   │   ├── vModel.ts
│   │   │   │   ├── vOn.ts
│   │   │   │   └── vShow.ts
│   │   │   ├── helpers
│   │   │   │   ├── useCssModule.ts
│   │   │   │   └── useCssVars.ts
│   │   │   ├── index.ts # createApp 的入口，Vue 会在这里获取挂在节点，创建createRenderer，并调用 createApp.mount 方法进行渲染
│   │   │   ├── modules
│   │   │   │   ├── attrs.ts
│   │   │   │   ├── class.ts
│   │   │   │   ├── events.ts
│   │   │   │   ├── props.ts
│   │   │   │   └── style.ts
│   │   │   ├── nodeOps.ts
│   │   │   └── patchProp.ts
│   │   └── types
│   │       ├── jsx.d.ts
│   │       └── refBail.d.ts
│   ├── runtime-test
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── index.ts
│   │       ├── nodeOps.ts
│   │       ├── patchProp.ts
│   │       ├── serialize.ts
│   │       └── triggerEvent.ts
│   ├── server-renderer # SSR
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── helpers
│   │       │   ├── ssrCompile.ts
│   │       │   ├── ssrInterpolate.ts
│   │       │   ├── ssrRenderAttrs.ts
│   │       │   ├── ssrRenderComponent.ts
│   │       │   ├── ssrRenderList.ts
│   │       │   ├── ssrRenderSlot.ts
│   │       │   ├── ssrRenderSuspense.ts
│   │       │   ├── ssrRenderTeleport.ts
│   │       │   └── ssrVModelHelpers.ts
│   │       ├── index.ts
│   │       ├── render.ts
│   │       ├── renderToStream.ts
│   │       └── renderToString.ts
│   ├── sfc-playground
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   │   └── logo.svg
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── Header.vue
│   │   │   ├── Message.vue
│   │   │   ├── SplitPane.vue
│   │   │   ├── codemirror
│   │   │   │   ├── CodeMirror.vue
│   │   │   │   ├── codemirror.css
│   │   │   │   └── codemirror.ts
│   │   │   ├── download
│   │   │   │   ├── download.ts
│   │   │   │   └── template
│   │   │   │       ├── README.md
│   │   │   │       ├── index.html
│   │   │   │       ├── main.js
│   │   │   │       ├── package.json
│   │   │   │       └── vite.config.js
│   │   │   ├── editor
│   │   │   │   ├── Editor.vue
│   │   │   │   └── FileSelector.vue
│   │   │   ├── main.ts
│   │   │   ├── output
│   │   │   │   ├── Output.vue
│   │   │   │   ├── Preview.vue
│   │   │   │   ├── PreviewProxy.ts
│   │   │   │   ├── moduleCompiler.ts
│   │   │   │   └── srcdoc.html
│   │   │   ├── sfcCompiler.ts
│   │   │   ├── store.ts
│   │   │   ├── utils.ts
│   │   │   └── vue-dev-proxy.ts
│   │   └── vite.config.ts
│   ├── shared # dalao 的工具函数
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── codeframe.ts
│   │       ├── domAttrConfig.ts
│   │       ├── domTagConfig.ts
│   │       ├── escapeHtml.ts
│   │       ├── globalsWhitelist.ts
│   │       ├── index.ts
│   │       ├── looseEqual.ts
│   │       ├── makeMap.ts
│   │       ├── normalizeProp.ts
│   │       ├── patchFlags.ts
│   │       ├── shapeFlags.ts
│   │       ├── slotFlags.ts
│   │       └── toDisplayString.ts
│   ├── size-check
│   │   ├── README.md
│   │   ├── package.json
│   │   └── src
│   │       └── index.ts
│   ├── template-explorer
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── local.html
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── options.ts
│   │   │   └── theme.ts
│   │   └── style.css
│   ├── vue
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── api-extractor.json
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── dev.ts
│   │       ├── index.ts
│   │       └── runtime.ts
│   └── vue-compat
│       ├── README.md
│       ├── api-extractor.json
│       ├── index.js
│       ├── package.json
│       └── src
│           ├── createCompatVue.ts
│           ├── dev.ts
│           ├── esm-index.ts
│           ├── esm-runtime.ts
│           ├── index.ts
│           └── runtime.ts
├── rollup.config.js
├── scripts
│   ├── bootstrap.js
│   ├── build.js
│   ├── checkYarn.js
│   ├── copy.js
│   ├── dev.js
│   ├── release.js
│   ├── setupJestEnv.ts
│   ├── utils.js
│   └── verifyCommit.js
├── tsconfig.json
└── yarn.lock
```


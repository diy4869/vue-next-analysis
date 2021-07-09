
## 介绍
在[ AST ](/compiler/ast) 章节中，简单的介绍了下AST，在编译这部分，将详细介绍模板是如何去生成```block tree```的。```template```到渲染需要经过以下步骤：

- 将```template```解析成AST
- 对AST实现转换
- 针对转换好的AST结构生成代码

<b>注</b>：由于这部分内容比较深入，相对前面来讲会比较硬核。本人也不算很懂。所以简单了解下就好。这章节的代码都在```@packages/compiler-core```和```@packages/compiler-dom```中，像```vue```中内置的一些指令将会在这个阶段进行处理，如```v-for、v-if、v-model```等。



## parserOptions 解析选项

先简单的来看下默认的一个解析选项，代码在```@packages/compiler-dom/src/parserOptions.ts```。

```ts
export const enum DOMNamespaces {
  HTML = Namespaces.HTML,
  SVG,
  MATH_ML
}

export const parserOptions: ParserOptions = {
  isVoidTag, // 是否空标签
  isNativeTag: tag => isHTMLTag(tag) || isSVGTag(tag), // 是否HTML自带标签
  isPreTag: tag => tag === 'pre',
  decodeEntities: __BROWSER__ ? decodeHtmlBrowser : decodeHtml,

  isBuiltInComponent: (tag: string): symbol | undefined => {
    if (isBuiltInType(tag, `Transition`)) {
      return TRANSITION
    } else if (isBuiltInType(tag, `TransitionGroup`)) {
      return TRANSITION_GROUP
    }
  }, // 是否内置组件

  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag: string, parent: ElementNode | undefined): DOMNamespaces {
    // 如果不存在parent.ns 说明是html
    let ns = parent ? parent.ns : DOMNamespaces.HTML

    if (parent && ns === DOMNamespaces.MATH_ML) {
      if (parent.tag === 'annotation-xml') {
        if (tag === 'svg') {
          return DOMNamespaces.SVG
        }
        if (
          parent.props.some(
            a =>
              a.type === NodeTypes.ATTRIBUTE &&
              a.name === 'encoding' &&
              a.value != null &&
              (a.value.content === 'text/html' ||
                a.value.content === 'application/xhtml+xml')
          )
        ) {
          ns = DOMNamespaces.HTML
        }
      } else if (
        /^m(?:[ions]|text)$/.test(parent.tag) &&
        tag !== 'mglyph' &&
        tag !== 'malignmark'
      ) {
        ns = DOMNamespaces.HTML
      }
    } else if (parent && ns === DOMNamespaces.SVG) {
      if (
        parent.tag === 'foreignObject' ||
        parent.tag === 'desc' ||
        parent.tag === 'title'
      ) {
        ns = DOMNamespaces.HTML
      }
    }

    if (ns === DOMNamespaces.HTML) {
      if (tag === 'svg') {
        // 如果tag是svg 说明是svg
        return DOMNamespaces.SVG
      }
      if (tag === 'math') {
        // 如果tag是math 说明是math ml
        return DOMNamespaces.MATH_ML
      }
    }
    return ns
  },

  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode({ tag, ns }: ElementNode): TextModes {
    if (ns === DOMNamespaces.HTML) {
      if (tag === 'textarea' || tag === 'title') {
        return TextModes.RCDATA
      }
      if (isRawTextContainer(tag)) {
        return TextModes.RAWTEXT
      }
    }
    return TextModes.DATA
  }
}
```

### compile

这一步主要把```template```和编译选项传递给了```baseCompile```，并对编译选项做了一个简单的合并，并把```baseCompile```的结果返回了出去。这部分代码在```@packages/compiler-dom/src/index.ts```
```ts
export function compile(
  template: string,
  options: CompilerOptions = {}
): CodegenResult {
  return baseCompile(
    template,
    extend({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...(options.nodeTransforms || [])
      ],
      directiveTransforms: extend(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: __BROWSER__ ? null : stringifyStatic
    })
  )
}
```

### baseCompile

本章核心，本章节将主要去对这一部分进行解释。代码在```packages/compiler-core/src/compile.ts```。
```ts
// we name it `baseCompile` so that higher order compilers like
// @vue/compiler-dom can export `compile` while re-exporting everything else.
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  const onError = options.onError || defaultOnError
  const isModuleMode = options.mode === 'module'
  /* istanbul ignore if */
  if (__BROWSER__) {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(ErrorCodes.X_PREFIX_ID_NOT_SUPPORTED))
    } else if (isModuleMode) {
      onError(createCompilerError(ErrorCodes.X_MODULE_MODE_NOT_SUPPORTED))
    }
  }

  const prefixIdentifiers =
    !__BROWSER__ && (options.prefixIdentifiers === true || isModuleMode)
  if (!prefixIdentifiers && options.cacheHandlers) {
    onError(createCompilerError(ErrorCodes.X_CACHE_HANDLER_NOT_SUPPORTED))
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(ErrorCodes.X_SCOPE_ID_NOT_SUPPORTED))
  }

  // 获取ast
  const ast = isString(template) ? baseParse(template, options) : template
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(
    prefixIdentifiers
  )
  // 转换
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

## 总结

```baseCompile```主要就对前面说到的步骤放到了一块进行处理，并把生成的代码返回了出去。下一部分来看```template```是如何解析成AST的。
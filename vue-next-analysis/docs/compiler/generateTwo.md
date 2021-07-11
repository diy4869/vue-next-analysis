```ts
export function generate(
  ast: RootNode,
  options: CodegenOptions & {
    onContextCreated?: (context: CodegenContext) => void
  } = {}
): CodegenResult {
  // enter render function
  const functionName = ssr ? `ssrRender` : `render` // 生成的函数名字
  const args = ssr ? ['_ctx', '_push', '_parent', '_attrs'] : ['_ctx', '_cache'] // 生成的函数参数
  if (!__BROWSER__ && options.bindingMetadata && !options.inline) {
    // binding optimization args
    args.push('$props', '$setup', '$data', '$options') // 添加参数
  }
  const signature =
    !__BROWSER__ && options.isTS
      ? args.map(arg => `${arg}: any`).join(',')
      : args.join(', ')

  if (genScopeId && !isSetupInlined) {
    // root-level _withId wrapping is no longer necessary after 3.0.8 and is
    // a noop, it's only kept so that code compiled with 3.0.8+ can run with
    // runtime < 3.0.8.
    // TODO: consider removing in 3.1
    push(`const ${functionName} = ${PURE_ANNOTATION}${WITH_ID}(`)
  }
  if (isSetupInlined || genScopeId) {
    push(`(${signature}) => {`)
  } else {
    // 生成 function render (...args) {}
    push(`function ${functionName}(${signature}) {`)
  }
  indent()

  if (useWithBlock) {
    // 通过with进行包装，这样template内就不需要去写this，就可以直接拿到setup的值
    push(`with (_ctx) {`) 
    indent()
    // function mode const declarations should be inside with block
    // also they should be renamed to avoid collision with user properties
    if (hasHelpers) {
      /**
       *  调用内置的帮助函数生成语句，一个生成的例子
       *  
          const { 
            toDisplayString as _toDisplayString, 
            createVNode as _createVNode, 
            vModelText as _vModelText, 
            withDirectives as _withDirectives, 
            resolveComponent as _resolveComponent, 
            renderList as _renderList, 
            Fragment as _Fragment, 
            openBlock as _openBlock, 
            createBlock as _createBlock, 
            Suspense as _Suspense, 
            withCtx as _withCtx, 
            Teleport as _Teleport 
          } = _Vue
      */
      push(
        `const { ${ast.helpers
          .map(s => `${helperNameMap[s]}: _${helperNameMap[s]}`)
          .join(', ')} } = _Vue`
      )
      push(`\n`)
      newline()
    }
  }

  //生成组件
  if (ast.components.length) {
    genAssets(ast.components, 'component', context)
    if (ast.directives.length || ast.temps > 0) {
      newline()
    }
  }
  // 生成指令
  if (ast.directives.length) {
    genAssets(ast.directives, 'directive', context)
    if (ast.temps > 0) {
      newline()
    }
  }

  if (ast.temps > 0) {
    push(`let `)
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`)
    }
  }
  if (ast.components.length || ast.directives.length || ast.temps) {
    push(`\n`)
    newline()
  }

  // 生成 VNode tree 表达式
  if (!ssr) {
    push(`return `)
  }

  // 调用在转换期间生成的coegenNode，传入genNode，并在内部通过createVnode进行生成
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context)
  } else {
    push(`null`)
  }

  if (useWithBlock) {
    deindent()
    push(`}`)
  }

  deindent()
  push(`}`)

  if (genScopeId && !isSetupInlined) {
    push(`)`)
  }

  // 返回生成的结果
  return {
    ast,
    code: context.code,
    preamble: isSetupInlined ? preambleContext.code : ``,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? (context.map as any).toJSON() : undefined
  }
}
```

## 总结

至此模板编译的过程就到此结束了，下一篇来看下生成的代码如何转换成```render function```。
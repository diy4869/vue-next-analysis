## generate 代码生成

```generate```依然接收一个AST，下面就来看下具体的实现过程。

```ts
export function generate(
  ast: RootNode,
  options: CodegenOptions & {
    onContextCreated?: (context: CodegenContext) => void
  } = {}
): CodegenResult {
  const context = createCodegenContext(ast, options)

  // ... 具体生成逻辑

  return {
    ast,
    code: context.code,
    preamble: isSetupInlined ? preambleContext.code : ``,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? (context.map as any).toJSON() : undefined
  }
}
```
```generate```依然创建了一个```context```去维护一个生成的对象。最终```generate```返回了一个对象，AST是模板经过转换后的AST，```code```则是最终生成的代码，```preamble```是通过```script inline```模式下生成的代码，而```map```即```source-map```则是用于```.vue```文件的一个```map```结构。

## createCodegenContext 创建代码生成上下文
```ts
export interface CodegenContext
  extends Omit<
      Required<CodegenOptions>,
      'bindingMetadata' | 'inline' | 'isTS'
    > {
  source: string // 源代码
  code: string // 最终生成的代码
  line: number
  column: number
  offset: number
  indentLevel: number
  pure: boolean
  map?: SourceMapGenerator
  helper(key: symbol): string // 生成期间需要调用的帮助函数
  push(code: string, node?: CodegenNode): void // 添加code
  indent(): void // 添加空格
  deindent(withoutNewLine?: boolean): void // 删除空行
  newline(): void // 添加新行
}
// 创建代码生成
function createCodegenContext(
  ast: RootNode,
  {
    mode = 'function',
    prefixIdentifiers = mode === 'module',
    sourceMap = false,
    filename = `template.vue.html`,
    scopeId = null,
    optimizeImports = false,
    runtimeGlobalName = `Vue`,
    runtimeModuleName = `vue`,
    ssr = false
  }: CodegenOptions
): CodegenContext {
  const context: CodegenContext = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssr,
    source: ast.loc.source,
    code: ``, // 最终需要生成的代码
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: undefined,
    helper(key) {
      return `_${helperNameMap[key]}`
    },
    push(code, node) {
      context.code += code
      if (!__BROWSER__ && context.map) {
        if (node) {
          let name
          if (node.type === NodeTypes.SIMPLE_EXPRESSION && !node.isStatic) {
            const content = node.content.replace(/^_ctx\./, '')
            if (content !== node.content && isSimpleIdentifier(content)) {
              name = content
            }
          }
          addMapping(node.loc.start, name)
        }
        advancePositionWithMutation(context, code)
        if (node && node.loc !== locStub) {
          addMapping(node.loc.end)
        }
      }
    },
    indent() {
      newline(++context.indentLevel)
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel
      } else {
        newline(--context.indentLevel)
      }
    },
    // 添加新行
    newline() {
      newline(context.indentLevel)
    }
  }

  function newline(n: number) {
    context.push('\n' + `  `.repeat(n))
  }

  function addMapping(loc: Position, name?: string) {
    context.map!.addMapping({
      name,
      source: context.filename,
      original: {
        line: loc.line,
        column: loc.column - 1 // source-map column is 0 based
      },
      generated: {
        line: context.line,
        column: context.column - 1
      }
    })
  }

  if (!__BROWSER__ && sourceMap) {
    // lazy require source-map implementation, only in non-browser builds
    context.map = new SourceMapGenerator()
    context.map!.setSourceContent(filename, context.source)
  }

  return context
}
```

## 具体实现
```ts
export function generate(
  ast: RootNode,
  options: CodegenOptions & {
    onContextCreated?: (context: CodegenContext) => void
  } = {}
): CodegenResult {
  const context = createCodegenContext(ast, options)
  if (options.onContextCreated) options.onContextCreated(context) 
  const {
    mode, // 这里为function 也可以是module
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context

  const hasHelpers = ast.helpers.length > 0 // true
  const useWithBlock = !prefixIdentifiers && mode !== 'module' // true 
  const genScopeId = !__BROWSER__ && scopeId != null && mode === 'module'
  const isSetupInlined = !__BROWSER__ && !!options.inline // false

  // preambles
  // in setup() inline mode, the preamble is generated in a sub context
  // and returned separately.
  const preambleContext = isSetupInlined
    ? createCodegenContext(ast, options)
    : context
  if (!__BROWSER__ && mode === 'module') {
    genModulePreamble(ast, preambleContext, genScopeId, isSetupInlined)
  } else {
    genFunctionPreamble(ast, preambleContext)
  }

  // ... 其他
}

```
由于这里```mode```为```function```，这里会去执行```genFunctionPreamble```

### genFunctionPreamble 生成函数方式
```ts

function genFunctionPreamble(ast: RootNode, context: CodegenContext) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName // Vue
  } = context
  const VueBinding =
    !__BROWSER__ && ssr
      ? `require(${JSON.stringify(runtimeModuleName)})`
      : runtimeGlobalName
  const aliasHelper = (s: symbol) => `${helperNameMap[s]}: _${helperNameMap[s]}`

  // 生成const的结构声明，默认将生成在顶部
  if (ast.helpers.length > 0) {
    if (!__BROWSER__ && prefixIdentifiers) {
      
      push(
        `const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinding}\n`
      )
    } else {
      // Vue最终生成的代码会被with包括，所以这里保存变量，避免冲突
      push(`const _Vue = ${VueBinding}\n`)
      // in "with" mode, helpers are declared inside the with block to avoid
      // has check cost, but hoists are lifted out of the function - we need
      // to provide the helper here.
      if (ast.hoists.length) {
        const staticHelpers = [
          CREATE_VNODE,
          CREATE_COMMENT,
          CREATE_TEXT,
          CREATE_STATIC
        ]
          .filter(helper => ast.helpers.includes(helper))
          .map(aliasHelper)
          .join(', ')
        push(`const { ${staticHelpers} } = _Vue\n`) 
      }
    }
  }
  // 为SSR渲染生成代码
  if (!__BROWSER__ && ast.ssrHelpers && ast.ssrHelpers.length) {
    // ssr guarantees prefixIdentifier: true
    push(
      `const { ${ast.ssrHelpers
        .map(aliasHelper)
        .join(', ')} } = require("@vue/server-renderer")\n`
    )
  }
  // 生成需要提升的代码
  genHoists(ast.hoists, context)
  newline()
  push(`return `)
}

// 至此生成的代码
const _Vue = Vue
const { createVNode: _createVNode } = _Vue

const _hoisted_1 = /*#__PURE__*/_createVNode("div", { id: "suspense" }, "supense组件", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("div", null, "telport组件", -1 /* HOISTED */)

return 
```


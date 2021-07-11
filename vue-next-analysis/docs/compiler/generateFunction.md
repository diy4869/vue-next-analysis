## genAssets 生成组件 指令 过滤器
```ts
function genAssets(
  assets: string[],
  type: 'component' | 'directive' | 'filter',
  { helper, push, newline }: CodegenContext
) {
  // 调用对应的函数进行解析
  const resolver = helper(
    __COMPAT__ && type === 'filter'
      ? RESOLVE_FILTER
      : type === 'component'
        ? RESOLVE_COMPONENT
        : RESOLVE_DIRECTIVE
  )
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i]
    // potential component implicit self-reference inferred from SFC filename
    const maybeSelfReference = id.endsWith('__self')
    if (maybeSelfReference) {
      id = id.slice(0, -6)
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${
        maybeSelfReference ? `, true` : ``
      })`
    )
    if (i < assets.length - 1) {
      newline()
    }
  }
}
```
## genVNodeCall 生成VNode
```ts
// 生成vnode 用于调用createVnode创建节点渲染
function genVNodeCall(node: VNodeCall, context: CodegenContext) {
  const { push, helper, pure } = context
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking
  } = node
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`)
  }
  // 如果是block push一个_openBlock(
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `)
  }
  if (pure) {
    push(PURE_ANNOTATION)
  }
  // 如果是block 就创建一个_createBlick 否则是createVnode
  push(helper(isBlock ? CREATE_BLOCK : CREATE_VNODE) + `(`, node)
  genNodeList(
    genNullableArgs([tag, props, children, patchFlag, dynamicProps]),
    context
  )
  push(`)`)
  if (isBlock) {
    push(`)`)
  }
  // 生成指令
  if (directives) {
    push(`, `)
    genNode(directives, context)
    push(`)`)
  }
}
```
## genNode 生成Node
```ts
function genNode(node: CodegenNode | symbol | string, context: CodegenContext) {
  if (isString(node)) {
    context.push(node)
    return
  }
  if (isSymbol(node)) {
    context.push(context.helper(node))
    return
  }
  switch (node.type) {
    case NodeTypes.ELEMENT: // 1 生成元素，然后调用genVnodeCall 进行生成
    case NodeTypes.IF: // 9
    case NodeTypes.FOR: // 11
      __DEV__ &&
        assert(
          node.codegenNode != null,
          `Codegen node is missing for element/if/for node. ` +
            `Apply appropriate transforms first.`
        )
      genNode(node.codegenNode!, context)
      break
    case NodeTypes.TEXT: // 2
      genText(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION: // 4 生成表达式
      genExpression(node, context)
      break
    case NodeTypes.INTERPOLATION: // 5 生成文本 例如：{{ count }}
      genInterpolation(node, context)
      break
    case NodeTypes.TEXT_CALL: // 12
      genNode(node.codegenNode, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION: // 8
      genCompoundExpression(node, context)
      break
    case NodeTypes.COMMENT: // 3
      genComment(node, context)
      break
    case NodeTypes.VNODE_CALL: // 13 具体生成元素的部分
      genVNodeCall(node, context)
      break

    case NodeTypes.JS_CALL_EXPRESSION: // 14
      genCallExpression(node, context)
      break
    case NodeTypes.JS_OBJECT_EXPRESSION: // 15 生成属性 如class style
      genObjectExpression(node, context)
      break
    case NodeTypes.JS_ARRAY_EXPRESSION: // 17
      genArrayExpression(node, context)
      break
    case NodeTypes.JS_FUNCTION_EXPRESSION: // 18 生成函数语句
      genFunctionExpression(node, context)
      break
    case NodeTypes.JS_CONDITIONAL_EXPRESSION: // 19
      genConditionalExpression(node, context)
      break
    case NodeTypes.JS_CACHE_EXPRESSION: // 20
      genCacheExpression(node, context)
      break

    // SSR only types
    case NodeTypes.JS_BLOCK_STATEMENT: // 21
      !__BROWSER__ && genNodeList(node.body, context, true, false)
      break
    case NodeTypes.JS_TEMPLATE_LITERAL: // 22
      !__BROWSER__ && genTemplateLiteral(node, context)
      break
    case NodeTypes.JS_IF_STATEMENT: // 23 生成if表达式
      !__BROWSER__ && genIfStatement(node, context)
      break
    case NodeTypes.JS_ASSIGNMENT_EXPRESSION: // 24
      !__BROWSER__ && genAssignmentExpression(node, context)
      break
    case NodeTypes.JS_SEQUENCE_EXPRESSION: // 25
      !__BROWSER__ && genSequenceExpression(node, context)
      break
    case NodeTypes.JS_RETURN_STATEMENT: // 26
      !__BROWSER__ && genReturnStatement(node, context)
      break

    /* istanbul ignore next */
    case NodeTypes.IF_BRANCH: // 10
      // noop
      break
    default:
      if (__DEV__) {
        assert(false, `unhandled codegen node type: ${(node as any).type}`)
        // make sure we exhaust all possible types
        const exhaustiveCheck: never = node
        return exhaustiveCheck
      }
  }
}
```

## genNodeList 生成NodeList
```ts
function genNodeList(
  nodes: (string | symbol | CodegenNode | TemplateChildNode[])[],
  context: CodegenContext,
  multilines: boolean = false,
  comma: boolean = true
) {
  const { push, newline } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isString(node)) {
      push(node)
    } else if (isArray(node)) {
      // 如果是数组就生成多个
      genNodeListAsArray(node, context)
    } else {
      // 生成一个
      genNode(node, context)
    }
    if (i < nodes.length - 1) {
      // 如果是多个，就添加一个，号，并在添加一行
      if (multilines) {
        comma && push(',')
        newline()
      } else {
        // 否则只添加,
        comma && push(', ')
      }
    }
  }
}
```
## genHoists 生成静态提升的节点

一个静态提升的json
```json
[
    {
        "type": 13,
        "tag": "\"div\"",
        "props": {
            "type": 15,
            "loc": {
                "start": {
                    "column": 13,
                    "line": 12,
                    "offset": 406
                },
                "end": {
                    "column": 47,
                    "line": 12,
                    "offset": 440
                },
                "source": "<div id=\"suspense\">supense组件</div>"
            },
            "properties": [
                {
                    "type": 16,
                    "loc": {
                        "source": "",
                        "start": {
                            "line": 1,
                            "column": 1,
                            "offset": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 1,
                            "offset": 0
                        }
                    },
                    "key": {
                        "type": 4,
                        "loc": {
                            "source": "id",
                            "start": {
                                "column": 18,
                                "line": 12,
                                "offset": 411
                            },
                            "end": {
                                "column": 20,
                                "line": 12,
                                "offset": 413
                            }
                        },
                        "content": "id",
                        "isStatic": true,
                        "constType": 3
                    },
                    "value": {
                        "type": 4,
                        "loc": {
                            "start": {
                                "column": 21,
                                "line": 12,
                                "offset": 414
                            },
                            "end": {
                                "column": 31,
                                "line": 12,
                                "offset": 424
                            },
                            "source": "\"suspense\""
                        },
                        "content": "suspense",
                        "isStatic": true,
                        "constType": 3
                    }
                }
            ]
        },
        "children": {
            "type": 2,
            "content": "supense组件",
            "loc": {
                "start": {
                    "column": 32,
                    "line": 12,
                    "offset": 425
                },
                "end": {
                    "column": 41,
                    "line": 12,
                    "offset": 434
                },
                "source": "supense组件"
            }
        },
        "patchFlag": "-1 /* HOISTED */",
        "isBlock": false,
        "disableTracking": false,
        "loc": {
            "start": {
                "column": 13,
                "line": 12,
                "offset": 406
            },
            "end": {
                "column": 47,
                "line": 12,
                "offset": 440
            },
            "source": "<div id=\"suspense\">supense组件</div>"
        }
    },
    {
        "type": 13,
        "tag": "\"div\"",
        "children": {
            "type": 2,
            "content": "telport组件",
            "loc": {
                "start": {
                    "column": 18,
                    "line": 15,
                    "offset": 517
                },
                "end": {
                    "column": 27,
                    "line": 15,
                    "offset": 526
                },
                "source": "telport组件"
            }
        },
        "patchFlag": "-1 /* HOISTED */",
        "isBlock": false,
        "disableTracking": false,
        "loc": {
            "start": {
                "column": 13,
                "line": 15,
                "offset": 512
            },
            "end": {
                "column": 33,
                "line": 15,
                "offset": 532
            },
            "source": "<div>telport组件</div>"
        }
    }
]
```
具体实现：
```ts
function genHoists(hoists: (JSChildNode | null)[], context: CodegenContext) {
  if (!hoists.length) {
    return
  }
  context.pure = true
  const { push, newline, helper, scopeId, mode } = context
  const genScopeId = !__BROWSER__ && scopeId != null && mode !== 'function'
  newline() // 添加新行

  // push scope Id before initializing hoisted vnodes so that these vnodes
  // get the proper scopeId as well.
  if (genScopeId) {
    push(`${helper(PUSH_SCOPE_ID)}("${scopeId}")`)
    newline()
  }

  hoists.forEach((exp, i) => {
    if (exp) {
      push(`const _hoisted_${i + 1} = `)
      genNode(exp, context)
      newline()
    }
  })

  if (genScopeId) {
    push(`${helper(POP_SCOPE_ID)}()`)
    newline()
  }
  context.pure = false
}
```
## traverseNode 转换节点
上一篇对```createTransformContext```做了简单说明，这一篇来针对节点是如何转换的，做一个大概的说明，常用的指令也是在这一过程进行转换的。

```ts
export function traverseNode(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  context.currentNode = node
  /**
   * 应用转换函数，vue-next会对每个标签解析好的AST，依次调用对应的转换函数
   * 部分函数在调用的时候会返回一个新的函数，该函数将等待所有转换完成后，重新执行 
   */
  const { nodeTransforms } = context
  const exitFns = []
  /**
   * 内置的一些转换函数
   * 
   * 0 transformOnce
   * 1 createStructuralDirectiveTransform
   * 2 createStructuralDirectiveTransform
   * 3 transformExpression
   * 4 transformSlotOutlet
   * 5 transformElement
   * 6 trackSlotScopes
   * 7 transformText
   * 8 ignoreSideEffectTags
   * 9 transformStyle
   * 10 warnTransitionChildren
   * 
   * on for if model bind等会在transformElement进行处理
   */
  for (let i = 0; i < nodeTransforms.length; i++) {
    // 获取每次执行完成后所返回的一个函数，可能为null
    const onExit = nodeTransforms[i](node, context) 

    // 如果返回了一个新函数，就将其添加到数组内，用于在所有转换函数执行完成后执行
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit)
      } else {
        exitFns.push(onExit)
      }
    }
    if (!context.currentNode) {
      // node was removed 节点被删除
      return
    } else {
      // node may have been replaced 节点可能被替换
      node = context.currentNode
    }
  }

  switch (node.type) {
    case NodeTypes.COMMENT: // 3
      if (!context.ssr) {
        // inject import for the Comment symbol, which is needed for creating
        // comment nodes with `createVNode`
        context.helper(CREATE_COMMENT)
      }
      break
    case NodeTypes.INTERPOLATION: // 5
      // no need to traverse, but we need to inject toString helper
      // 不需要遍历 但是需要tostring
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING)
      }
      break

    // for container types, further traverse downwards
    // 针对v-if 将继续执行转换过程
    case NodeTypes.IF: // 9
      for (let i = 0; i < node.branches.length; i++) {
        traverseNode(node.branches[i], context)
      }
      break
    case NodeTypes.IF_BRANCH:
    case NodeTypes.FOR:
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT: // 如果是 0 就继续执行转换
      traverseChildren(node, context)
      break
  }

  // exit transforms  退出之前，对未转换的AST节点执行转换
  context.currentNode = node // 设置当前执行的AST节点
  let i = exitFns.length
  /**
   * 对上一步返回的函数进行执行，这里是为了确保执行顺序，所以是倒序执行的
   * 
   * 确保最后一步执行的时候，transformElement已经被执行，是因为指令是在transformElement进行处理的
   * */ 
  while (i--) {
    exitFns[i]()
  }
}
```

## traverseChildren 转换子节点数组

```ts
export function traverseChildren(
  parent: ParentNode,
  context: TransformContext
) {
  let i = 0
  const nodeRemoved = () => {
    i--
  }
  for (; i < parent.children.length; i++) { // 对子节点数组进行遍历
    const child = parent.children[i]
    if (isString(child)) continue // 是否为string
    context.parent = parent // 设置当前转换的父节点
    context.childIndex = i // 设置当前转换的index
    context.onNodeRemoved = nodeRemoved
    traverseNode(child, context) // 转换节点
  }
}

```

## 总结
整体的转换流程就是这样，由于转换的内容较多（懒，且能力有限），将不做具体说明，这里只针对```transformElement```做一个大概说明即可。
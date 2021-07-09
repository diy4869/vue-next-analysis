## 创建跟节点代码生成

```ts

function createRootCodegen(root: RootNode, context: TransformContext) {
  const { helper, removeHelper } = context
  const { children } = root
  if (children.length === 1) {
    const child = children[0]
    // 如果单个子元素是element则转换成块
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      // single element root is never hoisted so codegenNode will never be
      // SimpleExpressionNode
      const codegenNode = child.codegenNode
      if (codegenNode.type === NodeTypes.VNODE_CALL) {
        if (!codegenNode.isBlock) {
          removeHelper(CREATE_VNODE)
          codegenNode.isBlock = true
          helper(OPEN_BLOCK)
          helper(CREATE_BLOCK)
        }
      }
      root.codegenNode = codegenNode
    } else {
      // - single <slot/>, IfNode, ForNode: already blocks.
      // - single text node: always patched.
      // root codegen falls through via genNode()
      root.codegenNode = child
    }
  } else if (children.length > 1) {
    // root has multiple nodes - return a fragment block. 
    // 当根节点有多个节点时，返回一个fragment
    let patchFlag = PatchFlags.STABLE_FRAGMENT
    let patchFlagText = PatchFlagNames[PatchFlags.STABLE_FRAGMENT]
    // check if the fragment actually contains a single valid child with
    // the rest being comments
    
    // 检查Fragement内是否包含一个子元素，并且不是注释
    if (
      __DEV__ &&
      children.filter(c => c.type !== NodeTypes.COMMENT).length === 1
    ) {
      patchFlag |= PatchFlags.DEV_ROOT_FRAGMENT
      patchFlagText += `, ${PatchFlagNames[PatchFlags.DEV_ROOT_FRAGMENT]}`
    }
    root.codegenNode = createVNodeCall( // 调用VNodeCall 生成vnode
      context,
      helper(FRAGMENT),
      undefined,
      root.children,
      patchFlag + (__DEV__ ? ` /* ${patchFlagText} */` : ``),
      undefined,
      undefined,
      true
    )
  } else {
    // no children = noop. codegen will return null.
  }
}
```
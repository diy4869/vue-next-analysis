## 解析标签

这部分来说是如何解析标签的，可以看到```vue-next```对```parseTag```去做了一个重载。这个函数整体上不难，相对还是比较简单的。 

```ts
function parseTag(
  context: ParserContext,
  type: TagType.Start,
  parent: ElementNode | undefined
): ElementNode

function parseTag(
  context: ParserContext,
  type: TagType.End,
  parent: ElementNode | undefined
): void

function parseTag(
  context: ParserContext,
  type: TagType,
  parent: ElementNode | undefined
): ElementNode | undefined {
  __TEST__ && assert(/^<\/?[a-z]/i.test(context.source))
  __TEST__ &&
    assert(
      type === (startsWith(context.source, '</') ? TagType.End : TagType.Start)
    )

  // Tag open.
  // 获取上次解析位置
  const start = getCursor(context)
  // 解析标签
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)!
  const tag = match[1]
  const ns = context.options.getNamespace(tag, parent)

  advanceBy(context, match[0].length) // 前进
  advanceSpaces(context)

  // save current state in case we need to re-parse attributes with v-pre
  const cursor = getCursor(context)
  const currentSource = context.source

  // Attributes.
  let props = parseAttributes(context, type)

  // check <pre> tag
  if (context.options.isPreTag(tag)) {
    context.inPre = true
  }

  // check v-pre
  if (
    type === TagType.Start &&
    !context.inVPre &&
    props.some(p => p.type === NodeTypes.DIRECTIVE && p.name === 'pre')
  ) {
    context.inVPre = true
    // reset context
    extend(context, cursor)
    context.source = currentSource
    // re-parse attrs and filter out v-pre itself
    props = parseAttributes(context, type).filter(p => p.name !== 'v-pre')
  }

  // Tag close.
  let isSelfClosing = false
  if (context.source.length === 0) {
    emitError(context, ErrorCodes.EOF_IN_TAG)
  } else {
    isSelfClosing = startsWith(context.source, '/>')
    if (type === TagType.End && isSelfClosing) {
      emitError(context, ErrorCodes.END_TAG_WITH_TRAILING_SOLIDUS)
    }
    // 前进，如果是单标签，前进2位 否则前进1位
    advanceBy(context, isSelfClosing ? 2 : 1)
  }

  // 如果是结束标签 就直接返回
  if (type === TagType.End) {
    return
  }

  // ... v2兼容处理

  let tagType = ElementTypes.ELEMENT
  const options = context.options
  // 如果不是v-pre 并且 不是自定义标签
  if (!context.inVPre && !options.isCustomElement(tag)) {
    // 判断是否是v-is
    const hasVIs = props.some(p => {
      if (p.name !== 'is') return
      // v-is="xxx" (TODO: deprecate)
      if (p.type === NodeTypes.DIRECTIVE) {
        return true
      }
      // is="vue:xxx"
      if (p.value && p.value.content.startsWith('vue:')) {
        return true
      }
      // in compat mode, any is usage is considered a component
      if (
        __COMPAT__ &&
        checkCompatEnabled(
          CompilerDeprecationTypes.COMPILER_IS_ON_ELEMENT,
          context,
          p.loc
        )
      ) {
        return true
      }
    })
    // 如果是原生标签 并且不是v-is
    if (options.isNativeTag && !hasVIs) {
      // 如果不是原生标签的话，说明是组件 html的话为0
      if (!options.isNativeTag(tag)) tagType = ElementTypes.COMPONENT // 1
    } else if (
      hasVIs || // 是否有v-is
      isCoreComponent(tag) || // 是否内置组件
      (options.isBuiltInComponent && options.isBuiltInComponent(tag)) ||
      /^[A-Z]/.test(tag) ||
      tag === 'component'
    ) {
      tagType = ElementTypes.COMPONENT
    }
    // 如果是slot
    if (tag === 'slot') {
      tagType = ElementTypes.SLOT // 2
    } else if (
      tag === 'template' &&
      props.some(
        p =>
          p.type === NodeTypes.DIRECTIVE && isSpecialTemplateDirective(p.name)
      )
    ) {
      // 如果是template 为3
      tagType = ElementTypes.TEMPLATE
    }
  }

  return {
    type: NodeTypes.ELEMENT,
    ns,
    tag,
    tagType,
    props,
    isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: undefined // to be created during transform phase 在transform阶段创建
  }
}
```
##  总结

标签的话，就大概是这个样子了，下一节来说解析属性，属性包括```props```、HTML自带属性、指令等。
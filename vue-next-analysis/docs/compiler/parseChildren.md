## 解析子元素

其实这部分更建议自己断点调试去看，相对于看文来说，你也不一定能懂。官方对很多都做了兼容，当你看过这部分后，你也就大概懂了怎么去```parse```了。看文和自己去调试毕竟是2回事，反正已经看到这了，那就继续看吧。这部分源码在```packages/runtime-core/src/parse.ts```，基本整个解析环节都在这个文件。

解析的步骤：

1. 判断是否结束标签
2. 获取```template```内容，这个```context.source```指的是剩余未解析的内容
3. 初始化```node```数组
4. 判断```mode```是否为文本，或者是```textarea```
5. 其他

其实这块我也不知道该怎么表达，看看注释就好，其实对于解析这块，学过编译原理应该知道有个词叫词法分析和语法分析，这部分其实也就是在做这块。通过[有限状态机](https://baike.baidu.com/item/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E8%87%AA%E5%8A%A8%E6%9C%BA?fromtitle=%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA&fromid=2081914)的形式，对```template```进行解析。所谓的解析就是对整个```template```字符串进行循环解析并校验语法。

一个大概的流程：

- 初始化一个数组
- 解析对应的语法
- 解析完成后去添加到数组内，并维护一个对象，该对象内有每次解析的位置，剩余未解析的内容。
- 然后不断循环整个字符串校验
- 最终拿到的就是一个解析好的一个数组。


```ts

export const enum TextModes {
  //          | Elements | Entities | End sign              | Inside of
  DATA, //    | ✔        | ✔        | End tags of ancestors | 普通文本
  RCDATA, //  | ✘        | ✔        | End tag of the parent | <textarea>
  RAWTEXT, // | ✘        | ✘        | End tag of the parent | <style>,<script>
  CDATA,
  ATTRIBUTE_VALUE
}

function parseChildren(
  context: ParserContext,
  mode: TextModes,
  ancestors: ElementNode[] // 已经解析的一个内容
): TemplateChildNode[] {
  const parent = last(ancestors)
  const ns = parent ? parent.ns : Namespaces.HTML // 0
  const nodes: TemplateChildNode[] = []

  while (!isEnd(context, mode, ancestors)) {
    // 测试
    __TEST__ && assert(context.source.length > 0)
    // 获取模板
    const s = context.source
    // 创建node
    let node: TemplateChildNode | TemplateChildNode[] | undefined = undefined

    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
        node = parseInterpolation(context, mode)
      } else if (mode === TextModes.DATA && s[0] === '<') {
        // https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state
        if (s.length === 1) {
          emitError(context, ErrorCodes.EOF_BEFORE_TAG_NAME, 1)
        } else if (s[1] === '!') {
          // https://html.spec.whatwg.org/multipage/parsing.html#markup-declaration-open-state
          // 以 <!-- 开头，当做注释解析
          if (startsWith(s, '<!--')) {
            node = parseComment(context)
          } else if (startsWith(s, '<!DOCTYPE')) {
            // Ignore DOCTYPE by a limitation.
            node = parseBogusComment(context)
          } else if (startsWith(s, '<![CDATA[')) {
            if (ns !== Namespaces.HTML) {
              node = parseCDATA(context, ancestors)
            } else {
              emitError(context, ErrorCodes.CDATA_IN_HTML_CONTENT)
              node = parseBogusComment(context)
            }
          } else {
            emitError(context, ErrorCodes.INCORRECTLY_OPENED_COMMENT)
            node = parseBogusComment(context)
          }
        } else if (s[1] === '/') {
          // https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state
          if (s.length === 2) {
            emitError(context, ErrorCodes.EOF_BEFORE_TAG_NAME, 2)
          } else if (s[2] === '>') {
            emitError(context, ErrorCodes.MISSING_END_TAG_NAME, 2) // 缺少结束标记名称
            advanceBy(context, 3)
            continue
          } else if (/[a-z]/i.test(s[2])) {
            emitError(context, ErrorCodes.X_INVALID_END_TAG) // 无效的结束标签
            parseTag(context, TagType.End, parent) // 解析标签
            continue
          } else {
            emitError(
              context,
              ErrorCodes.INVALID_FIRST_CHARACTER_OF_TAG_NAME, // 标签名称的第一个字符无效
              2
            )
            node = parseBogusComment(context)
          }
        } else if (/[a-z]/i.test(s[1])) {
          // 说明是element
          node = parseElement(context, ancestors)
        } else if (s[1] === '?') {
          emitError(
            context,
            ErrorCodes.UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME,
            1
          )
          node = parseBogusComment(context)
        } else {
          emitError(context, ErrorCodes.INVALID_FIRST_CHARACTER_OF_TAG_NAME, 1)
        }
      }
    }
    // node不存在
    if (!node) {
      node = parseText(context, mode)
    }

    // 是数组，循环并添加
    if (isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        pushNode(nodes, node[i])
      }
    } else {
      // 添加节点
      pushNode(nodes, node)
    }
  }

  // ...
}
```
上面这部分执行完成后一个```AST```结构就算有了，而下面这段只是把解析到的空格做了一个删除处理。

```ts
function parseChildren(
  context: ParserContext,
  mode: TextModes, // 默认为0
  ancestors: ElementNode[]
): TemplateChildNode[] {

  // ... 其实就是上面的那部分代码

  // Whitespace handling strategy like v2
  let removedWhitespace = false // 是否移除空格
  if (mode !== TextModes.RAWTEXT && mode !== TextModes.RCDATA) {
    const preserve = context.options.whitespace === 'preserve'
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!context.inPre && node.type === NodeTypes.TEXT) {
        if (!/[^\t\r\n\f ]/.test(node.content)) {
          const prev = nodes[i - 1]
          const next = nodes[i + 1]
          // Remove if:
          // - the whitespace is the first or last node, or: 如果空格是第一个或者最后一个节点
          // - (condense mode) the whitespace is adjacent to a comment, or: 或者空格和注释相邻
          // - (condense mode) the whitespace is between two elements AND contains newline 或者空格在2个元素之间包含换行符
          if (
            !prev ||
            !next ||
            (!preserve &&
              (prev.type === NodeTypes.COMMENT || // 3
              next.type === NodeTypes.COMMENT || // 3
                (prev.type === NodeTypes.ELEMENT && // 1
                next.type === NodeTypes.ELEMENT && // 1
                  /[\r\n]/.test(node.content))))
          ) {
            removedWhitespace = true // 移除空格
            nodes[i] = null as any
          } else {
            // Otherwise, the whitespace is condensed into a single space
            // 否则空格将压缩为1个空格
            node.content = ' '
          }
        } else if (!preserve) {
          // in condense mode, consecutive whitespaces in text are condensed
          // down to a single space.
          node.content = node.content.replace(/[\t\r\n\f ]+/g, ' ')
        }
      }
      // also remove comment nodes in prod by default
      if (
        !__DEV__ &&
        node.type === NodeTypes.COMMENT &&
        !context.options.comments
      ) {
        removedWhitespace = true
        nodes[i] = null as any
      }
    }
    if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
      // remove leading newline per html spec
      // https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element
      const first = nodes[0]
      if (first && first.type === NodeTypes.TEXT) {
        first.content = first.content.replace(/^\r?\n/, '')
      }
    }
  }
  // 为true就移除空格
  return removedWhitespace ? nodes.filter(Boolean) : nodes
}
```

## 总结

上面就是一个大概的解析流程，其实有几个函数可以去关注下。

- getCursor 当前解析的位置
- advanceBy 每次解析，需要前进多少步
- getSelection 解析的一个位置信息
- getNewPosition 获取新的位置

基本每次解析都是围绕这一个函数去实现的，下一节去具体说明下。
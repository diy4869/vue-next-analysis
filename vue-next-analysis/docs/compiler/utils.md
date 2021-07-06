## advancePositionWithMutation
解析的时候换行的一个函数
```ts
// advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser
export function advancePositionWithMutation(
  pos: Position,
  source: string,
  numberOfCharacters: number = source.length
): Position {
  let linesCount = 0
  let lastNewLinePos = -1
  for (let i = 0; i < numberOfCharacters; i++) {
    // 如果需要换行
    if (source.charCodeAt(i) === 10 /* newline char code */) {
      linesCount++
      lastNewLinePos = i
    }
  }

  pos.offset += numberOfCharacters // 解析的位置++
  pos.line += linesCount  // 解析的行数++
  pos.column =
    lastNewLinePos === -1
      ? pos.column + numberOfCharacters
      : numberOfCharacters - lastNewLinePos // 拿到列数

  return pos
}
```
## getCursor
获取当前的一个解析位置
```ts
// 获取每次解析的位置
function getCursor(context: ParserContext): Position {
  const { column, line, offset } = context
  return { column, line, offset }
}
```

## getSelection

获取当前已解析的相关信息

```ts
function getSelection(
  context: ParserContext,
  start: Position,
  end?: Position
): SourceLocation {
  end = end || getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset) // 拿到文本内容
  }
}
```
## advanceBy

向前前进多少位
```ts
/**
 * @param context 解析的上下文
 * @param numberOfCharacters 需要前进的位数
 */
function advanceBy(context: ParserContext, numberOfCharacters: number): void {
  // 获取解析的template
  const { source } = context
  __TEST__ && assert(numberOfCharacters <= source.length)
  advancePositionWithMutation(context, source, numberOfCharacters)
  // 截取还未解析的template
  context.source = source.slice(numberOfCharacters)
}
```

## getNewPosition
获取一个新的位置
```ts
function getNewPosition(
  context: ParserContext,
  start: Position,
  numberOfCharacters: number
): Position {
  return advancePositionWithClone(
    start,
    context.originalSource.slice(start.offset, numberOfCharacters),
    numberOfCharacters
  )
}
```

## advancePositionWithClone
```ts
export function advancePositionWithClone(
  pos: Position,
  source: string,
  numberOfCharacters: number = source.length
): Position {
  return advancePositionWithMutation(
    extend({}, pos),
    source,
    numberOfCharacters
  )
}
```
## 总结

这些是```vue-next```在```parse```的过程中一些重要的函数，就不特别说明了，注释基本都有。
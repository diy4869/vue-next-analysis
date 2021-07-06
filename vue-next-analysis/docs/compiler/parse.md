## parse 解析
这部分内容比较多，会分多个小节来说。

```baseParse```主要做了下面2件事：
- 创建解析上下文
- 返回被解析的结果

```ts
export function createRoot(
  children: TemplateChildNode[],
  loc = locStub
): RootNode {
  return {
    type: NodeTypes.ROOT,
    children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc
  }
}

export function baseParse(
  content: string,
  options: ParserOptions = {}
): RootNode {
  // 创建解析上下文
  const context = createParserContext(content, options)
  const start = getCursor(context)
  return createRoot(
    parseChildren(context, TextModes.DATA, []), // 解析的子元素
    getSelection(context, start) // 每次解析的位置
  )
}

type MergedParserOptions = Omit<Required<ParserOptions>, OptionalOptions> &
  Pick<ParserOptions, OptionalOptions>
// 默认的解析选项
export const defaultParserOptions: MergedParserOptions = {
  delimiters: [`{{`, `}}`], // vue中模板的语法
  getNamespace: () => Namespaces.HTML,
  getTextMode: () => TextModes.DATA,
  isVoidTag: NO,
  isPreTag: NO,
  isCustomElement: NO,
  decodeEntities: (rawText: string): string =>
    rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: false
}

// 创建解析上下文
function createParserContext(
  content: string,
  rawOptions: ParserOptions
): ParserContext {
  // 合并默认解析选项
  const options = extend({}, defaultParserOptions)
  for (const key in rawOptions) {
    // @ts-ignore
    options[key] = rawOptions[key] || defaultParserOptions[key]
  }
  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
    onWarn: options.onWarn
  }
}
```

## 总结

这部分代码在```packages/compiler-core/src/parse.ts```。

其实也没啥可说的，简单看下最后解析出来的内容吧，以下内容有适量增删。具体后面再说。

```json
{
  "type": 0,
  "children": [
      {
          "type": 1,
          "ns": 0, // 是否HTML
          "tag": "div", // 标签名
          "tagType": 0,
          "props": [
            {
                "type": 7,
                "name": "bind", // 指令类型
                "exp": { // 表达式
                    "type": 4, 
                    "content": "count % 2 === 0 ? 'red' : 'blue'", // 指令内容
                    "isStatic": false, // 是否静态
                    "constType": 0,
                    "loc": { // 解析的位置
                        "start": { 
                            "column": 23, // 开始列数
                            "line": 2, // 开始的行
                            "offset": 23 // 偏移量
                        },
                        "end": {
                            "column": 55, // 结束的列数
                            "line": 2, // 结束行
                            "offset": 55 // 结束偏移
                        },
                        "source": "count % 2 === 0 ? 'red' : 'blue'"
                    }
                },
                "arg": {
                    "type": 4,
                    "content": "class",
                    "isStatic": true,
                    "constType": 3,
                    "loc": {
                        "start": {
                            "column": 16,
                            "line": 2,
                            "offset": 16
                        },
                        "end": {
                            "column": 21,
                            "line": 2,
                            "offset": 21
                        },
                        "source": "class"
                    }
                },
                "modifiers": [], // 指令数组
                "loc": {
                    "start": {
                        "column": 15,
                        "line": 2,
                        "offset": 15
                    },
                    "end": {
                        "column": 56,
                        "line": 2,
                        "offset": 56
                    },
                    "source": ":class=\"count % 2 === 0 ? 'red' : 'blue'\""
                }
            },
            {
                "type": 7,
                "name": "bind",
                "exp": {
                    "type": 4,
                    "content": "'font-size: 14px; font-weight: bold;'",
                    "isStatic": false,
                    "constType": 0,
                    "loc": {
                        "start": {
                            "column": 65,
                            "line": 2,
                            "offset": 65
                        },
                        "end": {
                            "column": 102,
                            "line": 2,
                            "offset": 102
                        },
                        "source": "'font-size: 14px; font-weight: bold;'"
                    }
                },
                "arg": {
                    "type": 4,
                    "content": "style",
                    "isStatic": true,
                    "constType": 3,
                    "loc": {
                        "start": {
                            "column": 58,
                            "line": 2,
                            "offset": 58
                        },
                        "end": {
                            "column": 63,
                            "line": 2,
                            "offset": 63
                        },
                        "source": "style"
                    }
                },
                "modifiers": [],
                "loc": {
                    "start": {
                        "column": 57,
                        "line": 2,
                        "offset": 57
                    },
                    "end": {
                        "column": 103,
                        "line": 2,
                        "offset": 103
                    },
                    "source": ":style=\"'font-size: 14px; font-weight: bold;'\""
                }
            }
        ],
          "isSelfClosing": false, // 是否单标签
          "children": [
              {
                  "type": 2,
                  "content": "这是子组件",
                  "loc": {
                      "start": {
                          "column": 18,
                          "line": 2,
                          "offset": 18
                      },
                      "end": {
                          "column": 23,
                          "line": 2,
                          "offset": 23
                      },
                      "source": "这是子组件"
                  }
              }
          ],
          "loc": {
              "start": {
                  "column": 13,
                  "line": 2,
                  "offset": 13
              },
              "end": {
                  "column": 29,
                  "line": 2,
                  "offset": 29
              },
              "source": "<div>这是子组件</div>"
          },
          "codegenNode": {
              "type": 4,
              "loc": {
                  "start": {
                      "column": 13,
                      "line": 2,
                      "offset": 13
                  },
                  "end": {
                      "column": 29,
                      "line": 2,
                      "offset": 29
                  },
                  "source": "<div>这是子组件</div>"
              },
              "content": "_hoisted_1",
              "isStatic": false,
              "constType": 2,
              "hoisted": {
                  "type": 13,
                  "tag": "\"div\"",
                  "children": {
                      "type": 2,
                      "content": "这是子组件",
                      "loc": {
                          "start": {
                              "column": 18,
                              "line": 2,
                              "offset": 18
                          },
                          "end": {
                              "column": 23,
                              "line": 2,
                              "offset": 23
                          },
                          "source": "这是子组件"
                      }
                  },
                  "patchFlag": "-1 /* HOISTED */",
                  "isBlock": false,
                  "disableTracking": false,
                  "loc": {
                      "start": {
                          "column": 13,
                          "line": 2,
                          "offset": 13
                      },
                      "end": {
                          "column": 29,
                          "line": 2,
                          "offset": 29
                      },
                      "source": "<div>这是子组件</div>"
                  }
              }
          }
      }
  ],
  "helpers": [
    Symbol(createVNode)
    Symbol(toDisplayString)
    Symbol(Fragment)
    Symbol(openBlock)
    Symbol(createBlock)
  ],
  "components": ["test"], // 注册的组件
  "directives": [], // 注册的指令
  "hoists": [
      {
          "type": 13,
          "tag": "\"div\"",
          "children": {
              "type": 2,
              "content": "这是子组件",
              "loc": {
                  "start": {
                      "column": 18,
                      "line": 2,
                      "offset": 18
                  },
                  "end": {
                      "column": 23,
                      "line": 2,
                      "offset": 23
                  },
                  "source": "这是子组件"
              }
          },
          "patchFlag": "-1 /* HOISTED */",
          "isBlock": false,
          "disableTracking": false,
          "loc": {
              "start": {
                  "column": 13,
                  "line": 2,
                  "offset": 13
              },
              "end": {
                  "column": 29,
                  "line": 2,
                  "offset": 29
              },
              "source": "<div>这是子组件</div>"
          }
      }
  ],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "codegenNode": {
      "type": 13,
      "children": [
      ],
      "directives": null,
      "patchFlag": "64 /* STABLE_FRAGMENT */", // 标记是什么类型
      "isBlock": true,
      "disableTracking": false,
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
      }
  },
  "loc": {
      "start": {
          "column": 1,
          "line": 1,
          "offset": 0
      },
      "end": {
          "column": 9,
          "line": 4,
          "offset": 85
      },
      "source": "\n            <div>这是子组件</div>\n            <div>这是父组件接受的count：{{count}}</div>\n        "
  }
}
```
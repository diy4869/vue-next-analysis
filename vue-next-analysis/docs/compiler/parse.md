## 上节回顾

上一节简单的介绍了下```baseCompile```，现在来具体介绍```parse```过程，由于这部分内容比较多，会分多个小节来说。

```ts
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  // ...
  // 获取ast
  const ast = isString(template) ? baseParse(template, options) : template

  // ... 转换相关，转换部分再说

  // 生成block tree 用于最终渲染
  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers
    })
  )
}

```
这里面主要关注的是生成AST这部分，由于```template```是通过```innerHTML```拿到的，所以这时候一定是```string```，这里就会执行```baseParse```，至于```template```应该是通过```setup```直接返回的```render function```。这里先不用管。

## baseParse 基本解析

```baseParse```主要做了下面2件事：
- 创建解析上下文
- 通过创建```createRoot```返回被解析的结果

```ts
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
```

## createParserContext 创建解析上下文
```ts
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

## createRoot 创建根节点

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
```
```createRoot```主要就做了通过一个对象去描述根节点的AST结构，并把参数的```children、loc```传递了进来，```children```是最后解析好的AST结构，下面章节去说，而```loc```是解析的时候保存的一个位置信息。

## 总结

这部分代码在```packages/compiler-core/src/parse.ts```，其实也没啥可说的，简单看下最后解析出来的内容吧，具体后面再说。

下一节我们先看```createRoot```内的```parseChildren```干了啥。

```json
[
    {
        "type": 1,
        "ns": 0,
        "tag": "span",
        "tagType": 0, // 标签类型
        "props": [
            {
                "type": 7, // 代表v-bind
                "name": "bind", // 指令名称
                "exp": {
                    "type": 4,
                    "content": "count % 2 === 0 ? 'red' : 'blue'", // 属性内容
                    "isStatic": false, // 是否静态
                    "constType": 0,
                    "loc": { // 解析的位置信息
                        "start": { // 开始位置
                            "column": 23,
                            "line": 2,
                            "offset": 23
                        },
                        "end": { // 结束位置
                            "column": 55,
                            "line": 2,
                            "offset": 55 // 相对于整个template 字符串的偏移量
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
                "modifiers": [],
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
        "isSelfClosing": false,
        "children": [
            {
                "type": 5,
                "content": {
                    "type": 4,
                    "isStatic": false,
                    "constType": 0,
                    "content": "count",
                    "loc": {
                        "start": {
                            "column": 107,
                            "line": 2,
                            "offset": 107
                        },
                        "end": {
                            "column": 112,
                            "line": 2,
                            "offset": 112
                        },
                        "source": "count"
                    }
                },
                "loc": {
                    "start": {
                        "column": 104,
                        "line": 2,
                        "offset": 104
                    },
                    "end": {
                        "column": 115,
                        "line": 2,
                        "offset": 115
                    },
                    "source": "{{ count }}"
                }
            }
        ],
        "loc": {
            "start": {
                "column": 9,
                "line": 2,
                "offset": 9
            },
            "end": {
                "column": 122,
                "line": 2,
                "offset": 122
            },
            "source": "<span :class=\"count % 2 === 0 ? 'red' : 'blue'\" :style=\"'font-size: 14px; font-weight: bold;'\">{{ count }}</span>"
        }
    },
    {
        "type": 1,
        "ns": 0,
        "tag": "button",
        "tagType": 0,
        "props": [
            {
                "type": 7,
                "name": "on",
                "exp": {
                    "type": 4,
                    "content": "add",
                    "isStatic": false,
                    "constType": 0,
                    "loc": {
                        "start": {
                            "column": 25,
                            "line": 4,
                            "offset": 156
                        },
                        "end": {
                            "column": 28,
                            "line": 4,
                            "offset": 159
                        },
                        "source": "add"
                    }
                },
                "arg": {
                    "type": 4,
                    "content": "click",
                    "isStatic": true,
                    "constType": 3,
                    "loc": {
                        "start": {
                            "column": 18,
                            "line": 4,
                            "offset": 149
                        },
                        "end": {
                            "column": 23,
                            "line": 4,
                            "offset": 154
                        },
                        "source": "click"
                    }
                },
                "modifiers": [],
                "loc": {
                    "start": {
                        "column": 17,
                        "line": 4,
                        "offset": 148
                    },
                    "end": {
                        "column": 29,
                        "line": 4,
                        "offset": 160
                    },
                    "source": "@click=\"add\""
                }
            },
            {
                "type": 7,
                "name": "bind",
                "exp": {
                    "type": 4,
                    "content": "{\n            color: 'red'\n        }",
                    "isStatic": false,
                    "constType": 0,
                    "loc": {
                        "start": {
                            "column": 38,
                            "line": 4,
                            "offset": 169
                        },
                        "end": {
                            "column": 10,
                            "line": 6,
                            "offset": 205
                        },
                        "source": "{\n            color: 'red'\n        }"
                    }
                },
                "arg": {
                    "type": 4,
                    "content": "style",
                    "isStatic": true,
                    "constType": 3,
                    "loc": {
                        "start": {
                            "column": 31,
                            "line": 4,
                            "offset": 162
                        },
                        "end": {
                            "column": 36,
                            "line": 4,
                            "offset": 167
                        },
                        "source": "style"
                    }
                },
                "modifiers": [],
                "loc": {
                    "start": {
                        "column": 30,
                        "line": 4,
                        "offset": 161
                    },
                    "end": {
                        "column": 11,
                        "line": 6,
                        "offset": 206
                    },
                    "source": ":style=\"{\n            color: 'red'\n        }\""
                }
            }
        ],
        "isSelfClosing": false,
        "children": [
            {
                "type": 2,
                "content": "增加",
                "loc": {
                    "start": {
                        "column": 12,
                        "line": 6,
                        "offset": 207
                    },
                    "end": {
                        "column": 14,
                        "line": 6,
                        "offset": 209
                    },
                    "source": "增加"
                }
            }
        ],
        "loc": {
            "start": {
                "column": 9,
                "line": 4,
                "offset": 140
            },
            "end": {
                "column": 23,
                "line": 6,
                "offset": 218
            },
            "source": "<button @click=\"add\" :style=\"{\n            color: 'red'\n        }\">增加</button>"
        }
    },
    {
        "type": 1,
        "ns": 0,
        "tag": "test",
        "tagType": 1,
        "props": [
            {
                "type": 7,
                "name": "bind",
                "exp": {
                    "type": 4,
                    "content": "count",
                    "isStatic": false,
                    "constType": 0,
                    "loc": {
                        "start": {
                            "column": 23,
                            "line": 7,
                            "offset": 241
                        },
                        "end": {
                            "column": 28,
                            "line": 7,
                            "offset": 246
                        },
                        "source": "count"
                    }
                },
                "arg": {
                    "type": 4,
                    "content": "count",
                    "isStatic": true,
                    "constType": 3,
                    "loc": {
                        "start": {
                            "column": 16,
                            "line": 7,
                            "offset": 234
                        },
                        "end": {
                            "column": 21,
                            "line": 7,
                            "offset": 239
                        },
                        "source": "count"
                    }
                },
                "modifiers": [],
                "loc": {
                    "start": {
                        "column": 15,
                        "line": 7,
                        "offset": 233
                    },
                    "end": {
                        "column": 29,
                        "line": 7,
                        "offset": 247
                    },
                    "source": ":count=\"count\""
                }
            }
        ],
        "isSelfClosing": false,
        "children": [],
        "loc": {
            "start": {
                "column": 9,
                "line": 7,
                "offset": 227
            },
            "end": {
                "column": 37,
                "line": 7,
                "offset": 255
            },
            "source": "<test :count=\"count\"></test>"
        }
    },
    {
        "type": 1,
        "ns": 0,
        "tag": "ul",
        "tagType": 0,
        "props": [],
        "isSelfClosing": false,
        "children": [
            {
                "type": 1,
                "ns": 0,
                "tag": "li",
                "tagType": 0,
                "props": [
                    {
                        "type": 7,
                        "name": "for",
                        "exp": {
                            "type": 4,
                            "content": "item in 10",
                            "isStatic": false,
                            "constType": 0,
                            "loc": {
                                "start": {
                                    "column": 24,
                                    "line": 9,
                                    "offset": 292
                                },
                                "end": {
                                    "column": 34,
                                    "line": 9,
                                    "offset": 302
                                },
                                "source": "item in 10"
                            }
                        },
                        "modifiers": [],
                        "loc": {
                            "start": {
                                "column": 17,
                                "line": 9,
                                "offset": 285
                            },
                            "end": {
                                "column": 35,
                                "line": 9,
                                "offset": 303
                            },
                            "source": "v-for=\"item in 10\""
                        }
                    }
                ],
                "isSelfClosing": false,
                "children": [
                    {
                        "type": 5,
                        "content": {
                            "type": 4,
                            "isStatic": false,
                            "constType": 0,
                            "content": "item",
                            "loc": {
                                "start": {
                                    "column": 39,
                                    "line": 9,
                                    "offset": 307
                                },
                                "end": {
                                    "column": 43,
                                    "line": 9,
                                    "offset": 311
                                },
                                "source": "item"
                            }
                        },
                        "loc": {
                            "start": {
                                "column": 36,
                                "line": 9,
                                "offset": 304
                            },
                            "end": {
                                "column": 46,
                                "line": 9,
                                "offset": 314
                            },
                            "source": "{{ item }}"
                        }
                    }
                ],
                "loc": {
                    "start": {
                        "column": 13,
                        "line": 9,
                        "offset": 281
                    },
                    "end": {
                        "column": 51,
                        "line": 9,
                        "offset": 319
                    },
                    "source": "<li v-for=\"item in 10\">{{ item }}</li>"
                }
            }
        ],
        "loc": {
            "start": {
                "column": 9,
                "line": 8,
                "offset": 264
            },
            "end": {
                "column": 14,
                "line": 10,
                "offset": 333
            },
            "source": "<ul>\n            <li v-for=\"item in 10\">{{ item }}</li>\n        </ul>"
        }
    },
    {
        "type": 1,
        "ns": 0,
        "tag": "suspense",
        "tagType": 1,
        "props": [],
        "isSelfClosing": false,
        "children": [
            {
                "type": 1,
                "ns": 0,
                "tag": "div",
                "tagType": 0,
                "props": [
                    {
                        "type": 6,
                        "name": "id",
                        "value": {
                            "type": 2,
                            "content": "suspense",
                            "loc": {
                                "start": {
                                    "column": 21,
                                    "line": 12,
                                    "offset": 373
                                },
                                "end": {
                                    "column": 31,
                                    "line": 12,
                                    "offset": 383
                                },
                                "source": "\"suspense\""
                            }
                        },
                        "loc": {
                            "start": {
                                "column": 18,
                                "line": 12,
                                "offset": 370
                            },
                            "end": {
                                "column": 31,
                                "line": 12,
                                "offset": 383
                            },
                            "source": "id=\"suspense\""
                        }
                    }
                ],
                "isSelfClosing": false,
                "children": [
                    {
                        "type": 2,
                        "content": "supense组件",
                        "loc": {
                            "start": {
                                "column": 32,
                                "line": 12,
                                "offset": 384
                            },
                            "end": {
                                "column": 41,
                                "line": 12,
                                "offset": 393
                            },
                            "source": "supense组件"
                        }
                    }
                ],
                "loc": {
                    "start": {
                        "column": 13,
                        "line": 12,
                        "offset": 365
                    },
                    "end": {
                        "column": 47,
                        "line": 12,
                        "offset": 399
                    },
                    "source": "<div id=\"suspense\">supense组件</div>"
                }
            }
        ],
        "loc": {
            "start": {
                "column": 9,
                "line": 11,
                "offset": 342
            },
            "end": {
                "column": 20,
                "line": 13,
                "offset": 419
            },
            "source": "<suspense>\n            <div id=\"suspense\">supense组件</div>\n        </suspense>"
        }
    },
    {
        "type": 1,
        "ns": 0,
        "tag": "teleport",
        "tagType": 1,
        "props": [
            {
                "type": 6,
                "name": "to",
                "value": {
                    "type": 2,
                    "content": "body #suspense",
                    "loc": {
                        "start": {
                            "column": 22,
                            "line": 14,
                            "offset": 441
                        },
                        "end": {
                            "column": 38,
                            "line": 14,
                            "offset": 457
                        },
                        "source": "\"body #suspense\""
                    }
                },
                "loc": {
                    "start": {
                        "column": 19,
                        "line": 14,
                        "offset": 438
                    },
                    "end": {
                        "column": 38,
                        "line": 14,
                        "offset": 457
                    },
                    "source": "to=\"body #suspense\""
                }
            }
        ],
        "isSelfClosing": false,
        "children": [
            {
                "type": 1,
                "ns": 0,
                "tag": "div",
                "tagType": 0,
                "props": [],
                "isSelfClosing": false,
                "children": [
                    {
                        "type": 2,
                        "content": "telport组件",
                        "loc": {
                            "start": {
                                "column": 18,
                                "line": 15,
                                "offset": 476
                            },
                            "end": {
                                "column": 27,
                                "line": 15,
                                "offset": 485
                            },
                            "source": "telport组件"
                        }
                    }
                ],
                "loc": {
                    "start": {
                        "column": 13,
                        "line": 15,
                        "offset": 471
                    },
                    "end": {
                        "column": 33,
                        "line": 15,
                        "offset": 491
                    },
                    "source": "<div>telport组件</div>"
                }
            }
        ],
        "loc": {
            "start": {
                "column": 9,
                "line": 14,
                "offset": 428
            },
            "end": {
                "column": 20,
                "line": 16,
                "offset": 511
            },
            "source": "<teleport to=\"body #suspense\">\n            <div>telport组件</div>\n        </teleport>"
        }
    }
]
```
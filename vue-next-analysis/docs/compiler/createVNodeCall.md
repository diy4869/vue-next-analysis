## createVNodeCall

在上一篇的最后，```transfromElement```最终调用了```createVNodeCall```这个函数，这就来说下这玩意是干嘛的。

```ts
export function createVNodeCall(
  context: TransformContext | null,
  tag: VNodeCall['tag'],
  props?: VNodeCall['props'],
  children?: VNodeCall['children'],
  patchFlag?: VNodeCall['patchFlag'],
  dynamicProps?: VNodeCall['dynamicProps'],
  directives?: VNodeCall['directives'],
  isBlock: VNodeCall['isBlock'] = false,
  disableTracking: VNodeCall['disableTracking'] = false,
  loc = locStub
): VNodeCall {
  if (context) {
    if (isBlock) { // block其实是根据当前子节点是否是数组来进行判断的。
      context.helper(OPEN_BLOCK) // 打开一个block
      context.helper(CREATE_BLOCK) // 创建一个Block
    } else {
      context.helper(CREATE_VNODE) // 创建vnode
    }
    if (directives) { // 是否存在指令
      context.helper(WITH_DIRECTIVES) 
    }
  }

  return {
    type: NodeTypes.VNODE_CALL, // 13
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    loc
  }
}
```
这个函数整体实现不难，最终返回了一个```VNodeCall```的一个对象，该对象用于```generate```阶段的一个代码生成。

## 总结

至此节点是怎么转换的也就到此结束了，下一部分是如何对转换的节点去做静态提升。

一个最终生成的例子：
```json
{
    "type": 13,
    "tag": "\"input\"",
    "props": {
        "type": 15,
        "loc": {
            "start": {
                "column": 9,
                "line": 3,
                "offset": 131
            },
            "end": {
                "column": 50,
                "line": 3,
                "offset": 172
            },
            "source": "<input ref=\"inputRef\" v-model=\"inputVal\">"
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
                        "source": "ref",
                        "start": {
                            "column": 16,
                            "line": 3,
                            "offset": 138
                        },
                        "end": {
                            "column": 19,
                            "line": 3,
                            "offset": 141
                        }
                    },
                    "content": "ref",
                    "isStatic": true,
                    "constType": 3
                },
                "value": {
                    "type": 4,
                    "loc": {
                        "start": {
                            "column": 20,
                            "line": 3,
                            "offset": 142
                        },
                        "end": {
                            "column": 30,
                            "line": 3,
                            "offset": 152
                        },
                        "source": "\"inputRef\""
                    },
                    "content": "inputRef",
                    "isStatic": true,
                    "constType": 3
                }
            },
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
                    "content": "onUpdate:modelValue",
                    "isStatic": true,
                    "constType": 3
                },
                "value": {
                    "type": 8,
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
                    "children": [
                        "$event => (",
                        {
                            "type": 4,
                            "content": "inputVal",
                            "isStatic": false,
                            "constType": 0,
                            "loc": {
                                "start": {
                                    "column": 40,
                                    "line": 3,
                                    "offset": 162
                                },
                                "end": {
                                    "column": 48,
                                    "line": 3,
                                    "offset": 170
                                },
                                "source": "inputVal"
                            }
                        },
                        " = $event)"
                    ]
                }
            }
        ]
    },
    "patchFlag": "8 /* PROPS */",
    "dynamicProps": "[\"onUpdate:modelValue\"]",
    "directives": {
        "type": 17,
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
        "elements": [
            {
                "type": 17,
                "loc": {
                    "start": {
                        "column": 31,
                        "line": 3,
                        "offset": 153
                    },
                    "end": {
                        "column": 49,
                        "line": 3,
                        "offset": 171
                    },
                    "source": "v-model=\"inputVal\""
                },
                "elements": [
                    "_vModelText",
                    {
                        "type": 4,
                        "content": "inputVal",
                        "isStatic": false,
                        "constType": 0,
                        "loc": {
                            "start": {
                                "column": 40,
                                "line": 3,
                                "offset": 162
                            },
                            "end": {
                                "column": 48,
                                "line": 3,
                                "offset": 170
                            },
                            "source": "inputVal"
                        }
                    }
                ]
            }
        ]
    },
    "isBlock": false,
    "disableTracking": false,
    "loc": {
        "start": {
            "column": 9,
            "line": 3,
            "offset": 131
        },
        "end": {
            "column": 50,
            "line": 3,
            "offset": 172
        },
        "source": "<input ref=\"inputRef\" v-model=\"inputVal\">"
    }
}
```
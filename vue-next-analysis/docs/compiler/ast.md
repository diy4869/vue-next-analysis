
## 程序运行过程

我们知道计算机是不认识这些字符的，只认0和1，而为了让计算机认识这玩意，就需要进行翻译成机器码才行。先了解下程序的运行步骤：

1. 解析你所编写的code
2. 生成AST
3. 对语法进行校验
4. 然后通过AST进行转换、优化
5. 生成机器码
6. 丢给计算机运行


## AST

- [AST Explorer](https://astexplorer.net/)
- [vue-next-template-explorer](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3EHello%20World!%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22filename%22%3A%22Foo.vue%22%2C%22prefixIdentifiers%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22inline%22%3Afalse%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22compatConfig%22%3A%7B%22MODE%22%3A3%7D%2C%22whitespace%22%3A%22condense%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup-const%22%2C%22setupRef%22%3A%22setup-ref%22%2C%22setupConst%22%3A%22setup-const%22%2C%22setupLet%22%3A%22setup-let%22%2C%22setupMaybeRef%22%3A%22setup-maybe-ref%22%2C%22setupProp%22%3A%22props%22%2C%22vMySetupDir%22%3A%22setup-const%22%7D%7D%7D)

```AST Expolder```提供了基本大部分语言的AST结构

```vue-next-template-explorer```提供了vue-next的模板编译所生成的```render function```

### 介绍

AST全称抽象语法树（Abstract Syntax Tree），AST定义了一些规范用于对语法进行表述。

每个AST节点都会有这么几个部分：

- type 类型
- start 开始位置
- end 结束位置
- body 程序体
- kind 关键字
- VariableDeclarator 变量表述语句
- CallExpression 函数调用语句
- Identifier 标识符
- Literal 字面量
- ExpressionStatement 表达式
- 其他


## 例子

我们编写的代码
```js
const num = 1

console.log(num)

function add (a, b) {
  return a + b
}

```

通过```acorn```解析的AST语法树结构，或者也可以用```@babel/parser```
```json
{
  "type": "Program",
  "start": 0,
  "end": 70,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 13,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 13,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 9,
            "name": "num"
          },
          "init": {
            "type": "Literal",
            "start": 12,
            "end": 13,
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "ExpressionStatement",
      "start": 15,
      "end": 31,
      "expression": {
        "type": "CallExpression",
        "start": 15,
        "end": 31,
        "callee": {
          "type": "MemberExpression",
          "start": 15,
          "end": 26,
          "object": {
            "type": "Identifier",
            "start": 15,
            "end": 22,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 23,
            "end": 26,
            "name": "log"
          },
          "computed": false,
          "optional": false
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 27,
            "end": 30,
            "name": "num"
          }
        ],
        "optional": false
      }
    },
    {
      "type": "FunctionDeclaration",
      "start": 33,
      "end": 70,
      "id": {
        "type": "Identifier",
        "start": 42,
        "end": 45,
        "name": "add"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 47,
          "end": 48,
          "name": "a"
        },
        {
          "type": "Identifier",
          "start": 50,
          "end": 51,
          "name": "b"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 53,
        "end": 70,
        "body": [
          {
            "type": "ReturnStatement",
            "start": 56,
            "end": 68,
            "argument": {
              "type": "BinaryExpression",
              "start": 63,
              "end": 68,
              "left": {
                "type": "Identifier",
                "start": 63,
                "end": 64,
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "Identifier",
                "start": 67,
                "end": 68,
                "name": "b"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

### AST在vue-next中的应用

```vue-next```提供了```@vue/compiler-core```和```@vue/compiler-dom```对模板进行编译，在生成```Vnode```的时候，并添加了```block```的算法，具体后面编译模板的时候再说。

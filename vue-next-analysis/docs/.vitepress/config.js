const path = require('path')

module.exports = {
  base: '/vue-next-analysis/',
  title: 'Vue3源码解析',
  themeConfig: {
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/diy4869/vue-next-analysis'
      }
    ],
    sidebar: [
      {
        text: '☆ 个人介绍',
        link: '/page/my'
      },
      {
        text: '一些流程图',
        children: [
          {
            text: '☆ vue-next 渲染流程',
            link: '/page/flow'
          }
        ]
      },
      {
        text: '准备工作',
        children: [
          {
            text: '☆ 一些基本知识',
            link: '/page/base'
          },
          {
            text: '☆ 如何debug',
            link: '/page/debug'
          },
          {
            text: '☆ 位运算',
            link: '/page/bitOperators'
          },
          {
            text: '☆ 浏览器渲染过程',
            link: '/page/browserRender'
          },
          {
            text: '☆ VNode',
            link: '/page/vnode'
          },
          {
            text: '☆ AST 抽象语法树',
            link: 'compiler/ast'
          },
          {
            text: 'Rollup',
            link: ''
          },
          {
            text: 'Typescript',
            link: ''
          }
        ]
      },
      {
        text: 'API',
        children: [
          {
            text: 'lifeCycle 生命周期',
            link: '/page/lifeCycle'
          }
        ]
      },
      {
        text: '初始化渲染',
        children: [
          {
            text: '☆ createApp',
            link: '/page/createApp'
          },
          {
            text: '☆ mount 挂载',
            link: '/page/mount'
          },
          {
            text: '☆ render 渲染',
            link: '/page/render'
          },
          {
            text: '☆ mountComponent 挂载组件',
            link: '/page/mountComponent'
          },
          {
            text: '☆ setupComponent 安装组件',
            link: '/page/setupComponent'
          },
          {
            text: '☆ setupRenderEffect 准备渲染',
            link: '/page/setupRenderEffect'
          }
        ]
      },
      {
        text: 'compiler 编译',
        children: [
          {
            text: '☆ baseCompile 基本编译',
            link: '/compiler/baseCompile'
          },
          {
            text: '☆ parse 一 初始化解析',
            link: '/compiler/parse'
          },
          {
            text: '☆ parse 二 解析子节点',
            link: '/compiler/parseChildren'
          },
          {
            text: '☆ parse 三 一些解析工具函数',
            link: '/compiler/utils'
          },
          {
            text: '☆ parse 四 解析标签',
            link: '/compiler/parseTag'
          },
          {
            text: '☆ parse 五 解析属性',
            link: '/compiler/parseAttribute'
          },
          {
            text: '☆ parse 六 解析文本',
            link: '/compiler/parseText'
          },
          {
            text: '☆ parse 七 解析元素',
            link: '/compiler/parseElement'
          },
          {
            text: '☆ parse 八 结束',
            link: '/compiler/parseEnd'
          },
          {
            text: '☆ transform 初始化',
            link: '/compiler/transform'
          },
          {
            text: '☆ transform 创建转换器上下文',
            link: '/compiler/createTransformContext'
          },
          {
            text: '☆ transform 转换节点',
            link: '/compiler/traverseNode'
          },
          {
            text: '☆ transform 一些转换的工具函数',
            link: '/compiler/transformUtils'
          },
          {
            text: '☆ transform 转换元素',
            link: '/compiler/transformElement'
          },
          {
            text: '☆ transform createVNodeCall',
            link: '/compiler/createVNodeCall'
          },
          {
            text: '☆ transform 静态提升',
            link: '/compiler/staticHoist'
          },
          {
            text: '☆ transform 创建根节点代码生成',
            link: '/compiler/createRootCodegen'
          },
          {
            text: '☆ transform 结束',
            link: '/compiler/transformEnd'
          },
          {
            text: '☆ generate 一些生成函数',
            link: '/compiler/generateFunction'
          },
          {
            text: '☆ generate 一',
            link: '/compiler/generateOne'
          },
          {
            text: '☆ generate 二',
            link: '/compiler/generateTwo'
          },
          {
            text: '☆ generate 模板转render function',
            link: '/compiler/generateThree'
          },
          {
            text: '☆ generate 结束',
            link: '/compiler/generateEnd'
          }
        ]
      },
      {
        text: '渲染 render',
        children: [
          {
            text: 'patch 渲染更新DOM',
            link: '/directive/v-show'
          }
        ]
      },
      {
        text: '内置组件 components',
        children: [
          {
            text: 'keepAlive',
            link: '/components/keepAlive'
          },
          {
            text: 'suspense',
            link: '/components/suspense'
          },
          {
            text: 'teleport',
            link: '/components/teleport'
          }
        ]
      },
      {
        text: '响应式',
        children: [
          {
            text: 'reactive',
            link: ''
          },
          {
            text: 'ref',
            link: ''
          },
          {
            text: '...',
            link: ''
          }
        ]
      }
    ]
  }
}

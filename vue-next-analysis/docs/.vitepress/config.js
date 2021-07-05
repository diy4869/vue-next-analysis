const path = require('path')

module.exports = {
  base: '/vue-next-analysis/',
  title: 'vue-next源码解析',
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
        link: '/components/my'
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
            text: '☆ Vnode',
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
          }
        ]
      },
      {
        text: 'compiler 编译',
        children: [
          {
            text: '☆ baseCompile',
            link: '/compiler/baseCompile'
          },
          {
            text: 'v-if',
            link: '/directive/v-if'
          },
          {
            text: 'v-for',
            link: '/directive/v-for'
          },
          {
            text: 'generate',
            link: '/compiler/generate'
          }
        ]
      },
      {
        text: '渲染 render',
        children: [
          {
            text: 'v-show',
            link: '/directive/v-show'
          },
          {
            text: 'v-on',
            link: '/directive/v-on'
          }
        ]
      },
      {
        text: '指令 directive',
        children: [
          {
            text: 'v-show',
            link: '/directive/v-show'
          },
          {
            text: 'v-on',
            link: '/directive/v-on'
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
      },
      {
        text: '服务端渲染',
        children: [
          {
            text: 'serverRender',
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

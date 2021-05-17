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
            text: 'vnode',
            link: '/page/vnode'
          },
          {
            text: 'compiler',
            link: '/page/compiler'
          },
          {
            text: 'render',
            link: ''
          },
          {
            text: '...',
            link: ''
          }
        ]
      },
      {
        text: '指令 directive',
        children: [
          {
            text: 'v-if',
            link: '/directive/v-if'
          },
          {
            text: 'v-show',
            link: '/directive/v-show'
          },
          {
            text: 'v-for',
            link: '/directive/v-for'
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

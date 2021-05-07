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
        text: '个人介绍',
        link: '/components/my'
      },
      {
        text: '准备工作',
        children: [
          {
            text: '一些基本知识',
            link: ''
          },
          {
            text: 'Rollup',
            link: ''
          },
          {
            text: 'Typescript',
            link: ''
          },
          {
            text: '项目目录',
            link: ''
          }
        ]
      },

      {
        text: '初始化渲染',
        children: [
          {
            text: 'createApp',
            link: ''
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
        text: '编译',
        children: [
          {
            text: 'diff',
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

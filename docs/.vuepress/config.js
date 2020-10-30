const { resolvePaths } = require('./src/utils/docs')

module.exports = {
  lang: 'zh-CN',
  title: 'Vue Json Design',
  description: 'Vue 可视化界面功能设计器',
  base: '/vjdesign/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }
    ]
  ],
  themeConfig: {
    nav: [{ text: '指南', link: '/1.guide/intro.html' }],
    sidebar: resolvePaths(),
    sidebarDepth: 0
  },
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2] }
  },
  plugins: [
    [
      'demo-block',
      {
        settings: {
          // jsLib: ["https://unpkg.com/element-ui/lib/index.js"],
          // cssLib: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"],
          // vue: "",
          // react: "",
          // reactDOM: "",
          jsfiddle: false,
          codepen: false,
          horizontal: false
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ]
  ]
}

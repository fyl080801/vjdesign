const { resolvePaths } = require('./src/utils/docs')

module.exports = {
  lang: 'zh-CN',
  title: 'Vue Json Design',
  description: 'Vue 可视化界面功能设计器',
  base: '/vjdesign/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: 'https://unpkg.com/vue@2.6.12/dist/vue.min.js' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/1.guide/1.intro.html' },
      {
        text: '在线示例',
        link: 'https://fyl080801.github.io/vjdesign/example'
      },
      { text: 'Github', link: 'https://github.com/fyl080801/vjdesign' },
      { text: 'Gitee', link: 'https://gitee.com/fyl080801/vjdesign' }
    ],
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

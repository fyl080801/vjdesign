const fs = require('fs')
const path = require('path')

const guideBase = path.resolve(__dirname, '../guide')

const guides = fs.readdirSync(guideBase)

const sideGroups = {}

guides.forEach(item => {
  const stat = fs.statSync(path.resolve(guideBase, item))

  if (!stat.isDirectory()) {
    return
  }

  sideGroups[item] = sideGroups[item] || {
    title: '',
    collapsable: true,
    children: []
  }

  const readmePath = path.resolve(guideBase, item, 'README.md')

  if (fs.existsSync(readmePath)) {
    const readmeFile = fs.readFileSync(readmePath).toString()
    const lines = readmeFile.split('\n')
    if (lines.length > 0 && lines[0].startsWith('# ')) {
      sideGroups[item].title = lines[0].replace('# ', '')
      sideGroups[item].path = path.resolve('/guide', item)
    }
  }

  const currentFiles = fs.readdirSync(path.resolve(guideBase, item))

  currentFiles
    .filter(file => file !== 'README.md')
    .forEach(file => {
      const filestat = fs.statSync(path.resolve(guideBase, item, file))

      if (!filestat.isFile()) {
        return
      }

      sideGroups[item].children.push(
        path.resolve('/guide', item, file.replace('.md', ''))
      )
    })
})

module.exports = {
  lang: 'zh-CN',
  title: 'Vue Json Design',
  description: 'render ui by json',
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
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],
    sidebar: [
      {
        title: '首页',
        collapsable: false,
        path: '/'
      },
      {
        title: '指南',
        collapsable: false,
        path: '/guide/'
      },
      ...Object.keys(sideGroups).map(key => {
        return sideGroups[key]
      })
    ],
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

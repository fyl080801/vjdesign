// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  publicPath: '',
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}

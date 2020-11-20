module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    'lodash',
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }
    ] // `style: true` 会加载 less 文件
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']]
    }
  }
}

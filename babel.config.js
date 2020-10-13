module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: ['lodash'],
  env: {
    test: {
      presets: [['@babel/preset-env']]
    }
  }
}

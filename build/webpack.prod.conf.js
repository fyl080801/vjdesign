'use strict'

const utils = require('./utils')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const plugins = [
  // extract css into its own file
  new MiniCssExtractPlugin({
    filename: utils.assetsPath('[name].css'),
    // Setting the following option to `false` will not extract CSS from codesplit chunks.
    // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
    // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    allChunks: false
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: { safe: true, map: { inline: false } }
  })
]

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  plugins.push(new BundleAnalyzerPlugin())
}

const production = {
  entry: {
    vjdesign: utils.resolve('../package/index.js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true
  }
}

const webpackConfig = [
  merge(baseWebpackConfig, production, {
    output: {
      path: utils.resolve('../dist'),
      filename: '[name].umd.js',
      libraryTarget: 'umd',
      library: 'VueJsonDesign',
      umdNamedDefine: true
    },
    plugins
  }),
  merge(baseWebpackConfig, production, {
    externals: [nodeExternals()],
    output: {
      path: utils.resolve('../dist'),
      filename: '[name].esm.js',
      libraryTarget: 'commonjs2',
      library: 'VueJsonDesign'
    },
    plugins
  })
]

module.exports = webpackConfig

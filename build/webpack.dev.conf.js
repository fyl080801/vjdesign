'use strict'

const merge = require('webpack-merge')
const utils = require('./utils')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ usePostCSS: true, sourceMap: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  // these devServer options should be customized in /config/index.js
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '../../server/app'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      path: '/public/static'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running...`]
      },
      onErrors: utils.createNotifierCallback()
    })
  ]
})

module.exports = devWebpackConfig

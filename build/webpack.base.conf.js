'use strict'

const utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const createLintingRule = () => ({
//   test: /\.(jsx?|vue)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [utils.resolve('../package')]
// })

module.exports = {
  // context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: ['./src/main.js']
  // },
  // output: {
  //   path: path.resolve(__dirname, '../../server/app/public'),
  //   filename: '[name].js',
  //   publicPath: '/public/'
  // },
  // externals: {
  //   vue: 'Vue'
  // },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    // noParse: [/videojs-contrib-hls/],
    rules: [
      // createLintingRule(),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      // {
      //   test: /\.s(a|c)ss$/,
      //   loader: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     {
      //       loader: 'sass-loader'
      //     }
      //   ]
      // },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [utils.resolve('../package/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  },
  plugins: [new LodashModuleReplacementPlugin(), new VueLoaderPlugin()]
}

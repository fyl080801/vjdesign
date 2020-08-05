'use strict'

require('./check-versions')()

process.env.NODE_ENV = 'production'
const util = require('util')
const ora = require('ora')
const rm = util.promisify(require('rimraf'))
const path = require('path')
const chalk = require('chalk')
const webpack = util.promisify(require('webpack'))
const webpackConfig = require('./webpack.prod.conf')

go()

async function go() {
  await buildtarget(webpackConfig, '../dist', 'production')
}

async function buildtarget(webpackConfig, target, name) {
  const spinner = ora(`building for ${name}...`)
  spinner.start()
  var err = await rm(path.resolve(__dirname, target))
  if (err) throw err
  var stats = await webpack(webpackConfig)
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    console.log(stats.toString())
    process.exit(1)
  }
  console.log(chalk.cyan('  Build complete.\n'))
  console.log(
    chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n"
    )
  )
}

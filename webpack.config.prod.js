const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const common = require("./webpack.config.common");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const production = {
  entry: {
    vjdesign: path.resolve(__dirname, "./package/index.js")
  },
  devtool: "source-map",
  mode: "production",
  optimization: {
    minimize: true
  }
};

module.exports = [
  merge(common, production, {
    // plugins: [new BundleAnalyzerPlugin()],
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].umd.js",
      libraryTarget: "umd",
      library: "VueJsonDesign",
      umdNamedDefine: true
    }
  }),
  merge(common, production, {
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].esm.js",
      libraryTarget: "commonjs2",
      library: "VueJsonDesign"
    }
  })
];

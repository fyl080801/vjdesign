const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  context: resolve("./package"),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader"
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("./package/icons")],
        options: {
          symbolId: "icon-[name]"
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      cloning: true,
      caching: true,
      paths: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  }
};

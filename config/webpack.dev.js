const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    // index: 'index.html',
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/*/, to: '../index.html' }
    //   ]
    // },
    historyApiFallback: true,
    compress: true, // 启用压缩,
    // host: "0.0.0.0",
    port: 1207, // 端口
    open: true, // 自动打开浏览器
    hot: true
    // proxy: {
    //   //设置代理
    //   "/dev_api": {
    //     target: "http://localhost:3000",
    //     pathRewrite: { "^/dev_api": "" },
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

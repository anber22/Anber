const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    publicPath: '/',
    // index: 'index.html',
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/*/, to: '../index.html' }
    //   ]
    // },
    historyApiFallback: true,
    compress: true, //启用压缩

    port: 1201, //端口
    open: true, //自动打开浏览器
    hot: true,
    proxy: {
      //设置代理
      "/apis": {
        target: "http://192.168.1.12:1080",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/apis": "" },
        changeOrigin: true,
      },
      "/weather": {
        // target: "https://beta.aiot.ctjt.cn",
        // target: "http://47.106.116.164:8017",
        // pathRewrite: { "^/api": "" },
        // changeOrigin: true
        target: "https://tianqiapi.com",
        pathRewrite: { "^/weather": "" },
        changeOrigin: true,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

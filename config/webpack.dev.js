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
    compress: true, // 启用压缩,
    // host: "0.0.0.0",
    port: 1209, // 端口
    open: true, // 自动打开浏览器
    hot: true,
    proxy: {
      //设置代理
      "/apis": {
        target: "https://www.k8s.ctjt.cn",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/apis": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议
      },
      "/video": {
        target: "http://192.168.1.12:8681",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/video": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议
      }
    } 
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

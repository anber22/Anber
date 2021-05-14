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
    // host: "192.168.3.41", // 这里可以把ip改成自己电脑的ip，手机连上 ctjt-link 就可以在手机上预览项目
    port: 1229, // 端口
    open: true, // 自动打开浏览器
    hot: true,
    proxy: {
      //设置代理
      "/apis": {
        // target: "https://www.k8s.ctjt.cn",
        target: "http://192.168.3.250:14790",
        pathRewrite: { "^/apis": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议

      },
      "/simulation":{   // 模拟接口
        target: "http://192.168.1.13:1080/",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/simulation": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议
      },
      "/video": {
        target: "http://221.4.210.181:6713",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/video": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议1
      },
      "/zjvideo": {
        target: "http://192.168.1.12:8681",
        // target: "http://47.106.116.164:8017",
        pathRewrite: { "^/zjvideo": "" },
        changeOrigin: true,
        secure: false, // 目标服务器地址是否是安全协议1
      }
    } 
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

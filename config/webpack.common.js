const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'], // 后缀名自动补全
    alias: {
      // 别名
      '@': path.resolve(__dirname, '../src'),
      // 组件
      'cmp':path.resolve(__dirname, '../src/components')
    }
  },
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'vue-style-loader',
        { 
          loader:'css-loader',
          options:{
              esModule:false
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif|ttf|woff|woff2|otf)$/,

        use: [
          {
            loader: 'url-loader',
            options: {
              name:"img/[name].[ext]",
              limit: 10000, // 10kb以内转换成base64
              esModule:false
              // name: '[name].[hash:8].[ext]' // 文件名
            }
          }
        ]

      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html', // 文件名
      template: './index.html' // 模板文件
    }),
    new ProgressBarPlugin() // 打包进度条
  ]
}

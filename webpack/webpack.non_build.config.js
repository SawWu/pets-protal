const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.base.config.js')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = merge(common, {
  output: {
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map', // 指定加source-map的方式
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'build'),
    port: 4444,
    host: '127.0.0.1',
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
    hot: true, // 热加载
    open: true,
    inline: true, // 打包后加入一个websocket客户端
    overlay: true
  },
  watchOptions: {
    ignored: /node_modules/, // 忽略不用监听变更的目录
    aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 // 每秒询问的文件变更的次数
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll/vendor.dll.js'],
      append: false,
      hash: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../build/dll/manifest.json')
    })
  ]
})

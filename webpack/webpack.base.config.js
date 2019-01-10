const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const os = require('os') // 系统操作函数

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 进度插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // CSS文件单独提取出来
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // 指定线程池个数
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path_) {
  let assetsSubDirectory
  if (process.env.NODE_ENV === 'production') {
    assetsSubDirectory = 'static' // 可根据实际情况修改
  } else {
    assetsSubDirectory = 'static'
  }
  return path.posix.join(assetsSubDirectory, _path_)
}

module.exports = {
  entry: {
    index: ['@babel/polyfill', './src/main.js']
  },
  output: {
    path: resolve('build'),
    filename: '[name].[hash].bundle.js'
  },
  optimization: { // webpack4.x的最新优化配置项，用于提取公共代码
    splitChunks: {
      cacheGroups: {
        commons: { name: 'common', chunks: 'initial', maxInitialRequests: 5, minSize: 0, reuseExistingChunk: true },
        styles: { name: 'styles', test: /\.css$/, chunks: 'all', enforce: true },
        vendors: { name: 'vendor', test: /[\\/]node_modules[\\/]/, chunks: 'initial', priority: 10, enforce: true }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[path][name]-[local]-[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } },
          { loader: 'less-loader', options: { javascriptEnabled: true } }
          ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      { // file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: { name: assetsPath('images/[name].[hash:7].[ext]'), limit: 1 * 1024 }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, name: assetsPath('media/[name].[hash:7].[ext]') }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, name: assetsPath('fonts/[name].[hash:7].[ext]') }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([resolve('build')]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      filename: 'index.html',
      hash: true, // 防止缓存
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true
      } // 压缩HTML文件, 压缩 去掉引号
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NamedModulesPlugin() // HMR
  ],
  resolve: {
    extensions: ['.js', '.css', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    } // 配置别名可以加快webpack查找模块的速度
  }
}

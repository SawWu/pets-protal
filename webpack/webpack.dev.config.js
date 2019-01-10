const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.base.config.js')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  output: { publicPath: '/' },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('dev') }),
    new ParallelUglifyPlugin({
      workerCount: 4,
      uglifyJS: {
        output: { beautify: false, comments: false },
        compress: { warnings: false, drop_console: true, collapse_vars: true, reduce_vars: true }
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
})

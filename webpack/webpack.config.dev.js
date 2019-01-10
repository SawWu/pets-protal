const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new Visualizer(),
  ]
});

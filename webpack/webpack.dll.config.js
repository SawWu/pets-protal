const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: resolve('build/dll'),
    filename: '[name].dll.js',
    library: 'lib_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'lib_[name]',
      path: path.resolve(__dirname, '..', 'build/dll', 'manifest.json'),
      context: __dirname
    })
  ]
}

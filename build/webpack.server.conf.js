const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')

const resolve = p => path.resolve(__dirname, p)

const config = merge(baseConfig, {
  entry: resolve('../src/entry-server.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals({
    whitelist: /\.css$/
  })],
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash:8].css')
    }),
    new VueSSRServerPlugin()
  ]
})

module.exports = config

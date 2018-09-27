const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const utils = require('./utils')
const config = require('../config')

const isProd = process.env.NODE_ENV === 'production'
const resolve = p => path.resolve(__dirname, p)

const plugins = isProd ? [
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
  }),
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    allChunks: true
  })
] : [
  new webpack.HotModuleReplacementPlugin()
]

module.exports = merge(baseConfig, {
  entry: resolve('../src/entry-client.js'),
  externals: ['axios'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    ...plugins,
    new VueSSRClientPlugin()
  ]
})

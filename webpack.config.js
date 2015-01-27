"use strict";

var webpack = require('webpack');

var plugins = [];

plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.js', 2));

plugins.push(new webpack.optimize.DedupePlugin());

plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: true,
  mangle: true,
  sourceMap: true
}));

module.exports = {
  cache: true,
  debug: false,
  devtool: 'source-map',
  context: __dirname,
  entry: './index.js',
  output: {
    path: './build/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules\//,
        loaders: [
          '6to5-loader?experimental=true&runtime=true'
         ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loaders: [
          '6to5-loader?experimental=true&react=false&runtime=true'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins
};

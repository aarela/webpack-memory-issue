"use strict";

var path = require('path');
var webpack = require('webpack');
var glob = require("glob");

// get entry points
var baseDir = path.join(
  __dirname,
  'src'
);

var entryPointPattern = path.join(
  baseDir,
  '**/*.js'
);

var entryPoints = glob.sync(entryPointPattern)
  .reduce(function(memo, file) {
    var moduleName = path.basename(file, '.js');
    memo[moduleName] = file;
    return memo;
  }, {});

var plugins = [];

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
  entry: entryPoints,
  output: {
    path: './build/',
    filename: '[name].js'
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

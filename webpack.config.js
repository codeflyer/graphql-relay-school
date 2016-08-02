'use strict';
const path = require('path');
const config = require('config');
const webpack = require('webpack');
module.exports = {
  entry: {
    main: ["./client/app.js"],
    graphiql: ["./graphiql/index.jsx"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      },
      { test: /\.schema$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: config.webpack,
      appConfig: JSON.stringify(config.clientConfig)
    }),
    new webpack.optimize.UglifyJsPlugin(config.uglify)
  ]
};

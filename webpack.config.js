'use strict';
const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlTemplate      = require('html-webpack-template');

const BUILD_DIR         = path.resolve(__dirname, 'dist');
const APP_DIR           = path.resolve(__dirname, 'src');

const config = {
  entry:  ['whatwg-fetch', `${APP_DIR}/index.js`],
  output: {
    path:     BUILD_DIR,
    filename: '/js/[name].js',
  },
  cache:   true,
  debug:   true,
  devtool: 'eval-source-map',
  stats:   {
    colors:  true,
    reasons: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      title:      'Edtronics – Official Home Page',
      xhtml:      true,
      inject:     false,
      template:   HtmlTemplate,
      appMountId: 'root-container',
      favicon: './favicons/favicon1.ico',
      meta: [
         {
            name: "description",
            content: " We specialize in research,  designing, developing and manufacturing educational electronics, computer softwares / hardwares and online services that intend for education purposes"
         },
         {
            name:"keywords",
            content:"education, edtech, hardware technology, software"
         },
         {
            name: "author",
            content: "EDTRONICS"
         },
         {
            content: "Content-Type",
            name: "http-equiv"
         },
         {
            content: "text/html; charset=UTF-8",
            name: "content"
         },
         {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
         },
         {
            property:"og:url",
            content: "http://www.getedtronics.com"
         },
         {
            property: "og:type",
            content: "website"
         },
         {
            property: "og:title",
            content:"EDTRONICS CORPORATION"
         },
         {
            name: "theme-color",
            content: "#ffffff"
         }
      ],
      links: [
         "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css",
         "https://fonts.googleapis.com/css?family=Raleway",
         "https://fonts.googleapis.com/css?family=Candal"
      ],
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true,
    }),
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(png|gif|jpg)$/, loader: 'file-loader?name=/images/[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=/[name].[ext]' },
      { test: /\.jsx?$/, loader: 'babel' },
      {
        test:   /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=application/font-woff&name=/fonts/[name].[ext]',
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test:   /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=application/octet-stream&name=/fonts/[name].[ext]',
      },
      {
        test:   /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]',
      },

      {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=video:src'
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'url-loader?limit=10000&mimetype=video/mp4&name=/video/[name].[exit]'
      },
      {
        test:   /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=image/svg+xml&name=/fonts/[name].[ext]',
      },
    ],
  },
};

if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('/js/common.js'),
  ];

  config.plugins = config.plugins.concat(prodPlugins);

  config.cache = false;
  config.debug = false;
  config.devtool = undefined;
}

module.exports = config;

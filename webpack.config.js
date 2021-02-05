const path = require('path');
const webpack = require('webpack');




/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');




const HtmlWebpackPlugin = require('html-webpack-plugin')




/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {

  mode: 'development',

  entry: {
    scripts: './src/scripts.js',
  },

  output: {
    path: path.resolve(__dirname, 'trg'),
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css', }),
    new HtmlWebpackPlugin({ template: 'src/index.html', }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader'
      },
      {
        test: /.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },{
          loader: "css-loader",
          options: { sourceMap: true, },
        }, {
          loader: "sass-loader",
          options: { sourceMap: true, }
        }],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    open: true,
  },

};

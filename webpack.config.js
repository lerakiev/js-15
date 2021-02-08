const path = require('path');
const process = require('process');
const webpack = require('webpack');

// https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const FileManagerPlugin = require('filemanager-webpack-plugin');

const VersionFilePlugin = require('webpack-version-file');

const ObfuscatorPlugin = require('webpack-obfuscator');

const { env } = process;

module.exports = {

  mode: env.NODE_ENV || 'development',

  entry: {
    scripts: './src/scripts.js',
  },

  output: {
    path: path.resolve(__dirname, 'trg'),
  },

  plugins: [

    new webpack.ProgressPlugin(),

    // new webpack.HotModuleReplacementPlugin(),

    // https://habr.com/ru/post/524260/
    // new CleanWebpackPlugin(),

    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{
            source: './trg/*.(css|js|html)',
            destination: './docs/',
          }],
        },
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),

    // new ObfuscatorPlugin ({
    //   compact: true,
    //   controlFlowFlattening: true,
    //   controlFlowFlatteningThreshold: 0.75,
    //   identifierNamesGenerator: 'hexadecimal',
    //   numbersToExpressions: true,
    //   rotateStringArray: true,
    //   simplify: true,
    //   shuffleStringArray: true,
    //   splitStrings: true,
    //   splitStringsChunkLength: 3,
    //   stringArrayThreshold: 0.75,
    // }, []),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new VersionFilePlugin({
      data: {
        date: (new Date()).toGMTString(),
        environment: env.NODE_ENV || 'development',        
      },
      output: './docs/version.txt',
      package: './package.json',
      templateString: [
        `Build date: <%= date %>`,
        `Environment: <%= environment %>`,
        `Version: <%= name %>@<%= version %>`,
      ].join('\n'),
    }),

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
    // compress: true,
    // contentBase: path.resolve(__dirname, './trg'),
    // historyApiFallback: true,
    host: 'localhost',
    // hot: true,
    open: true,
    // port: 9000,
  },

};

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

// https://webdevblog.ru/optimizaciya-razmera-sborki-webpack/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
// https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin

// https://v4.webpack.js.org/plugins/uglifyjs-webpack-plugin/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { env } = process;

module.exports = {

    mode: env.NODE_ENV || 'development',

    cache: false,

    devServer: {
        // compress: true,
        // contentBase: path.resolve(__dirname, './trg'),
        // historyApiFallback: true,
        host: 'localhost',
        // hot: true,
        open: true,
        port: 9000,
    },

    devtool: 'cheap-module-source-map',

    entry: {
        scripts: './src/scripts.js',
    },

    output: {
        path: path.resolve(__dirname, 'trg'),
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // mangle: true,
                // compress: {
                //   warnings: false, // Suppress uglification warnings
                //   pure_getters: true,
                //   unsafe: true,
                //   unsafe_comps: true,
                //   screw_ie8: true
                // },
                // output: {
                //   comments: false,
                // },
                // exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }),
        ],
    },

    plugins: [

        new webpack.DefinePlugin({
            ['process.env']: JSON.stringify(env),
        }),

        // new webpack.optimize.DedupePlugin(),

        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

        // new webpack.NoErrorsPlugin(),

        // new CompressionPlugin({
        //   asset: "[path].gz[query]",
        //   algorithm: "gzip",
        //   test: /\.js$|\.css$|\.html$/,
        //   threshold: 10240,
        //   minRatio: 0
        // }),

        new webpack.ProgressPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        // new BundleAnalyzerPlugin(),

        // https://habr.com/ru/post/524260/
        new CleanWebpackPlugin(),

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
                }, {
                    loader: "css-loader",
                    options: { sourceMap: true, },
                }, {
                    loader: "sass-loader",
                    options: { sourceMap: true, }
                }],
            },

        ],
    },

};
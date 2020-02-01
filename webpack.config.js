const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const babelConfig = require('./babel.config.js');

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'src/[name].bundle.js'
    },
    devServer: {
        contentBase: './public',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                }
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/images',
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/fonts',
                            name: '[name].[ext]'
                        }
                    },

                ],
            },
        ],
    },
    externals: {
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            '$': 'jquery',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
            title: 'Output Management'
        }),
        new CompressionPlugin(),
    ],

    optimization: {
        mangleWasmImports: true,
        removeAvailableModules: true,
        mergeDuplicateChunks: true,
        usedExports: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ],
        runtimeChunk: {
            name: 'main'
        },
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    }
};

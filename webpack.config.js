const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                    }
                }, 'css-loader', 'postcss-loader', 'sass-loader'],
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
        new MiniCssExtractPlugin({ filename: 'assets/css/[name].css' }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            '$': 'jquery',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
            title: 'Output Management'
        })
    ],

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ],
        runtimeChunk: {
            name: 'main'
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    }
};
const path = require('path');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')


if (isDev) {
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader', // 直接使用 stylus-loader 的 source 的 sourceMap
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    });
    config.devtool = '#cheap-module-eval-source-map' // 方便打包后行对应 debugger
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true, // 在浏览器控制台输出 webpack 编译错误信息
        },

        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin() // 减少不必要的信息
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };

    config.output = {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, 'dist')
    };

    config.module.rules.push({
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    )

    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({ // 顺序必须是 vendor 在前 ,runtime 在后
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({ // 提取 webpack 运行时的代码单独打包
            name: 'runtime'
        })
    )
}

const config = merge(baseConfig, {
    module: {
        rules: [{
            test: /\.styl/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader', // 直接使用 stylus-loader 的 source 的 sourceMap
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        }]
    }
});


module.exports = config


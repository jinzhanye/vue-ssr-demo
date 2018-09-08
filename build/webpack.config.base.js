const path = require('path');
const createVueLoaderOptions = require('./vue-loader');
const isDev = process.env.NODE_ENV === 'development';


const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options:createVueLoaderOptions(isDev)
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        },
        //  {   为什么上面 jsx 也会编译 es6 ????
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        //     exclude: /node_modules/
        // },
            {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'resources/[path][name].[hash:8].[ext]' // path 代表图片所有的path
                },
            }]
        }]
    }
};

module.exports = config


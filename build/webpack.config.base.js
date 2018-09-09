const path = require('path');
const createVueLoaderOptions = require('./vue-loader');
const isDev = process.env.NODE_ENV === 'development';


const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname,'../public'),
    // publicPath: "/public/", 不要这样写，因为服务端渲染会访问到客户端的相对路径
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre' // 在执行 /\.(vue|js|jsx)$/ 这些文件之前都要通过 lint 检测
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
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


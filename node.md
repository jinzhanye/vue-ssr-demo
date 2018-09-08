- vue-loader 的作用
依赖 vue-template-compiler

rule: use 与 rule: loader 的区别


- cross-env 统一平台的变量赋值方式

mac 平台 NODE_ENV=production
windows 平台 set NODE_ENV=production


target: 'web', ????


````
 {
                    test: /\.styl/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader', // 直接使用 stylus-loader 的 source 的 sourceMap ???
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
````

chunkhash 是每个 chunk 的 hash ，是根据内容变化而变化的，第三方库内容是万年不变的，所以每次打包出来的 chunkhash 都相同，也就方便浏览器缓存
hash 是整个包的 hash

new ExtractPlugin('styles.[contentHash:8].css'), contentHash 是 ？？

````
new webpack.optimize.CommonsChunkPlugin({ // 提取 webpack 运行时的代码单独打包
            name: 'runtime'
        }) ???????
````



对chunkhash和hash的支持
webpack的hash字段是根据每次编译compilation的内容计算所得，也可以理解为项目总体文件的hash值，而不是针对每个具体文件的。

chunkhash是根据模块内容计算出的hash值。

当使用--hot参数时，只能使用hash，如果使用chunkhash会报错：

output: {
    path: path.resolve(__dirname, './output'),
    // filename: '[name].[chunkhash:8].bundle.js',      // 会报错
    filename: '[name].[hash:8].bundle.js',
},
在使用--inline时，hash和chunkhash都可以使用。


<style> 会通过 vue-style-loader 自行热重载1。

- vue-loader extractCSS 将css 从 vue 文件中分离

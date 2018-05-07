// webpack loader列表
// https://doc.webpack-china.org/loaders/less-loader
// webpack plugin列表
// https://github.com/webpack-contrib/awesome-webpack#webpack-plugins
const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// webpack 3.0 在script中配置
console.log('ENV =====>', process.env.NODE_ENV) 

/* 
webpack 4.0 暴露一个函数，可以获取到mode的环境变量
module.exports = (env, argv) => {
    console.log(env, argv.mode)
    return { ... }
} */

module.exports = {
    entry: {
        // 入口
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        // name 是根据entry中的[index]名字
        // filename: '[name]_[hash].js' 
        // ?rd=[hash] 配合HtmlWebpackPlugin，可以将js插入html中加上随机数
        filename: '[name].js?rd=[hash]'    
    },
    // webpack 中有一个很关键的模块 enhanced-resolve 就是处理依赖模块路径的解析的
    resolve: {
        extensions: ['.vue', '.js', '.json', '.jsx', '.css'],
        alias: {
            'css': path.resolve(__dirname, 'src/assets/css')
        }
    },
    // webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。
    module: {
        rules: [{
                // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
                test: /\.(less|css)$/,
                include: [
                    // 指定哪些路径下的文件需要经过 loader 处理
                    // 方法会把一个路径或路径片段的序列解析为一个绝对路径。
                    // http://nodejs.cn/api/path.html#path_path_resolve_paths
                    path.resolve(__dirname, 'src')
                ],
                // 指定使用的loader
                // 如果需要单独把 CSS 文件分离出来，我们需要使用 extract-text-webpack-plugin 插件。 并且在plugin中new一个配置实例
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',   // 必须排在less-loader前面
                        'less-loader'
                    ],
                    fallback: 'style-loader'
                }), 
                /* use: [
                    // 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明
                    // 'css-loader',
                    // 会将 css-loader 解析的结果转变成 JS 代码，运行时【动态】插入 style 标签来让 CSS 代码生效
                    // 'style-loader',
                ]*/
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.jsx?/, // 支持 js 和 jsx；x可有可无
                include: [
                    // src 目录下的才需要经过 babel-loader 处理
                    path.resolve(__dirname, 'src'), 
                ],
                loader: 'babel-loader',
            }
        ]
    },
    // 模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
            }
        }),
        // 直接将static文件复制到dist中
        new CopyWebpackPlugin([
            { from: 'static/*.*', to: '', } 
        ]),
        new UglifyPlugin(),
        // 如果我们的文件名或者路径会变化，例如使用 [hash] 来进行命名，那么最好是将 HTML 引用路径和我们的构建结果关联起来，这个时候我们可以使用 html-webpack-plugin。
        // 如果需要添加多个页面关联，那么实例化多个 html-webpack-plugin， 并将它们都放到 plugins 字段数组中就可以了。
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './index.html'    // 配置html文件模板，将js和这个关联起来
        }),
        // 使用方式特别，除了在plugins字段添加插件实例之外，还需要调整 loader 对应的配置。
        // 配置输出的文件名，这里同样可以使用 [hash]，多个文件会加载在一起
        // name 是根据entry中的[index]名字
        new ExtractTextPlugin({
            filename: '[name].css?rd=[hash]'    
        }),
    ],
    // 在 webpack 的配置中，可以通过 devServer 字段来配置 webpack-dev-server，如端口设置、启动 gzip 压缩等，这里简单讲解几个常用的配置。
    devServer: {
        // public: 'http://localhost:8080/',   // public 字段用于指定静态服务的域名
        // publicPath: 'static/',      // 字段用于指定构建好的静态文件在浏览器中用什么路径去访问
        port: '1234',
        before(app) {
            // 当访问 /some/path 路径时，返回自定义的 json 数据
            // 可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
            app.get('/api/test.json', function (req, res) { 
                res.json({ code: 200, message: 'hello world' })
            })
        },
        /* proxy: {
            '/login': {
                target: 'http://127.0.0.1:8090',
                changeOrigin: true,
                pathRewrite: {
                    '^/login': '/login'
                }
            },
        } */
    }
}

/* env相关总结(dev和build一样)：
webpack 3:
    package.json中 "start_": "NODE_ENV=development webpack-dev-server"
    1.在webpack.config.js中可以获取 process.env.NODE_ENV
    2.在runtime项目代码中【不能】获取到 process.env.NODE_ENV，默认为production。要想在项目中获取，需要webpack.DefinePlugin这个plugin设置
webpack 4:
    package.json中 "start": "webpack-dev-server --mode development"
    1. 在webpack.config.js中【不能】获取process.env.NODE_ENV，需要把配置作为函数返回值暴露 module.exports = (env, argv) => {}，其中arv.mode可以获取
    2. 在runtime项目代码中可以获取到 process.env.NODE_ENV。(注意不要设置webpack.DefinePlugin)
    3. 更加快速的增量编译构建。(hot reload比 webpack 3比较快)
*/
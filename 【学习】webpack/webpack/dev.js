const webpack = require('webpack')
// 就是在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件 【dev】
const midddleware = require('webpack-dev-middleware')   
const webpackOptions = require('./webpack.config.js')

// 本地的开发环境默认就是使用development mode 
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const express  = require('express')
const app = express()

app.use(midddleware(compiler, {
    // webpack-dev-middleware 的配置选项
}))

app.listen(3000, () => {
    console.log('app run...')
})
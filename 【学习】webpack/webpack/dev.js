const webpack = require('webpack')
const chalk = require('chalk')
const opn = require('opn')
const ora = require('ora')
// 就是在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件 【dev】
const midddleware = require('webpack-dev-middleware')   
const webpackOptions = require('./webpack.config.js')

const spinner = ora({
    text: chalk.magenta('> 加载中...'),
    spinner: 'bouncingBar'
}).start()
const port = 3000

// 本地的开发环境默认就是使用development mode 
webpackOptions.mode = 'development'
const compiler = webpack(webpackOptions)

const express  = require('express')
const app = express()

let hotMidddleware = midddleware(compiler, {
    // webpack-dev-middleware 的配置选项
})
app.use(hotMidddleware)
hotMidddleware.waitUntilValid(() => {
    spinner.stop()
    console.log(chalk.magenta('> 编译完成...'))
    console.log(chalk.magenta(`> 监听：http://localhost:${port}\n`))
    opn(`http://localhost:${port}`)
})

app.listen(port, () => {
    console.log(chalk.magenta('> 项目运行...'))
})
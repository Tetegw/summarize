// import { map } from "lodash-es"
console.log('项目代码中可以使用的环境变量：',process.env.NODE_ENV)
import "css/a.less"
import "css/b.css"
const img = require('./assets/img/img.png')
import Child from './child.js'
console.log(Child)
console.log(img)
const a = '1'
let b = () => {
    console.log('6666')
}
b()

// 懒加载模块
// 遵循 ES 标准的动态加载语法 dynamic-import 来编写
// 如果你使用了 Babel 的话，还需要 Syntax Dynamic Import 这个 Babel 插件来处理 import() 这种语法。
setTimeout(() => {
    // 注释指定了chunk名
    import(/* webpackChunkName: "lodash_" */ './lodash.js').then((res) => {
        console.log(res)
    }) 
}, 5000);

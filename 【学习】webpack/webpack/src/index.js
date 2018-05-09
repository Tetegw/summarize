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
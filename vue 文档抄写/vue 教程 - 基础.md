# 基础

## 安装

**兼容性**

Vue.js 不支持IE8 及其以下版本，因为Vue.js使用了IE8不能模拟的ECMAScript 5特性。Vue.js支持所有[兼容ECMAScript 5的浏览器](http://caniuse.com/#feat=es5)



**更新日志**

每个版本的更新日志见[Github](https://github.com/vuejs/vue/releases)



### 直接<script>引用

直接下载并用`<script>`标签引入，`Vue`会被注册为一个全局变量。重要提示：在开发时请用开发版本，遇见常见错误它会给出友好的警告。

> 开发环境不要用最小压缩版，不然会失去了错误提示和警告！



#### CDN

推荐：https://unpkg.com/vue，会保持和npm发布的最新的版本一致。可以在https://unpkg.com/vue/ 浏览npm 包资源。

也可以从jsDeliver或cdnjs获取，不过这两个服务器版本更新可能略滞后。



### NPM

在用vue.js构建大型应用时推荐使用NPM安装，NPM能很好地和谐如[Webpack](https://webpack.js.org/)或[Browserify](http://browserify.org/)模块打包器配合使用。Vue.js也提供配套工具来开发[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

```bash
# 最新稳定版
$ npm install vue
```



### 命令行工具（CLI）

Vue.js提供一个[官方命令行工具](https://github.com/vuejs/vue-cli)，可用于快速搭建大型单页面应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

```bash
# 全局安装vue-cli
$ npm install --global vue-cli
# 创建一个基于webpack模板的项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install 
$ npm run dev
```

> CLI工具假定用户对Node.js和相关构建工具有一定程度的了解。如果你是新手，我们强烈建议先在不用构建工具的情况下通读[指南](https://cn.vuejs.org/guide/)，熟悉Vue本身滞后再研究CLI。

> 译者注：对于大陆用户，建议将npm的注册表源[设置为国内的镜像](http://riny.net/2014/cnpm/)，可以大幅度提升安装速度。



### 对不同构建版本的解释

在[NPM 包的`dist/`目录](https://unpkg.com/vue@latest/dist/)你将会找到很多不同的Vue.js构建。这里列出了他们之间的差别：

|              | UMD                | CommonJS              | ES Moudule         |
| ------------ | ------------------ | --------------------- | ------------------ |
| 完整版          | vue.js             | vue.common.js         | vue.esm.js         |
| 只包含运行时       | vue.runtime.js     | vue.runtime.commom.js | vue.runtime.esm.js |
| 完整版（生产环境）    | vue.min.js         | -                     | -                  |
| 只包含运行时（生产环境） | vue.runtime.min.js | -                     | -                  |



#### 术语

- 完整版：同时包含编译器和运行时的构建
- 编译器：用来将模板字符串编译成为Javascript渲染函数的代码。
- 运行时：用来创建Vue实例，渲染并处理virtual DOM 等行为的代码。基础上就是除去编译器的其他一切
- UMD：UMD构建可以直接`<script>`标签用在浏览器中。Unpkg CDN 的https://unpkg.com/vue 默认文件就是运行时+编译器的UMD构建（`vue.js`）
- CommonJS：CommonJS构建用来配合老的打包工具比如[browserify](http://browserify.org/) 或[webpack 1](https://webpack.github.io/)。这些打包工具的默认文件（pkg.main）是只包含运行时CommonJS构建（vue.runtime.common.js）。
- ES Module：ES module构建用来配合现代打包工具比如[webpack 2](https://webpack.js.org/) 或 [rollup](http://rollupjs.org/)。这些打包工具的默认文件（pkg.module）是只包含运行时的ES Module构建（`Vue.runtime.esm.js`）。



#### 运行时+编译器vs.只包含运行时

如果你需要在客户端编译模板（比如传入一个字符串给`template`选项，或挂载到一个元素上并以其内部的HTML作为模板），你将需要加上编译器，即完整版的构建：

```javascript
// 需要编译器
new Vue({
  template: `<div>{{ hi }}</div>`
})

//不需要编译器
new Vue({
  render(h){
    renturn h('div', this.hi)
  }
})
```

当使用`vue-loader`或`vueify`的时候，`*.vue`文件内部的模板会在构建时预编译成Javascript。你在最终打好的包里实际上不需要编译器的，因为只是用运行时构建即可。

因为运行时构建相比完整版减了30%的体积，你应该尽可能使用这个版本。如果你仍然希望使用完整版构建，你需要在你的打包工具里配置一个别名：

**Webpack**

```js
module.export = {
  //...
  resolve:{
    alias:{
      'vue$': 'vue/dist/vue.esm.js'	//'vue/dist/vue.commom.js' for webpack 1
    }
  }
}
```

**Rollup**

```javascript
const alias = require('rollup-plugin-alias')

rollup({
  //...
  plugins: [
    alias:({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```

**Browserify**

添加到你项目的`package.json`

```js
{
  //...
  "browser":{
    "vue": "vue/dist/vue.common.js"
  }
}
```



#### 开发环境vs. 生产环境模式

开发环境/生产环境模式是硬编码的UMD构建：开发环境下不压缩代码，生产环境下压缩代码。

CommonJS 和ES Module 构建是用于打包工具的，因此我们不提供压缩后的版本。你有必要在打最终包时候压缩它们。

CommonJS 和ES Module 构建同时保留原始的`process.env.NODE_ENV` 检测，以决定它们应该运行在什么模式下。你应该使用适当的打包工具配置来替换它们的环境变量以便控制Vue所运行的模式。把`process.env.NODE_ENV`替换为字符串字面量同样可以让UglifyJS之类的压缩工具完全丢掉仅供开发环境的代码段，减少最终的文件尺寸。



**Webpack**

使用Webpack的[DefinePlugin](https://webpack.js.org/plugins/define-plugin/)：

```javascript
var webpack = require("webpack")

module.exports = {
  //..
  plugins:[
    //...
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify('production')
      }
    })
  ]
}
```

**Rollup**

使用[rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace)

```javascript
const replace = require('rollup-plugin-replace')

rollup({
  //...
  plugin:[
    replace:({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(...)
```

**Browserify**

为你的包提供一个全局[envify](https://github.com/hughsk/envify)

```
NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
```

也可以移步到[生产环境部署提示](https://cn.vuejs.org/v2/guide/deployment.html)。



#### csp 环境

有些环境，如 Google Chrome Apps ，强制应用内容安全策略 (CSP) ，不能使用 `new Function()` 对表达式求值。这时可以用 CSP 兼容版本。独立的构建取决于该功能编译模板，所以无法使用这些环境。

另一方面，运行时构建的是完全兼容 CSP 的。当通过 [Webpack + vue-loader](https://github.com/vuejs-templates/webpack-simple) 或者 [Browserify + vueify](https://github.com/vuejs-templates/browserify-simple) 构建时，在 CSP 环境中模板将被完美预编译到 `render` 函数中。



### 开发版构建

重要：Github仓库的`/dist`文件夹只有在新版本发布时才会更新。如果想要使用Github上Vue最新的源码，你需要自己构建！

```bash
git clone https://github.com/vuejs/vue.git node_modules/vue
cd node_module/vue
npm install
npm run dev
```



### Bower

Bower只提供UMD 构建

```bash
# 最新稳定版本
$ bower install vue
```



### AMD 模块加载器

所有UMD 构建都可以直接用作AMD模块。



> 原文：[http://vuejs.org/guide/installation.html](http://vuejs.org/guide/installation.html)


















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



---



## 介绍

### Vue.js 是什么

Vue.js时一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的塞设计。Vue的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与`单文件组件`和`Vue生态系统支持的库`结合使用时，Vue也完全能够为复杂的单页面应用程序提供驱动。



如果你是有经验的前端开发者，想知道Vue.js与其它库/框架的区别，查看[对比其它框架](https://cn.vuejs.org/v2/guide/comparison.html)



### 起步

> 官方指南假设你已有HTML、CSS 、和Javascript中级前端知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意--掌握好基础知识再来！之前有其它的框架的使用经验对于学习Vue.js是有帮助的，但这不是必需的。

尝试Vue.js最简单的方法是使用[JSFiddle Hello World](https://jsfiddle.net/chrisvfritz/50wL7mdz/)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础的用法。或者你可以创建一个`.html`文件，然后通过如下方式引入Vue：

```html
<script src="https://unpkg.com/vue"></script>	
```

你可以查看[安装教程](https://cn.vuejs.org/guide/installation.html)来了解其他安装Vue的选项。请注意我们不推荐新手直接使用`vue-cli`，尤其是对Node.js构建工具不够了解的同学。



### 声明式渲染

vue.js的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进DOM：

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data:{
    message: 'Hello Vue!'
  }
})
```

我们已经生成了我们的第一个Vue应用！看起来这跟单单渲染一个字符串模板非常类似，但是Vue在背后做了大量工作。现在数据和DOM已经被绑定在一起，所有的元素都是**响应式的。** 我们该如何知道呢？ 打开你的浏览器的控制台（就在这个页面打开），并修改`app.message`，你将看到上例相应地更新。

除了文本插值，我们还可以采用这样的方式绑定DOM元素属性：

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data:{
    message: '页面加载于' + new Data().toLocaleString()
  }
})
```



这里我们遇到点新东西。你看到的`v-bind`属性被称为**指令**。指令带有前缀`v-`，以表示它们是Vue提供的特殊属性。可能你已经猜到了，它们会在渲染的DOM上应用特殊的响应式行为。简而言之，这里该指令的作用是：“将这个元素节点的`title`属性和Vue实例的`message`属性保持一致”。

再次打开浏览器的Javascript控制台输入`app2.message ='新消息'`，就会再一次看到这个绑定了`title`属性的HTML已经进行了更新。



### 条件与循环

控制切换一个元素的显示也相当于简单：

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```js
var app3 = new Vue({
  el:'#app-3',
  data:{
    seen: true
  }
})
```

 继续在控制台设置`app3.seen = false`，你会发现“现在你看到我了” 消失了。

这个例子演示了我们不仅可以绑定DOM文本到数据，也可以绑定DOM结构到数据。而且，Vue也提供一个强大的过渡效果系统，可以在Vue插入/更新/删除元素时自动应用[过渡效果](https://cn.vuejs.org/v2/guide/transitions.html)。

还有其它很多指令，每个指令都有特殊的功能。例如，`v-for`指令可以绑定数组的数据来渲染一个项目列表：

```html
<div id="app-4">
	<ol>
      	<li v-for="todo in todos">
          	{{todo.text}}
        </li>
  	</ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data:{
    todos: [
      {text: '学习Javascript'},
      {text: '学习Vue'},
      {text: '整个项目'}
    ]
  }
})
```

在控制台里，输入`app4.todos.push({text: '新项目'})`，你会发现列表中添加一个新项。



### 处理用户输入

为了让用户和你的应用进行互动，我们可以用`v-on`指令绑定一个事件监听器，通过它调用我们Vue实例中定义的方法：

```html
<div id="app-5">
	<p>{{message}}</p>
  	<button v-on:click="reverseMessage">逆转消息</button>
</div>
```

```js
var app5 = new Vue({
  el:'#app-5',
  data:{
    messag:'Hello Vue.js!'
  },
  methods:{
    reverMessage: function(){
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

注意在`reverseMessage`方法中，我们更新了应用的状态，但没有触碰DOM--所有的DOM操作都由Vue来处理，你编写的代码不需要关注底层逻辑。

Vue还提供了`v-model`指令，它能轻松实现表单输入和应用状态之间的双向绑定。

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue'
  }
})
```



### 组件化应用构建

组件系统是Vue的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树。

在vue里，一个组件本质上是一个拥有预定义选项的一个Vue实例，在Vue中注册组件很简单：

```js
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```

现在你可以用它构建另一个组件模板：

```html
<ol>
  <todo-item></todo-item>
</ol>
```

但是这样会为每个代办项渲染同样的文本，这看起来并不炫酷，我们应该能将数据从父作用域传到子组件。让我们来修改一下组件的定义，使之能够接受一个属性：

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template:'<li>{{ todo.text }}</li>'
})
```

现在，我们可以使用`v-bind`指令将todo传到每一个重复的组件中：

```html
<div id="app-7">
  <ol>
    <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id">
    </todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其他什么人吃的东西' }
    ]
  }
})
```

这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过`props` 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的`todo-item`  组件实现更复杂的模板和逻辑的改进，而不是影响到父单元。

在一个大型应用中，有必要将整个应用程序划分为组件，以使开发可管理。在[后续教程](https://cn.vuejs.org/v2/guide/components.html)中我们将详述组件，不过这里有一个（假想的）使用了组件的应用模板是什么样的例子：

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### 与自定义元素的关系

你可能已经注意到Vue组件非常类似于**自定义元素**--它是[Web - 组件规范](https://www.w3.org/wiki/WebComponents/)的一部分，这是因为Vue的组件语法部分参考了该规范。例如Vue组件实现了[Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md)与`is`特性。但是，还是有几个关键差别：

1. web组件规范仍然处于草案阶段，并且尚无浏览器原生实现，相比之下，Vue组件不需要任何补丁，并且在所有支持的浏览器（IE9及更高版本）之下表现一致。必要时，Vue组件也可以包装于原生自定义元素之内。
2. Vue组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流，自定义事件通讯以及构建工具集成。



### 准备好了吗？

我们刚才简单介绍了 Vue 核心最基本的功能——本教程的其余部分将涵盖这些功能以及其他高级功能更详细的细节，所以请务必读完整个教程！


























# 基础

## 安装

**兼容性**

Vue.js 不支持IE8 及其以下版本，因为Vue.js使用了IE8不能模拟的ECMAScript 5特性。Vue.js支持所有[兼容ECMAScript 5的浏览器](http://caniuse.com/#feat=es5)



**更新日志**

每个版本的更新日志见[Github](https://github.com/vuejs/vue/releases)



### 直接`<script>`引用

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

---
## Vue实例
### 构造器
每个Vue.js应用都是通过构造函数`Vue`创建一个Vue的根实例启动的：
```js
var vm = new Vue({
  //
})
```
虽然没有完全遵循[MVVM模式](https://en.wikipedia.org/wiki/Model_View_ViewModel),Vue的设计无疑受到了它的启发。因此在文档中经常会使用`vm`（ViewModel的简称）这个变量名表示Vue实例

在实例化Vue时，需要传入一个**选项对象**，它可以包含数据、模版、挂载元素、方法、生命周期钩子等选项。全部的选项可以在[API文档](https://cn.vuejs.org/v2/api/#选项-数据)中查看。

```js
var MyComponent = Vue.extend({
  // 扩展选项
})
//所有的`MyComponent`实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```
尽管可以命名式地创建扩展实例，不过在多数情况下建议将组件构造器注册为一个自定义元素，然后声明式地用在模版中。我们将在后面详细说明[组件系统](https://cn.vuejs.org/guide/components.html)。现在你只需要知道所有的Vue.js组件其实都是被扩展的Vue实例。

### 属性与方法
每个Vue实例都会代理其`data`对象里所有的属性：
```js
var data = {a : 1}
var vm = new Vue({
  data: data
})
vm.a === data.a //true

//设置属性也会影响到原始数据
vm.a = 2
data.a  // --> 2
```
注意只有这些被代理的属性是**响应的**，也就是说值的任何改变都会触发视图的重新渲染。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。

除了data属性，Vue实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀`$`，以便与代理的data属性区分。例如：
```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data  //--> true
vm.$el === document.getElementById('example') //--> true

//$watch是一个实例方法
vm.$watch('a', function(newVal, oldVal){
  // 这个回调将在`vm.a`改变后调用
})

```

> 注意，不要在实例属性或者回调函数中（如`vm.$watch('a', newVal => this.myMethod())`） 使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)。因为箭头函数绑定父级上下文，所以`this`不会像预想的一样是 Vue实例，而且`this.myMethod`是未被定义的。

实例属性和方法的完整列表中查阅[API参考](https://cn.vuejs.org/v2/api/#实例属性)

### 实例生命周期
每个Vue实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测（data observer）、编译模版、挂载实例到DOM，然后在数据变化时更新DOM。这在和过程中，实例也会调用一些**生命周期钩子**，这就给我们提供了执行自定义逻辑的机会。例如，`created`这个钩子在实例被创建之后被调用：
```js
var vm = new Vue({
  data: {
    a: 1
  },
  created: function(){
    console.log('a is:' + this.a)
  }
})
// -> 'a is :1'
```
也有一些其它的钩子，在实例生命周期的不同阶段调用，如`mounted`、`updated`、`destroyed`。钩子的`this`指向调用它的Vue实例。一些用户可能会问Vue.js是否有“控制器”的概念？答案是：没有。组件的定义逻辑可以分布在这些钩子中。

### 生命周期图示
![](./lifecycle.png)

---
## 模版语法
Vue.js使用了基于HTML的模版语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据。所有Vue.js的模版都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

在底层的实现上，Vue将模版编译成虚拟DOM渲染函数。结合响应系统，在应用状态改变时Vue能够智能的计算出重新渲染组件的最小代价并应用到DOM操作上。

如果你熟悉虚拟DOM并且偏爱Javascript的原始力量，你可以不用模版，[直接写渲染(render)函数](https://cn.vuejs.org/v2/guide/render-function.html)，使用可选的JSX语法。


### 插值
#### 文本
数据绑定最常见的形式就是使用“Mustache”语法（双大括号）的文本插值：
```html
<span>Message: {{msg}}</span>
```
Mustache标签将会被代替为对应数据对象上`msg`属性的值。无论何时，绑定的数据对象上`msg`属性发生了变化，插值处的内容都会更新。

通过使用[v-once指令](https://cn.vuejs.org/v2/api/#v-once),你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上所有的数据绑定：
```html
<span v-once>这个将不会改变：{{msg}} </span>
```

#### 纯HTML
双大括号会将数据解释为纯文本，而非HTML。为了输出真正的HTML，你需要使用`v-html`指令：
```html
<div v-html="rawHtml"></div>
```
这个`div`的内容将会被替换成为属性值`rawHtml`，直接作为HTML--会忽略解析属性值中的数据绑定。注意，你不能使用`v-html`来复合局部模版，因为Vue不是基于字符串的模版引擎。反之，对于用户界面（UI），组件更适合作为可重用和可组合的基础单位。

> 你的站点上动态渲染的任意HTML可能会非常危险，因为它很容易导致xss攻击。请只对可信内容使用HTML插值，绝不要对用户提供的内容插值。

#### 特性
mustache语法不能作为在HTML特性上，遇到这种情况应该使用[v-bind指令](https://cn.vuejs.org/v2/api/#v-bind)
```html
<div v-bind:id="dynamicID"></div>
```
这同样适用于布尔类特性，如果求值结果是false的值，则该特性将会被删除：
```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

#### 使用Javascript表达式
迄今为止，在我们的模版中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js都提供了完成的Javascript表达表达式支持。
```html
{{number + 1}}
{{ok? 'YES': 'NO'}}
{{message.split('').reverse().join('')}}
<div v-bind:id="'list-' + id""></div>
```
这些表达式会在所属Vue实例的数据作用域下作为Javascript被解析。有个限制就是，每个绑定都只能包含单个表达式，所有下面的例子**都不会**生效。
```html
<!--这是语句不是表达式-->
{{ var a =1 }}
<!-- 流控制也不会生效， 请使用三元表达式 -->
{{if (ok) { return message }}}
```

> 模版表达式都被放在沙盒中，只能访问全局变量的一个白名单，如`Math`和`Date`。你不应该在模版表达式中试图访问用户定义的全局变量。

### 指令
指令（Directives）是带有`v-`前缀的特殊属性。指令属性的值预期是**单个javascript**表达式（`v-for`是例外情况，稍后我们再讨论）。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于DOM。回顾我们在介绍中看到的例子：
```html
<p v-if="seen">现在你看到我了</p>
```
这里，`v-if`指令将根据表达式`seen`的值的真假来插入/移除`<p>`元素。

#### 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind`指令可以用于响应式地更新HTML属性：
```html
<a v-bind:href="url"></a>
```
在这里`href`是参数，告知`v-bind`指令将该元素的`href`属性与表达式`url`的值绑定。另一个例子是`v-on`指令，它用于监听DOM事件：
```html
<a v-on:click="doSomething">
```
在这里参数是监听的事件名，我们也会更详细地讨论事件处理。

#### 修饰符
修饰符（Modifiers）是以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent`修饰符告诉`v-on`指令对于触发的事件调用`event.preventDefault()`：
```html
<form v-on:submit.prevent="onSubmit"></form>
```
之后当我更深入地了解`v-on`与`v-model`时，会揽到更多修饰符的使用。

### 过滤器
Vue.js允许你自定义过滤器，可被用作一个常见的文本格式化。过滤器可以用在两个地方：**mustache插值和`v-bind`表达式**。过滤器应该被添加在Javascript表达式的尾部，由“管道”符指示：
```html
{{message | capitalize}}

<div v-bind:id="rawId | formatId"></div>
```

> 由于最初计划过滤器的使用场景，是用于文本转换，所以Vue2.x过滤器只能用于双花括号插值（mustache interpolation）和`v-bind` 表达式中（后者在2.1.0+版本支持）。对于复杂的数据的转换，应该使用[计算属性](https://cn.vuejs.org/v2/guide/computed.html)

过滤器函数总接受表达式的值（之前的操作链的结果）作为第一个参数。在这个例子中，`capitalize`过滤器函数将会收到`message`的值作为第一个参数。
```js
new Vue({
  filters: {
    capitalize: function(value){
      if(!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
过滤器可以串联：
```js
{{message | filterA | filterB}}
```
在这个例子中，`filterA`被定义为接受单个参数的过滤器函数，表达式`message`的值将作为参数传入到函数中，然后继续调用同样被定义为接收单个参数的过滤器函数`filterB`，将`filterA`的结果传递到`filterB`中。

过滤器是Javascript函数，因此可以接受参数：
```js
{{message | filterA('arg1', arg2)}}
这里，`filterA`被定于为接受三个参数的过滤器函数。其中`message`的值作为第一个参数，普通字符串`arg1`作为第二个参数，表达式`agr2`取值后的值作为第三个参数。
```

### 缩写
`v-`前缀作为一种视觉提示，用来识别模版中Vue特定的特性。当你在使用Vue.js为现有标签添加动态行为(dynamic behavior)时，`v-`前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由Vue.js管理所有模块的`单页面应用程序（SPA- single page application）`时，`v-`前缀也变得没那么重要了。因此，Vue.js为`v-bind`和`v-on`这两个最常用的指令，提供了特定简写：

#### v-bind缩写
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a : href="url"></a>
```

#### v-on缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>

<!-- 缩写 -->
<a @click="doSomething"></a>
```

它们看起来可能与普通的HTML略有不同，但是`:`与`@`对于特性名来说都是合法字符在所有支持Vue.js的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。



## 计算属性
### 计算属性

模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">
	{{ message.split('').reverse().join('') }}
</div>
```

在这个地方，模板不再简单和清晰。你必须看一段时间才能意识到，这里是想要显示变量`message`的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。

这就是对于任何复杂逻辑，你都应当使用**计算属性**的原因。

#### 基础例子

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
    el: '#example',
  	data:{
        message: 'Hello'
    },
  	computed:{
    	//a computed getter
      reversedMessage: function(){
          //`this` point to the vm instance
          return this message.split('').reverse().join('')
      }
  	}
})
```

结果：

Original message:  "Hello"

Computed reversed message: "olleH"

这里我们声明了一个计算属性`reversedMessage`。我们提供的函数将用作属性`vm.reverseMessage`的getter函数：

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

你可以打开浏览器的控制台，自行修改例子中的vm。`vm.reversedMessage`的值始终取决于`vm.message`，因此当`vm.message`发生改变时，所有依赖于`vm.reversedMessage`的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的getter函数是没有连带影响（side effect），这使得它易于测试和推理。



#### 计算属性的缓存 vs 方法

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
methods:{
  reversedMessage:function(){
  	return this.message.split('').reverse().join('')
  }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。对于最终的结果，两种方式确实是相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。 计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 `  message`还没有发生改变，多次访问 `reversedMessage`计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为`Date.now()`不是相应式依赖：

```json
computed: {
  now : function(){
    return Date.now()
  }
}
```

 相比之下，每当触发重新渲染时，方法的调用方式将`总是`再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性A，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于A。如果没有缓存，我们将不可避免的多次执行A的getter！如果你不希望有缓存，请用方法来替代。

#### 计算属性 vs 被观察的属性

Vue确实提供了一种更加通用的方式来观察和响应Vue实例上的数据变动： `watch属性`。当你有一些数据需要随着其它数据的变动而变动时，你很容易滥用`watch` — 特别是如果你之前使用过AngularJS。然而，通常更好的想法是使用计算属性而不是命令式的`watch`回调。细想一下这个例子：

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
    el: "#demo",
  	data:{
        firstName: 'Foo',
      	lastName: 'Bar',
      	fullName: 'Foo Bar'
    },
  	watch:{
        firstName: function(val){
            this.fullName = val + ' ' + this.lastName
        },
      	lastName: function(val){
            this.fullName = this.firstName + ' ' + val
        }
    }
})
```

上面代码是命令式的和重复的。将它与计算属性的版本进行比较：

```js
var vm = new Vue({
  el: '#demo',
  data: {
      firstName: 'Foo',
      lastName: 'Bar'
  },
  computed: {
      fullName: function(){
          return this.firstName + ' ' + this.lastName 
      }
  }
})
```

好得多了，不是吗？



#### 计算setter

计算属性默认只有getter，不过在需要时你也可以提供一个setter：

```js
// ...
computed: {
  fullName:{
    get: function(){
 		return this.firstName + ' ' + this.lastName     
    },
    set: function(newValue){
        var names = newValue.split(' ')
        this.firstName = names[0]
      	this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行`vm.fullName = 'John Doe'`时，setter会被调用，`vm.firstName`和`vm.lastName`也相应地会被更新。



### 观察者

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的watcher。这是为什么Vue通过`watch`选项提供一个更通用的方式，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。

例如：

```html
<div id="watch-example">
  <p>
  	Ask a yes/no question:
   	<input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to just use what you're familiar with. -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // ajax 请求直到用户输入完毕才会发出
    // 学习更多关于 _.debounce function (and its cousin
    // _.throttle), 参考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})
</script>
```

在这个示例中，使用`watch`选项允许我们执行异步操作（访问一个API），限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这是计算属性无法做到的。

除了`watch` 选项之外，您还可以使用[vm.$watch API](https://cn.vuejs.org/v2/api/#vm-watch)命令。



## Class与Style绑定
数据绑定一个常见需求是操作元素的class列表和它的内联样式。因为它们都是属性，我们可以用`v-bind`处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在`v-bind`用于`class`和`style`时，Vue.js专门增加了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

### 绑定HTML Class

#### 对象语法

我们可以传给`v-bind:class`一个对象，以动态地切换class:

```html
<div v-bind:class="{active: isActive}"></div>
```

上面的语法表示class`acative`的更新将取决于数据属性`isActive`是否为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)。

你可以在对象中传入更多属性用于动态切换多个class。此外，`v-bind-class`指令也可以与普通的class属性共存。如下模板：

```html
<div class="static" v-bind:class="{active: isActive, 'text-danger': hasError}"</div>
```

如下data:

```js
data: {
  isActive: true,
  hasError: false
}
```

渲染为：

```html
<div class="static active"></div>
```

当`isActive`或者`hasError`变化时，class列表将相应地更新。例如，如果`hasError`的值为`true`，class列表将变化为`static active text-danger`。

你也可以直接绑定数据里的一个对象：

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject:{
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```html
<div v-bind:class="classObject"></div>
```

```js
data:{
    isActive: true,
    error: null
},
computed:{
    classObject : function(){
        return {
            active； this.isActive && !this.error,
          	'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}
```

#### 数组语法

我们可以把一个数组传给`v-bind:class`，以应用一个class列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的class，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

此例始终添加`errorClass`，但是只有`isActive`是`true`时添加`activeClass`。

不过，当有多个条件class时这样写有些繁琐。可以在数组语法中使用对象语法：

```html
<div v-bind:class="[{active: isActive}, errorClass]"></div>
```



#### 用在组件上

> 这个章节假设你已经对Vue组件有一定的了解。当然你也可以跳过这里，稍后再回头来看。

当你在一个自定义组件用到`class`属性的时候，这些类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖。

例如，如果你声明了这个组件：

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些class：

```html
<my-component class="baz boo"></my-component>
```

HTML最终将被渲染成为：

```html
<p class="foo bar baz boo"></p>
```

同样的适用于绑定HTML class:

```html
<my-component :class="{active: isActive}"></my-component>
```

当`isActive`为true的时候，HTML将被渲染成为：

```html
<p class="foo bar active"></p>
```



### 绑定内联样式

#### 对象语法

`v-bind:style`的对象语法十分直观 — 看着非常像css，其实它是一个Javascript对象。CSS属性名可以用驼峰式（camelCase）或（配合引号的）短横分隔命名（kebab-case）:

```html
<div v-bind:style="{color: activeColor, fontSize: fontSize + 'px'}"></div>
```

```js
data:{
    activeColor: 'red',
    fontSize: 30
}
```

直接绑定到一个样式对象通常更好，让模板更清晰：

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject:{
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。



#### 数组语法

`v-bind:style`的数组语法可以将多个样式对象应用到一个元素上：

```html
<div v-bind:style="[baseStyle, overridingStyle]"></div>
```

#### 自动添加前缀

当`v-bind:style`使用需要特定前缀的css属性时，如`transform`，Vue.js会自动侦测并添加相应的前缀。

#### 多重值

> 2.3.0 +

从2.3.0起你可以为`style`绑定中的属性提供一个包含多个值得数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{sidplay: ['-webkit-box', '-ms-flexbox', 'flex']}"></div>
```

这会渲染数组中最后一个被浏览器支持的值。在这个例子中，如果浏览器支持不带浏览器前缀的flexbox，那么渲染结果会是`display: flex`。



## 条件渲染
### v-if
#### 在<template>中配合v-if条件渲染一整组
#### v-else
#### v-else-if
#### 用key管理可复用的元素
### v-show
### v-show vs v-if
### v-if 与 v-for一起使用

##列表渲染
### v-for 
#### 基础用法
#### Template v-for
#### 对象迭代v-for
#### 整数迭代v-for
#### 组件和v-for
#### v-for with v-if
### key
### 数组更新检测
#### 变异方式
#### 重塑数组
#### 注意事项
### 显示过滤/排序结果

## 事件处理器
### 监听事件
### 方法事件处理器
### 内联处理器方法
### 事件修饰符
### 键值修饰符
### 修饰键
#### 滑鼠按键修饰符
### 为什么在HTML中监听事件？

## 表单控件绑定
### 基础用法
#### 文本
#### 多行文本
#### 复选框
#### 单选按钮
#### 选择列表
### 绑定value
#### 复选框
#### 单选按钮
#### 选择列表设置
### 修饰符
#### .lazy
#### .number
#### trim
### v-model与组件

## 组件
### 什么是组件？
### 使用组件
#### 注册
#### 局部注册
#### DOM模版解析说明
#### data必须是函数
#### 构成组件
### Prop
#### 使用Prop传递数据
#### camelCase vs. kebab-case
#### 动态Prop
#### 字面量语法vs动态语法
#### 单向数据流
#### Prop验证
### 非Prop属性
#### 替换/覆盖现有的特性
### 自定义事件
#### 使用v-on绑定自定义事件
#### 给组件绑定原生事件
#### .sync修饰符
#### 使用自定义事件的表单输入组件
#### 定制组件的v-model
#### 非父子组件通信
### 使用Slot分发内容
#### 编译作用域
#### 单个slot
#### 具名slot
#### 作用域插槽
### 动态组件
#### keep-alive
### 杂项
#### 编写可复用组件
#### 子组件索引
#### 异步组件
#### 高级异步组件
#### 组件命名约定
#### 递归组件
#### 组件间的循环引用
#### 内联模版
#### X-Templates
#### 对低开销的静态组件使用v-once




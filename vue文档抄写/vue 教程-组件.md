## 组件

### 什么是组件？

组件(Component)是Vue.js最强大的功能之一。组件可以扩HTML元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js的编译器为它添加特殊功能。在有些情况下，组件也可以是原生HTML元素的形式，以`is`特性扩展。

### 使用组件

#### 注册

之前说过，我们可以通过以下方式创建一个Vue实例：

```js
new Vue({
  el: '#some-element',
})
```

要注册一个全局组件，你可以使用`Vue.component(tagName, options)`。例如：

```js
Vue.component('my-component', {
  // 选项
})
```



> 对于自定义标签名，Vue.js不强制要求遵循[W3C规则](https://www.w3.org/TR/custom-elements/#concepts)（小写，并且包含一个短杠），尽管遵循这个规则比较好。

组件在注册之后，便可以在父实例的模块中以自定义元素`<my-component></my-component>`的形式使用。要确保在初始化根实例**之前**注册了组件:

```html
<div id="example">
  <my-component></my-component>
</div>
```

```js
// 注册
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
})

//创建根实例
new Vue({
    el: '#example'
})
```

渲染为：

```html
<div id="example">
  <div>A custom component!</div>
</div>
```



#### 局部注册

不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：

```js
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
    components:{
        'my-component': Child
    }
})
```

这种封装也适用于其它可注册的Vue功能，如指令。



#### DOM模版解析说明

当使用DOM作为模板事（例如，将`el`选项挂载到一个已经存在的元素上），你会受到HTML的一些限制，因为Vue只有在浏览器解析和标准化HTML后才能获取模板内容。尤其像这些元素`<ul>`，`<ol>`,`<table>`，`<select>`限制了能被它包裹的元素，而一些像`option`这样的元素只能出现在某些其他元素内部。

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```html
<table>
  <my-row></my-row>
</table>
```

自定义组件`<my-row>`被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的`is`属性：

```html
<table>
  <tr is="my-row"></tr>
</table>
```

**应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：**

- `<script type="text/x-template">`
- Javascript内联模板字符串
- `.vue`组件

因此，有必要的话请使用字符串模板。



#### data必须是函数

通过Vue构造器传入的各选项大多数可以在组件里用。`data`是一个例外，它必须是函数。

实际上，如果你这么做：

```js
Vue.component('my-component', {
    template:'<span>{{message}}</span>',
  	data: {
        message: 'hello'
    }
})
```

那么Vue会停止，并在控制台发出警告，告诉你在组件中`data`必须是一个函数。理解这种规则的蹲在意义很有帮助，让我们假设用如下方式来绕开Vue的警告：

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```js
var data = { counter: 0 }
Vue.compoment('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  	//技术上data得确是一个函数来，因此Vue不会警告
  	//但是我们返回给每一个组件的事例却引用了同一个data对象
  	data: function(){
        return data
    }
})

new Vue({
    el: '#example-2'
})
```

由于这三个组件共享了同一个`data`，应次增加了一个counter会影响所有组件！这不对。我们可以通过为每个组件返回全新的data对象来解决这个问题：

```js
data: function(){
    return {
        counter: 0
    }
}
```

现在每个counter都有它自己内部的状态了



#### 组合组件

组件意味着协同工作，通常父组件会是这样的关系：组件A在它模板中使用了组件B。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告诉父组件。然而，在一个良好定义的接口中尽可能将父子组件解耦很重要的。这保证来每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。

在Vue中，父子组件的关系可以总结为props down，events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息，看看它们是怎么工作的。



### Props

#### 使用Prop传递数据

组件实例的作用域是**孤立的**。这意味着不能（也不应该）在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的props选项。

子组件要显式地用`props`[选项](https://cn.vuejs.org/v2/api/#props)声明它期待获得的数据：

```js
Vue.component('child', {
    //声明props
  props: ['message'],
  template: '<span>{{message}}</span>'
})
```

然后我们可以这样向它传入一个普通字符串：

```html
<child message="hello!"></child>
```



#### camelCase vs. kebab-case

HTML特性是不区分大小写的。所以，当使用的不是字符串模板，camelCased(驼峰式)命名的prop需要转换为相对应的kabab-case（短横线隔开式）命名：

```js
Vue.component('child', {
    //camelCase in Javascript
 	porps: ['myMessage'],
  	template: '<span>{{ myMessage}}</span>'
})
```

```html
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

如果你使用字符串模板，则没有这些限制。



#### 动态Props

在模板中要动态地绑定父组件的数据到子模板的props，与绑定到任何普通的HTML特性像类似，就是用`v-bind`。每当父组件的数据变化时，该变化也会传导给子组件：

```html
<div>
	<input v-model="parentMsg">
  	<br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

使用`v-bind`的缩写语法通常更简单：

```html
<child :my-message="parentMsg"></child>
```

如果你想要用一个对象作为props传递所有的属性，你可以使用不带任何参数的`v-bind`（即用`v-bind`替换掉`v-bind:prop-name`）。例如，已知一个`todo`对象：

```js
todo: {
    text: 'Learn Vue',
    isComplete: false
}
```

然后：

```html
<todo-item v-bind="todo"></todo-item>
```

将等价于：

```html
<todo-item
   v-bind:text="todo.text"
   v-bind:is-complete="todo.isComplete"
></todo-item>
```



#### 字面量语法vs动态语法

初学者常犯的一个错误是使用字面量语法传递数据：

```html
<comp some-prop="1"></comp>
```

因为它是一个字面prop，它的值是字符串`"1"`而不是number。如果想传递一个实际的number，需要使用`v-bind`，从而让它的值被当做Javascript表达式计算：

```html
<comp v-bind:some-prop="1"></comp>
```



#### 单向数据流

prop是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意义修改了父组件的状态—这会让应用的数据流难以理解。

另外，每次父组件更新时，子组件的所有prop都会更新为最新值。这意味着你不应该在子组件内部改变prop。如果你这么做了，Vue会在控制台给出警告。

为什么我们会有修改prop中数据的冲动呢？通常是这两种原因：

1. prop作为初始值传入后，子组件想把它当作局部数据来用；
2. prop作为初始值传入，由子组件处理成其他数据输出。

对这两种原因，正确的应对方式是：

1. 定义一个局部变量，并用prop的值初始化它：

   ```js
   props: ['initialCounter'],
   data: function(){
       return {counter: this.initialCounter}
   }
   ```

2. 定义一个计算属性，处理prop的值并返回。

   ```js
   props: ['size'],
   computed:{
       normalizedSize: function(){
           return this.size.trim().toLowerCase()
       }
   } 
   ```



> 注意在javascript中对象和数组是引用类型，指向同一个内存空间，如果prop是一个对象或数组，在子组件内部改变它**会影响**父组件的状态。



#### Prop验证

我们可以为组件的prop指定验证规则。如果传入的数据不符合要求，Vue会发出警告。这对于开发给他人使用的组件非常有用。

要指定验证规则，需要用对象的形式来定义prop，而不能用字符串数组：

```js
Vue.component('example', {
  props: {
    // 基础类型检测(`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
          renturn { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
        validator: function (value) {
            return value > 10
        }
     }
  }
})
```

`type`可以是下面原生构造器：

- String
- Number
- Boolean
- Function
- Object
- Array
- Symbol



`type`也可以是一个自定义构造器函数，使用`instanceof`检测。

当prop验证失败，Vue会抛出警告（如果使用的是开发版本）。注意prop会在组件实例创建之前进行校验，所以在`default`或`validator`函数里，诸如`data`,`computed`或者`methods`等实例属性还无法使用。



### 非Prop特性

所谓非prop特性，就是值它可以直接传入组件，而不需要定义相应的prop。

尽管为组件定义明确的prop是推荐的传参方式，组件的作者却并不总能预见到组件被使用的场景。所以，组件可以接受任意传入的特性，这些特性都会被添加到组件根元素上。

例如，假设我们使用了第三方组件`bs-date-input`，它包含一个Bootstrap插件，该插件需要在`input`上添加`data-3d-date-picker`这个特性。这时可以把特性直接添加到组件上(不需要事先定义`prop`)：

```html
<bs-date-input data-3d-date-picker="true"></bs-date-input>
```

添加属性`data-3d-date-picker="true"`之后，它会被自动添加到`bs-date-input`的根元素上。



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




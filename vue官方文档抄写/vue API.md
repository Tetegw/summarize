

## 全局配置

`Vue.config`是一个对象，包含Vue的全局配置，可以在启动应用之前修改下列属性：

---
### silent

- 类型：`boolean`
- 默认值：`false`
- 用法：
    ```javascript
    Vue.config.silent = true
    ```
    取消Vue所有的日志与警告

---
### optionMergeStrategies

- 类型：{[key: string]: Function}
- 默认值：{}
- 用法： 
    ```javascript
    Vue.config.optionMergeStrategies._my_option = function(parent, child, vm){
        return child + 1
    }
    const Profile = Vue.extend({
        _my_option: 1
    })
    ```
    自定义合并策略的选项

    合并策略选项分别接受第一个参数作为父实例，第二个参数为子实例，Vue实例上下文被作为第三个参数传入

 ---
### devtools

- 类型：`boolean`
- 默认值： `true`（生产版为`false`）
- 用法：
    ```javascript
    //务必在加载Vue之后，立即同步设置以下内容
    Vue.config.devtools = true
    ```
    配置是否允许vue-devtools检查代码。开发版默认为`true`, 生产版默认是`false`。生产版本设为`true`可以启用检查

---
### errorHandler

- 类型：`Function`
- 默认值：`undefined`
- 用法：
    ```javascript
    Vue.config.errorHandler = function (err, vm, info){
        //handle error
        //`info`是Vue特定的错误信息，比如错误所在的生命周期钩子
        //只在2.2.0+ 可用
    }
    ```
    指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和Vue实例。

    > 从2.2.0起，这个钩子也会捕获组件生命周期钩子里的错误。同样的，当这个钩子是`undefined`时，被捕获的错误会通过`console.error`输出而避免应用被崩溃。
    > 从2.4.0起这个钩子也会捕获Vue自定义事件句柄内部的错误了。

---
### warnHandler

> 2.4.0 新增

- 类型：`Function`
- 默认值：`undefined`
- 用法： 
    ```javascript
    Vue.config.warnHandler = function (msg, vm, trace){
        //`trace` 是组件的继承关系追踪
    }
    ```
    为Vue的运行时警告赋予一个自定义的句柄。注意这只会在开发者环境下生效，在生产环境下它会被忽略。

---
### ignoredElements

- 类型：`Array<string>`
- 默认值：[]
- 用法：
    ```javascript
    Vue.config.ignoredElements = [
        'my-custom-web-component', 'another-web-component'
    ]
    ```
    须使Vue忽略在Vue之外的自定义元素（e.g.,使用了Web.Components APIs）。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于`Unknow custom element`的警告。

---
### keyCodes

- 类型： `{[key: string]: number | Array<number>}`
- 默认值：{}
- 用法：
    ```javascript
    Vue.config.keyCodes = {
        v: 86,
        f1: 112,
        //camelCase 不可用
        mediaPlayPause: 179,
        //取而代之的是kebab-case且用双引号括起来
        "media-play-pause": 179,
        up:[38, 87]
    }
    ```
    ```html
    <input type="text" @keyup.media-play-pause="method"></input>
    ```
    给`v-on`自定义键位别名

---
### performance

> 2.2.0 新增
- 类型： `boolean`
- 默认值： `false（自2.2.3起）`
- 用法：
    设置为`true`以在浏览器开发工具中启用对组件初始化，渲染和打补丁的性能追踪。只适用于开发模式和支持`performance.mark`API的浏览器上。

---
### productionTip

> 2.2.0 新增
- 类型： `boolean`
- 默认值： `true`
- 用法：
    设置为`false`以阻止vue在启动时生成生产提示。


---



## 全局API

### Vue.extend(options)

- 参数：
    - `{objext} options`
- 用法：
    使用基础Vue构造器，创建一个“子类”。参数是一个包含组件选项的对象。

    `data`选项是特例，需要注意-在`Vue.extend()`中它必须是函数

    ```html
    <div id="mount-point"></div>
    ```
    ```javascript
    //创建构造器
    var Profile = Vue.extend({
        template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
        data: function(){
            return {
                firstName: 'Walter',
                lastName: 'White',
                alias: 'Heisenberg'
            }
        }
    })
    //创建Profile实例，并挂在到一个元素上。
    new Profile().$mount('#mount-point')
    ```
    结果如下：
    ```javascript
    <p>Walter White aka Heisenberg</p>
    ```
- 参考：[组件](https://cn.vuejs.org/v2/guide/components.html)

---

### Vue.nextTick([callback, context])

- 参数
    - `{Function} [callback]`
    - `{Object} [context]`

- 用法：
    在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
    ```javascript
    //修改数据
    vm.msg = 'Hello'
    //DOM还没有更新
    Vue.nextTick(function(){
        //DOM更新了
    })
    ```
    > 2.1.0 起新增：如果没有提供回调且支持promise的环境中返回promise。
- 参考：[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

---

### Vue.set(target, key, value)

- 参数：
    - `{Object | Array} target`
    - `{string | number} key`
    - `{any} value`
- 返回值：设置的值
- 用法： 
    设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同事触发视图更新。这个方法主要用于避开Vue不能检测属性被添加的限制。

    **注意对象不能是Vue实例， 或者Vue实例的根数据对象**
- 参考：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

---

### Vue.delete(target, key)

- 参数：
    - `{Object | Array} target`
    - `{string | number} key/index`
    > 仅在2.2.0+版本中支持Array + index 用法
- 用法：
    删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开Vue不能检测到属性被删除的限制，但是你应该很少会使用它。
    > 在2.2.0+中同样支持在数组上工作

    > 目标对象不能是一个Vue示例或实例的跟数据对象
- 参考：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

---
### Vue.directive(id, [definition])

- 参数：
    - `{string} id`
    - `{Function | Object} [definition]`
- 用法：
    注册或获取全局指令
    ```javascript
    //注册
    Vue.directive('my-directive', {
        bind: function(){},
        inserted: function(){},
        update: function(){}
        componentUpdated: function(){},
        unbind: function(){}
    })

    //注册（传入一个简单的指令函数）
    Vue.directive('my-directive', function(){
        //这里将会被`bind`和`update`调用
    })

    //getter，返回已注册的指令
    var myDirective = Vue.directive('my-directive')
    ```
    -参考： [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

---
### Vue.filter(id, [definition])

- 参数：
    - `{string} id`
    - `{Function} [definition]`
- 用法：
    注册或获取全局过滤器
    ```javascript
    //注册
    Vue.filter('my-filter', function(){
        //返回处理后的值
    })

    //getter，返回已注册的过滤器
    var myFilter = Vue.filter('my-filter')
    ```

---
### Vue.component(id, [definition])

- 参数：
    - `{string} id`
    - `{Function | Object} [definition]`
- 用法：
    注册或获取全局组件。注册还会自动使用给定的`id`设置组件的名称
    ```javascript
    //注册组件，传入一个扩展过的构造器
    Vue.component('my-component', Vue.extend({}))

    //注册组件，传入一个选项对象（自动调用Vue.extend）
    Vue.component('my-component', {})

    //获取注册的组件（始终返回构造器）
    var MyComponent = Vue.component('my-component')
    ```
- 参考：[组件](https://cn.vuejs.org/v2/guide/components.html)

---
### Vue.use(plugin)

- 参数：
    - `{Object | Function} plugin`
- 用法：
    安装Vue.js插件。如果插件是一个对象，必须提供`install`方法。如果插件是一个函数，它会被作为install方法。install方法将被作为Vue的参数调用。

    当install方法被同一个插件多次调用，插件将只会被安装一次。
- 参考：[插件](https://cn.vuejs.org/v2/guide/plugins.html)  

---
### Vue.mixin(mixin)

- 参数：
    - `{Object} mixin`
- 用法：
    全局注册一个混合，影响注册之后所有创建的每个Vue实例。插件作者可以使用混合，向组件注入自定义的行为。**不推荐在应用代码中使用**
- 参考：[全局混合](https://cn.vuejs.org/v2/guide/mixins.html#全局混合)

---
### Vue.complie(template)

- 参数：
    - `{string} template`
- 用法：
    在render函数中编译模版字符串。**只在独立构建时有效**
    ```javascript
    var res = Vue.compile('<div><span>{{msg}}</span></div>')
    new Vue({
        data:{
            msg: 'hello'
        },
        render: res.render,
        staticRenderFns: res.staticRenderFns
    })
    ```
- 参考：[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

---
### Vue.version

- 细节：提供字符串形式的Vue安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。
- 用法：
    ```javascript
    var version = Number(Vue.version.split('.')[0])
    if(version === 2){
        //Vue v2.x.x
    }else if(version === 1){
        //Vue v1.x.x
    }else{
        //Unsupported versions of Vue
    }
    ```




---



## 选项/数据

### data

- 类型：`Object | Function`
- 限制： 组件的定义只接受`function`。
- 详细： 
    Vue实例的数据对象，Vue将会递归将data的属性转换为getter/setter，从而让data的属性能够响应数据变化。**对象必须是纯粹的对象（含有零个或多个的key/value对）**：浏览器API创建的原生对象，原型上的属性会被忽略。大概来说，data应该只能是数据-不推荐观察拥有状态行为的对象。

    一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。

    实例创建之后，可以通过`vm.$data`访问原始数据对象。Vue实例也代理了data对象上所有的属性，因此访问`vm.a`等价于访问`vm.$data.a`

    以`_`或`$`开头的属性**不会**被Vue实例代理，因为他们可能和Vue内置的属性、API方法冲突。你可以使用例如`vm.$data._property`的方式访问这些属性。

    当一个**组件**被定义，`data`必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果`data`仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供`data`函数，每次创建一个新实例后，我们能够调用`data`函数，从而返回初始数据的一个全新副本数据对象。

    如果需要，可以通过将`vm.$data`传入`JSON.parse(JSON.stringify(...))`得到深拷贝的原始数据对象。

- 示例：
    ```javascript
    var data = { a: 1 }

    //直接创建一个实例
    var vm = new Vue({
        data: data
    })
    vm.a // -> 1
    vm.$data === data // -> true

    //Vue.extend() 中data必须是函数
    var Component = Vue.extend({
        data: function(){
            return { a: 1 }
        }
    })
    ```
    > 注意，**不应该对`data`属性使用箭头函数**
    > （例如`data: () => {return {a: this.myProp}}`）。理由是箭头函数绑定了父级作用域的上下文，所以this将不会按照期望指向Vue实例，`this.myProp`将是undefined。

- 参考：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

---
### props

- 类型： `Array<string> | Object`
- 详细：
    props可以是数组或对象，用于接收来自父组件的数据。props可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值
- 示例：
    ```javascript
    //简单语法
    Vue.component('props-demo-simple', {
        props: ['size', 'myMessage']
    })

    //对象语法，提供校验
    Vue.component('props-demo-advanced', {
        props:{
            height: Number,
            age: {
                type: Number,
                default: 0,
                required: true,
                validator: function(value){
                    return value >= 0
                }
            }
        }
    })
    ```
- 参考：[Props](https://cn.vuejs.org/v2/guide/components.html#Props)

---
### propsData

- 类型：`{[key: string]: any}`
- 限制：只用于`new`创建的实例中。
- 详细：
    创建实例时传递props。主要作用是方便测试。
- 示例：
    ```javascript
    var Comp = Vue.extend({
        props: ['msg'],
        template: '<div>{{msg}}</div>'
    })

    var vm = new Comp({
        propsData: {
            msg: 'hello'
        }
    })
    ```
- 参考：[Props](https://cn.vuejs.org/v2/guide/components.html#Props)

---
### computed

- 类型：`{[key: string]: Function | {get: Function, set: Function}}`
- 详细：
    计算属性将被混入到Vue实例中。所有的getter和setter的this上下文自动地绑定为Vue实例。

    > 注意，**不应该使用箭头函数来定义计算属性函数**（例如`aDouble: () => this.a * 2`）。理由是箭头函数绑定了父级作用域的上下文，所以`this`将不会按照期望指向Vue实例，`this.a`将是undefined。

    计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果实例范畴之外的依赖（比如非响应式的not reactive）是**不会**触发计算属性更新的。

- 示例：
    ```javascript
    var vm = new Vue({
        data: {a: 1},
        computed: {
            aDouble: function(){
                return this.a*2
            },
            aPlus: {
                get: function(){
                    return this.a + 1
                },
                set: function(v){
                    this.a = v - 1
                }
            }
        }
    })
    vm.aPlus    // -> 2
    vm.aPlus = 3
    vm.a        // -> 2
    vm.aDouble  // -> 4
    ```
- 参考： [计算属性](https://cn.vuejs.org/v2/guide/computed.html)

---
### methods

- 类型：`{[key: string]: Function}`
- 详细：
    methods将被混入到Vue实例中，可以直接通过vm实例访问这些方法，或者在指令表达式中使用。方法中的`this`自动绑定为Vue实例。

    > 注意，**不应该使用箭头函数定义method函数**（例如 `plus: () => this.a++`）。理由是箭头函数绑定了父级作用域的上下文，所以`this`将不会按照期望指向Vue实例，`this.a`将是undefined。
- 示例：
    ```javascript
    var vm = new Vue({
        data: { a: 1 },
        methods: {
            plus: function(){
                this.a++
            }
        }
    })
    vm.plus()
    vm.a    //2
    ```
- 参考：[事件处理器](https://cn.vuejs.org/v2/guide/events.html)

---
### watch

- 类型： `{[key: string]: string | Function | Object}`

- 详细：
    一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，获取包含选项的对象。Vue实例将会在实例化时调用`$watch()`， 遍历watch对象的每一个属性。

- 示例：
    ```javascript
    var vm = new Vue({
        data: {
            a: 1,
            b: 2,
            c: 3
        },
        watch: {
            a: function(val, oldVal){
                console.log(`new: %s, old: %s`, val, oldVal)
            },
            //方法名
            b: 'someMethod',
            //深度watcher
            c: {
                handler: function(val, oldVal){},
                deep: true
            }
        }
    })
    vm.a = 2    // -> new:2, old: 1
    ```

    > 注意，**不应该使用箭头函数来定义watcher函数**（例如`searchQuery: newValue => this.updateAutocomplete(newValue)`）。理由是箭头函数绑定了父级作用域的上下文，所以`this`将不会按照期望指向Vue实例，`this.updateAutocomplete`将是undefined。

- 参考：[实例方法/数据-vm.$watch](https://cn.vuejs.org/v2/api/#vm-watch) 




---



## 选项/DOM

### el

- 类型：`string | HTMLElement`
- 限制：只在由`new`创建的实例中遵守
- 详细：
    提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是一个HTMLElement实例。

    在实例挂载之后，元素可以用`vm.$el`访问。

    如果这个选项在实例化时有作用，实例将立即进入编译过程，否则，需要显式调用`vm.$mount()` 手动开启编译。

    > 提供的元素只能作为挂载点。不同于Vue 1.x，所有的挂载元素会被Vue生成的DOM替换。因此不推荐挂载root实例到`<html>`或者`<body>`上。

    > 如果`render`函数和`template`属性都不存在，挂载DOM元素的HTML会被提取出来用作模版，此时，必须使用Runtime + Compiler构建的Vue库。

- 参考：
    - [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)
    - [独立构建-vs-运行时构建](https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建)

---
### template

- 类型：`string`
- 详细：
    一个字符串模版作为Vue实例的标识使用。模版将会**替换**挂载的元素。挂载元素的内容都将被忽略，除非模版的内容有分发slot。

    如果值以`#`开始，则它用作选项符，将使用匹配元素的innerHTML作为模版。常用的技巧是用`<script type="x-template">`包含模版。

    > 出于安全考虑， 您应该只使用您信任的Vue模版。避免使用其他人生成的内容作为您的模版。
    > 如果Vue选项中包含`render`函数，template选项将被忽略。

- 参考：
    - [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)
    - [用Slots分发内容](https://cn.vuejs.org/v2/guide/components.html#使用-Slot-分发内容)

---
### render

- 类型：`(createElement: () => VNode) => VNode`
- 详细：
    字符串模版的替代方案，允许你发挥javascript最大的编程能力。`render`函数接收一个`createElement`方法作为第一个参数用来创建`VNode`。

    如果组件是一个函数组件，渲染函数还会接收一个额外的`context`参数，为没有实例的函数组件提供上下文信息。

    > Vue选项中的`render`函数若存在，则Vue构造函数不会从`template`选项或同各国`el`选项指定的挂载元素中提取出的HTML模版编译`render`函数。

- 参考：[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

---
### renderError

> 2.2.0新增
- 类型：`(createElement: () => VNode, error: Error) => VNode`

- 详细：
    **只在开发环境下工作**
    当`render`函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到`renderError`。这个功能配合hot-reload非常有用。

- 示例：
    ```javascript
    new Vue({
        render(h){
            throw new Error('oops')
        },
        renderError(h, err){
            return h('pre', {style: {color: 'red'}}, err.stack)
        }
    }).$mount('#app')
    ```

- 参考：[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)




---



## 选项/生命周期钩子



> 所有的生命周期钩子自动绑定`this`上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着**你不能使用箭头函数来定义一个生命周期饭方法**（例如`created: () => this.fetchTodos()`）。这是因为箭头函数绑定了父上下文，因此`this`与你期待的Vue实例不同，`this.fetchTodos`的行为未定义。



### beforeCreate

- 类型：`Function`

- 详细：

  在实例初始化之后，数据观测（data observer）和event/watcher事件配置之前被调用。

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### created

- 类型：`Function`

- 详细：

  实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测（data observer），属性和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，`$el`属性目前不可见。

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### beforeMount

- 类型：`Function`

- 详细：

  在挂载开始之前被调用：相关的`render`函数首次被调用。

  **该钩子在服务器端渲染期间不被调用**

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### mounted

- 类型：`Function`

- 详细：

  `el`被新创建的`vm.$el`替换，并挂载到实例上去之后调用该钩子。如果root实例挂载了一个文档内元素，当`mounted`被调用时`vm.$el`也在文档内。

  **该钩子在服务器端渲染期间不被调用**

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### beforeUpdate

- 类型：`Function`

- 详细：

  数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。

  你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

  **该钩子在服务器端渲染期间不被调用**

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



###  updated

- 类型： `Function`

- 详细：

  由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。

  当这个钩子被调用时，组件DOM已经更新，所以你现在可以执行依赖于DOM的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要响应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或[watcher](https://cn.vuejs.org/v2/api/#watch)取而代之。

  **该钩子在服务器端渲染期间不被调用**

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### activated

- 类型：`Function`

- 详细：

  keep-alive组件激活时调用

  **该钩子在服务器端渲染期间不被调用**

- 参考：

  - 构建组件 - keep-alive
  - 动态组件 - keep-alive



### deactivated

- 类型：`Function`

- 详细：

  实例销毁之前调用。在这一步，实例仍然完全可用

  **该钩子在服务器端渲染期间不被调用。**

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)



### destroyed

- 类型：`Function`

- 详细：

  Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会被解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)


---





## 选项/资源

### directives

- 类型：`Object`
- 详细：
- 参考：[自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)



### filters

- 类型：`Object`
- 详细：
- 参考：`Vue.filter`



### components

- 类型：`Object`
- 详细：
- 参考：[组件](https://cn.vuejs.org/v2/guide/components.html)





## 选项/组合

### parent

- 类型：`Vue instance`

- 详细：

  指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用`this.$parent`访问父实例，子实例被推入父实例的`$children`数组中。

  > 同时使用`$parent`和`$children`有冲突 - 他们作为统一入口。更推荐用props和events实现父子组件通信


---

### mixins

- 类型：`Array<object>`

- 详细：

  `mixins` 选项接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项，他们将在`Vue.extend()` 里最终选择使用相同的选项合并逻辑合并。 举例：如果你混合包含一个钩子而创建组件本身也有一个，两个函数将被调用。

  Mixin钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。

- 示例：

  ```javascript
  var mixin = {
  	created: function(){ console.log(1) }
  }
  var vm  = new Vue({
    created: function(){ console.log(2) }
    mixins: [mixin]
  })
  // -> 1
  // -> 2
  ```

- 参考：[混合](https://cn.vuejs.org/v2/guide/mixins.html)


---

### extends

- 类型：`Object | Function`

- 详细：

  允许声明扩展另一个组件（可以是一个简单的选项对象或构造函数），而无需使用`Vue.extend` 。这是主要是为了便于扩展单文件组件。

  这和`mixins` 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。

- 示例：

  ```javascript
  var CompA = {...}

  //在没有调用`Vue.extend`时候继承	CompA
  var CompB = {
    extends: CompA,
    ...
  }
  ```


---

### provide/inject

> 2.2.0 新增

- 类型：

  - provide: `Object | () => Object`
  - inject: `Array<string> | { [key:string]: string | Symbol }`

- 详细：

  > `provide`和`inject`主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

  这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的事件里始终生效。如果你熟悉React，这与React的上下文特性很相似。

  `provide`选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用ES2015 Symbols作为key，但是只在原生支持`Symbol` 和`Reflect.ownKeys` 的环境下可工作。

  `inject` 选项应该是一个字符串数组或一个对象，该对象的key代表里本地绑定的名称，value为其key（字符串或Symbol）以在可用的注入中搜索。

  > 提示：`Provide`和`inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入里一个可监听的对象，那么其对象的属性还是可响应的。

- 示例：

  ```javascript
  var Provider = {
    provide:{
      foo: 'bar'
    },
    //...
  }

  var Child = {
    inject: ['foo'],
    created(){
      console.log(this.foo)
    }
    //...
  }
  ```

  利用ES2015 Symbols、函数`provide` 和对象`inject` :

  ```javascript
  const s = Symbol()

  const Provider = {
    provide(){
      return {
        [s]: 'foo'
      }
    }
  }

  const Child = {
    inject: { s },
    //...
  }
  ```

  > 接下来2个例子只工作在Vue 2.2.1或更高版本。低于这个版本时，注入的值会在`props` 和`data`初始化之后得到。

  使用一个注入的值作为一个属性的默认值：

  ```javascript
  const Child = {
    inject : ['foo'],
    props: {
      bar: {
        default(){
          return this.foo
        }
      }
    }
  }
  ```

  使用一个注入的值作为数据入口：

  ```javascript
  const Child = {
    inject: ['foo'],
    data(){
      return {
        bar: this.foo
      }
    }
  }
  ```



## 选项/其它

### name

- 类型：`string`

- 限制：只有作为组件选项时起作用。

- 详细：

  允许组件模板递归地调用自身。注意，组件在全局用`Vue.component()`注册时，全局ID自动作为组件的name。

  指定`name` 选项的另一个好处是便于调试。有名字的组件有更好的警告信息。另外，当在有vue-devtools，未命名组件将显示成`<AnonymousComponent>`，这很没有语义。通过提供`name` 选项，可以获得更有语义信息的组件树。


---

### delimiters

- 类型：`Array<string>`

- 默认值：`["{{", "}}"]`

- 限制： 这个选项只在完整构建版本中的浏览器内编译时可用。

- 详细：

  改变纯文本插入分割符。

- 示例：

  ```javascript
  new Vue({
    delimiters: ['${','}']
  })
  ```


---

### functional

- 类型：`boolean`

- 详细：

  使组件无状态（没有`data`）和无实例（没有`this`上下文）。他们用一个简单的`render`函数返回虚拟节点使他们更容易渲染。

- 参考：[函数式组件](https://cn.vuejs.org/v2/guide/mixins.html)


---

### model

> 2.2.0 新增

- 类型：`{prop?: string, event?: string}`

- 详细：

  允许一个自定义组件在使用`v-model`时定制prop和event。默认情况下，一个组件上的`v-model`会把`value`用作prop且把`input`用作`event`，但是一些输入类型比如单选框和复选框按钮可能像使用`value`prop来达到不同的目的。使用`model`选项可以回避这些情况产生的冲突。

- Example

  ```javascript
  Vue.component('my-checkbox', {
    model:{
      prop: 'checked',
      event: 'change'
    },
    props:{
      value: String,
      checked: {
        type: Number,
        default: 0
      }
    }
    //...
  })
  ```

  ```html
  <my-checkbox v-model="foo" value="some value"></my-checkbox>
  ```

  上述代码相当于：

  ```html
  <my-checkbox
  	:checked="foo"
  	@change="val=> {foo =val}"
  	value="some value">
  </my-checkbox>
  ```


---

### inheritAttrs

> 2.4.0 新增

- 类型：`boolean`

- 默认值：`true`

- 详细：

  默认情况下父作用域的不被认作props的特性绑定（attribute bindings）将会“回退”且作为普通的HTML特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置`inheritAttrs`到`false`， 这些默认行为将会被去掉。而通过（同样时2.4新增的）实例属性`$attrs`可以让这些特性生效，且可以通过`v-bind`显性的绑定到非根元素上。

  注意：这个选项**不影响**`class`和`style`绑定。


---

### comments

> 2.4.0 新增

- 类型：`boolean`

- 默认值：`false`

- 限制：这些选项只在完整构建版本中的浏览器内编译时可用。

- 详细：

  当设为`true`时，将会保留且渲染模板中的HTML注释。默认行为是舍弃它们。


---

## 实例属性

### vm.$data
- 类型：`Object`
- 详细：
    Vue实例观察的数据对象。Vue实例代理了对其data对象属性的访问。
- 参考：[选项/数据 - data](https://cn.vuejs.org/v2/api/#data)

---

### vm.$props
> 2.2.9新增
- 类型：`Object`
- 详细：
    一个对象，代表当前组件收到的props。Vue示例代理访问到这个props对象的属性们。

---

### vm.$el
- 类型：`HTMLElement`
- 只读
- 详细：
    Vue实例使用的根DOM元素。

---

### vm.$options
- 类型：`Object`
- 只读
- 详细：
    用于当前Vue实例的初始化选项。需要在选项中包含自定义属性时会有用处：
    ```javascript
    new Vue({
        customOption: 'foo',
        created:function(){
            console.log(this.$options.customOption)
        }
    })
    ```

---

### vm.$parent
- 类型：`Array<Vue instance>`
- 只读
- 详细：
    父实例，如果当前实例有的话。

---

### vm.$root
- 类型：`Vue instance`
- 只读
- 详细：
    当前组件树的根Vue实例。如果当前实例没有父实例，此实例将会是其自己。

---

### vm.$children
- 类型：`Array<Vue instance>`
- 只读
- 详细：
    当前实例的直接子组件。**需要注意`$children`并不保证顺序，也不是响应式的。**如果你发现自己正尝试使用`$children`来进行数据绑定，考虑使用一个数组配合`v-for`来生成子组件，并且使用Array作为真正的来源。

---

### vm.$slots
- 类型：`{ [name: string]: ?Array<VNode> }`
- 只读
- 详细：
    用来访问被[solt分发](https://cn.vuejs.org/v2/guide/components.html#使用-Slot-分发内容)的内容。每个[具名slot](https://cn.vuejs.org/v2/guide/components.html#具名-Slot)有其相应的属性（例如：`slot="foo"`中的内容将会在`vm.$slots.foo`中被找到）。`default`属性包括了所有没有被包含在具名slot中的节点。

    在使用[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)书写一个组件时，访问`vm.$slots`最有帮助。

- 示例：
    ```html
    <blog-post>
        <h1 slot="header">
            About Me
        </h1>
        <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>
        <p slot="footer">
            Copyright 2016 Evan You
        </p>
        <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
    </blog-post>
    ```
    ```javascript
    Vue.component('blog-post', {
        render:function(createElement){
            var header = this.$slots.header
            var body = this.$slots.default
            var footer = this.$slots.footer
            return createElement('div', [
                createElement('header', header),
                createElement('main', body),
                createElement('footer', footer)
            ])
        }
    })
    ```
- 参考：
    - `<slot>`组件
    - 使用Slots分发内容
    - 渲染函数- Slots

---

### vm.$scopedSlots
> 2.1.0新增
- 类型：`{ [name: string]: props => VNode | Array<VNode> }`
- 只读
- 详细：
    用来访问[scoped slots](https://cn.vuejs.org/v2/guide/components.html#Scoped-Slots)。对于包括`默认slot`在内的每一个slot，该对象都包含一个返回相应VNode的函数。

    在使用`render`[函数](https://cn.vuejs.org/v2/guide/render-function.html)书写一个组件时，访问`vm.$scopedSlots`最有帮助。
- 参考：
    - `<slot>`[组件](https://cn.vuejs.org/v2/api/#slot-1)
    - [Scoped Slots](https://cn.vuejs.org/v2/guide/components.html#Scoped-Slots)
    - [渲染函数-Slots](https://cn.vuejs.org/v2/guide/render-function.html#Slots)


---

### vm.$refs
- 类型：`Object`
- 只读
- 详细：
    一个对象，其中包含了所有拥有`ref`注册的子组件。
- 参考：
    - [子组件引用](https://cn.vuejs.org/v2/guide/components.html#子组件索引)
    - [特殊特性-ref](https://cn.vuejs.org/v2/api/#ref)

---

### vm.$isServer
- 类型：`boolean`
- 只读
- 详细：
    当前Vue实例是否运行于服务器。
- 参考：[服务端渲染](https://cn.vuejs.org/v2/guide/ssr.html)

---

### vm.$attrs
- 类型：`{ [key: string] : string}`
- 只读
- 详细：
    包含了父作用域中不被认为（且不预期为）props的特性绑定（`class`和`style`除外）。当一个组件没有声明任何props时，这里会包含所有父作用域的绑定（`class`和`style`除外），并且可以通过`v-bind="$attrs"`传入内部组件--在创建更高层次的组件时非常有用。

---

### vm.$listeners
- 类型：`{ [ key: string]: Function | Array<Function> }`
- 只读
- 详细：
    包含了父作用域中的（不含`.native`修饰器）`v-on`事件监听器。它可以通过`v-on="$listeners"`传入内部组件--在创建更高层次的组件时非常有用。


---



## 实例方法/数据

### vm.$watch(expOrFn, callback, [options])
- 参数：
    - `{string | Function} expOrFn`
    - `{Function | Object} callback`
    - `{Object} [options]`
        - `{boolean} deep`
        - `{boolean} immediate`

- 返回值：`{Function} unwatch`

- 用法：
    观察Vue实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

    > 注意：在变异（不是替换）对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue不会保留变异之前值的副本。

- 示例：
    ```javascript
    //键路径
    vm.$watch('a.b.c', function(newVal, oldVal){
      //做点什么
    })

    //函数
    vm.$watch(
    	function(){
          return this.a + this.b
    	},
    	function(){
          //做点什么
    	}
    )
    ```
    `vm.$watch`返回一个取消观察函数，用来停止触发回调：

    ```javascript
    var unwatch =  vm.$watch('a', cb)
    //之后取消观察
    unwatch()
    ```

- 选项：deep

    为了发现**对象**内部值变化，可以在选项参数中指定`deep:true`。注意监听数组的变动不需要这么做。

    ```javascript
    vm.$watch('someObject', callback, {
      deep:true
    })
    vm.someObject.nestedValue = 123
    //callback is fired
    ```

- 选项：immediate

    在选项参数中指定`immediate: true`将立即以表达式的当前值触发回调：

    ```javascript
    vm.$watch('a', callback, {
      immediate: true
    })
    //立即以`a`的当前值触发回调
    ```


---

### vm.$set(target, key, value)

- 参数：

  - `{Object | Array} target`
  - `{string | number} key`
  - `{any} value`

- 返回值：设置的值

- 用法：

  这是全局`Vue.set`的别名。

- 参考：[Vue.set](https://cn.vuejs.org/v2/api/#Vue-set-target-key-value)




---

### vm.$delete(target, key)

- 参数：

  - `{Object | Array} target`
  - `{string | number} key`

- 用法：

  这里全局`Vue.delete`的别名。

- 参考：[Vue.delete](https://cn.vuejs.org/v2/api/#Vue-delete)




---



## 实例方法/事件

### vm.$on(event, callback)

- 参考：

  - `{string | Array<string>} event`(数组只在2.2.0+中支持)
  - `{Function} callback`

- 用处：

  监听当前实例上的自定义事件。事件可以由`vm.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。

- 示例：

  ```javascript
  vm.$on('test', function(msg){
  	console.log(msg)
  })
  vm.$emit('test', 'hi')
  // -> 'hi'
  ```


---

### vm.$once(event, callback)

- 参数：

  - `{string} event`
  - `{Function} callback`

- 用法：

  监听一个自定义事件，但是只会触发依次，在第一次触发之后移除监听器。


---

### vm.$off([event, callback])

- 参数：

  - `{string | Array<string>} event`(只在2.2.2+支持数组)
  - `{Function} [callback]`

- 用法：

  移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；
  - 如果只提供了事件，则移除该事件所有的监听器；
  - 如果同时提供了事件与回顾，则只移除这个回调的监听器。


---

### vm.$emit(event, [...args])

- 参数：

  - `{string} event`
  - `[...args]`

  触发当前实例上的事件，附加参数都会传给监听器回调。


---





## 实例方法/生命周期

### vm.$mount( [elementOrSelector] )

- 参数：

  - `{Element | string} [elementOrSelector]`
  - `{boolean} [hydrating]`

- 返回值：`vm`-实例自身

- 用法：

  如果Vue实例在实例化时没有收到el选项，则它处于“未挂载”状态，没有关联的DOM元素。可以使用`vm.$mount()`手动地挂载一个未挂载的实例。

  如果没有提供`elementOrSelector`参数，模板将被渲染为文档之外的元素，并且你必须使用原生DOM API把它插入文档中。

  这个方法返回实例自身，因而可以链式调用其它实例方法。

- 示例：

  ```javascript
  var MyComponent = Vue.extend({
  	template: '<div>Hello</div>'
  })

  //创建并挂载到#app（会替换#app）
  new MyComponent().$mount('#app')
  //同上
  new MyComponent({el: '#app'})
  //或者，在文档之外渲染并且随后挂载
  var component = new MyComponent().$mount()
  document.getElementById('app').appendChild(component, $el)
  ```

- 参考：

  - [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)
  - [服务端渲染](https://cn.vuejs.org/v2/guide/ssr.html)


---

### vm.$nextTick([callback])

- 参数：

  - `{Function} [callback]`

- 用法：

  将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。它跟全局方法`Vue.nextTick` 一样，不同的是回调的`this`自动绑定到调用它的实例上。

  > 2.1.0 新增：如果没有提供回调且支持Promise 的环境中返回Promise

- 示例：

  ```javascript
  new Vue({
    //...
    methods:{
      example:function(){
        //修改数据
        this.message = 'changed'
        //Dom 还没有更新
        this.$nextTick(function(){
          //DOM现在更新了
          //this绑定到当前实例
          this.doSomethingElse()
        })
      }
    }
  })
  ```

- 参考：

  - [Vue.nextTick](https://cn.vuejs.org/v2/api/#Vue-nextTick)
  - [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

  ​

---

### vm.$destroy()

- 用法：

  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

  触发`beforeDestrory`和`destroyed`的钩子。

  > 在大多数场景中你不应该调用这个方法。最好使用`v-if`和`v-for` 指令以数据驱动的方式控制子组件的生命周期。

- 参考：[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)




---






## 指令

### v-text

- 预期：`string`

- 详细：

  更新元素的`textContent`。如果要更新部分的`textContent`，需要使用`{{Mustache}}`插值。

- 示例：

  ```javascript
  <span v-text="msg"></span>
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

- 参考：[数据绑定语法-插值](https://cn.vuejs.org/v2/guide/syntax.html#插值)




---

### v-html

- 预期：`string`

- 详细：

  更新元素的`innerHTML`。**注意：内容按普通HTML插入 - 不会作为Vue模板进行编译。**如果视图使用`v-html`组合模板，可以重新考虑是否通过使用组件来替代。

  > 在网站上动态渲染任意HTML是非常危险的，因为容易导致`xss攻击`。只在可信任内容上使用`v-html`，永不用在用户提交的内容上。

- 示例：

  ```javascript
  <div v-html="html"></div>
  ```

- 参考：[数据绑定语法 - 插值](https://cn.vuejs.org/v2/guide/syntax.html#Raw-HTML)




---

### v-show

- 预期：`any`

- 用法：

  根据表达式之真假值，切换元素的`display` css属性。

  当条件变化时该指令触发过度效果。

  > 当和`v-if` 一起使用时，`v-for` 的优先级比`v-if`更高。详见[列表渲染教程](https://cn.vuejs.org/v2/guide/list.html#v-for-with-v-if)

- 参考：[条件渲染 - v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-show)




---

### v-if

- 预期：`any`

- 用法：

  根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定/组件被销毁并重建。如果元素时`template`，将提出它的内容作为条件块。

  当条件变化时该指令触发的过渡效果。

- 参考：[条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)




---

### v-else

- 不需要表达式

- 限制：前一兄弟元素必须有`v-if`或`v-else-if`。

- 用法：

  为`v-if` 或者`v-else-if`添加“else块”。

  ```html
  <div v-if="Math.random() > 0.5">
  Now you see me
  </div>
  <div v-else>
  Now you don't
  </div>
  ```




---

### v-else-if

> 2.1.0新增

- 类型：`any`

- 限制： 前一兄弟元素必须有`v-if`或`v-else-if`。

- 用法：

  表示`v-if`的“else if” 块。可以链式调用。

  ```html
  <div v-if="type === 'A'">
  	A
  </div>
  <div v-else-if="type === 'B'">
  	B
  </div>
  <div v-else>
  	Not A/B/C
  </div>
  ```

- 参考：[条件渲染-v-else-if](https://cn.vuejs.org/v2/guide/conditional.html#v-else-if)









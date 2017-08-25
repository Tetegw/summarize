最近参考IMOOC基于Vue的音乐实战项目，自己模仿的写了一遍，整体来说收获很多。
接下来我会对整个项目进行简单的整理分析，希望能更深入理解，更深刻的掌握。因为涉及到知识点比较多，所以我打算分成四个模块来分析。

Vue相关的模块，**内容全部来自官方文档**，我在此只是抄一些平时用的比较多的Api。有空直接查看官方文档，没有比官方文档写的更好了。
> [项目地址](https://github.com/Tetegw/vueMusic)

- 组件数据（父子、vuex）
- vue-router
- vue动画
- axios
- mixin


# Vue相关
## 一、组件通讯
### 1. 父子/兄弟
- 父传子：子组件中props来接收父组件传来的数据
    ```javascript
    //父组件
    <v-music-list :song="songs"></v-music-list>

    //子组件
    props: {
        song: {
            type: Array,
            default: []
        },
    }
    ```
- 子传父：父组件注册事件接收子组件emit的数据
    ```javascript
    // 子组件
    selectItem(item, index) {
        this.$emit('emitSelectItem', item, index)
    }
    // 父组件
    <v-song-list @emitSelectItem="emitSelect"></v-song-list>
    emitSelect(item, index) {
        this.selectPlay({
            list: this.songs,
            index
        })
    },
    ```
- 父调子方法：父组件通过ref来获取子组件方法
    ```javascript
    //父组件
    <v-scroll ref="list"></v-scroll>
    this.$refs.list.scroll()
    ```

### 2. Vuex
#### 介绍
存放Vuex相关文件（代码见项目src/store目录）
- `actions` 类似于 mutation，提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
- `getters` 从store中的 state 中派生出一些状态，用于外部获取state相关状态
- `index` Vuex的主入口，暴露Store
- `mutation` 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
- `state` 用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在

#### 最佳实践
```javascript
import { mapGetters, mapMutations, mapActions } from 'vuex';

//computed 中使用mapGetters语法糖(... 是es6的对象扩展)
//state中currentIndex变化，响应式引起getters中对应currentIndex变化
//从而引起computed中currentIndex的变化，最后映射到DOM中
computed:{
    ...mapGetters([
        'currentIndex',
        'fullScreen',
        ...
    ])
}

//mapMutations/mapActions语法糖和对象扩展，将SET_PLAYING_STATE扩展到methods
//调用this.SET_FULL_SCREEN方法，改变state中对应状态，响应到getters中
methods:{
    ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        ...
    }),
}
```

> [vuex最简单、最详细的入门文档](https://segmentfault.com/a/1190000009404727)

> [Vue.js学习系列二 —— vuex学习实践笔记（附DEMO）](http://www.jianshu.com/p/d6f7e11f18af)

> [官方文档](https://vuex.vuejs.org/zh-cn/)


## 二、路由
### 1. 最佳实践
- router/index.js 定义路由
```javascript
// 引入vue和vue-router
import Vue from 'vue'
import Router from 'vue-router'
// 路由模块
import Recommend from '@/components/v-recommend/recommend'
// use插件
Vue.use(Router)
//定义router且暴露
export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend',  /*重定向*/
    },{
        path: '/recommend',
        component: Recommend,
        children: [{
            path: ':id',
            component: Disc
        }]
    }]
})
```

- main.js 主入口
```javascript
import router from './router'
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
```

- App.vue 根组件
```html
<template>
    <div id="app">
        <v-tab></v-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
```

- tab组件
```javascript
<router-link tag="div" class="tab-item" to="/recommend">
    <span class="tab-link">推荐</span>
</router-link>
```

- singer.vue 子组件（子路由）
```html
<template>
    <div class="v-singer">
        <v-listView @selectItem="selectItem"></v-listView>
        <router-view></router-view>
    </div>
</template>
```
```javascript
//设置子路由，
selectItem(item) {
    this.$router.push({
        path: `/singer/${item.id}`
    })
},
```

### 2. 注意：
- 当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active。
- `<keep-alive>` 状态保持，不会再次调用子组件的created等钩子


### 3. 官方文档
> [官方文档](https://router.vuejs.org/zh-cn/)

- 动态路由匹配
- 编程式的导航
- 导航钩子
- 过渡动效
- HTML5 History 模式(去掉#)
- 滚动行为
- 路由懒加载
- 路由信息对象的属性


## 三、vue动画
1.Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

2.Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡
- 条件渲染 （使用 v-if）
- 条件展示 （使用 v-show）
- 动态组件
- 组件根节点 （template下一层）

3.过渡的-CSS-类名;会有 6 个(CSS)类名在 enter/leave 的过渡中切换
- `v-enter`: 定义进入过渡的`开始状态`。在元素被插入时生效，在下一个帧移除。

- `v-enter-activ`e: 定义`过渡`的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。 这个类可以`被用来定义过渡的过程时间，延迟和曲线函数`。
- `v-enter-to`: 2.1.8版及以上 定义进入过渡的`结束状态`。在元素被插入一帧后生效（于此同时 v-enter 被删除），在 transition/animation 完成之后移除。
- `v-leave`: 定义离开过渡的`开始状态`。在离开过渡被触发时生效，在下一个帧移除。
- `v-leave-active`: 定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。 这个类可以`被用来定义过渡的过程时间，延迟和曲线函数`。
- `v-leave-to`: 2.1.8版及以上 定义离开过渡的`结束状态`。在离开过渡被触发一帧后生效（于此同时 v-leave 被删除），在 transition/animation 完成之后移除。

4.我们可以通过以下特性来自定义过渡类名：
他们的优先级高于普通的类名，这`对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用`。

5.可以在属性中声明 JavaScript 钩子

### 最佳实践
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
```

> [官方文档](https://cn.vuejs.org/v2/guide/transitions.html)

## 四、axios
>Promise based HTTP client for the browser and node.js
>用于浏览器和node.js的基于Promise的HTTP客户端

- Make XMLHttpRequests from the browser
    - 如果浏览器发axios请求，会通过XMLHttpRequests
- Make http requests from node.js
    - 如果冲node发axios请求，会通过http
- Supports the Promise API
    - 支持Pormise语法
- Intercept request and response
    - 拦截请求和响应
- Transform request and response data
    - 转换请求和响应的数据
- Cancel requests
    - 取消请求
- Automatic transforms for JSON data
    - 自动转换json数据（将json转成对象？）
- Client side support for protecting against XSRF
    - 客户端支持防止跨站脚本攻击


### 最佳实践
- promise的get请求
```javascript
//拼接在url后
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

//传入params数据，注意·params·
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

- promise的post请求
```javascript
//注意这里数据没有params
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
- 支持promise.all()
```javascript
//其实可以将请求包装成promise，然后用promise.all()来实现
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    //请求都完成
  }));
```

> [axios](http://www.jianshu.com/p/df464b26ae58)

> [官方文档](https://github.com/mzabriskie/axios)

## 五、mixin
mixins 选项接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项,他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。举例：如果你混合包含一个钩子而创建组件本身也有一个,`两个函数将被调用`。
Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用。

```javascript
//mixin 是一个对象，注意 ** mixins: [mixin] **
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// -> 1
// -> 2
```

## 六、其他
- nextTick
```javascript
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(() => {
// DOM 更新了
})
```
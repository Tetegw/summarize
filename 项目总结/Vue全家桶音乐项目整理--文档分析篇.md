最近参考IMOOC基于Vue的音乐实战项目，自己模仿的写了一遍，整体来说收获很多。
接下来我会对整个项目进行简单的整理分析，希望能更深入理解，更深刻的掌握。因为涉及到知识点比较多，所以我打算分成四个模块来分析。

> [项目地址](https://github.com/Tetegw/vueMusic)

- 项目结构
- 目录分析

# 文件篇
## 一、项目结构

项目由vue官方发布的脚手架vue-cli快速搭建

项目目录如下：
```
项目:
│  .babelrc
│  .editorconfig
│  .gitignore
│  .postcssrc.js
│  index.html
│  package.json
│  README.md
│
├─build
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│
├─node_modules
│  ├─.bin
│
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─api
│  │      .gitkeep
│  │      singer.js
│  │
│  ├─common
│  │  │  .gitkeep
│  │  │
│  │  ├─fonts
│  │  │
│  │  ├─image
│  │  │      default.png
│  │  │
│  │  ├─js
│  │  │      utils.js
│  │  │
│  │  └─stylus
│  │          base.styl
│  │          index.styl
│  │          mixin.styl
│  │          reset.styl
│  │          variable.styl
│  │
│  ├─components
│  │  ├─b-listView
│  │  │      listView.vue
│  │  │
│  │  └─v-header
│  │         header.vue
│  │         logo@2x.png
│  │         logo@3x.png
│  │
│  ├─router
│  │      index.js
│  │
│  └─store
│          actions.js
│          getters.js
│          index.js
│          mutation-types.js
│          mutations.js
│          state.js
│
└─static
        .gitkeep
```

## 二、目录分析

---
### 1. babelrc
#### 介绍
babelrc下一代javascript语法编译器。
由于浏览器版本和兼容性，导致es6语法并不能完全可用，因此babel诞生；babel可以让你放心使用大部分的JavaScript的新的标准的语法，然后编译成兼容绝大多数的主流浏览器的代码。
- presets(预设),也就是一堆plugins的预设，起到方便的作用。
    - env
    - es2015/es2016/es2017/latest
    - react
    - stage-x(stage-0/1/2/3/4)
- plugins(插件)

#### 最佳实践
 ```json
 {
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": ["transform-runtime"]
}
 ```
> [如何写好.babelrc？Babel的presets和plugins配置解析](https://zhuanlan.zhihu.com/p/24224107)

> [官方文档](https://babeljs.io/)

---
### 2. editorconfig
#### 介绍
让使用不同编辑器的开发者在共同开发一个项目时“无痛”地遵循编码规范

使用 EditorConfig 来解决上面的问题。只需两步
- 在项目根创建一个名为 .editorconfig 的文件。该文件的内容定义该项目的编码规范。EditorConfig 支持的编码规范在后文会有详细的介绍。
- 安装与编辑器对应的 EditorConfig 插件。

当你在编码时，EditorConfig 插件会去查找当前编辑文件的所在文件夹或其上级文件夹中是否有 .editorconfig 文件。如果有，则编辑器的行为会与 .editorconfig 文件中定义的一致，并且其优先级高于编辑器自身的设置。

#### 最佳实践
```bash
root = true

# 对所有文件生效
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# 对后缀名为 md 的文件生效
[*.md]
trim_trailing_whitespace = false
```
>[EditorConfig 介绍](http://www.jianshu.com/p/712cea0ef70e)

> [官网](http://editorconfig.org)

---
### 3.gitignore
#### 介绍
git为我们提供了一个.gitignore文件只要在这个文件中申明那些文件你不希望添加到git中去，这样当你使用git add .的时候这些文件就会被自动忽略掉。

#### 最佳实践
```bash
- a.忽略指定文件/目录

# 忽略指定文件
HelloWrold.class
# 忽略指定文件夹
bin/
bin/gen/

- b.通配符忽略规则

# 忽略.class的所有文件
*.class
# 忽略名称中末尾为ignore的文件夹
*ignore/
# 忽略名称中间包含ignore的文件夹
*ignore*/
```

> [Git忽略文件.gitignore的使用](http://www.jianshu.com/p/7fca49f980c4)

>[官网](https://git-scm.com/docs/gitignore)

---
### 4.postcssrc.js
#### 介绍
post-loader的插件配置文件

> [PostCSS 是个什么鬼东西？](https://segmentfault.com/a/1190000003909268)

---
### 5.package.json
#### 介绍
每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。

`scripts`指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。

`dependencies`字段指定了项目运行所依赖的模块。

`devDependencies`指定项目开发所需要的模块。

它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。

> [package.json](https://npmjs.org/doc/files/package.json.html)

> [package.json文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc1)

---
### 6.build/config
#### 介绍
vue-cli自带的webpack配置
- build - 编译任务的代码
- config - webpack 的配置文件

具体`代码分析`详见参考文档：
> [vue-cli的webpack模板项目配置文件分析](http://blog.csdn.net/hongchh/article/details/55113751)

> [vue-cli#2.0 webpack 配置分析](https://github.com/DDFE/DDFE-blog/issues/10)

---
### 7.src目录
#### 介绍
项目的开发目录，是整个项目最重要部分；包括开发代码以及静态资源文件（字体等）
- `api` 自定义文件夹，存放所有接口调用，暴露响应函数
- `common` 公共目录，存放公用js/css/images/fonts等
    - `stylus` 存放所有公用样式，reset/variable/base等
- `components` 组件目录，包括基础组件和业务组件
- `router` 配置路由，`Vue.use(Router)`且暴露给外面
- `store` 存放Vuex相关文件，下面会详细分析
- `App.vue` 项目根组件
- `main.js` 项目主入口

---
### 8.src/common/stylus目录
#### 介绍
存放所有公用样式，切割成单独作用的样式文件
 - reset 样式重置
 - icon 图标字体
 - base 基础设置，整个项目都使用
 - index 主入口，引入reset、icon、base；在main.js中引入
 - mixin 混合（清浮动等方法），哪里需要哪里引用
 - variable 样式规范（颜色，字体），哪里需要哪里引用

---
### 9.src/store目录
#### 介绍
存放Vuex相关文件
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

---


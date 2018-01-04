最近参考IMOOC基于Vue的音乐实战项目，自己模仿的写了一遍，整体来说收获很多。
接下来我会对整个项目进行简单的整理分析，希望能更深入理解，更深刻的掌握。因为涉及到知识点比较多，所以我打算分成四个模块来分析。

> [项目地址](https://github.com/Tetegw/vueMusic)

- fastclick在vue中使用
- vue-lazyload
- create-keyframe-animation
- better-scroll

# Vue插件篇
## 一、fastclick
FastClick是一个非常方便的库，在移动浏览器上发生介于轻敲及点击之间的指令时，能够让你摆脱300毫秒的延迟。FastClick可以让你的应用程序更加灵敏迅捷。支持各种移动浏览器，比如Safari、Chrome、Opera等。
FastClick 是一个简单，易于使用的js库用于消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300延迟。

1. 引入fastclick.js
2. 使用
    - 原生js 
    ```javascript
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    ```
    - Jquery
    ```
    $(function() {
        FastClick.attach(document.body);
    });
    ```
    - 模块化（require，import）
    ```javascript
    // CommonJS
    var attachFastClick = require('fastclick');
    attachFastClick(document.body);

    // es6
    import fastclick from 'fastclick'
    fastclick.attach(document.body)

    //AMD
    var FastClick = require('fastclick');
    FastClick.attach(document.body, options);
    ```
3. 忽略某些不需要解决300ms的元素（和其他插件冲突，多次触发等问题）；添加一个`class="needsclick"`类名

> [官方文档](https://github.com/ftlabs/fastclick)

## 二、vue-lazyload

### 最佳实践
```javascript
//入口 main.js
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
    loading: require('@/common/image/default.png')
})
```
```html
<img v-lazy="item.imgurl" alt="">
```

### 配置
```javascript
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
```

> [官方文档](https://github.com/hilongjw/vue-lazyload)

## 三、create-keyframe-animation
使用JavaScript在浏览器中动态生成CSS关键帧动画。

animations.runAnimation支持 Promise语法
```javascript
animations.runAnimation(el, 'moveUp')
	.then(function () {
		return animations(el, 'wiggle')
	})
    ...
    .catch(function (err) {
		console.error(err)
	})
```

### 最佳实践
```javascript
enter(el, done) {
    const { x, y, scale } = this._getPosAndScale()
    let animation = {
        0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
            transform: `translate3d(0, 0, 0) scale(1)`
        }
    }
    //注册动画
    Animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
            duration: 400,
            easing: 'linear'
        }
    })
    //运行动画
    Animations.runAnimation(this.$refs.cdWrapper, 'move', done)
},
afterEnter(el) {
    Animations.unregisterAnimation('move')
    this.$refs.cdWrapper.style.animation = ''
},
leave(el, done) {
    ...
},
afterLeave(el) {
    ...
},
```

## 四、better-scroll

具体用法见官方文档（中文）
> [官方文档](https://github.com/ustbhuangyi/better-scroll)

### 最佳实践
封装scroll组件，通过slot插槽填充需要的节点；通过监听外部传入的数据data来重新计算高度后refresh()。

初始化scroll派发click事件；通过外部传入的标识来派发对应的事件，已达到和外部组件解耦。
```html
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
```

```javascript
import BScroll from 'better-scroll'

export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })

            if (this.listenScroll) {
                let _this = this
                this.scroll.on('scroll', (pos) => {
                    _this.$emit('emitScroll', pos)
                })
            }

            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('emitScrollToEnd')
                    }
                })
            }

            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('emitBeforeScroll')
                })
            }
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
        }
    }
}
```
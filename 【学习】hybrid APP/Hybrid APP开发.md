## 现有APP分析

现在App开发，除了Hybrid，还有Native，纯web，React Native等方案。

- Native APP：

  即传统的原生APP开发模式,Android基于Java语言,底层调用Google的 API;iOS基于OC或者Swift语言,底层调用App官方提供的API，体验最好。

- web APP

  即移动端的网站,将页面部署在服务器上,然后用户使用各大浏览器访问。一般泛指 SPA(Single Page Application)模式开发出的网站，体验最差。

- Hybrid APP

  即混合APP开发，由Native通过JSBridge等方法提供统一的API，然后用Html5+JS来写实际的逻辑，调用API。这种模式下，由于Android,iOS的API一般有一致性，而且最终的页面也是在webview中显示，所有有跨平台效果。

- React Native APP（weex）

  Facebook发起的开源的一套新的APP开发方案，使用JS+部分原生语法来实现功能。初次学习成本较高,但是在入门后,经过良好的封装也能够实现大部分的跨平台。而且体验很好。

|                      | Native App                   | Web App                       | Hybrid App                   | React Native App           |
| -------------------- | ---------------------------- | ----------------------------- | ---------------------------- | -------------------------- |
| 原生功能体验         | 优秀                         | 差                            | 良好                         | 接近优秀                   |
| 渲染性能             | 非常快                       | 慢                            | 接近快                       | 快                         |
| 是否支持设备底层访问 | 支持                         | 不支持                        | 支持                         | 支持                       |
| 网络要求             | 支持离线                     | 依赖网络                      | 支持离线(资源存本地情况)     | 支持离线                   |
| 更新复杂度           | 高(几乎总是通过应用商店更新) | 低(服务器端直接更新)          | 较低(可以进行资源包更新)     | 较低(可以进行资源包更新)   |
| 编程语言             | Android(Java),iOS(OC/Swift)  | js+html+css3                  | js+html+css3                 | 主要使用JS编写,语法规则JSX |
| 社区资源             | 丰富(Android,iOS单独学习)    | 丰富(大量前端资源)            | 有局限(不同的Hybrid相互独立) | 丰富(统一的活跃社区)       |
| 上手难度             | 难(不同平台需要单独学习)     | 简单(写一次,支持不同平台访问) | 简单(写一次,运行任何平台)    | 中等(学习一次,写任何平台)  |
| 开发周期             | 长                           | 短                            | 较短                         | 中等                       |
| 开发成本             | 昂贵                         | 便宜                          | 较为便宜                     | 中等                       |
| 跨平台               | 不跨平台                     | 所有H5浏览器                  | Android,iOS,h5浏览器         | Android,iOS                |
| APP发布              | App Store                    | Web服务器                     | App Store                    | App Store                  |

React Native 使用js，**反H5方案**

小程序 使用js，**反H5方案**

轻应用 使用js，**反H5方案**



## Hybrid APP 发展

**原生** =>  **H5**	  => **Hybrid APP**  (多View混合，单View混合，Web主体型，多主体共存型)



## **Hybrid APP** 分类

- 多View混合

  将webview作为Native中的一个view组件，当需要的时候在独立运行显示,也就是说主体是Native，web技术只是起来一些补充作用。

- 单View混合

  同一个view内，同时包括Native view和webview(互相之间是层叠的关系）

- **Web主体型**

  只会使用H5和js来编写，然后js可以调用原生提供的api来实现一些拓展功能(比如PhoneGap,AppCan,Html5+等)，但是由于一些webview自身的限制,导致了这种模式在性能上损耗不小,包括在一些内存控制上的不足,所以导致体验要逊色于原生不少。

- **多主体共存型**

  原生开发和h5开发共存，也就是说，对于一些性能要求很高的页面模块，用原生来完成,对于一些通用型模块，用h5和js来完成。



## Hybrid APP 架构

Hybrid APP架构是通过JSBridge，H5页面可以调用Native的api，Native也可以调用H5页面的方法或者通知H5页面回调。

![mg_hybrid_base_hybridInfo_](/Users/sunchen/Desktop/bridge/img_hybrid_base_hybridInfo_3.jpg)

### 交互方式

原生和前端交互常用有下面两种方式：`url scheme`（适用于所有版本设备）和`javascriptCore`（在Android中是`addJavascriptInterface`，不适用于老版本系统）。

#### URL scheme 

一般情况下，url scheme是一种类似于url的链接，由前端页面通过定义的`JSBridge`中某种方式触发scheme(如用iframe.src)。然后系统会进行判断，如果是系统的url scheme，则打开系统应用。否则找看是否有app注册这种scheme，打开对应app。然后Native捕获对应的url触发事件，然后拿到当前的触发url，根据定义好的协议分析当前触发了哪种方法，然后通过定义的`JSBridge`中某个方法来执行回调等。

要注意的是，这种scheme必须原生app注册后才会生效，如微信的scheme为(weixin://)

![mg_hybrid_base_jsbridgePrinciple_](/Users/sunchen/Desktop/bridge/img_hybrid_base_jsbridgePrinciple_1.png)

#### Api 直接交互

分别包括Android，iOS中H5和原生互相调用，总结如下：

- H5调Android-原生通过`addJavascriptInterface`注册，然后H5直接调用
- Android调H5-原生通过`loadUrl`来调用H5，`4.4`及以上还可以通过`evaluateJavascript`调用
- H5调iOS-原生通过`JavaScriptCore`注册（需`ios7`以上），然后H5直接调用
- iOS调H5-通过`stringByEvaluatingJavaScriptFromString`



### JSBridge原理

接下来我们简单讲解一下常用的`URL scheme`交互方式中核心`JSBridge`的实现。

#### 实现思路

要实现JSBridge,我们可以进行关键步骤分析

- **第一步: 设计出一个Native与JS交互的全局桥对象**
- **第二步: JS如何调用Native**
- **第三步: Native如何得知api被调用**
- **第四步: 分析url-参数和回调的格式**
- **第五步: Native如何调用JS**
- **第六步: H5中api方法的注册以及格式**

![mg_hybrid_base_jsbridgePrinciple_](/Users/sunchen/Desktop/bridge/img_hybrid_base_jsbridgePrinciple_3.png)



#### 第一步，全局桥

第一步设计出一个Native与JS交互的全局桥对象，JS和Native之间的通信必须通过一个H5全局对象JSbridge来实现,该对象有如下特点:

- **该对象名为"JSBridge",是H5页面中全局对象window的一个属性**

- **该对象有如下方法**

  - registerHandler( String,Function )：H5调用注册本地JS方法，注册后Native可通过JSBridge调用。调用后会将方法注册到本地变量`messageHandlers` 中
  - callHandler( String,JSON,Function )：H5调用调用原生开放的api，调用后实际上还是本地通过url scheme触发。调用时会将回调id存放到本地变量`responseCallbacks`中
  - _handleMessageFromNative( JSON )：Native调用H5页面注册的方法，或者通知H5页面执行回调方法。

  ![mg_hybrid_base_jsbridgePrinciple_](/Users/sunchen/Desktop/bridge/img_hybrid_base_jsbridgePrinciple_2.png)



#### 第二步，JS调用Native

在第一步中,我们定义好了全局桥对象,可以我们是通过它的callHandler方法来调用原生的,那么它内部经历了一个怎么样的过程呢？如下

- **(1) 判断是否有回调函数，如果有生成一个回调函数id，并将id和对应回调添加进入回调函数集合`responseCallbacks`中**

- **(2) 通过特定的参数转换方法，将传入的数据、方法名拼接成一个url scheme**

  ```js
  //url scheme的格式如
  //基本有用信息就是后面的callbackId,handlerName与data
  //原生捕获到这个scheme后会进行分析
  var uri = CUSTOM_PROTOCOL_SCHEME: + '//API_Name:callbackId/handlerName?data'
  ```

- **(3) 使用内部早就创建好的一个隐藏iframe来触发scheme** 

  ```js
  //创建隐藏iframe过程
  var messagingIframe = document.createElement('iframe');
  messagingIframe.style.display = 'none';
  document.documentElement.appendChild(messagingIframe);

  //触发scheme
  messagingIframe.src = uri;
  ```



> 注意,正常来说是可以通过window.location.href达到发起网络请求的效果的，但是有一个很严重的问题，就是如果我们连续多次修改window.location.href的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。所以JS端发起网络请求的时候，需要使用iframe，这样就可以避免这个问题。












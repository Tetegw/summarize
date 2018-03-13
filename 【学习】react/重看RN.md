## 环境搭建

碰到`/usr/local`目录不可写的权限问题

```bash
sudo chown -R `whoami` /usr/local
```



**必须安装**：

- `Node` 不解释

  ```Bash
  // 设置npm镜像
  npm config set registry https://registry.npm.taobao.org --global
  npm config set disturl https://npm.taobao.org/dist --global
  ```

  ​


- `react-native-cli`   react-native 命令行工具

  ```bash
  npm install -g yarn react-native-cli

  // 项目初始化
  react-native init MyApp --version 0.44.3	
  // 进入目录 
  cd AwesomeProject
  // 启动项目(或者Xcode启动)
  react-native run-ios
  ```

  ​


- `Xcode` IOS开发不解释

  最好还是启动Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode的命令行工具中也包含一些必须的工具，比如`git`等



**推荐安装**

- `Yarn`  是Facebook提供的替代npm的工具，可以加速node模块的下载

  ```bash
  npm install -g yarn

  // 设置镜像
  yarn config set registry https://registry.npm.taobao.org --global
  yarn config set disturl https://npm.taobao.org/dist --global
  ```

  ​


- Homebrew`    Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。

  ```Bash
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

  ​

## 入门基础

- RN组件注册

  ```jsx
  import React, { Component } from 'react';
  import { AppRegistry } from 'react-native';
  AppRegistry.registerComponent('LotsOfStyles', () => LotsOfStyles);
  ```

  ​

- props 类比Vue中的props

  ```Jsx
  // parent
  <Child name=“sunchen”></Child>

  // child
  {
  	super(props)		// es6继承属性方法，es5 call等方法
  }
  <Text>{this.props.name}</Text>
  ```



- State 状态	(类比Vue中 data)

  ```jsx
  {
   	this.state = {name : 'aa'}	// constructor中初始化属性
  }
  {
    this.setState((previousState) => {	// 注意！接收一个回调函数
      return {name: !previousState.name}
    })
  }
  <Text>{this.state.name}</Text>
  ```

  ​

- 样式

  - 驼峰命名法
  - 类名/行内

  ```jsx
  // 类名
  import { StyleSheet } from 'react-native';
  <Text style={styles.red}>just red</Text>
  <Text style={[styles.red, styles.blue]}>just red</Text>
  const styles = StyleSheet.create({
    red: {
      color: 'red'
    }
  })

  // 行内，注意两个括号，直接输入对象
  <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
  ```



- flex 布局

  和css中flex布局不同点：

  - `flexDirection`的默认值是`column`而不是`row`
  - 而`flex`也只能指定一个数字值。 `flex：1 (flex: 1 1 0%，可放大可缩小)`

  主要用的属性：

  - `flexDirection`	 

    column / row

  - `alignItems`          

    子元素沿着**次轴** ， `flex-start`、`center`、`flex-end`以及`stretch`。

  -  `justifyContent`  

    子元素沿着**主轴**的**排列方式**， `flex-start`、`center`、`flex-end`、`space-around`以及`space-between`



- 基础组件

  - [`TextInput`](https://reactnative.cn/docs/0.51/textinput.html#content)是一个允许用户输入文本的基础组件。它有一个名为`onChangeText`的属性，此属性接受一个函数，而此函数会在文本变化时被调用。另外还有一个名为`onSubmitEditing`的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。

    ```Jsx
    <TextInput
      style={{height: 40}}
      placeholder="Type here to translate!"
      onChangeText={(text) => this.setState({text})}
    />
    ```

  - [`ScrollView`](https://reactnative.cn/docs/0.51/scrollview.html)是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView不仅可以垂直滚动，还能水平滚动（通过`horizontal`属性来设置）。

    如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的`ListView`组件。

    ```jsx
     <ScrollView>
     	<Text style={{fontSize:96}}>Scroll me plz</Text>
     	<Image source={require('./img/favicon.png')} />
     	<Image source={require('./img/favicon.png')} />
     	<Image source={require('./img/favicon.png')} />
     </ScrollView>
    ```

  - `FlatList`  React Native提供了几个适用于展示长列表数据的组件，一般而言我们会选用[FlatList](https://reactnative.cn/docs/0.51/flatlist.html)或是[SectionList](https://reactnative.cn/docs/0.51/sectionlist.html)。`FlatList`并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。组件必须的两个属性是`data`和`renderItem`。

    ```jsx
    <FlatList
    data={[
      {key: 'Devin'},
      {key: 'Jackson'},
      {key: 'James'},
      {key: 'Joel'},
      {key: 'John'},
      {key: 'Jillian'},
      {key: 'Jimmy'},
      {key: 'Julie'},
    ]}
    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
    />
    ```



## 网络

React Native提供了和web标准一致的[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)，React Native中已经内置了[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)(也就是俗称的ajax)。一些基于XMLHttpRequest封装的第三方库也可以使用，例如[frisbee](https://github.com/niftylettuce/frisbee)或是[axios](https://github.com/mzabriskie/axios)等。但注意不能使用jQuery，因为jQuery中还使用了很多浏览器中才有而RN中没有的东西（所以也不是所有web中的ajax库都可以直接使用）。

- **Fetch**

  ```Jsx
  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'key1=value1&key2=value2'
    })
      .then((response) => response.json())
      .then((responseJson) => {
      return responseJson.movies;
    })
      .catch((error) => {
      console.error(error);
    });
  }

  // async, 注意要catch错误
  async getMoviesFromApi() {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }
  ```

  > 默认情况下，iOS会阻止所有非`https`的请求。如果你请求的接口是http协议，那么首先需要添加一个App Transport Security的例外，详细可参考[这篇帖子](https://segmentfault.com/a/1190000002933776)。
  >
  > 需要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有[跨域](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)的限制。



- **WebSocket**

  ​


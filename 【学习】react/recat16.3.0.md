## 注意点

- 推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 [分号自动插入](http://stackoverflow.com/q/2846283) 的 bug。

- 因为 JSX 的特性更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase` 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。例如，`class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)

- React DOM 在渲染之前默认会 [过滤](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) 所有传入的值。它可以确保你的应用不会被注入攻击。

- 我们用React 开发应用时一般只会定义一个根节点。我们通过把它们都传递给 `ReactDOM.render()` 的方法来将其渲染到页面上

  ```jsx
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```

- 函数定义/类定义组件

  ```jsx
  // 函数组件
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```

- 一个新的React应用程序的顶部是一个`App`组件 

- 无论是使用[函数或是类](https://react.docschina.org/docs/components-and-props.html#%E5%87%BD%E6%95%B0%E5%AE%9A%E4%B9%89/%E7%B1%BB%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6)来声明一个组件，它决不能修改它自己的props。所有的React组件必须像纯函数那样使用它们的props。

- 构造函数是唯一能够初始化 `this.state` 的地方。

- 你必须谨慎对待 JSX 回调函数中的 `this`，类的方法默认是不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this` 的。

- 通过 `bind` 方式向监听函数传参，在类组件中定义的监听函数，事件对象 `e` 要排在所传递参数的后面
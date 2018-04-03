## Redux学习和实践

本文是根据阮一峰[Redux 入门教程（一）：基本用法 ](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)学习基本的redux使用，通过学习最终能完成实践和基本的流程分析。

记录一些关键的部分用于加深记忆，保存实践时简单的代码片段，希望对后续工作有帮助。

### 需要Redux的场景

- 某个组件的状态，需要共享


- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

需要一种机制，可以在同一个地方查询状态、改变状态、传播状态的变化。



### 容器

#### Store  

整个应用只能有一个 Store。 是容器

```jsx
import { createStore } from 'redux'
const store = createStore(fn)   // 接受一个函数，返回新创建的Store对象
```



### 状态

#### State  

某一时刻的所有数据`store.getState()`

```jsx
const state = store.getState()
// const state = store.getState().xx
```



### 更新

#### Action 

 就是 View 发出的通知，表示 State 应该要发生变化了。 Action 是一个对象。其中的type属性是必须的

```jsx
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```



#### Action Creator

View要发送多少种消息，就会有多少种 Action。可以定义一个函数来生成 Action

```jsx
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: text
  }
}
const action = addTodo('hello world')
```



#### dispatch

`store.dispatch() `是 View 发出 Action 的唯一方法。接受一个 Action 对象作为参数，将它发送出去

```jsx
store.dispatch({
  type: 'Add_TODO',
  payload: 'hello world'
})

store.dispatch(addTodo('hello world'))
```



#### Reducer   

Store收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

Reducer 函数最重要的特征是，它是一个**纯函数**。也就是说，只要是**同样的输入，必定得到同样的输出**。Reducer 函数里面不能改变 State，必须返回一个全新的对象。

```jsx
const reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state + action.payload;
    default: 
      return state;
  }
}

// 不改变state
const reducer = function (state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}
```

实际应用中，`store.dispatch`方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```jsx
const store = createStore(reducer)
```

为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数，参考[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)



#### Reducer 的拆分

Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

**>> 最原始的Reducer如下：**

```jsx
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};

// redux函数，如下就可以创建一个store并且dispatch时就会自动触发reducer
const store = createStore(reducer)
```

上面switch中几个type之间没有关系，我们可以将其拆分成不同的函数来负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。

Redux 提供了一个`combineReducers`方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

**>> 优化后的Reducer**

```jsx
let ReduerList =  {
   chatLog: chatLog(state.chatLog, action),
   statusMessage: statusMessage(state.statusMessage, action),
   userName: userName(state.userName, action)
}

import { createStore, combineReducers } from 'redux'
const store = createStore(combineReducers(ReduerList))

// 其中 combineReducers(ReduerList) 等同于下面函数：
function reducer(state = {}, action) {
  return {
    chatLog: chatLog(state.chatLog, action),
   	statusMessage: statusMessage(state.statusMessage, action),
   	userName: userName(state.userName, action)
  }
}
```



### 监听更新

#### store.subscribe()

State变化的监听函数，一旦 State 发生变化，就自动执行这个函数。只要把 View 的更新函数（对于 React 项目，就是组件的`render`方法或`setState`方法）放入`listen`，就会实现 View 的自动渲染。

```jsx
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe(); // 接触监听
```



## 代码段

```js
// ============ 定义reducer.js ============
/** 优化前
      const reducer = function (state = {}, action) {
      switch (action.type) {
        case 'ADD_TODO':
          return Object.assign({}, state, { 'ADD_TODO_state': action.payload })
        case 'ADD_TODO_COPY':
          return Object.assign({}, state, { 'ADD_TODO_COPY_state': action.payload })
        default:
          return state
      }
    } 
 **/
const reducer = {
    ADD_TODO_state_name: (state, action) => {
        return format(state, action, 'ADD_TODO')
    },
    ADD_TODO_COPY_state_name: (state, action) => {
        return format(state, action, 'ADD_TODO_COPY')
    },
    ADD_TODO_COPY_COPY_state_name: (state, action) => {
        return format(state, action, 'ADD_TODO_COPY_COPY')        
    } 
}
const format = (state ={}, action, type) => {
    if (action.type === type) {
        return action.payload
    } else {
        return state
    }
}


// ============ 定义action.js  ============
function addTodo(obj) {
    return {
        type: 'ADD_TODO',
        payload: obj
    }
}
function addTodo_copy(payload) {
    return {
        type: 'ADD_TODO_COPY',
        payload
    }
}
function addTodo_copy_copy(payload) {
    return {
        type: 'ADD_TODO_COPY_COPY',
        payload
    }
}

// ============ app.js ============
// 容器，关联reducer
let createStore = window.Redux.createStore
let combineReducers = window.Redux.combineReducers
// const store = createStore(reducer)   // 优化前
const store = createStore(combineReducers(reducer))    

// 监听变化
store.subscribe(() =>
   console.log('state 变化了================')
)

// dispatch
let newState = store.dispatch(addTodo({ name: '孙晨' }))  
console.log(newState)
let newState_copy = store.dispatch(addTodo_copy('sunchen'))
console.log(newState_copy)
let newState_copy_copy = store.dispatch(addTodo_copy_copy({name: 'Tetegw'}))
console.log(newState_copy_copy)


let state = store.getState()
console.log(state)
```


=>  [查看完整效果](https://tetegw.github.io/summarize/【学习】react/redux_2/redux.html)
=>  [查看完整代码](https://github.com/Tetegw/summarize/blob/master/%E3%80%90%E5%AD%A6%E4%B9%A0%E3%80%91react/redux_2/redux.html)

```
// 打印结果
state 变化了================
{type: "ADD_TODO", payload: {…}}payload: {name: "孙晨"}type: "ADD_TODO"__proto__: Object
state 变化了================
{type: "ADD_TODO_COPY", payload: "sunchen"}payload: "sunchen"type: "ADD_TODO_COPY"__proto__: Object
state 变化了================
{type: "ADD_TODO_COPY_COPY", payload: {…}}payload: {name: "Tetegw"}type: "ADD_TODO_COPY_COPY"__proto__: Object
{ADD_TODO_state_name: {…}, ADD_TODO_COPY_state_name: "sunchen", ADD_TODO_COPY_COPY_state_name: {…}}ADD_TODO_COPY_COPY_state_name: {name: "Tetegw"}ADD_TODO_COPY_state_name: "sunchen"ADD_TODO_state_name: {name: "孙晨"}__proto__: Object
```

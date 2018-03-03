import React, { Component } from 'react'             // 略
import PropTypes from 'prop-types'                   // 第三方检测，体验更好
import ReactDOM from 'react-dom'                     // reactDom渲染页面
import { createStore } from 'redux'                  // 创建一个新的store
import { Provider, connect } from 'react-redux'      // Provider组件，用于随处注入store
                                                     // connect 将 state和View组件链接在一起

// React component
class Counter extends Component {
  componentWillMount () {
    console.log(this.props);
  }
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

// 定义props的格式
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action对象，通过dispatch存储起来
const increaseAction = { type: 'increase', value: 50 }

// Reducer，dispatch默认会执行此函数，通过一系列操作转换成需要的state存储在store中
function counter(state = { count: 0 }, payload) {
  const count = state.count
  switch (payload.type) {
    case 'increase':
      return { count:  count + payload.value }
    default:
      return state
  }
}

// Store，存储中心
const store = createStore(counter)

// 把state映射到props中，connect后，可以通过this.props来使用
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// 把action映射到props中，通过connect后可以获取内部方法，来dispatch
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// 链接组件容器和store
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
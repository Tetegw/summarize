import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

let Module =  class Module extends Component {
  handleClick () {
    console.log(this.props.history);
    this.props.history.push('/c')
  }
  render () {
    return (<div onClick={this.handleClick.bind(this)}>我是ModuleAA，点击我跳转ModuleC</div>)
  }
}

export default withRouter(Module)
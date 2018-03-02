import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render () {
    return (
      <div>
        <div><Link to="/a">点击A</Link></div>
        <div><Link to="/a/aa">点击AA</Link></div>
        <div><Link to="/b">点击B</Link></div>
        <div><Link to="/c">点击C</Link></div>
      </div>
    )
  }
}
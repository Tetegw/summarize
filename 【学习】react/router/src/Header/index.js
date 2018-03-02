import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render () {
    return (
      <div>
        <Link to="/a">点击A</Link>
        <Link to="/b">点击B</Link>
        <Link to="/c">点击C</Link>
      </div>
    )
  }
}
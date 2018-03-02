import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// withRouter 才有history对象   this.props.history.push("/"); 跳转路由
// export default withRouter(Header);
import './App.css'
import Hearder from '../Header';
import ModuleA from '../ModuleA';
import ModuleAA from '../ModuleAA';
import ModuleB from '../ModuleB';
import ModuleC from '../ModuleC';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Hearder />
          <Switch>
            {/* exact   "/a"之后不允许再加 "/*"， 除非有子路由
                strict  "/a"之后不能再加 "/" 
            */}
            <Route exact strict path='/a' component={ModuleA}/>
            <Route path='/a/aa' component={ModuleAA}/>
            <Route path='/b' component={ModuleB}/>
            <Route path='/c' component={ModuleC}/>
            <Redirect from="/" to="/a" />
          </Switch>
          <div>我是footer</div>
        </div>
      </Router>
    );
  }
}

export default App;

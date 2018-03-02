import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css'
import Hearder from '../Header';
import ModuleA from '../ModuleA';
import ModuleB from '../ModuleB';
import ModuleC from '../ModuleC';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Hearder />
          <Switch>
            {/* exact   "/a"之后不能再加 "/*" 
                strict  "/a"之后不能再加 "/" 
            */}
            <Route exact strict path='/a' component={ModuleA}/>
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

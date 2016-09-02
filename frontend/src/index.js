import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import './css/skeleton';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

// Debugging
// console.clear()

var root;
document.body.insertBefore((root = document.createElement('div')), document.body.firstChild);
root.style.height = "100%";

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/">
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="*"/>
    </Route>
  </Router>),
  root
);

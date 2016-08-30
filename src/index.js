import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'skeleton-css-webpack';
import './fonts/montserrat/Montserrat-Regular.ttf'

import Register from './components/Register';
import Login from './components/Login'

// Debugging
// console.clear()

var root;
document.body.insertBefore((root = document.createElement('div')), document.body.firstChild);

render((
  <Router history={browserHistory}>
    <Route path="/">
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="*"/>
    </Route>
  </Router>),
  root
);

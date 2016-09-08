import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import './css/skeleton';

import './fonts/Montserrat.css';
import './fonts/Open-Sans.css';
import './css/styles.css';

import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';

// Debugging
// console.clear()

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/">
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="*"/>
    </Route>
  </Router>
  ),
  document.getElementById('root')
);

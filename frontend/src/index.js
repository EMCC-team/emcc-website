import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import './css/skeleton';

import './fonts/Open-Sans.css';
import './css/styles.css';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

// Debugging
// console.clear()

var root;
document.body.insertBefore((root = document.createElement('div')), document.body.firstChild);
root.style.minHeight = "100vh";

render((
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: "1" }}>
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/">
          <Route path="register" component={Register}/>
          <Route path="login" component={Login}/>
          <Route path="*"/>
        </Route>
      </Router>
    </div>
    <footer style={{ backgroundColor: "rgba(140, 0, 0, 1)", height: "120px", marginTop: "50px" }}>

    </footer>
  </div>),
  root
);

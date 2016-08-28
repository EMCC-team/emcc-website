import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'skeleton-css-webpack';

import Register from './views/Register';

// Debugging
// console.clear()

var root;
document.body.insertBefore((root = document.createElement('div')), document.body.firstChild);

render(
  <Register />,
  root
);

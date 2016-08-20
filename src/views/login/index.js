import React from 'react';
import { render } from 'react-dom';
import 'skeleton-css-webpack';

import LoginComponent from './LoginComponent'

var root;
(root = document.createElement('div')).setAttribute('id', 'root');
document.body.appendChild(root);

render(
    <LoginComponent />,
    root
);

import React from 'react';
import { render } from 'react-dom';
import HelloWorld from '../../components/hello-world.js';

var root;
(root = document.createElement('div')).setAttribute('id', 'root');
document.body.appendChild(root);

render(
    <HelloWorld />,
    root
);

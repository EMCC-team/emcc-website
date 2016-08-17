import React from 'react';
import { render } from 'react-dom';
import HelloWorld from '../../components/hello-world.js';
import './styles.css';

var root;
(root = document.createElement('div')).setAttribute('id', 'root');
document.body.appendChild(root);

render(
    <HelloWorld />,
    root
);

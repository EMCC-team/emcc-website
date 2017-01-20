import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles.css';
import Grading from './Views/Grading/';

const App = () => (
  <MuiThemeProvider>
    <Grading/>
  </MuiThemeProvider>
);

render(<App/>, document.getElementById('root'));

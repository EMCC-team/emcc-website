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
import Contest from './views/Contest';

import axios from 'axios';
class Test extends React.Component {
  constructor(props) {
    super(props);
    axios.get('/api/auth/token').then(response => {
      this.setState({data: response.data})
    })
    this.state = { data: "Loading..." };
    window.axios = axios;
  }

  render() {
    return (<span>{this.state.data}</span>);
  }
}

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/">
          <Route path="register" component={Register}/>
          <Route path="login" component={Login}/>
          <Route path="test" component={Test}/>
          <Route path="contest" component={Contest}/>
          <Route path="*"/>
        </Route>
      </Router>
    );
  }
}

export default Routes;

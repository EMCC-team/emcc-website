import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import './css/skeleton';

import './fonts/Montserrat.css';
import './fonts/Open-Sans.css';
import './css/styles.css';

import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import Contest from './views/Contest';
import Dashboard from './views/Dashboard';
import Travel from './views/Travel';
import Contact from './views/Contact';

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
        <Route path="/">
          <IndexRoute component={Home}/>
          <Route path="register" component={Register}/>
          <Route path="login" component={Login}/>
          <Route path="contest" component={Contest}/>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="travel" component={Travel}/>
          <Route path="contact" component={Contact}/>
          <Route path="*"/>
        </Route>
      </Router>
    );
  }
}

export default Routes;

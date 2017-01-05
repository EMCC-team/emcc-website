import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import withRouter from 'react-router/lib/withRouter';

import './css/skeleton';

import './fonts/Montserrat.css';
import './fonts/Open-Sans.css';
import './css/styles.css';
import './fonts/Material-Icons.css';

import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import Contest from './views/Contest';
import Dashboard from './views/Dashboard';
import Travel from './views/Travel';
import Contact from './views/Contact';
import Archive from './views/Archive';
import { ViewContainer } from './components/Layout';

import axios from 'axios';


class UserContext extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.login = this.login.bind(this);
    this.login();
    this.state = {};
  }

  login() {
    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data});
    }).catch((e) => {
      console.log(e);
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        user: this.state.user,
        setTitle: title => {
          document.title = `EMCC | ${title}`;
        },
        login: this.login
      });
    });
  }

  render() {
    return (
      <ViewContainer user={this.state.user} logout={() => {
        this.setState({ user: undefined });
        this.props.router.push('/');
      }}>
        {this.renderChildren()}
      </ViewContainer>
    );
  }
}

UserContext = withRouter(UserContext);

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={UserContext}>
          <IndexRoute component={Home}/>
          <Route path="register" component={Register}/>
          <Route path="login" component={Login}/>
          <Route path="contest" component={Contest}/>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="travel" component={Travel}/>
          <Route path="contact" component={Contact}/>
          <Route path="archive" component={Archive}/>
          <Route path="*"/>
        </Route>
      </Router>
    );
  }
}

export default Routes;

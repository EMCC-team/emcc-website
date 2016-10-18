import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory, withRouter} from 'react-router';

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
import { ViewContainer } from './components/Layout';

import axios from 'axios';


class UserContext extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data});
    }).catch();
    this.state = {};
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { user: this.state.user });
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
          <Route path="*"/>
        </Route>
      </Router>
    );
  }
}

export default Routes;

import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router';

import '../fonts/Computer-Modern.css';

import { Container, Row, Columns, Header, Footer, ViewContainer } from '../components/Layout';
import { Button, Input } from '../components/Form';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data})
    }).catch(response => {
      this.setState({user: undefined});
      this.props.router.push('/');
    });
  }

  render() {
    return (
      <ViewContainer>
      </ViewContainer>
    )
  }
}

export default withRouter(Dashboard);

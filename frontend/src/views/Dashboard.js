import React from 'react';
import axios from 'axios';
import { TeamView } from '../components/TeamForm';
import { Link, withRouter } from 'react-router';

import { ViewContainer } from '../components/Layout';
import Card from '../components/Card';
import '../css/Form.scss';

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
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="form">
            <Card style={{ marginTop: "50px", padding: "20px" }}>
              <h5 style={{ fontFamily: "Montserrat", textAlign: "center", marginBottom: "0px" }}>
                Register a team.
              </h5>
            </Card>

            <Card style={{ marginTop: "50px", padding: "0px" }}>
              <div>
                <TeamView/>
                <TeamView/>
                <TeamView/>
                <TeamView/>
              </div>
            </Card>
          </div>
        </div>
      </ViewContainer>
    )
  }
}

export default withRouter(Dashboard);

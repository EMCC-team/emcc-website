import React from 'react';
import axios from 'axios';
import { TeamView } from '../components/TeamForm';
import { Link, withRouter } from 'react-router';

import { Button } from '../components/Form';
import { ViewContainer } from '../components/Layout';
import Card from '../components/Card';
import '../css/Form.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.getTeamViews = this.getTeamViews.bind(this);
    this.addTeam = this.addTeam.bind(this);

    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data})
    }).catch(response => {
      this.setState({user: undefined});
      this.props.router.push('/');
    });
  }

  getTeamViews() {
    let del = (index) => {
      return () => {
        let teams = this.state.teams.slice();
        teams.splice(index, 1);
        if (teams.length === 0) {
          teams = [{expanded: true, key: this.state.next_id }];
          this.setState({ next_id: this.state.next_id+1 });
        }
        this.setState({ teams });
      }
    };
    let save = (index) => {
      return (team) => {
        let teams = this.state.teams.slice();
        let serialized_team = {
          id: team.props.id,
          teamname: team.state.teamname,
          members: team.state.members,
          combinable: team.state.combinable,
          price: team.state.price
        }
        teams[index] = serialized_team;
        this.setState({ teams });
      }
    }
    return this.state.teams.map((team, index) => {
      return <TeamView key={team.id} id={team.id} number={index} teamname={team.teamname}
        members={team.members} expanded={team.expanded} combinable={team.combinable}
        del={del(index)} save={save(index)}/>
    });
  }

  addTeam() {
    let teams = this.state.teams;
    teams.push({ expanded: true, id: this.state.next_id });
    this.setState({ teams, next_id: this.state.next_id+1 });
  }

  getTotalPrice() {
    return this.state.teams.reduce((a, b) => a + b.price, 0);
  }

  render() {
    return (
      <ViewContainer>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="form" style={{ width: "calc(100% - 20px)",
              maxWidth: "440px", overflow: "hidden" }}>
            <Card style={{ marginTop: "50px", padding: "20px" }}>
              <h5 style={{ fontFamily: "Montserrat", textAlign: "center", marginBottom: "0px" }}>
                Your teams
              </h5>
            </Card>

            {this.getTeamViews()}
            <Card style={{ padding: "20px", display: "flex",
                justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold" }}>Total</span>
              <span>{"$" + this.getTotalPrice()}</span>
            </Card>
            <Button onClick={this.addTeam} className="button-primary" style={{ float: "right",
                paddingRight: "20px", marginRight: "10px", display: "flex",
                alignItems: "center" }}>
              <span>Add a team</span>
              <i className="material-icons">add</i>
            </Button>

          </div>
        </div>
      </ViewContainer>
    )
  }
}

export default withRouter(Dashboard);

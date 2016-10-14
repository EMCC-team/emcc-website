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

    // retrieval
    axios.get('/api/teams/').then(response => {
      console.log(response.data);
      this.setState({ teams: response.data, looking_up: false });
    }).catch(error => {
      console.log(error);
    });

    this.state = { next_id: 0, teams: [], looking_up: true };
  }

  price(members, combinable) {
    if (!members) {
      return 0;
    }
    let length = members.filter((e) => e).length;
    if (!combinable) {
      //return 50;
    }
    if (length == 4) {
      return 50;
    }
    else {
      return length * 15;
    }
  }

  getTeamViews() {
    if (this.state.teams.length === 0) {
      let message = "";
      if (this.state.looking_up) {
        message = "Loading your teams..."
      }
      else {
        message = <span>You have no teams. <a href="#" onClick={this.addTeam}>Add one?</a></span>
      }
      return <Card style={{ padding: "20px", display: "flex",
      justifyContent: "space-between" }}>
        <h6 style={{ marginBottom: '0px' }}>{message}</h6>
      </Card>
    }
    let del = (index) => {
      return () => {
        let teams = this.state.teams.slice();
        let remove = (teams, index) => {
          teams.splice(index, 1);
          this.setState({ teams });
        }
        if (typeof teams[index].id !== 'number') {
          axios.delete(`/api/teams/${teams[index].id}`).then(response => {
            remove(teams, index);
          }).catch(error => {
            console.log(error);
          });
        }
        else {
          remove(teams, index);
        }
      }
    };
    let save = (index) => {
      return (team, options) => {
        options = options || { request: false };
        let teams = this.state.teams.slice();
        let serialized_team = {
          id: team.props.id,
          teamname: team.state.teamname,
          members: team.state.members,
          combinable: team.state.combinable,
          price: team.state.price,
        }
        let update = (teams, index, serialized_team) => {
          teams[index] = serialized_team;
          this.setState({ teams });
        }
        if (!options.request) {
          update(teams, index, serialized_team);
        }
        else if (typeof serialized_team.id === 'number') {
          axios.post('/api/teams/', {
              teamname: serialized_team.teamname,
              members: serialized_team.members,
              combinable: serialized_team.combinable }).then(response => {
            serialized_team.id = response.data.Location;
            update(teams, index, serialized_team);
          }).catch(error => {
            console.log(error)
          });
        }
      }
    }
    return this.state.teams.map((team, index) => {
      return <TeamView key={team.id} id={team.id} teamname={team.teamname}
        members={team.members} expanded={team.expanded} combinable={team.combinable}
        del={del(index)} save={save(index)} price={this.price}/>
    });
  }

  addTeam() {
    let teams = this.state.teams.slice();
    teams.push({ expanded: true, id: this.state.next_id });
    this.setState({ teams, next_id: this.state.next_id+1 });
  }

  getTotalPrice() {
    return this.state.teams.reduce((a, b) => a + this.price(b.members, b.conbinable), 0);
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

import React from 'react';
import axios from 'axios';
import { TeamView } from '../components/TeamForm';
import { Link, withRouter } from 'react-router';

import { Button } from '../components/Form';
import Card from '../components/Card';
import '../css/Form.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleShowLeaveDialog = this.toggleShowLeaveDialog.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.confirmRegistration = this.confirmRegistration.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.serializeTeam = this.serializeTeam.bind(this);
    this.getTeamViews = this.getTeamViews.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.payload = this.payload.bind(this);
    this.addTeam = this.addTeam.bind(this);

    // retrieval
    axios.get('/api/teams/').then(response => {
      this.setState({ teams: response.data, loading_message: "" });
    }).catch(error => {
      console.log(error);
    });

    this.state = { next_id: 0, teams: [],
      loading_message: "Loading your teams..." };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      nextProps.router.push('/');
    }
  }

  componentDidMount() {
    window.onbeforeunload = this.toggleShowLeaveDialog;
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      alert('asd');
      return 'You have unsaved information, are you sure you want to leave this page?';
    });
  }

  componentWillUnmount() {
    window.onbeforeunload = undefined;
  }

  toggleShowLeaveDialog(e) {
    if (this.state.teams.some(team => team.expanded)) {
      console.log('asd');
      return '';
    }
    return;
  }

  price(members, combinable) {
    if (!members) {
      return 0;
    }
    let length = members.filter((e) => e).length;
    if (length == 4) {
      return 50;
    }
    else if (!combinable) {
      return 50;
    }
    else {
      return length * 15;
    }
  }

  updateTeam(team, index) {
    let teams = this.state.teams.slice()
    teams[index] = this.serializeTeam(team);
    this.setState({ teams });
  }

  payload(team) {
    return {
      name: team.name,
      school: team.school,
      members: team.members,
      confirmed: !!team.confirmed,
      combinable: team.combinable,
    }
  }

  serializeTeam(team) {
    return { ...this.payload(team), id: team.id, expanded: team.expanded }
  }

  saveTeam(team, index) {
    let payload = this.payload(team);
    let serialized_team = this.serializeTeam(team);
    if (typeof serialized_team.id === 'number') {
      console.log(payload);
      return axios.post('/api/teams/', payload).then(response => {
        serialized_team.id = response.data.Location;
        this.updateTeam(serialized_team, index);
      }).catch(error => {
        console.log(error)
      });
    }
    else if (typeof serialized_team.id === 'string') {
      console.log(payload);
      return axios.put(`/api/teams/${serialized_team.id}`, payload).then(response => {
      }).catch(error => {
        console.log(error)
      });
    }
  }

  getTeamViews(teams, filter, message) {
    // Loading message
    if (teams.filter(team => filter(team)).length === 0) {
      if (this.state.loading_message) {
        message = this.state.loading_message;
      }
      return <Card style={{ padding: "20px", display: "flex",
      justifyContent: "space-between" }}>
        <h6 style={{ marginBottom: '0px' }}>{message}</h6>
      </Card>
    }

    // Delete team callback
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

    // Save team callback
    let save = (index) => {
      return (team, request) => {
        if (request) {
          this.saveTeam(team.state, index);
        }
        this.updateTeam(team.state, index);
      }
    }

    return teams.map((team, index) => {
      if (!filter(team, index)) {
        return
      }
      return <TeamView team={team} key={team.id}
        del={del(index)} save={save(index)} price={this.price}/>
    });
  }

  confirmRegistration(e) {
    let teams = this.state.teams.filter(team => !team.confirmed);
    if (teams.some((team) => team.expanded)) {
      console.log('save your work!');
      return;
    }
    Promise.all(teams.map((team, index) => {
      team.confirmed = true;
      return this.saveTeam(team, index);
    })).then(response => {
      let new_teams = this.state.teams.slice().map(team => {
        team.confirmed = true;
        return team;
      });
      this.setState({ teams: new_teams })
    }).catch(error => {
      console.log(error);
    })
  }

  addTeam(e) {
    e.preventDefault();
    let teams = this.state.teams.slice();
    teams.push({ expanded: true, id: this.state.next_id });
    this.setState({ teams, next_id: this.state.next_id+1 });
  }

  getPrice(teams) {
    return teams.reduce((a, b) => a + this.price(b.members, b.combinable), 0);
  }

  render() {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column" }}>
        <div style={{ height: "100%", display: "flex", flexWrap: "wrap",
            justifyContent: "center", width: "100%", flex: "1" }}>
          <div className="form" style={{ width: "calc(100% - 20px)",
          maxWidth: "440px", overflow: "hidden", flex: "1" }}>
            <Card style={{ marginTop: "20px", padding: "20px" }}>
              <h4 style={{ fontFamily: "Montserrat", textAlign: "center", marginBottom: "0px" }}>
                Confirmed teams
              </h4>
            </Card>
            {this.getTeamViews(this.state.teams, team => team.confirmed,
            <p style={{ marginBottom: "0px" }}>
              You have no confirmed teams. After you confirm your
              registration, your teams will show up here instead.
            </p>)}
          </div>
          <div className="form" style={{ width: "calc(100% - 20px)",
          maxWidth: "440px", overflow: "hidden", flex: "1" }}>
            <Card style={{ marginTop: "20px", padding: "20px" }}>
              <h4 style={{ fontFamily: "Montserrat", textAlign: "center", marginBottom: "0px" }}>
                Unconfirmed teams
              </h4>
            </Card>
            {this.getTeamViews(this.state.teams, team => !team.confirmed,
            <span>
              You have no unconfirmed teams.&nbsp;
              <a href="#" onClick={this.addTeam}>Add one?</a>
            </span>)}
            <Button onClick={this.addTeam} className="button" style={{
              paddingRight: "20px", marginRight: "10px", alignItems: "center",
              display: this.state.loading_message ? "none" : "flex", margin: "0px 10px",
              width: "calc(100% - 20px)", justifyContent: "center" }}>
              <span style={{ flex: "0" }}>Add a team</span>
              <i style={{ flex: "0", lineHeight: "inherit" }} className="material-icons">add</i>
            </Button>
          </div>
        </div>
        <Card className="confirmation-box" style={{ padding: "20px",
            display: "flex", clear: "both", justifyContent: "center",
            flexWrap: "wrap", width: "calc(100% - 40px)", flex: "none" }}>
          <table style={{ marginRight: "0px", marginLeft: "auto",
            marginBottom: "5px" }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", margin: "0px 5px",
                  borderBottom: "none", padding: "3px 10px",
                  textAlign: "right" }}>Confirmed teams:</td>
                <td style={{ borderBottom: "none", padding: "3px 10px" }}>
                  {"$" + this.getPrice(this.state.teams.filter(team => team.confirmed))}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", margin: "0px 5px",
                  borderBottom: "none", padding: "3px 10px",
                  textAlign: "right" }}>Unconfirmed teams:</td>
                <td style={{ borderBottom: "none", padding: "3px 10px" }}>
                  {"$" + this.getPrice(this.state.teams.filter(team => !team.confirmed))}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", margin: "0px 5px",
                  borderBottom: "none", padding: "3px 10px",
                  textAlign: "right" }}>Total:</td>
                <td style={{ borderBottom: "none", padding: "3px 10px" }}>
                  {"$" + this.getPrice(this.state.teams)}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: this.state.loading_message ? "none" : "block"}}>
            <Button onClick={this.confirmRegistration} className="button-primary"
            style={{ paddingRight: "20px", marginRight: "10px",
              alignItems: "center", display:"flex",
              width: "100%", margin: "10px 0px", justifyContent: "center" }}>
              <span>Confirm registration</span>
            </Button>
            <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
              By clicking "confirm registration," you agree to pay the
              above amount.
            </p>
            <p style={{ marginBottom: "0px" }}>
              Make out a check to the the&nbsp;
              <span style={{ fontWeight: "bold" }}>
                Exeter Math Club Competition
              </span> and send it to:
            </p>
            <address style={{ marginBottom: "8px" }}>
              Zuming Feng <br/>
              20 Main Street <br/>
              Exeter, NH, 03833.
            </address>
            <p style={{ marginBottom: "0px" }}>
              You can still edit or delete teams after you've confirmed your
              registration until the registration period closes.
            </p>
          </div>
        </Card>
        <div style={{ position: "fixed", width: "100vw", height: "100vh",
          alignItems: "center", justifyContent: "center", top: "0px",
          backgroundColor: "rgba(50, 50, 50, 0.30)",
          display: this.state.showLeaveDialog ? "flex" : "none" }}>
          <Card style={{ flex: "1", backgroundColor: "#FFF", width: "80vw",
            maxWidth: "400px", padding: "20px" }}>
              It seems that you have unsaved work. Do you want to save your
              changes before you leave?
              <Button style={{ float: "right", marginTop: "10px" }}>
                Leave
              </Button>
              <Button style={{ float: "right", marginTop: "10px",
                marginRight: "8px" }} className="button-primary">
                Stay
              </Button>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);

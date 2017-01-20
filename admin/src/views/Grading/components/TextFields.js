import React from 'react'
import TextField from 'material-ui/TextField'
import { Center, Distribute } from '../../utils'

class IDTextField extends React.Component {
  render() {
    return <TextField style={{ width: '80px' }} {...this.props}/>
  }
}

class TeamTextField extends React.Component {
  render() {
    return <span>
      <IDTextField
        floatingLabelText='Team'
        onChange={this.props.onChange}/>:&nbsp;
      <span>{this.props.team_name}</span>
    </span>
  }
}

class TeamMemberTextField extends React.Component {
  render() {
    return <span>
      <IDTextField
        floatingLabelText='Member'
        onChange={this.props.onChange}/>:&nbsp;
      <span>{this.props.member_name}</span>
    </span>
  }
}

class TeamOrTeamMemberTextField extends React.Component {
  render() {
    return <Distribute>
      <TeamTextField onChange={this.props.onTeamChange}/>
      {this.props.isTeamMemberHidden &&
        <TeamMemberTextField onChange={this.props.onTeamMemberChange}/>}
    </Distribute>
  }
}

class GraderNameTextField extends React.Component {
  render() {
    return <Center>
      <TextField
        floatingLabelText="Grader's name"
        onChange={this.props.onChange}/>
    </Center>
  }
}

export { GraderNameTextField, TeamOrTeamMemberTextField }

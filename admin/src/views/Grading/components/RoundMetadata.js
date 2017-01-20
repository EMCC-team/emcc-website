import React from 'react'

import { GraderNameTextField, TeamOrTeamMemberTextField } from './TextFields'
import { RoundSelector, GutsSubroundSelector } from './Selectors'

class RoundMetadata extends React.Component {
  render() {
    return <div>
      <GraderNameTextField onChange={this.props.onGraderNameChange}/>
      <RoundSelector
        callback={this.props.onSelectRound}
        selected={this.props.selected_round}/>
      {this.props.selected_round === "Guts" && <GutsSubroundSelector
        callback={this.props.onSelectSubround}
        selected={this.props.selected_subround}/>}
      <TeamOrTeamMemberTextField
        onTeamChange={this.props.onTeamChange}
        onTeamMemberChange={this.props.onTeamMemberChange}
        isTeamMemberHidden={this.props.isTeamMemberHidden}/>
    </div>
  }
}

export default RoundMetadata

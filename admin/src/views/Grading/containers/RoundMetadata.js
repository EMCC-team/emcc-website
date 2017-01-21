import { connect } from 'react-redux'

import _RoundMetadata from '../components/RoundMetadata'
import { setGrader, setRound, setSubround,
         setTeam, setTeamMember } from '../actions/RoundMetadata.js'

const showTeamMemberTextField = (selected_round) => {
  return ['Speed', 'Accuracy'].indexOf(selected_round) > -1
}

const mapStateToProps = (state) => {
  return {
    selected_round: state.getIn(['metadata', 'round']),
    selected_subround: state.getIn(['metadata', 'subround']),
    isTeamMemberHidden: showTeamMemberTextField(state.getIn(['metadata', 'round']))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGraderNameChange: (event, grader) => dispatch(setGrader(grader)),
    onSelectRound: (round) => dispatch(setRound(round)),
    onSelectSubround: (subround) => dispatch(setSubround(subround)),
    onTeamChange: (event, team) => dispatch(setTeam(team)),
    onTeamMemberChange: (event, team_member) =>
      dispatch(setTeamMember(team_member))
  }
}

const RoundMetadata = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_RoundMetadata)

export default RoundMetadata

import Immutable from 'immutable'

let initialState = Immutable.fromJS({
    grader: "Tyler Hou",
    round: "GUTS",
    subround: 1,
    team: 53,
    team_member: 2,
    previous_graders: ['Matthew Hambacher']
})

const RoundMetadataReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_GRADER':
            state = state.set('grader', action.grader)
            break
        case 'SET_ROUND':
            state = state.set('round', action.round)
            break
        case 'SET_SUBROUND':
            state = state.set('subround', action.subround)
            break
        case 'SET_TEAM_NUMBER':
            state = state.set('team', action.team)
            break
        case 'SET_MEMBER_NUMBER':
            state = state.set('team_member', action.team_member)
            break
    }
    console.log(state.toJS())
    return state
}

export default RoundMetadataReducer

import Immutable from 'immutable'

let initialState = Immutable.fromJS({
  grades_list: [true, false, true, true, false, true, true, true, false, true],
  previous_grades_list: [true, false, true, false, true, true, true, false, false, true]
})

const GradesListReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GRADE_QUESTION':
      state = state.setIn(
        ['grades_list', action.index],
        action.grade
      )
      break
  }
  return state
}

export default GradesListReducer

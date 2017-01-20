import { connect } from 'react-redux'

import _RoundStatistics from '../components/RoundStatistics'

const getNumberOfConflicts = (first=[], second=[]) => {
  return first.reduce((total, grade, index) => {
    return total + (grade ^ second[index])
  }, 0)
}

const getNumberCorrect = (grades) => {
  return grades.reduce((total, grade, index) => {
    return total + (grade)
  }, 0)
}

const getTimesGraded = (previous_graders) => {
  return previous_graders.length
}

const mapStateToProps = (state) => {
  return {
    conflicts: getNumberOfConflicts(
      state.getIn(['grades', 'grades_list']).toJS(),
      state.getIn(['grades', 'previous_grades_list']).toJS()
    ),
    correct: getNumberCorrect(state.getIn(['grades', 'grades_list']).toJS()),
    times_graded: getTimesGraded(state.getIn(['metadata', 'previous_graders']).toJS())
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const RoundStatistics = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RoundStatistics)

export default RoundStatistics

import { connect } from 'react-redux'

import _GradesList from '../components/GradesList'
import { gradeQuestion } from '../actions/GradesList'

const findConflictsInGradesListAndPrevious = (grades_list=[], previous=[]) => {
  return grades_list.map((grade, index) => {
    let packaged_grade = {
      correct: grade
    }
    if (grade !== previous[index]) {
      Object.assign(packaged_grade, { conflict: true })
    }
    return packaged_grade
  })
}

const mapStateToProps = (state) => {
  return {
    grades: findConflictsInGradesListAndPrevious(
      state.getIn(['grades', 'grades_list']).toJS(),
      state.getIn(['grades', 'previous_grades_list']).toJS()
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGradeQuestion: (grade, index) => dispatch(gradeQuestion(grade, index))
  }
}

const GradesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GradesList)

export default GradesList

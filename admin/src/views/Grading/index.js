import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux-immutable'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

import RoundMetadata from './containers/RoundMetadata'
import GradesList from './containers/GradesList'
import RoundStatistics from './containers/RoundStatistics'

import GradesListReducer from './reducers/GradesListReducer'
import RoundMetadataReducer from './reducers/RoundMetadataReducer'

class NextButton extends React.Component {
  render() {
    let alignRightStyle = {
      display: 'flex',
      justifyContent: 'flex-end'
    }
    return <div style={alignRightStyle}>
      <RaisedButton primary label='Next'/>
    </div>
  }
}

let reducer = combineReducers({
  metadata: RoundMetadataReducer,
  grades: GradesListReducer
})
let store = createStore(reducer)

class Grading extends React.Component {
  render() {
    let style = {
      maxWidth: '565px',
      margin: '20px',
      padding: '20px',
      clear: 'both'
    }
    return <Provider store={store}>
      <Paper style={style}>
        <RoundMetadata/>
        <Divider/>
        <GradesList/>
        <Divider/>
        <RoundStatistics/>
        <NextButton/>
      </Paper>
    </Provider>
  }
}

/*
client:
state = {
  metadata: {
    grader: String,
    round: String,
    subround: Integer, // for Guts
    team: Number,
    member: Number,
    previous_graders: []
  },
  grades: {
    grades_list: [],
    previous_grades_list: [],
  }
}*/

export default Grading

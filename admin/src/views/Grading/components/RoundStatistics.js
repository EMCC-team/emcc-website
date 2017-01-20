import React from 'react'
import { Distribute } from '../../utils'

class TimesGradedLabel extends React.Component {
  render() {
    return <span>Times graded: {this.props.times_graded}</span>
  }
}

class ConflictsLabel extends React.Component {
  render() {
    return <span>Conflicts: {this.props.conflicts}</span>
  }
}

class CorrectLabel extends React.Component {
  render() {
    return <span>Correct: {this.props.correct}</span>
  }
}

class RoundStatistics extends React.Component {
  render() {
    return <Distribute style={{ margin: '10px 0px' }}>
      <TimesGradedLabel times_graded={this.props.times_graded}/>
      <ConflictsLabel conflicts={this.props.conflicts}/>
      <CorrectLabel correct={this.props.correct}/>
    </Distribute>
  }
}

export default RoundStatistics

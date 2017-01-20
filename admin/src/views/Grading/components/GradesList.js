import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { green700, red700, red100, transparent,
         minBlack, faintBlack } from 'material-ui/styles/colors'

class CorrectButton extends React.Component {
  render() {
    let color
    if (this.props.active) {
      color = green700
    } else if (this.props.inactive) {
      color = 'rgba(0, 0, 0, 0.08)'
    } else {
      color = minBlack
    }
    return <FlatButton
              label='Correct'
              labelStyle={{ color: color }}
              onTouchTap={() => this.props.callback(true)}/>
  }
}

class IncorrectButton extends React.Component {
  render() {
    let color
    if (this.props.active) {
      color = red700
    } else if (this.props.inactive) {
      color = 'rgba(0, 0, 0, 0.08)'
    } else {
      color = minBlack
    }
    return <FlatButton
              label='Incorrect'
              labelStyle={{ color: color }}
              onTouchTap={() => this.props.callback(false)}/>
  }
}

class Grade extends React.Component {
  render() {
    let questionStyle = {
      padding: '0px 10px',
      backgroundColor: this.props.conflict && red100
    }
    let questionLabelStyle = {
      width: '20px',
      display: 'inline-block',
      textAlign: 'right'
    }
    let correct = this.props.correct
    return <div style={questionStyle}>
      <span style={questionLabelStyle}>
        {this.props.index+1}
      </span>.&nbsp;
      <CorrectButton
        active={correct}
        inactive={correct===false}
        callback={this.props.callback}/>
      <IncorrectButton
        active={correct===false}
        inactive={correct}
        callback={this.props.callback}/>
    </div>
  }
}

class GradesList extends React.Component {
  getQuestions(questions, callback) {
    return questions.map((question, index) => {
      let props = {
        key: index,
        index: index,
        correct: question.correct,
        callback: (action) => {
          callback(action, index)
        }
      }
      if (question.conflict) {
        Object.assign(props, { conflict: true })
      }
      return <Grade {...props}/>
    })
  }

  render() {
    let { grades, onGradeQuestion } = this.props
    let style = {
      display: 'flex',
      flexFlow: 'column wrap',
      alignContent: 'center',
      maxHeight: 36 * Math.ceil(grades.length / 2) + 'px',
    }
    return <div style={style}>
      {this.getQuestions(grades, onGradeQuestion)}
    </div>
  }
}

export default GradesList

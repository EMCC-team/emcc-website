import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { faintBlack } from 'material-ui/styles/colors'
import { Center } from '../../utils'

function ButtonListFromLabels(WrappedButton) {
  return class extends React.Component {
    getListFromLabels(props) {
      let pass_props = props.pass_props || {}
      return props.labels.map((label, index) => {
        return <WrappedButton label={label} key={label} style={props.style}
                  onTouchTap={() => props.callback(label)}
                  {...pass_props[index]}/>
      })
    }

    render() {
      return <div>{this.getListFromLabels(this.props)}</div>
    }
  }
}

const SimpleRaisedButtonList = ButtonListFromLabels(RaisedButton)
const SimpleFlatButtonList = ButtonListFromLabels(FlatButton)

/* TODO: Refactor the following two components, which share much of the same
 * code */
class RoundSelector extends React.Component {
  render() {
    let pass_props = {}, choices = ['Sprint', 'Accuracy', 'Team', 'Guts'],
    selected_style = { backgroundColor: faintBlack }
    pass_props[choices.indexOf(this.props.selected)] = selected_style
    return <Center>
      <SimpleRaisedButtonList
        labels={choices}
        pass_props={pass_props}
        callback={this.props.callback}/>
    </Center>
  }
}

class GutsSubroundSelector extends React.Component {
  render() {
    let pass_props = {}, choices = [...Array(8).keys()].map((a)=>a+1),
    selected_style = { backgroundColor: faintBlack }
    pass_props[choices.indexOf(this.props.selected)] = selected_style
    return <Center>
      <span style={{ lineHeight: '36px', margin: '0px 6px' }}>Round:</span>
      <SimpleFlatButtonList
        labels={choices}
        pass_props={pass_props}
        callback={this.props.callback}
        style={{ minWidth: '0px' }}/>
    </Center>
  }
}

export { RoundSelector, GutsSubroundSelector }

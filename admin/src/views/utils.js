import React from 'react'

class Center extends React.Component {
  render() {
    let style = {
      display: 'flex',
      justifyContent: 'center'
    }
    return <div style={{...style, ...this.props.style}}>
      {this.props.children}
    </div>
  }
}

class Distribute extends React.Component {
  render() {
    let style = {
      display: 'flex',
      justifyContent: 'space-around'
    }
    return <div style={{...style, ...this.props.style}}>
      {this.props.children}
    </div>
  }
}

export { Center, Distribute }

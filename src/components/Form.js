import React from 'react';
import classNames from 'classnames';

class Form extends React.Component {
  render() {
    let formStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      flexDirection: 'column',
      maxWidth: '300px',
      margin: '0px auto'
    };

    return (
      <form className="form" style={formStyle} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

class Label extends React.Component {
  render() {
    return (
      <label htmlFor={this.props.id + "Input"}>{this.props.children}</label>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <input id={this.props.id + "Input"} type={this.props.type}
             style={{width: "100%"}} onChange={this.props.onChange}/>
    );
  }
}

class LabeledInput extends React.Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <Label id={this.props.id}>{this.props.children}</Label>
        <Input id={this.props.id} type={this.props.type} onChange={this.props.onChange}/>
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    let buttonClasses = classNames({
      'button-primary': this.props.primary
    })
    return (
      <button type={this.props.type} className={buttonClasses}
              style={{width: this.props.width}}>{this.props.children}</button>
    )
  }
}

export default Form;
export { Form, Input, Label, LabeledInput, Button };

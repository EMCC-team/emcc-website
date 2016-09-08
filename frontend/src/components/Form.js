import React from 'react';
import classNames from 'classnames';

class Label extends React.Component {
  render() {
    let { name, children, ...other } = this.props;
    return (
      <label {...other} htmlFor={name}>{children}</label>
    );
  }
}

class ErrorText extends React.Component {
  render() {
    let { children, ...other} = this.props;
    return (
      <span {...other} style={{ fontWeight: 100, color: "#ff0033",
          fontSize: "0.75em", ...this.props.style }}>{children}</span>
    );
  }
}

class Input extends React.Component {
  render() {
    let { name, type, onChange, ...other } = this.props;
    return (
      <input {...other} id={name} type={type}
             style={{ ...other.style }} onChange={onChange} />
    );
  }
}

class Button extends React.Component {
  render() {
    let { type, children, ...other } = this.props; // inherited props
    return (
      <button {...other} type={type}>{children}</button>
    )
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.addPropsToChildren = this.addPropsToChildren.bind(this);
  }

  addPropsToChildren(children, name) {
    return React.Children.map(children, (child) => {
      if (child.type === Input || child.type === Label) {
        return React.cloneElement(child, { name: name });
      }
      return child;
    });
  }

  render() {
    let { children, formName, name, ...other } = this.props; // inherited props
    return (
      <div {...other} style={{ width: "100%", ...other.style }}>{this.addPropsToChildren(children, `${formName}-${name}`)}</div>
    )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.addPropsToChildren = this.addPropsToChildren.bind(this);
  }

  addPropsToChildren(children) {
    return React.Children.map(children, (child) => {
      if (child.type === Group) {
        return React.cloneElement(child, { formName: this.props.name });
      }
      return child;
    });
  }

  render() {
    let { onSubmit, children, name, formName, ...other } = this.props;
    let formStyle = {
      maxWidth: '300px',
      margin: '0px auto'
    };

    return (
      <form {...other} style={{ ...formStyle, ...other.style }} onSubmit={onSubmit}>
        {this.addPropsToChildren(children)}
      </form>
    );
  }
}

export { Form, Input, Label, Button, Group, ErrorText };

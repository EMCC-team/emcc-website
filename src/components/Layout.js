import React from 'react';
import classNames from 'classnames';

class Container extends React.Component {
  render() {
    return (
      <div className='container'>{this.props.children}</div>
    );
  }
}

class Row extends React.Component {
  render() {
    return (
      <div className='row'>{this.props.children}</div>
    );
  }
}

class Columns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let divClasses = classNames({
      [`offset-by-${this.props.offset}`]: this.props.offset,
      [`${this.props.width}`]: this.props.width,
      columns: this.props.width
    });
    return (
      <div className={divClasses}>{this.props.children}</div>
    )
  }
}

export { Container, Row, Columns };

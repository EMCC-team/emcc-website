import React from 'react';
import classNames from 'classnames';

class Container extends React.Component {
  render() {
    let { children, ...other } = this.props;
    return (
      <div {...other} className='container'>{children}</div>
    );
  }
}

class Row extends React.Component {
  render() {
    let { children, ...other } = this.props;
    return (
      <div {...other} className='row'>{children}</div>
    );
  }
}

class Columns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, offset, width, ...other } = this.props;
    let divClasses = classNames({
      [`offset-by-${offset}`]: offset,
      [`${width}`]: width,
      columns: width
    });
    return (
      <div {...other} className={divClasses}>{children}</div>
    )
  }
}

export { Container, Row, Columns };

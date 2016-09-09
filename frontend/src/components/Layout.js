import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<header style={{ backgroundColor: "rgba(140, 0, 0, 1)", height: "75px",
              fontFamily: "Montserrat", display: "flex", alignItems: "center",
              boxShadow: '0 1px 6px rgba(0,0,0,.5)', color: "#EEEEEE" }}>
      <h2 style={{ fontWeight: "100", marginBottom: "0px", marginLeft: "14px" }}>
        <Link to="/" style={{ color: "#EEEEEE", textDecoration: "none" }}>EMCC</Link>
      </h2>
      <span style={{ fontWeight: "200", marginLeft: "auto",
        marginRight: "14px", fontSize: "1em" }}>
        {this.state.name ? `You are logged in as ${this.state.name}.` :
        <Link to="login" style={{ color: "#EEEEEE", textDecoration: "none" }}>Login</Link> }
      </span>
    </header>);
  }
}

class Footer extends React.Component {
  render() {
    return (<footer style={{ backgroundColor: "rgba(140, 0, 0, 1)", height: "120px",
              marginTop: "50px" }}>

    </footer>);
  }
}

export { Container, Row, Columns, Header, Footer };

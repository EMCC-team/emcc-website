import React from 'react';
import axios from 'axios';
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

class ViewContainer extends React.Component {
  render() {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header/>
        <div style={{ flex: "1", height: "100%", marginTop: "75px" }}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {};
    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data})
    }).catch(function(){});
  }

  logout(e) {
    axios.post('/api/auth/logout').then(response => {
      this.setState({user: undefined});
    });
  }

  render() {
    return (
      <header style={{ backgroundColor: "rgba(140, 0, 0, 1)", height: "75px", zIndex: "100",
                fontFamily: "Montserrat", display: "flex", alignItems: "center", width: "100%",
                boxShadow: '0 1px 6px rgba(0,0,0,.5)', color: "#EEEEEE", position: "fixed" }}>
        <h2 style={{ fontWeight: "100", marginBottom: "0px", marginLeft: "14px" }}>
          <Link to="/" style={{ color: "#EEEEEE", textDecoration: "none" }}>EMCC</Link>
        </h2>
        <span style={{ fontWeight: "200", marginLeft: "auto",
          marginRight: "20px", fontSize: "1em" }}>
          {this.state.user ?
          <span>
              Logged in as {this.state.user.name}.
              &nbsp;|&nbsp;
            <Link to="/" style={{ color: "#EEEEEE", textDecoration: "none" }} onClick={this.logout}>logout</Link>
          </span>
          :
          <span>
            <Link to="login" style={{ color: "#EEEEEE", textDecoration: "none" }}>login</Link>
              &nbsp;|&nbsp;
            <Link to="register" style={{ color: "#EEEEEE", textDecoration: "none" }}>register</Link>
          </span>
          }
        </span>
      </header>
    );
  }
}

let JaneStreetLogo = require('../assets/janestreetlogo.png')
class Footer extends React.Component {
  render() {
    return (
      <footer style={{ backgroundColor: "rgba(140, 0, 0, 1)", marginTop: "50px",
                color: "#EEEEEE", fontFamily: "Montserrat", padding: "20px" }}>
          <h6 style={{ fontWeight: "200", float: "left", margin: "0" }}>Copyright &copy; Exeter Math Club 2016.</h6>
          <h6 style={{ fontWeight: "200", float: "right", margin: "0" }}>
            <span style={{ marginRight: "15px" }}>Sponsored by Jane Street.</span>
            <a href="http://janestreet.com">
              <img id="jane_logo" style={{ filter: "invert(100%)", verticalAlign: "middle" }} src={JaneStreetLogo}/>
            </a>
          </h6>
      </footer>
    );
  }
}

export { Container, Row, Columns, Header, Footer, ViewContainer };

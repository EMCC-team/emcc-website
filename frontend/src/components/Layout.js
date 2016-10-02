import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Link, NavLink, withRouter } from 'react-router';

import '../fonts/Material-Icons.css';

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
        <div style={{ flex: "1", height: "100%", marginTop: "54px" }}>
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
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.getNavLinks = this.getNavLinks.bind(this);

    this.update = this.forceUpdate.bind(this);
    window.addEventListener('resize', this.update);
    this.state = { dropdownVisible: false };
    axios.get('/api/auth/token').then(response => {
      this.setState({user: response.data})
    }).catch(response => {
      this.setState({user: undefined});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  }

  getNavLinks() {
    let links = ['contest', 'travel', 'contact'];
    if (this.state.user) {
      links.push('dashboard');
    }
    let linkStyle = {
      textDecoration: "none",
      display: "inline-block",
      color: "inherit",
      padding: "15px 10px",
      margin: "initial 0px",
      textTransform: "capitalize"
    }
    let activeLinkStyle = {
      backgroundColor: "rgb(110, 0, 0)"
    }
    if (window.innerWidth > 650) {
      return links.map((place, i) => {
        return <Link key={i} style={linkStyle} activeStyle={activeLinkStyle}
                     to={`${place}`}>{`${place}`}</Link>
      });
    }
    else {
      return (
        <div key={10} style={{ width: "fit-content" }}>
          <a key={11} style={linkStyle} href="#" onClick={this.toggleDropdown}>Menu
            <i style={{ verticalAlign: "middle" }} className="material-icons">expand_more</i></a>
          <ul key={12} style={{ position: "absolute", backgroundColor: "rgb(140, 0, 0)",
                       listStyle: "none", width: "110px",
                       display: this.state.dropdownVisible ? "block" : "none"}}>
             {links.map((place, i) => {
                return <li key={i+20}style={{ margin: "0"}}>
                  <Link key={i+30} style={{ ...linkStyle, width: "100%",
                        boxSizing: "border-box" }}
                        activeStyle={activeLinkStyle}
                        to={`${place}`}>{`${place}`}</Link></li>
             })}
          </ul>
        </div>
      )
    }
  }

  logout(e) {
    e.preventDefault();
    axios.post('/api/auth/logout').then(response => {
      this.setState({user: undefined});
      this.props.router.push('/');
    });
  }

  render() {
    let navStyle = {
      fontWeight: "300",
    };
    return (
      <header style={{ backgroundColor: "rgba(140, 0, 0, 1)", zIndex: "100",
                fontFamily: "Montserrat", display: "flex", alignItems: "center", width: "100%",
                boxShadow: '0 1px 6px rgba(0,0,0,.8)', color: "#EEEEEE", position: "fixed" }}>

        <h2 style={{ fontWeight: "100", margin: "0px 14px" }}>
          <Link to="/" style={{ color: "#EEEEEE", textDecoration: "none" }}>EMCC</Link>
        </h2>

        <nav style={navStyle}>
          <span id="nav-links" style={{ marginBottom: "0px" }}>
            {this.getNavLinks()}
          </span>
        </nav>

        <span style={{ fontWeight: "200", marginLeft: "auto", marginRight: "20px", fontSize: "1em" }}>
          {this.state.user ?
          <span>
            <span dangerouslySetInnerHTML={{__html: this.state.user.name.replace(" ", "&nbsp;")}}></span>
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
Header = withRouter(Header);

let JaneStreetLogo = require('../assets/janestreetlogo.png')
class Footer extends React.Component {
  render() {
    return (
      <footer style={{ backgroundColor: "rgba(140, 0, 0, 1)", marginTop: "50px",
                color: "#EEEEEE", fontFamily: "Montserrat", padding: "20px",
                boxShadow: "rgba(0, 0, 0, 0.8) 0px 1px 6px", position: "relative" }}>
          <h6 style={{ fontWeight: "200", float: "left", margin: "0" }}> &copy; Copyright 2016 Exeter Math Club. All&nbsp;rights&nbsp;reserved.</h6>
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

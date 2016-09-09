import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import { Link, withRouter } from 'react-router';

import { Header, Footer } from '../components/Layout';
import { Form, Group, Label, ErrorText, Input, Button } from '../components/Form';
import Card from '../components/Card';

class Login extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Login | EMCC";
    // Binding is necessary because otherwise the functions inhert an
    // incorrect `this` value.
    this.loginUser = this.loginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    // Storing styles like this is really ugly but it works.
    this.state = {
      email:    '',
      password: '',
      emailErrorStyle: {},
      passwordErrorStyle: {},
      emailErrorText: '',
      passwordErrorText: ''
    };
  }

  loginUser(e) {
    e.preventDefault();

    /* Preflight validation */

    // Definitions
    let requiredError = 'This field is required.';
    let inputError = {
      borderColor: '#ff0033'
    };

    // Reset
    let emailErrorText = '',  passwordErrorText = '';
    let { email, password } = this.state;
    email = email.trim(); // because why not

    this.setState({
      emailErrorText: emailErrorText,
      passwordErrorText: passwordErrorText,
      emailErrorStyle: {},
      passwordErrorStyle: {}
    })

    if (!email) {
      emailErrorText = requiredError;
    }
    if (!password) {
      passwordErrorText = requiredError;
    }

    let validEmail = function validEmail(email) {
      return isEmail(email);
    }
    if (email && !validEmail(email)) {
      emailErrorText = 'Enter a valid email address.'
    }

    if (emailErrorText || passwordErrorText) {
      this.setState({
        emailErrorText: emailErrorText,
        passwordErrorText: passwordErrorText,
        emailErrorStyle: emailErrorText ? inputError : {},
        passwordErrorStyle: passwordErrorText ? inputError : {}
      });
      return
    }
    console.log(email);
    /* Fly */
    axios.post('/api/auth/login', {
      email: email,
      password: password
    }).then(response => {
      this.props.router.push('test');
    }).catch(e => {
      console.log(e.response.data.message);
    });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header/>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flex: "1" }}>
          <Card style={{ marginTop: "50px" }}>
          <h5 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
            Log in to EMCC
          </h5>
          <Form name="login" onSubmit={this.loginUser} noValidate>
            <Group name="email">
              <Label>
                Email<br/>
                <ErrorText>{this.state.emailErrorText}</ErrorText>
              </Label>
              <Input style={{ width: "100%", ...this.state.emailErrorStyle }} type="email"
                     value={this.state.email} onChange={this.handleEmailChange}/>
            </Group>
            <Group name="password">
              <Label>
                Password <br/>
                <ErrorText>{this.state.passwordErrorText}</ErrorText>
              </Label>
              <Input style={{ width: "100%", ...this.state.passwordErrorStyle }} type="password"
                     value={this.state.password} onChange={this.handlePasswordChange} />
            </Group>
            <Button type="submit" className="button-primary" style={{ width: "100%" }}>Login</Button>
            <span>
              Don't have an account? <Link to="register">Register.</Link>
            </span>
          </Form>
          </Card>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Login);

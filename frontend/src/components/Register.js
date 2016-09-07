import React from 'react';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';

import '../fonts/Montserrat.css';

import { Form, Group, Label, Input, Button, ErrorText } from './Form';
import Card from './Card';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      name:             '',
      email:            '',
      password:         ''
    };
  }

  registerUser(e) {
    e.preventDefault();

    /* Preflight validation */

    // Definitions
    let requiredError = 'This field is required.';
    let inputError = {
      borderColor: '#ff0033'
    };

    // Reset
    let nameErrorText = '', emailErrorText = '', passwordErrorText = '';
    let { name, email, password } = this.state;
    email = email.trim(); // because why not

    if (!name) {
      nameErrorText = requiredError;
    }
    if (!email) {
      emailErrorText = requiredError;
    }
    if (!password) {
      passwordErrorText = requiredError;
    }

    let validEmail = function validEmail(email) {
      return isEmail(email);
    }
    let validPassword = function validPassword(password) {
      return password.length >= 8;
    }
    if (email && !validEmail(email)) {
      emailErrorText = 'Enter a valid email address.'
    }
    if (password && !validPassword(password)) {
      passwordErrorText = 'Password must be at least 8 characters.'
    }

    this.setState({
      nameErrorText: nameErrorText,
      emailErrorText: emailErrorText,
      passwordErrorText: passwordErrorText,

      nameErrorStyle: nameErrorText ? inputError : {},
      emailErrorStyle: emailErrorText ? inputError : {},
      passwordErrorStyle: passwordErrorText ? inputError : {},
    })
    if (nameErrorText || emailErrorText || passwordErrorText) {
      return;
    }

    /* Fly */
    axios.post();
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ minWidth: "300px", width: "fit-content" }}>
          <Card style={{ marginTop: "50px" }}>
            <h5 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
              Create your EMCC&nbsp;account
            </h5>
            <Form name="register" onSubmit={this.registerUser} style={{ fontSize: "inherit" }}>
              <Group name="name">
                <Label>
                  Name<br/>
                  <ErrorText>{this.state.nameErrorText}</ErrorText>
                </Label>
                <Input style={{ width: "100%", ...this.state.nameErrorStyle }} type="text"
                       value={this.state.name} onChange={this.handleNameChange}/>
              </Group>
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
                  Password<br/>
                  <ErrorText>{this.state.passwordErrorText}</ErrorText>
                </Label>
                <Input style={{ width: "100%", ...this.state.passwordErrorStyle }} type="password"
                       value={this.state.password} onChange={this.handlePasswordChange}/>
              </Group>
              <Button type="submit" className="button-primary" style={{ width: "100%" }}>Register</Button>
              <span>
                Have an account? <a href="login">Login.</a>
              </span>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Register;

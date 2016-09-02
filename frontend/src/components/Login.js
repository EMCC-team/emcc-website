import axios from 'axios';
import React from 'react';
import classNames from 'classnames';
import isEmail from 'validator/lib/isEmail';

import { Container, Row, Columns } from './Layout';
import { Form, Group, Label, ErrorText, Input, Button } from './Form';
import Card from './Card';

class Login extends React.Component {
  constructor(props) {
    super(props);
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

    if (!email) {
      emailErrorText = requiredError;
    }
    if (!password) {
      passwordErrorText = requiredError;
    }

    let validEmail = function validEmail(email) {
      console.log(isEmail(email));
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
      emailErrorText: emailErrorText,
      passwordErrorText: passwordErrorText,
      emailErrorStyle: emailErrorText ? inputError : {},
      passwordErrorStyle: passwordErrorText ? inputError : {}
    })
    if (emailErrorText || passwordErrorText) {
      return;
    }

    /* Fly */
    axios.post();
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    return (
      <Container>
        <Row>
          <Columns width="six" offset="three">
            <Card>
              <Form name="register" onSubmit={this.loginUser} noValidate>
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
              </Form>
            </Card>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Login;
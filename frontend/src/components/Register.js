import React from 'react';

import '../fonts/Montserrat.css';

import { Form, Group, Label, Input, Button } from './Form';
import Card from './Card';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

    this.state = {
      name:             '',
      email:            '',
      password:         '',
      confirm_password: ''
    };
  }

  registerUser(e) {
    e.preventDefault();
    console.log(this.state);
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

  handleConfirmPasswordChange(e) {
    this.setState({ confirm_password: e.target.value });
  }

  render() {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ minWidth: "350px", width: "fit-content" }}>
          <Card style={{ marginTop: "50px" }}>
            <h5 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
              Create your EMCC&nbsp;account
            </h5>
            <Form name="register" onSubmit={this.registerUser} style={{ fontSize: "inherit" }}>
              <Group name="name">
                <Label>Name</Label>
                <Input style={{ width: "100%" }} type="text" value={this.state.name} onChange={this.handleNameChange} />
              </Group>
              <Group name="email">
                <Label>Email</Label>
                <Input style={{ width: "100%" }} type="email" value={this.state.email} onChange={this.handleEmailChange} />
              </Group>
              <Group name="password">
                <Label>Password</Label>
                <Input style={{ width: "100%" }} type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </Group>
              <Group name="confirmPassword">
                <Label>Confirm password</Label>
                <Input style={{ width: "100%" }} type="password" value={this.state.confirm_password} onChange={this.handleConfirmPasswordChange} />
              </Group>
              <Button type="submit" className="button-primary" style={{ width: "100%" }}>Register</Button>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Register;

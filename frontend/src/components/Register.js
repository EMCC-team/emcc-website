import React from 'react';

import { Container, Row, Columns } from './Layout';
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
      <Container>
        <Row>
          <Columns width="six" offset="three">
            <Card>
              <Form name="register" onSubmit={this.registerUser}>
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
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Register;

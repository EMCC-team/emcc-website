import React from 'react';
import { Container, Row, Columns } from '../components/Layout';
import { Form, Group, Label, Input, Button } from '../components/Form';
import Card from '../components/Card';
import classNames from 'classnames';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email:    '',
      password: '',
      emailStyles: {},
      passwordStyles: {}
    };
  }

  loginUser(e) {
    e.preventDefault();

    // Preflight validation
    let { email, password } = this.state;
    if (!email) {}

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
              <Form name="register" onSubmit={this.loginUser}>
                <Group name="email">
                  <Label>Email</Label>
                  <Input style={{ width: "100%" }} type="email" value={this.state.email} onChange={this.handleEmailChange} />
                </Group>
                <Group name="password">
                  <Label>Password</Label>
                  <Input style={{ width: "100%" }} type="password" value={this.state.password} onChange={this.handlePasswordChange} />
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

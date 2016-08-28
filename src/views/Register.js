import React from 'react';
import { Container, Row, Columns } from '../components/Layout';
import { Form, LabeledInput, Button } from '../components/Form';
import Card from '../components/Card';

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
    this.setState({ name: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirm_password: e.target.value })
  }

  render() {
    return (
      <Container>
        <Row>
          <Columns width="six" offset="three">
            <Card>
              <Form onSubmit={this.registerUser}>
                <LabeledInput id="name" type="text" onChange={this.handleNameChange}>Name</LabeledInput>
                <LabeledInput id="email" type="email" onChange={this.handleEmailChange}>Email</LabeledInput>
                <LabeledInput id="password" type="text" onChange={this.handlePasswordChange}>Password</LabeledInput>
                <LabeledInput id="confirm_password" type="text" onChange={this.handleConfirmPasswordChange}>Retype password</LabeledInput>
                <Button type="submit" width="100%" primary>Register</Button>
              </Form>
            </Card>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Register;

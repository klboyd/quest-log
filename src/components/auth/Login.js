import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import APIManager from "../modules/APIManager";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleLogin = async evt => {
    evt.preventDefault();
    const user = await APIManager.get(`users?email=${this.state.email}`);

    if (user.length > 0 && user[0].password === this.state.password) {
      localStorage.setItem("userId", JSON.stringify(user[0].id));
      user[0].characterId &&
        localStorage.setItem(
          "characterId",
          JSON.stringify(user[0].characterId)
        );
      this.props.setLoggedInStatus();
      this.props.history.push("/quests");
    } else {
      window.alert("Your email or password was incorrect.");
    }
  };
  render() {
    console.log("login", this.state);
    return (
      <Form onSubmit={this.handleLogin}>
        <Form.Group as={Col} sm={4}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            id="email"
            onChange={this.handleFieldChange}
            type="email"
            placeholder="Email"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} sm={4}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id="password"
            onChange={this.handleFieldChange}
            type="password"
            placeholder="Password"></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Log in
        </Button>
      </Form>
    );
  }
}

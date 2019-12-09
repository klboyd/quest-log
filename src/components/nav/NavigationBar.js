import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Nav.Link href="quests">Quests</Nav.Link>
      </Navbar>
    );
  }
}

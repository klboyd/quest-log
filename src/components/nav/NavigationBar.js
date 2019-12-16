import React, { Component } from "react";
import { Nav, Navbar, Row, Col, Button } from "react-bootstrap";

export default class NavigationBar extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.setLoggedInStatus();
  };
  render() {
    return (
      <Navbar as={Row} bg="dark" variant="dark">
        <Col lg={2}>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
        </Col>
        <Col lg={2}>
          {this.props.isLoggedIn ? (
            <Nav.Link href="/quests">Quests</Nav.Link>
          ) : null}
        </Col>
        <Col lg={6}></Col>
        <Col lg={2}>
          {this.props.isLoggedIn ? (
            <Nav.Link onClick={this.handleLogout} href="/login">
              {/* <Button onClick={this.handleLogout} variant="outline-info"> */}
              Logout
              {/* </Button> */}
            </Nav.Link>
          ) : null}
        </Col>
      </Navbar>
    );
  }
}

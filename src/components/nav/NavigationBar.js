import React, { Component } from "react";
import { Nav, Navbar, Row, Col } from "react-bootstrap";

export default class NavigationBar extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.setLoggedInStatus();
  };
  render() {
    return (
      <Navbar className="sticky-top" as={Row} bg="dark" variant="dark">
        <Col lg={2}>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
        </Col>
        <Col lg={2}>
          {this.props.isLoggedIn && localStorage["characterId"] ? (
            <Nav.Link href="/quests">Quests</Nav.Link>
          ) : null}
        </Col>
        <Col lg={2}>
          {this.props.isLoggedIn && localStorage["characterId"] ? (
            <Nav.Link href="/guild">Guild</Nav.Link>
          ) : null}
        </Col>
        <Col lg={4}></Col>

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

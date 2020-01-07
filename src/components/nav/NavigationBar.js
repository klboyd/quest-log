import React, { Component } from "react";
import { Nav, Navbar, Row, Col, Container } from "react-bootstrap";

export default class NavigationBar extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.setLoggedInStatus();
  };
  render() {
    return (
      <Container>
        <Navbar
          style={{
            fontFamily: "Marcellus SC",
            fontSize: "1.3em",
            backgroundColor: "grey"
          }}
          className="sticky-top"
          as={Row}
          // bg="dark"
          // variant="dark"
        >
          <Col lg={2}>
            <Navbar.Brand style={{ textShadow: "1px 1px darkgrey" }} href="/">
              Quest Log
            </Navbar.Brand>
          </Col>
          <Col lg={2}>
            {this.props.isLoggedIn && localStorage["characterId"] ? (
              <Nav.Link
                style={{ color: "white", textShadow: "1px 1px black" }}
                href="/quests">
                Quests
              </Nav.Link>
            ) : null}
          </Col>
          <Col lg={2}>
            {this.props.isLoggedIn && localStorage["characterId"] ? (
              <Nav.Link
                style={{ color: "white", textShadow: "1px 1px black" }}
                href="/guild">
                Guild
              </Nav.Link>
            ) : null}
          </Col>
          <Col lg={4}></Col>

          <Col lg={2}>
            {this.props.isLoggedIn ? (
              <Nav.Link
                style={{
                  color: "white",
                  textAlign: "right",
                  textShadow: "1px 1px black"
                }}
                onClick={this.handleLogout}
                href="/login">
                {/* <Button onClick={this.handleLogout} variant="outline-info"> */}
                Logout
                {/* </Button> */}
              </Nav.Link>
            ) : null}
          </Col>
        </Navbar>
      </Container>
    );
  }
}

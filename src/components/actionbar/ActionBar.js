import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ActionBar.css";

export default class ActionBar extends Component {
  render() {
    return (
      <Card.Footer className="actionbar-container">
        <Container>
          <Row lg={12}>
            <Col lg={2}>
              <Button>Remove</Button>
            </Col>
            <Col lg={8}></Col>
            <Col lg={2}>
              <Link to={"/quests/new"}>
                <Button>New</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    );
  }
}

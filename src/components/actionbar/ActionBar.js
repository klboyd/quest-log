import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ActionBar.css";

export default class ActionBar extends Component {
  render() {
    return (
      <Card.Footer className="actionbar-container">
        <Container>
          <Row lg={12}>
            <Col lg={2}></Col>
            <Col lg={8}></Col>
            <Col lg={2}>
              <Route exact path="/quests">
                <Link to={"/quests/new"}>
                  <Button>New</Button>
                </Link>
              </Route>
              <Route path="/quests/new">
                <Button>Create</Button>
              </Route>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    );
  }
}

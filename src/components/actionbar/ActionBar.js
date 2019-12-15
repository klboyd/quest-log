import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ActionBar.css";

export default class ActionBar extends Component {
  render() {
    console.log("actionBar", this.props);
    return (
      <Card.Footer className="fixed-bottom actionbar-container">
        <Container>
          <Row lg={12}>
            <Col lg={2}>
              {this.props.isCreator ? (
                <Button onClick={this.props.handleRemoveQuest}>Remove</Button>
              ) : null}
            </Col>
            <Col lg={2}>
              {this.props.isAssigned &&
              !this.props.isComplete &&
              this.props.instructions.find(
                instruction => !instruction.isComplete
              ) ? (
                <Route path="/quests/:questId(\d+)">
                  <Button onClick={this.props.handleAbandonQuest}>
                    Abandon
                  </Button>
                </Route>
              ) : null}
            </Col>
            <Col lg={4}></Col>
            <Col lg={2}>
              {!this.props.isQuestComplete ? (
                <Button onClick={this.props.handleAssignQuest}>
                  {this.props.isAssigned ? "Share" : "Assign"}
                </Button>
              ) : null}
            </Col>
            <Col lg={2}>
              <Route exact path="/quests">
                <Link to={"/quests/new"}>
                  <Button>New</Button>
                </Link>
              </Route>
              {!this.props.isQuestComplete ? (
                <>
                  <Route path="/quests/:questId(\d+)">
                    {this.props.isAssigned ? (
                      this.props.instructions.find(
                        instruction => !instruction.isComplete
                      ) ? null : (
                        <Button
                          onClick={() => {
                            this.props.handleCompleteQuest(
                              this.props.questId,
                              this.props.instructions
                            );
                          }}>
                          Complete
                        </Button>
                      )
                    ) : (
                      <Button onClick={this.props.handleAcceptQuest}>
                        Accept
                      </Button>
                    )}
                  </Route>
                  <Route path="/quests/new">
                    <Button onClick={this.props.handleSubmitForm}>
                      Create
                    </Button>
                  </Route>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    );
  }
}

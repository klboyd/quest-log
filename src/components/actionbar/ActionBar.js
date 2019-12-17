import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ActionBar.css";
import AssigneeForm from "../assignees/AssigneeForm";

export default class ActionBar extends Component {
  state = {
    loadingStatus: true
  };

  componentWillMount() {
    this.setState({ loadingStatus: false });
  }
  render() {
    console.log("actionBar props", this.props);
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
                <Route exact path="/quests/:questId(\d+)">
                  <Button onClick={this.props.handleAbandonQuest}>
                    Abandon
                  </Button>
                </Route>
              ) : null}
            </Col>
            <Col lg={2}>
              <Route exact path="/quests/:questId(\d+)">
                <Link to={`/quests/${this.props.questId}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </Route>{" "}
            </Col>
            <Col lg={2}></Col>
            <Col lg={2}>
              {!this.props.isQuestComplete ? (
                <Route exact path="/quests/:questId(\d+)">
                  <AssigneeForm
                    assignees={this.props.assignees}
                    isAssigned={this.props.isAssigned}
                    setAssignees={this.props.setAssignees}
                    handleAssignQuest={this.props.handleAssignQuest}
                  />
                </Route>
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
                  <Route exact path="/quests/:questId(\d+)">
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
                  <Route exact path="/quests/:questId(\d+)/edit">
                    <Button onClick={this.props.handleEditSaveForm}>
                      Save
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

import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
export default class QuestForm extends Component {
  state = {
    creatorId: localStorage["userId"],
    name: "",
    difficultyId: "",
    description: "",
    instructionId: "",
    isStepsHidden: false,
    creationDate: "",
    completionDate: "",
    recurInDays: 0,
    rewards: "",
    isComplete: false,
    parentQuestId: null,
    loadingStatus: true
  };
  componentDidMount() {
    this.setState({ loadingStatus: false });
  }
  render() {
    return (
      <Card className="quest-form-container">
        <Card.Header>Quest Creation</Card.Header>
        <Card.Body className="quest-form-body">
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Slay the dragon!" />
              <Form.Text className="text-muted">
                What will the quest name be?
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

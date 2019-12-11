import React, { Component } from "react";
import { Form, Card, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import APIManager from "../modules/APIManager";
import InstructionForm from "../instructions/InstructionForm";

export default class QuestForm extends Component {
  state = {
    creatorId: localStorage["userId"],
    name: "",
    difficultyId: "",
    description: "",
    instructionId: "",
    isStepsHidden: false,
    creationDate: "",
    completionDate: new Date(),
    recurInDays: 0,
    rewards: "",
    isComplete: false,
    parentQuestId: null,
    difficulties: [],
    instructions: [],
    steps: [],
    loadingStatus: true
  };
  handleFieldChange = evt => {
    console.log(evt);
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  handleDayPickerClick = day => {
    this.setState({
      completionDate: day
    });
  };
  async componentDidMount() {
    const difficulties = await APIManager.get("difficulties");
    const steps = await APIManager.get("steps");
    this.setState({
      difficulties: difficulties,
      steps: steps,
      loadingStatus: false
    });
  }
  render() {
    return (
      <Card className="quest-form-container">
        <Card.Header>
          <span>
            <Link to={"/quests"}>
              <Button>{"<"}</Button>
            </Link>
          </span>
          Quest Creation
        </Card.Header>
        <Card.Body className="quest-form-body">
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Slay the dragon!" />
              <Form.Text className="text-muted">
                What will the quest name be?
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Here's what's happening. . ."
              />
              <Form.Text className="text-muted">What's going down?</Form.Text>
            </Form.Group>
            <InstructionForm />
            <Form.Group className="d-flex flex-column">
              <Form.Label>Difficulty</Form.Label>
              <ButtonGroup>
                {this.state.difficulties.map(difficulty => (
                  <Button key={difficulty.id}>{difficulty.type}</Button>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>Finish by</Form.Label> */}
              <DayPicker
                selectedDays={this.state.completionDate}
                id="completionDate"
                onDayClick={this.handleDayPickerClick}
              />
              <Form.Text className="text-muted">
                When does this need to be finished?
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

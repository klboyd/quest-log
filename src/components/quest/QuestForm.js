import React, { Component } from "react";
import { Form, Card, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import APIManager from "../modules/APIManager";
import InstructionForm from "../instructions/InstructionForm";
import ActionBar from "../actionbar/ActionBar";

export default class QuestForm extends Component {
  state = {
    creatorId: Number(localStorage["userId"]),
    name: "",
    difficultyId: "",
    description: "",
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
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  handleCheckBox = evt => {
    const stateToChange = {};
    stateToChange[evt.target.name] = evt.target.checked;
    this.setState(stateToChange);
  };
  handleDayPickerClick = day => {
    this.setState({
      completionDate: day
    });
  };
  addInstruction = step => {
    this.state.instructions.length === 0
      ? this.state.instructions.push({
          ...step,
          isFirstStep: true,
          isComplete: false
        })
      : this.state.instructions.push({
          ...step,
          isFirstStep: false,
          isComplete: false
        });
  };
  handleSubmitForm = async () => {
    if (
      !this.state.instructions[0] ||
      !this.state.name ||
      !this.state.description
    ) {
      window.alert("Please fill out all fields");
    } else {
      const newQuestDetails = {
        creatorId: this.state.creatorId,
        name: this.state.name,
        difficultyId: this.state.difficultyId,
        description: this.state.description,
        isStepsHidden: this.state.isStepsHidden,
        creationDate: new Date().toISOString().split("T")[0],
        completionDate: this.state.completionDate.toISOString().split("T")[0],
        recurInDays: this.state.recurInDays,
        rewards: this.state.rewards,
        isComplete: this.state.isComplete,
        parentQuestId: this.state.parentQuestId
      };
      const newQuest = await APIManager.post("quests", newQuestDetails);
      if (newQuest) {
        for (
          let i = this.state.instructions.length - 1, nextId = null;
          i >= 0;
          i--
        ) {
          const instructionResponse = await APIManager.post("instructions", {
            questId: newQuest.id,
            stepId: this.state.instructions[i].id,
            isFirstStep: this.state.instructions[i].isFirstStep,
            nextInstructionId: nextId,
            isComplete: this.state.instructions[i].isComplete
          });
          nextId = instructionResponse.id;
        }
        await this.props.setUpdatedQuests();

        this.props.history.push("/quests");
      } else {
        window.alert("Something went wrong");
      }
    }
  };
  async componentDidMount() {
    const difficulties = await APIManager.get("difficulties");
    const steps = await APIManager.get("steps");
    this.setState({
      difficultyId: difficulties[0].id,
      difficulties: difficulties,
      steps: steps,
      loadingStatus: false
    });
  }
  render() {
    return (
      <>
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
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Slay the dragon!"
                  onChange={this.handleFieldChange}
                />
                <Form.Text className="text-muted">
                  What will the quest name be?
                </Form.Text>
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  id="description"
                  onChange={this.handleFieldChange}
                  placeholder="Here's what's happening. . ."
                />
                <Form.Text className="text-muted">What's going down?</Form.Text>
              </Form.Group>
              <hr />
              <Form.Group>
                <InstructionForm
                  instructions={this.state.instructions}
                  addInstruction={this.addInstruction}
                />
                <Form.Check
                  disabled={this.state.loadingStatus}
                  inline
                  name="isStepsHidden"
                  id="isStepsHidden"
                  type="checkbox"
                  checked={this.state.isStepsHidden}
                  onChange={this.handleCheckBox}
                />
                <Form.Label>Hide next steps</Form.Label>
              </Form.Group>
              <hr />
              <Form.Group className="d-flex flex-column">
                <Form.Label>Difficulty</Form.Label>
                <ButtonGroup>
                  {this.state.difficulties.map(difficulty => (
                    <Button
                      type="button"
                      key={difficulty.id}
                      id="difficultyId"
                      onClick={() => {
                        this.setState({ difficultyId: difficulty.id });
                      }}>
                      {difficulty.type}
                    </Button>
                  ))}
                </ButtonGroup>
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label>Repeat</Form.Label>
                <Form.Check
                  inline
                  name="recurInDays"
                  id="1"
                  type="radio"
                  label="never"
                  value="0"
                  defaultChecked
                  onClick={() => this.setState({ recurInDays: 0 })}
                />
                <Form.Check
                  inline
                  name="recurInDays"
                  id="2"
                  type="radio"
                  label="daily"
                  value="1"
                  onClick={() => this.setState({ recurInDays: 1 })}
                />
                <Form.Check
                  inline
                  name="recurInDays"
                  id="3"
                  type="radio"
                  label="weekly"
                  value="7"
                  onClick={() => this.setState({ recurInDays: 7 })}
                />
                <Form.Text className="text-muted">
                  Does this quest need to occur each day or once a week?
                </Form.Text>
              </Form.Group>
              <hr />
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
              <hr />
              <Form.Group>
                <Form.Label>Rewards</Form.Label>
                <Form.Control
                  type="text"
                  id="rewards"
                  placeholder="The payment for victory. . ."
                  onChange={this.handleFieldChange}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <ActionBar handleSubmitForm={this.handleSubmitForm} />
      </>
    );
  }
}

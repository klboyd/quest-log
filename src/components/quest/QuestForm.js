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
    this.setState({ loadingStatus: true });
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
    this.setState({ loadingStatus: false });
  };
  removeInstruction = id => {
    this.setState({ loadingStatus: true });
    if (this.state.instructions[id].isFirstStep) {
      const instructions = this.state.instructions.filter(
        (step, index) => id !== index
      );
      instructions[0].isFirstStep = true;
      this.setState({
        instructions: instructions,
        loadingStatus: false
      });
    } else {
      this.setState({
        instructions: this.state.instructions.filter(
          (step, index) => id !== index
        ),
        loadingStatus: false
      });
    }
  };
  setInstructions = editedInstructions => {
    this.setState({ loadingStatus: true });
    if (!editedInstructions[0].isFirstStep) {
      const switchedFirstStepInstructions = editedInstructions.map(
        instruction => {
          return { ...instruction, isFirstStep: false };
        }
      );
      switchedFirstStepInstructions[0].isFirstStep = true;
      console.log(
        "switchedFirstStepInstructions",
        switchedFirstStepInstructions
      );

      this.setState({
        instructions: switchedFirstStepInstructions,
        loadingStatus: false
      });
    } else {
      this.setState({
        instructions: editedInstructions,
        loadingStatus: false
      });
    }
  };
  addNewInstructions = async questId => {
    console.log("starting addNewInstructions");
    const reversedInstructions = this.state.instructions.reverse();
    let nextId = null;
    for (const instruction of reversedInstructions) {
      console.log("\n\n\nnextId", nextId);
      const response = await APIManager.post("instructions", {
        questId: questId,
        stepId: instruction.id,
        isFirstStep: instruction.isFirstStep,
        nextInstructionId: nextId,
        isComplete: instruction.isComplete
      });
      nextId = response.id;
    }

    await this.props.setUpdatedQuests();
  };
  handleSubmitForm = async () => {
    this.setState({ loadingStatus: true });
    if (
      !this.state.instructions[0] ||
      !this.state.name ||
      !this.state.description
    ) {
      this.setState({ loadingStatus: false });
      window.alert("Please fill out all fields");
    } else {
      const newQuestDetails = {
        creatorId: this.state.creatorId,
        name: this.state.name,
        difficultyId: this.state.difficultyId,
        description: this.state.description,
        isStepsHidden: this.state.isStepsHidden,
        creationDate: new Date().toISOString(),
        completionDate: this.state.completionDate.toISOString(),
        recurInDays: this.state.recurInDays,
        rewards: this.state.rewards,
        isComplete: this.state.isComplete,
        parentQuestId: this.state.parentQuestId
      };
      const newQuest = await APIManager.post("quests", newQuestDetails);
      if (newQuest) {
        this.addNewInstructions(newQuest.id);
        this.setState({ loadingStatus: false });
        this.props.history.push("/quests");
      } else {
        this.setState({ loadingStatus: false });
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
                  removeInstruction={this.removeInstruction}
                  setInstructions={this.setInstructions}
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
                        this.setState({
                          difficultyId: difficulty.id
                        });
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

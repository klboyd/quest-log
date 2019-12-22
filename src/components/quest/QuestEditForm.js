import React, { Component } from "react";
import { Card, Button, Form, ButtonGroup } from "react-bootstrap";
import ActionBar from "../actionbar/ActionBar";
import DayPicker from "react-day-picker";
import APIManager from "../../modules/APIManager";
import InstructionEditForm from "../instructions/InstructionEditForm";

export default class QuestEditForm extends Component {
  state = {
    creatorId: "",
    name: "",
    difficultyId: "",
    difficulties: [],
    description: "",
    isStepsHidden: false,
    creationDate: "",
    completionDate: "",
    recurInDays: "",
    rewards: "",
    isComplete: false,
    parentQuestId: null,
    instructions: [],
    assignees: [],
    loadingStatus: true
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
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
      if (instructions[0]) {
        instructions[0].isFirstStep = true;
      }
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
      console.log("editedInstructions", editedInstructions);
      this.setState({
        instructions: editedInstructions,
        loadingStatus: false
      });
    }
  };
  removeQuestInstructions = async () => {
    const oldInstructions = await APIManager.get(
      `instructions?questId=${this.props.questId}`
    );
    console.log("starting delete instructions", oldInstructions);
    for (const instruction of oldInstructions) {
      await APIManager.delete(`instructions/${instruction.id}`);
    }
    console.log("completed delete instructions");
  };
  addNewInstructions = async () => {
    console.log("starting addNewInstructions");
    const reversedInstructions = this.state.instructions.reverse();
    let nextId = null;
    for (const instruction of reversedInstructions) {
      console.log("\n\n\nnextId", nextId);
      const response = await APIManager.post("instructions", {
        questId: this.props.questId,
        stepId: instruction.id,
        isFirstStep: instruction.isFirstStep,
        nextInstructionId: nextId,
        isComplete: instruction.isComplete
      });
      nextId = response.id;
    }

    await this.props.setUpdatedQuests();
  };
  handleEditSaveForm = async () => {
    this.setState({ loadingStatus: true });
    if (
      !this.state.instructions[0] ||
      !this.state.name ||
      !this.state.description
    ) {
      this.setState({ loadingStatus: false });
      window.alert("Please fill out all fields");
    } else {
      const editedQuestDetails = {
        id: this.props.questId,
        creatorId: this.state.creatorId,
        name: this.state.name,
        difficultyId: this.state.difficultyId,
        description: this.state.description,
        isStepsHidden: this.state.isStepsHidden,
        creationDate: this.state.creationDate,
        completionDate: new Date(this.state.completionDate).toISOString(),
        recurInDays: this.state.recurInDays,
        rewards: this.state.rewards,
        isComplete: this.state.isComplete,
        parentQuestId: this.state.parentQuestId
      };
      const editedQuest = await APIManager.update("quests", editedQuestDetails);
      if (editedQuest) {
        await this.removeQuestInstructions();
        await this.addNewInstructions();

        this.setState({ loadingStatus: false });
        this.props.history.push(`/quests/${this.props.questId}`);
      } else {
        this.setState({ loadingStatus: false });
        window.alert("Something went wrong");
      }
    }
  };
  async componentDidMount() {
    const quest = await APIManager.get(`quests/${this.props.questId}`);
    const difficulties = await APIManager.get("difficulties");

    const steps = await APIManager.get("steps");
    this.setState({
      ...quest,
      difficulties: difficulties,
      steps: steps,
      loadingStatus: false
    });
  }
  render() {
    console.log("questEditForm state", this.state);
    console.log("questEditForm props", this.props);
    return (
      <>
        <Card className="quest-form-container">
          <Card.Header>Quest Edit</Card.Header>
          <Card.Body className="quest-form-body">
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Slay the dragon!"
                  defaultValue={this.state.name}
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
                  defaultValue={this.state.description}
                  onChange={this.handleFieldChange}
                  placeholder="Here's what's happening. . ."
                />
                <Form.Text className="text-muted">What's going down?</Form.Text>
              </Form.Group>
              <hr />
              <Form.Group>
                <InstructionEditForm
                  questId={this.props.questId}
                  instructions={this.state.instructions}
                  setInstructions={this.setInstructions}
                  addInstruction={this.addInstruction}
                  removeInstruction={this.removeInstruction}
                />
                {/* <Form.Check
                  disabled={this.state.loadingStatus}
                  inline
                  name="isStepsHidden"
                  id="isStepsHidden"
                  type="checkbox"
                  checked={this.state.isStepsHidden}
                  onChange={this.handleCheckBox}
                />
                <Form.Label>Hide next steps</Form.Label> */}
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
              {/* <Form.Group>
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
              <hr /> */}
              <Form.Group>
                {/* <Form.Label>Finish by</Form.Label> */}
                <DayPicker
                  selectedDays={new Date(this.state.completionDate)}
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
                  defaultValue={this.state.rewards}
                  placeholder="The payment for victory. . ."
                  onChange={this.handleFieldChange}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <ActionBar
          questId={this.props.questId}
          handleEditSaveForm={this.handleEditSaveForm}
        />
      </>
    );
  }
}

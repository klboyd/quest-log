import React, { Component } from "react";
import { Form, Button, InputGroup, ListGroup } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Typeahead } from "react-bootstrap-typeahead";

export default class InstructionEditForm extends Component {
  state = {
    creatorId: localStorage["userId"],
    name: "",
    instructionId: "",
    isComplete: false,
    parentQuestId: null,
    steps: [],
    newName: "",
    typeaheadStep: {},
    loadingStatus: true
  };
  handleTypingChange = step => {
    const stateToChange = {};
    stateToChange["typeaheadStep"] = {};
    stateToChange["newName"] = step;
    this.setState(stateToChange);
  };
  handleTypeaheadSelection = step => {
    const stateToChange = {};
    if (step[0]) {
      console.log(step[0]);
      stateToChange["newName"] = "";
      stateToChange["typeaheadStep"] = step[0];
      this.setState(stateToChange);
    } else {
      stateToChange["newName"] = "";
      stateToChange["typeaheadStep"] = {};
      this.setState(stateToChange);
    }
  };
  handleStepSubmit = async () => {
    if (this.state.newName !== "") {
      this.setState({ loadingStatus: true });
      const newStep = await APIManager.post("steps", {
        name: this.state.newName
      });
      this.props.addInstruction(newStep);
      const updatedSteps = await APIManager.get("steps");
      this.setState({
        steps: updatedSteps,
        loadingStatus: false,
        newName: "",
        typeaheadStep: {}
      });
    } else if (Object.keys(this.state.typeaheadStep).length > 0) {
      this.setState({ loadingStatus: true });
      this.props.addInstruction(this.state.typeaheadStep);
      this.setState({
        newName: "",
        typeaheadStep: {},
        loadingStatus: false
      });
    } else {
      return null;
    }
    this.refs["typeahead-steps"].getInstance().clear();
  };
  async getOrderedSteps() {
    this.setState({ loadingStatus: true });

    const steps = await APIManager.get(
      `instructions?questId=${this.props.questId}&_expand=step`
    );
    console.log("steps length", steps.length);
    if (steps.length !== 0) {
      const orderedSteps = [steps.find(step => step.isFirstStep)];

      for (
        let i = 1, nextStep = orderedSteps[i - 1].nextInstructionId;
        i < steps.length && nextStep !== null;
        nextStep = orderedSteps[i].nextInstructionId, i++
      ) {
        orderedSteps.push(steps.find(step => nextStep === step.id));
      }
      console.log("orderedSteps", orderedSteps);

      this.props.setInstructions(
        orderedSteps.map(step => {
          return {
            isComplete: step.isComplete,
            isFirstStep: step.isFirstStep,
            id: step.step.id,
            name: step.step.name
          };
        })
      );
    } else {
      this.props.setInstructions([]);
    }
    this.setState({ loadingStatus: false });
  }
  async componentDidMount() {
    const steps = await APIManager.get("steps");
    this.setState({
      steps: steps
    });
    await this.getOrderedSteps();
  }
  render() {
    console.log("instructionEditForm state", this.state);
    console.log("instructionEditForm props", this.props);
    return (
      <Form.Group>
        <Form.Label>Steps</Form.Label>
        <ListGroup>
          {this.props.instructions.map((instruction, index) => (
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
              variant={instruction.isComplete ? "success" : null}
              key={index}>
              <div>{instruction.name}</div>
              <div>
                <Button
                  onClick={() => this.props.removeInstruction(index)}
                  size="sm"
                  variant="danger"
                  disabled={this.state.loadingStatus}>
                  x
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <InputGroup>
          <Typeahead
            ref="typeahead-steps"
            id="name"
            labelKey="name"
            defaultInputValue=""
            placeholder="What's the next step?"
            options={this.state.steps}
            filterBy={(option, props) => {
              return this.props.instructions.find(
                instruction => instruction.id === option.id
              )
                ? null
                : option;
            }}
            onInputChange={this.handleTypingChange}
            onChange={this.handleTypeaheadSelection}></Typeahead>
          <InputGroup.Append>
            <Button
              disabled={
                !this.state.newName &&
                Object.keys(this.state.typeaheadStep).length === 0
              }
              onClick={this.handleStepSubmit}>
              +
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  }
}

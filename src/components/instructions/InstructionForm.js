import React, { Component } from "react";
import { Form, Button, InputGroup, ListGroup } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Typeahead } from "react-bootstrap-typeahead";

export default class InstructionForm extends Component {
  state = {
    creatorId: localStorage["userId"],
    name: "",
    instructionId: "",
    isComplete: false,
    parentQuestId: null,
    instructions: [],
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
    console.log(step);
  };
  handleTypeaheadSelection = step => {
    const stateToChange = {};
    if (step[0]) {
      stateToChange["typedName"] = "";
      stateToChange["typeaheadStep"] = step[0];
      this.setState(stateToChange);
      console.log(step[0]);
    } else {
      stateToChange["typedName"] = "";
      stateToChange["typeaheadStep"] = {};
      this.setState(stateToChange);
    }
  };
  handleStepSubmit = async () => {
    console.log(this.refs["typeahead-steps"].getInstance().getInput().name);
    if (this.state.newName !== "") {
      this.setState({ loadingStatus: true });
      const newStep = await APIManager.post("steps", {
        name: this.state.newName
      });
      this.state.instructions.push(newStep);
      const updatedSteps = await APIManager.get("steps");
      this.setState({
        steps: updatedSteps,
        loadingStatus: false,
        newName: "",
        typeaheadStep: {}
      });
    } else if (this.state.typeaheadStep !== {}) {
      this.setState({ loadingStatus: true });
      this.state.instructions.push(this.state.typeaheadStep);
      this.setState({
        newName: "",
        typeaheadStep: {},
        loadingStatus: false
      });
    } else {
      console.log("empty step");
    }
    this.refs["typeahead-steps"].getInstance().clear();
  };
  async componentDidMount() {
    const steps = await APIManager.get("steps");
    this.setState({
      steps: steps,
      loadingStatus: false
    });
  }
  render() {
    console.log(this.state);
    return (
      <Form.Group>
        <Form.Label>Steps</Form.Label>
        <ListGroup>
          {this.state.instructions.map(instruction => (
            <ListGroup.Item key={instruction.id}>
              {instruction.name}
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
            onInputChange={this.handleTypingChange}
            onChange={this.handleTypeaheadSelection}>
            {/* {this.state.difficulties.map(difficulty => (
                  <Button key={difficulty.id}>{difficulty.type}</Button>
                ))} */}
          </Typeahead>
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

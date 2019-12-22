import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";
import APIManager from "../../modules/APIManager";
import "./Instruction.css";

export default class InstructionList extends Component {
  state = {
    loadingStatus: true
  };
  completeInstruction = async id => {
    this.setState({ loadingStatus: true });
    await APIManager.patch(`instructions`, {
      id: id,
      isComplete: true
    });
    await this.getOrderedSteps();
    this.setState({ loadingStatus: false });
  };
  async getOrderedSteps() {
    const steps = await APIManager.get(
      `instructions?questId=${this.props.questId}&_expand=step`
    );
    const orderedSteps = [steps.find(step => step.isFirstStep)];
    console.log("orderedSteps", orderedSteps[0]);
    if (orderedSteps[0] !== undefined) {
      for (
        let i = 1, nextStep = orderedSteps[i - 1].nextInstructionId;
        i < steps.length && nextStep !== null;
        nextStep = orderedSteps[i].nextInstructionId, i++
      ) {
        orderedSteps.push(steps.find(step => nextStep === step.id));
      }
      this.props.setInstructions(orderedSteps);
    }
  }
  async componentDidMount() {
    this.setState({ loadingStatus: true });

    await this.getOrderedSteps();
    this.setState({ loadingStatus: false });
    console.log("instructionList", this.props);
  }
  render() {
    return (
      <>
        <h5>Steps:</h5>
        <ListGroup>
          {this.props.instructions.length > 0
            ? this.props.instructions.map(instruction => (
                <ListGroup.Item
                  className="instruction-list-item"
                  key={instruction.id}
                  variant={instruction.isComplete ? "success" : null}>
                  <span
                    className={instruction.isComplete ? "text-muted" : null}>
                    {instruction.step.name}
                  </span>
                  <Form.Check
                    className="pull-right"
                    type="checkbox"
                    disabled={
                      instruction.isComplete ||
                      this.props.isAssigned === undefined
                    }
                    defaultChecked={instruction.isComplete}
                    inline
                    onChange={() => {
                      this.completeInstruction(instruction.id);
                    }}
                  />
                </ListGroup.Item>
              ))
            : null}
        </ListGroup>
      </>
    );
  }
}

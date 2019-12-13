import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";
import APIManager from "../modules/APIManager";

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

    for (
      let i = 1, nextStep = orderedSteps[i - 1].nextInstructionId;
      i < steps.length && nextStep !== null;
      nextStep = orderedSteps[i].nextInstructionId, i++
    ) {
      orderedSteps.push(steps.find(step => nextStep === step.id));
    }
    // console.log("isStepsHidden", this.props.isStepsHidden);
    // if (this.props.isStepsHidden) {
    //   for (let i = 0; i < orderedSteps.length; i++) {
    //     if (!orderedSteps[i].isComplete) {
    //       orderedSteps[i].isHidden = false;
    //     } else {
    //       orderedSteps[i].isHidden = true;
    //     }
    //   }
    // }
    this.props.setInstructions(orderedSteps);
    // console.log("orderedSteps isHidden", orderedSteps[0].isHidden);
  }
  async componentDidMount() {
    this.setState({ loadingStatus: true });

    await this.getOrderedSteps();
    this.setState({ loadingStatus: false });
  }
  render() {
    return (
      <>
        <h5>Steps:</h5>
        <ListGroup>
          {this.props.instructions.map(instruction => (
            <ListGroup.Item key={instruction.id}>
              <Form.Check
                type="checkbox"
                disabled={instruction.isComplete}
                defaultChecked={instruction.isComplete}
                inline
                onChange={() => {
                  this.completeInstruction(instruction.id);
                }}
              />
              <span className={instruction.isComplete ? "text-muted" : null}>
                {instruction.step.name}
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
}

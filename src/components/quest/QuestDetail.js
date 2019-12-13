import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";
import InstructionList from "../instructions/InstructionList";
import ActionBar from "../actionbar/ActionBar";

export default class QuestDetail extends Component {
  state = {
    creatorId: "",
    name: "",
    difficultyId: "",
    difficulty: {},
    description: "",
    isStepsHidden: false,
    creationDate: "",
    completionDate: "",
    recurInDays: "",
    rewards: "",
    isComplete: false,
    parentQuestId: null,
    instructions: [],
    loadingStatus: true
  };
  setInstructions = newInstructions => {
    this.setState({ instructions: newInstructions });
  };
  async componentDidMount() {
    const quest = await APIManager.get(
      `quests/${this.props.questId}?_expand=difficulty`
    );
    const instructions = await APIManager.get(
      `steps/?questId=${this.props.questId}`
    );
    this.setState({ ...quest, ...instructions, loadingStatus: false });
    console.log("questDetail", this.state);
  }
  render() {
    return (
      <>
        <Card className="quest-details-container">
          <Card.Header className="quest-card-header">
            <span>
              <Link to={"/quests"}>
                <Button>{"<"}</Button>
              </Link>
            </span>
            Quest Details
          </Card.Header>
          <Card.Body className="quest-details-body">
            <h3>{this.state.name}</h3>
            <Card.Text>{this.state.description}</Card.Text>
            <Card.Text>Created on {this.state.creationDate}</Card.Text>
            <Card.Text>Finish by {this.state.completionDate}</Card.Text>
            <Card.Text>Difficulty: {this.state.difficulty.type}</Card.Text>
            <InstructionList
              questId={this.props.questId}
              setInstructions={this.setInstructions}
              instructions={this.state.instructions}
              isStepsHidden={this.state.isStepsHidden}
            />
            <h5>Rewards: </h5>
            {this.state.rewards}
          </Card.Body>
        </Card>
        <ActionBar
          instructions={this.state.instructions}
          questId={this.props.questId}
          handleCompleteQuest={this.props.handleCompleteQuest}
        />
      </>
    );
  }
}

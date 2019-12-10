import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";
import InstructionList from "../instructions/InstructionList";

export default class QuestDetail extends Component {
  _isMounted = false;
  state = {
    creatorId: "",
    name: "",
    difficultyId: "",
    difficulty: {},
    description: "",
    instructionId: "",
    isStepsHidden: false,
    creationDate: "",
    completionDate: "",
    recurInDays: "",
    rewards: "",
    isComplete: false,
    parentQuestId: null,
    loadingStatus: true
  };
  async componentDidMount() {
    this._isMounted = true;
    const quest =
      this._isMounted &&
      (await APIManager.get(`quests/${this.props.questId}?_expand=difficulty`));
    this._isMounted && this.setState({ ...quest, loadingStatus: false });
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
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
          {this.state.instructionId ? (
            <InstructionList
              questId={this.props.questId}
              firstInstructionId={this.state.instructionId}
            />
          ) : null}

          <h5>Rewards: </h5>
          {this.state.rewards}
        </Card.Body>
      </Card>
    );
  }
}

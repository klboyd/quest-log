import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";
import InstructionList from "../instructions/InstructionList";
import ActionBar from "../actionbar/ActionBar";
import AssigneesList from "../assignees/AssigneesList";

export default class QuestDetail extends Component {
  _isMounted = false;
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
    assignees: [],
    loadingStatus: true
  };
  setInstructions = newInstructions => {
    this._isMounted && this.setState({ instructions: newInstructions });
  };
  setAssignees = newAssignees => {
    this._isMounted && this.setState({ assignees: newAssignees });
  };
  handleAcceptQuest = async () => {
    await APIManager.post(`assignees`, {
      questId: Number(this.props.questId),
      characterId: Number(localStorage["characterId"]),
      charStartDate: new Date().toISOString()
    });
    const assignees = await APIManager.get(
      `assignees/?questId=${this.props.questId}&_expand=character`
    );
    this.setAssignees(assignees);
    await this.props.setUpdatedQuests();
  };
  handleAssignQuest = async id => {
    console.log("handleAssignQuest", id);
    await APIManager.post("assignees", {
      characterId: Number(id),
      questId: Number(this.props.questId),
      charStartDate: new Date().toISOString()
    });
    const assignees = await APIManager.get(
      `assignees/?questId=${this.props.questId}&_expand=character`
    );
    this.setAssignees(assignees);
    await this.props.setUpdatedQuests();
  };
  handleRemoveQuest = async () => {
    await APIManager.delete(`quests/${this.props.questId}`);
    await this.props.setUpdatedQuests();
    this.props.history.push("/quests");
  };
  handleAbandonQuest = async () => {
    const assignee = this.state.assignees.find(
      assignee =>
        Number(assignee.characterId) === Number(localStorage["characterId"])
    );
    await APIManager.delete(`assignees/${assignee.id}`);
    const assignees = await APIManager.get(
      `assignees/?questId=${this.props.questId}&_expand=character`
    );
    this._isMounted && this.setAssignees(assignees);
    await this.props.setUpdatedQuests();
  };
  async componentDidMount() {
    this._isMounted = true;

    const quest = await APIManager.get(
      `quests/${this.props.questId}?_expand=difficulty`
    );

    this._isMounted &&
      this.setState({
        ...quest,
        loadingStatus: false
      });
  }
  async componentWillReceiveProps(newProps) {
    this._isMounted = true;

    const quest = await APIManager.get(
      `quests/${newProps.questId}?_expand=difficulty`
    );

    this._isMounted &&
      this.setState({
        ...quest,
        loadingStatus: false
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log("questDetails unmounted");
  }
  render() {
    console.log("questDetail state", this.state);
    console.log("questDetail props", this.props);

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
            <Card.Text>
              Created on {this.state.creationDate.split("T")[0]}
            </Card.Text>
            <Card.Text>
              Finish by {this.state.completionDate.split("T")[0]}
            </Card.Text>
            <Card.Text>Difficulty: {this.state.difficulty.type}</Card.Text>
            <AssigneesList
              questId={this.props.questId}
              setAssignees={this.setAssignees}
              assignees={this.state.assignees}
            />
            <InstructionList
              questId={this.props.questId}
              setInstructions={this.setInstructions}
              instructions={this.state.instructions}
              isStepsHidden={this.state.isStepsHidden}
              isAssigned={this.state.assignees.find(
                assignee =>
                  Number(assignee.characterId) ===
                  Number(localStorage["characterId"])
              )}
            />
            <h5>Rewards: </h5>
            {this.state.rewards}
          </Card.Body>
        </Card>
        <ActionBar
          setAssignees={this.setAssignees}
          assignees={this.state.assignees}
          instructions={this.state.instructions}
          questId={this.props.questId}
          handleCompleteQuest={this.props.handleCompleteQuest}
          handleAcceptQuest={this.handleAcceptQuest}
          handleAssignQuest={this.handleAssignQuest}
          handleAbandonQuest={this.handleAbandonQuest}
          handleRemoveQuest={this.handleRemoveQuest}
          isQuestComplete={this.state.isComplete}
          isCreator={
            Number(this.state.creatorId) === Number(localStorage["userId"])
          }
          isAssigned={this.state.assignees.find(
            assignee =>
              Number(assignee.characterId) ===
              Number(localStorage["characterId"])
          )}
        />
      </>
    );
  }
}

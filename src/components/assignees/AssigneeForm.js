import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import APIManager from "../modules/APIManager";

export default class AssigneeForm extends Component {
  state = {
    eligibleCharacters: [],
    loadingStatus: true
  };
  async setEligibleCharacters() {
    this.setState({ loadingStatus: true });
    const characters = await APIManager.get("characters");

    const assignedCharacters = this.props.assignees.map(
      assignee => assignee.character
    );

    const eligibleCharacters = characters.filter(
      character =>
        !(
          character.id === Number(localStorage["characterId"]) ||
          assignedCharacters.find(assigned => assigned.id === character.id)
        )
    );
    this.setState({
      eligibleCharacters: eligibleCharacters,
      loadingStatus: false
    });
  }
  handleAssignCharacter = async id => {
    this.setState({ loadingStatus: true });
    console.log("handleAssignCharacter", id);
    await this.props.handleAssignQuest(id);

    await this.setEligibleCharacters();
    this.setState({ loadingStatus: false });
  };
  async componentDidMount() {
    await this.setEligibleCharacters();
    console.log("assigneeForm state", this.state);
    console.log("assigneeForm props", this.props);
  }
  render() {
    return (
      <DropdownButton
        disabled={this.state.eligibleCharacters.length === 0}
        title={this.props.isAssigned ? "Share" : "Assign"}
        drop="up">
        {this.state.eligibleCharacters.map(character => {
          return (
            <Dropdown.Item
              key={character.id}
              onSelect={() => this.handleAssignCharacter(character.id)}>
              {character.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  }
}

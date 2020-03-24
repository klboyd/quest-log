import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import APIManager from "../../modules/APIManager";

export default class AssigneeForm extends Component {
  _isMounted = false;
  state = {
    eligibleCharacters: [],
    loadingStatus: true
  };
  async setEligibleCharacters() {
    this._isMounted && this.setState({ loadingStatus: true });
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
    this._isMounted &&
      this.setState({
        eligibleCharacters: eligibleCharacters,
        loadingStatus: false
      });
  }
  handleAssignCharacter = async id => {
    this._isMounted && this.setState({ loadingStatus: true });
    // console.log("handleAssignCharacter", id);
    await this.props.handleAssignQuest(id);

    await this.setEligibleCharacters();
    this._isMounted && this.setState({ loadingStatus: false });
  };
  async componentDidMount() {
    this._isMounted = true;
    await this.setEligibleCharacters();
    // console.log("assigneeForm state", this.state);
    // console.log("assigneeForm props", this.props);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    // console.log("assigneeForm state", this.state);
    // console.log("assigneeForm props", this.props);
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

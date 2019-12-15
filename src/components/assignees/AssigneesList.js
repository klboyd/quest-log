import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import APIManager from "../modules/APIManager";

export default class AssigneesList extends Component {
  state = {
    loadingStatus: true
  };

  async componentDidMount() {
    const assignees = await APIManager.get(
      `assignees/?questId=${this.props.questId}&_expand=character`
    );
    this.props.setAssignees(assignees);
    this.setState({ loadingStatus: false });
  }
  render() {
    console.log("assigneeList", this.props);
    return (
      <>
        <h5>Assigned to:</h5>
        <ListGroup horizontal>
          {this.props.assignees.length > 0 ? (
            this.props.assignees.map(assignee => (
              <ListGroup.Item key={assignee.id}>
                {Number(assignee.characterId) ===
                Number(localStorage["characterId"]) ? (
                  <span>You</span>
                ) : (
                  <span>{assignee.character.name}</span>
                )}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No one</ListGroup.Item>
          )}
        </ListGroup>
      </>
    );
  }
}
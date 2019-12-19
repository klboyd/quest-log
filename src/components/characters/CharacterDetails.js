import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";

export default class CharacterDetails extends Component {
  _isMounted = false;
  state = {
    character: {},
    assigned: [],
    loadingStatus: true
  };
  async getCharacterDetails(newProps = null) {
    const character = await APIManager.get(
      `characters/${
        newProps ? newProps.characterId : this.props.characterId
      }?_embed=quests`
    );

    const assigned = await APIManager.get(
      `assignees?characterId=${
        newProps ? newProps.characterId : this.props.characterId
      }&_expand=quest`
    );
    console.log(assigned);
    this._isMounted &&
      this.setState({
        ...character,
        assigned: assigned,
        loadingStatus: false
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async UNSAFE_componentWillReceiveProps(newProps) {
    this._isMounted = true;
    this._isMounted && this.setState({ loadingStatus: true });
    await this.getCharacterDetails(newProps);
  }
  async componentDidMount() {
    this._isMounted = true;
    await this.getCharacterDetails();
  }
  render() {
    console.log("characterDetails state", this.state);
    console.log("characterDetails props", this.props);
    return (
      <>
        <Card.Header>Character Details</Card.Header>
        <Card.Body className="character-details-body">
          <Card.Title style={{ textAlign: "center" }}>
            {this.state.name}
          </Card.Title>
          <Card.Text>{this.state.description}</Card.Text>
          <Card.Title>Health:</Card.Title>
          <Card.Text>{this.state.health}</Card.Text>
          <Card.Title>Quests:</Card.Title>
          <Card.Text>Active:</Card.Text>
          <ListGroup>
            {this.state.assigned
              .filter(assignedQuest => !assignedQuest.quest.isComplete)
              .map(assignedQuest => (
                <ListGroup.Item
                  as={Link}
                  to={`/quests/${assignedQuest.quest.id}`}
                  key={assignedQuest.quest.id}>
                  {assignedQuest.quest.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
          <Card.Text>Complete:</Card.Text>
          <ListGroup>
            {this.state.assigned
              .filter(assignedQuest => assignedQuest.quest.isComplete)
              .map(assignedQuest => (
                <ListGroup.Item
                  as={Link}
                  to={`/quests/${assignedQuest.quest.id}`}
                  key={assignedQuest.quest.id}>
                  {assignedQuest.quest.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card.Body>
      </>
    );
  }
}

import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";
import APIManager from "../../modules/APIManager";
import { Link } from "react-router-dom";

export default class CharacterDetails extends Component {
  _isMounted = false;
  state = {
    character: {},
    assigned: [],
    hasActiveQuests: false,
    hasCompletedQuests: false,
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
    this._isMounted &&
      this.setState({
        ...character,
        assigned: assigned,
        hasActiveQuests:
          assigned.filter(assigned => !assigned.quest.isComplete).length > 0,
        hasCompletedQuests:
          assigned.filter(assigned => assigned.quest.isComplete).length > 0,
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
          <Card.Title style={{ textAlign: "center", fontSize: "1.3em" }}>
            <span
              style={{ fontSize: "1.3em" }}
              className="character-writing-title">
              {this.state.name}
            </span>
          </Card.Title>
          <Card.Text style={{ textAlign: "center" }}>
            {" "}
            <span style={{ fontSize: "1.3em" }} className="character-writing">
              {this.state.description}
            </span>
          </Card.Text>
          <Card.Title style={{ textAlign: "left" }}>
            Health:{" "}
            {this.state.health > 0 ? (
              <span>{this.state.health}</span>
            ) : (
              <span
                style={{
                  color: "darkred",
                  fontWeight: "bolder",
                  fontFamily: "Marcellus SC"
                }}>
                DEAD
              </span>
            )}
          </Card.Title>

          {/* <Button
            onClick={() => HealthManager.onComplete(this.props.characterId)}>
            Cheat: Health - Complete Quest
          </Button>
          <Button
            onClick={() => HealthManager.onAbandon(this.props.characterId)}>
            Cheat: Health - Abandon Quest
          </Button>
          <Button onClick={() => HealthManager.onFail(this.props.characterId)}>
            Cheat: Health - Fail Quest
          </Button> */}
          {this.state.hasActiveQuests || this.state.hasCompletedQuests ? (
            <Card.Title>Quests</Card.Title>
          ) : null}
          {this.state.hasActiveQuests ? (
            <>
              {" "}
              <Card.Text>Active:</Card.Text>
              <ListGroup>
                {this.state.assigned
                  .filter(assignedQuest => !assignedQuest.quest.isComplete)
                  .map(assignedQuest => (
                    <ListGroup.Item
                      className="character-detail-quests"
                      as={Link}
                      to={`/quests/${assignedQuest.quest.id}`}
                      key={assignedQuest.quest.id}>
                      {assignedQuest.quest.name}
                    </ListGroup.Item>
                  ))}
              </ListGroup>{" "}
            </>
          ) : null}
          {this.state.hasCompletedQuests ? (
            <>
              {" "}
              <Card.Text>Complete:</Card.Text>
              <ListGroup>
                {this.state.assigned
                  .filter(assignedQuest => assignedQuest.quest.isComplete)
                  .map(assignedQuest => (
                    <ListGroup.Item
                      className="text-muted character-detail-quests"
                      as={Link}
                      to={`/quests/${assignedQuest.quest.id}`}
                      key={assignedQuest.quest.id}>
                      {assignedQuest.quest.name}
                    </ListGroup.Item>
                  ))}
              </ListGroup>{" "}
            </>
          ) : null}
        </Card.Body>
      </>
    );
  }
}

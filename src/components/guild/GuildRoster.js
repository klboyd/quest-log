import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";
import APIManager from "../../modules/APIManager";
import "./Guild.css";

export default class GuildRoster extends Component {
  state = {
    characters: [],
    loadingStatus: true
  };
  async componentDidMount() {
    const characters = await APIManager.get("characters");
    this.setState({
      characters: characters.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      ),
      loadingStatus: false
    });
  }
  render() {
    return (
      <>
        <Card.Header>Guild Roster</Card.Header>
        <Card.Body>
          <ListGroup>
            {this.state.characters.map(character => (
              <ListGroup.Item
                key={character.id}
                className="character-item"
                onClick={() => {
                  console.log("clicked roster character", character.id);
                  this.props.history.push(`/guild/${character.id}`);
                }}>
                {character.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </>
    );
  }
}

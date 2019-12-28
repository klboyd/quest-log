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
                style={{
                  // background: `linear-gradient(to right, green 0%, yellowgreen ${character.health -
                  //   0.5}%, orange ${character.health}%, red ${character.health +
                  //   0.5}%, darkred 100%`,
                  background: `linear-gradient(${Math.floor(
                    Math.random() * 8 + 86
                  )}deg, darkgrey 0%, lightgrey ${character.health * 10 -
                    1}%, lightgrey ${character.health * 10 -
                    0.5}%, grey ${character.health *
                    10}%, lightgrey ${character.health * 10 +
                    0.5}%, lightgrey ${character.health * 10 + 1}%, white 100%`,
                  width: "100%"
                }}
                className="character-item character-writing-title"
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

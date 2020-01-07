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
          <ListGroup
            style={{
              // border: "1px solid black",
              // boxSizing: "border-box",
              borderRadius: "0"
            }}>
            {this.state.characters.map(character => (
              <ListGroup.Item
                key={character.id}
                style={{
                  background: `linear-gradient(90deg, rgba(0, 128, 0, 0.3) 0%, rgba(0, 128, 0, 0.3) ${character.health *
                    10 -
                    1}%, rgba(0, 128, 0, 0.3) ${character.health * 10 -
                    0.5}%, forestgreen ${character.health *
                    10}%, white ${character.health * 10 +
                    0.5}%, white ${character.health * 10 + 1}%, white 100%`,
                  width: "100%",
                  fontFamily: "Marcellus SC",
                  boxSizing: "border-box",
                  border: ".5px solid black",
                  borderRadius: "0"
                }}
                className="character-item character-writing-title roster-list-item"
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

import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./Character.css";
import APIManager from "../modules/APIManager";

export default class Character extends Component {
  state = {
    id: "",
    userId: "",
    name: "",
    description: "",
    level: "",
    health: "",
    experience: "",
    questsComplete: "",
    questsFailed: "",
    questsAbandoned: "",
    creationDate: ""
  };
  async componentDidMount() {
    const character = await APIManager.get(
      `characters?userId=${localStorage["userId"]}`
    );
    this.setState({ ...character[0] });
  }
  render() {
    return (
      <Card className="char-sheet-container">
        <Card.Header>Character Sheet</Card.Header>
        <Card.Body>
          <Card.Text className="char-sheet-name">{this.state.name}</Card.Text>
          <Card.Text className="char-sheet-desc">
            {this.state.description}
          </Card.Text>
          <Card.Text className="char-sheet-health">
            Health: {this.state.health}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Character.css";
import APIManager from "../modules/APIManager";
import CharacterForm from "./CharacterForm";

export default class Character extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    level: "",
    health: "",
    experience: "",
    questsComplete: "",
    questsFailed: "",
    questsAbandoned: "",
    creationDate: "",
    isEditMode: false,
    loadingStatus: true
  };
  confirmNewDetails = async newDetails => {
    this.setState({ loadingStatus: true });
    await APIManager.update(`characters`, {
      id: this.state.id,
      name: newDetails.name,
      description: newDetails.description,
      level: this.state.level,
      health: this.state.health,
      experience: this.state.experience,
      questsComplete: this.state.questsComplete,
      questsFailed: this.state.questsFailed,
      questsAbandoned: this.state.questsAbandoned,
      creationDate: this.state.creationDate
    });
    const results = await APIManager.get(
      `users/${localStorage["userId"]}?_expand=character`
    );
    this.setState({
      ...results.character,
      loadingStatus: false,
      isEditMode: false
    });
  };
  async componentDidMount() {
    const results = await APIManager.get(
      `users/${localStorage["userId"]}?_expand=character`
    );
    this.setState({ ...results.character, loadingStatus: false });
  }
  render() {
    return (
      <Card className="char-sheet-container">
        <Card.Header className="character-sheet-header">
          <Card.Text>Character Sheet</Card.Text>
        </Card.Header>
        <Card.Body>
          <Button
            variant={this.state.isEditMode ? "danger" : "primary"}
            disabled={this.state.loadingStatus}
            className="character-edit-button"
            onClick={() => {
              this.setState({ isEditMode: !this.state.isEditMode });
            }}>
            {this.state.isEditMode ? "x" : "✎"}
          </Button>
          {this.state.isEditMode ? (
            <CharacterForm
              name={this.state.name}
              description={this.state.description}
              confirmNewDetails={this.confirmNewDetails}
            />
          ) : (
            <>
              <Card.Text className="char-sheet-name">
                {this.state.name}
              </Card.Text>
              <Card.Text className="char-sheet-desc">
                {this.state.description}
              </Card.Text>
            </>
          )}
          <Card.Text className="char-sheet-health">
            Health: {this.state.health}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

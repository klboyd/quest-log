import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Character.css";
import APIManager from "../modules/APIManager";
import CharacterEditForm from "./CharacterEditForm";

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
  async getCharacterDetails() {
    const results = await APIManager.get(`users/${localStorage["userId"]}`);
    if (results.characterId) {
      const character = await APIManager.get(
        `characters/${results.characterId}`
      );
      this.setState({
        ...character,
        loadingStatus: false,
        isEditMode: false
      });
    } else {
      this.props.history.push("character/new");
    }
  }
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
    await this.getCharacterDetails();
  };
  async componentDidMount() {
    await this.getCharacterDetails();
    console.log("character", this.state);
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
              this.setState({
                isEditMode: !this.state.isEditMode
              });
            }}>
            {this.state.isEditMode ? "x" : "✎"}
          </Button>
          {this.state.isEditMode ? (
            <CharacterEditForm
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

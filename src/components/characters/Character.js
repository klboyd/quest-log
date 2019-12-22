import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Character.css";
import APIManager from "../../modules/APIManager";
import CharacterEditForm from "./CharacterEditForm";

export default class Character extends Component {
  state = {
    loadingStatus: true
  };
  async componentDidMount() {
    this.setState({ loadingStatus: false });
  }
  render() {
    console.log("character state", this.state);
    console.log("character props", this.props);
    return (
      <Card className="char-sheet-container">
        <Card.Header className="character-sheet-header">
          <Card.Text>Character Sheet</Card.Text>
        </Card.Header>
        <Card.Body className="character-sheet-body">
          {this.props.isEditMode ? (
            <CharacterEditForm
              descHeight={this.refs["char-description"]}
              isEditMode={this.props.isEditMode}
              switchEditMode={this.props.switchEditMode}
              name={this.props.character.name}
              description={this.props.character.description}
              confirmNewDetails={this.props.confirmNewDetails}
            />
          ) : (
            <>
              <div className="char-sheet-name">{this.props.character.name}</div>
              <div className="char-sheet-desc" ref="char-description">
                {this.props.character.description}
              </div>
            </>
          )}
          {!this.props.isEditMode ? (
            <Button
              variant="primary"
              disabled={this.state.loadingStatus}
              className="character-edit-button"
              onClick={this.props.switchEditMode}>
              {"✎"}
            </Button>
          ) : null}
          <Card.Text className="char-sheet-health">
            Health: {this.props.character.health}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

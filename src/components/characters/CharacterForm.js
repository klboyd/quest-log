import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import APIManager from "../../modules/APIManager";

export default class CharacterForm extends Component {
  _isMounted = false;
  state = {
    name: "",
    description: "",
    level: 1,
    health: 100,
    experience: 0,
    questsComplete: 0,
    questsFailed: 0,
    questsAbandoned: 0,
    loadingStatus: true
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this._isMounted && this.setState(stateToChange);
  };
  handleSubmit = async () => {
    this._isMounted &&
      this.setState({
        loadingStatus: true
      });
    const newCharacter = await APIManager.post("characters", {
      name: this.state.name,
      description: this.state.description,
      level: this.state.level,
      health: this.state.health,
      experience: this.state.experience,
      questsComplete: this.state.questsComplete,
      questsFailed: this.state.questsFailed,
      questsAbandoned: this.state.questsAbandoned,
      creationDate: new Date().toISOString()
    });
    await APIManager.patch(`users`, {
      id: localStorage["userId"],
      characterId: newCharacter.id
    });
    this.props.history.push("/quests");
  };
  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        loadingStatus: false
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Create your new character</h2>
        <Form>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="What is your character's name?"
              onChange={this.handleFieldChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              placeholder="What's your story?"
              rows="6"
              onChange={this.handleFieldChange}
            />
          </Form.Group>

          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </>
    );
  }
}

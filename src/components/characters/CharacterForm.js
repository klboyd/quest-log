import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class CharacterForm extends Component {
  state = {
    newName: "",
    newDescription: "",
    loadingStatus: true
  };
  componentDidMount() {
    this.setState({
      newName: this.props.name,
      newDescription: this.props.description,
      loadingStatus: false
    });
  }
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  render() {
    return (
      <>
        <Form.Control
          id="newName"
          type="text"
          defaultValue={this.state.newName}
          onChange={this.handleFieldChange}
        />
        <Form.Control
          id="newDescription"
          as="textarea"
          defaultValue={this.state.newDescription}
          rows="6"
          onChange={this.handleFieldChange}
        />
        <Button
          type="primary"
          onClick={() => {
            this.props.confirmNewDetails({
              name: this.state.newName,
              description: this.state.newDescription
            });
          }}>
          Accept
        </Button>
      </>
    );
  }
}

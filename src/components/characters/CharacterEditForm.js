import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class CharacterEditForm extends Component {
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
    // console.log("characterEditForm", this.props);
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="character-edit-accept"
            type="primary"
            onClick={() => {
              this.props.confirmNewDetails({
                name: this.state.newName,
                description: this.state.newDescription
              });
            }}>
            Accept
          </Button>
          <Button
            variant="danger"
            disabled={this.state.loadingStatus}
            className="character-edit-button"
            onClick={this.props.switchEditMode}>
            {"x"}
          </Button>
        </div>
      </>
    );
  }
}

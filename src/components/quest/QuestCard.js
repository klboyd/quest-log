import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class QuestList extends Component {
  render() {
    return (
      <Card className="quest-card">
        <Card.Title>{this.props.quest.name}</Card.Title>
        <Card.Body>
          <Card.Text>{this.props.quest.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

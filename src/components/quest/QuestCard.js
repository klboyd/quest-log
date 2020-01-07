import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class QuestList extends Component {
  render() {
    return (
      <Card>
        <Card.Title
          style={{
            boxSizing: "border-box",
            borderBottom: "1px outset black",
            padding: "2px",
            borderRadius: "0",
            marginBottom: "0",
            backgroundColor: "rgba(0,0,0,.03)",
            fontFamily: "Marcellus SC"
          }}>
          ~ {this.props.quest.name} ~
        </Card.Title>
        <Card.Body
          className={`quest-card difficulty-${this.props.quest.difficulty.type.toLowerCase()}-list`}
          style={{ fontStyle: "italic", borderRadius: "0" }}>
          <Card.Text>{this.props.quest.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

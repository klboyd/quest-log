import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./Log.css";

export default class Log extends Component {
  render() {
    return (
      <Card className="log-display">
        <Card.Header>Log section</Card.Header>
      </Card>
    );
  }
}

import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./ActionBar.css";

export default class ActionBar extends Component {
  render() {
    return (
      <Card.Footer className="actionbar-container">Action Bar</Card.Footer>
    );
  }
}

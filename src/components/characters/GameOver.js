import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class GameOver extends Component {
  state = {
    loadingStatus: true,
    color: "transparent"
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ color: "darkred" });
    }, 2000);
    this.setState({ loadingStatus: false });
  }
  render() {
    return (
      <>
        <div
          style={{
            fontSize: "15rem",
            color: this.state.color,
            textAlign: "center",
            transition: "color 2s ease"
          }}>
          YOU DIED
        </div>
        <Button onClick={() => this.props.history.push("/character/new")}>
          New Game
        </Button>
      </>
    );
  }
}

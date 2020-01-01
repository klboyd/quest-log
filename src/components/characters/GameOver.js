import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class GameOver extends Component {
  state = {
    loadingStatus: true,
    color: "transparent",
    visibility: "hidden"
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ color: "red" });
    }, 2000);
    setTimeout(() => {
      this.setState({ loadingStatus: false });
    }, 4000);
  }
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <div
            style={{
              fontSize: "15rem",
              color: this.state.color,
              textAlign: "center",
              transition: "color 2s ease"
            }}>
            YOU DIED
          </div>
          <Button
            className="new-game-button"
            hidden={this.state.loadingStatus}
            style={{ width: "200px" }}
            onClick={() => this.props.history.push("/character/new")}>
            NEW GAME
          </Button>
        </div>
      </>
    );
  }
}

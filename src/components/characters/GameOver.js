import React, { Component } from "react";
import { Button } from "react-bootstrap";
import APIManager from "../../modules/APIManager";

export default class GameOver extends Component {
  state = {
    loadingStatus: true,
    color: "transparent",
    visibility: "hidden"
  };
  async componentDidMount() {
    const user = await APIManager.get(
      `users/${Number(localStorage["userId"])}`
    );
    const assignee = await APIManager.get(
      `assignees/?characterId=${user.characterId}&_expand=quest`
    );
    console.log("assignee info", assignee);
    for (const item of assignee) {
      if (!item.quest.isComplete) {
        await APIManager.delete(`assignees/${item.id}`);
      }
    }
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
              transition: "color 2s ease",
              fontFamily: "Marcellus SC"
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

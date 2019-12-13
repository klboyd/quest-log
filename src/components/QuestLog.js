import React, { Component } from "react";
import NavigationBar from "./nav/NavigationBar";
import ApplicationViews from "./ApplicationViews";
import "./QuestLog.css";

localStorage.setItem("userId", 1);
localStorage.setItem("characterId", 1);
class QuestLog extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default QuestLog;

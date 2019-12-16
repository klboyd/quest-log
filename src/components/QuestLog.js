import React, { Component } from "react";
import NavigationBar from "./nav/NavigationBar";
import ApplicationViews from "./ApplicationViews";
import "./QuestLog.css";

class QuestLog extends Component {
  isAuthenticated = () => localStorage["userId"] !== undefined;
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <ApplicationViews isAuthenticated={this.isAuthenticated} />
      </React.Fragment>
    );
  }
}

export default QuestLog;

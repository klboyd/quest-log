import React, { Component } from "react";
import NavigationBar from "./nav/NavigationBar";
import ApplicationViews from "./ApplicationViews";
import "./QuestLog.css";

class QuestLog extends Component {
  state = {
    isLoggedIn: false
  };
  isAuthenticated = () => localStorage["userId"] !== undefined;
  setLoggedInStatus = () => {
    this.setState({ isLoggedIn: this.isAuthenticated() });
  };
  componentDidMount() {
    this.setLoggedInStatus();
  }
  render() {
    console.log("questLog state", this.state);
    return (
      <React.Fragment>
        <NavigationBar
          isLoggedIn={this.state.isLoggedIn}
          setLoggedInStatus={this.setLoggedInStatus}
        />
        <ApplicationViews
          isLoggedIn={this.state.isLoggedIn}
          setLoggedInStatus={this.setLoggedInStatus}
        />
      </React.Fragment>
    );
  }
}

export default QuestLog;

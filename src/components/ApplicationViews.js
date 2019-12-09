import React, { Component } from "react";
import { Route } from "react-router-dom";
import Quests from "./quest/Quests";

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        <Route exact path="/" render={props => <Quests />} />
        <Route path="/quests" render={props => <Quests />} />
      </>
    );
  }
}

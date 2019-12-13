import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CharacterForm from "./characters/CharacterForm";
import QuestViews from "./quest/QuestViews";

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        <Route exact path="/" render={props => <Redirect to="/quests" />} />

        <Route path="/quests" render={props => <QuestViews {...props} />} />

        <Route
          exact
          path="/character/new"
          render={props => <CharacterForm {...props} />}
        />
        {/* <Route path="/guild" render={props => <Guild />} /> */}
      </>
    );
  }
}

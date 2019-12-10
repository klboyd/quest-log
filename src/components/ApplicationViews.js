import React, { Component } from "react";
import { Route } from "react-router-dom";
import Quests from "./quest/Quests";
import CharacterNewForm from "./characters/CharacterNewForm";

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        {/* <Route exact path="/" render={props => <Quests />} /> */}
        <Route exact path="/quests" render={props => <Quests {...props} />} />

        <Route
          path="/quests/:questId(\d+)"
          render={props => (
            <Quests questId={parseInt(props.match.params.questId)} {...props} />
          )}
        />

        <Route
          path="/character/new"
          render={props => <CharacterNewForm {...props} />}
        />
        {/* <Route path="/guild" render={props => <Guild />} /> */}
      </>
    );
  }
}

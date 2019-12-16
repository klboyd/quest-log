import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CharacterForm from "./characters/CharacterForm";
import QuestViews from "./quest/QuestViews";
import Login from "./auth/Login";

export default class ApplicationViews extends Component {
  render() {
    console.log("applicationViews props", this.props);
    return (
      <>
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/"
          render={props =>
            this.props.isAuthenticated() ? (
              <Redirect to="/quests" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          path="/quests"
          render={props =>
            this.props.isAuthenticated() ? (
              <QuestViews {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          exact
          path="/character/new"
          render={props =>
            this.props.isAuthenticated() ? (
              <CharacterForm {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        {/* <Route path="/guild" render={props => <Guild />} /> */}
      </>
    );
  }
}

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
        <Route
          exact
          path="/login"
          render={props =>
            !this.props.isLoggedIn ? (
              <Login
                setLoggedInStatus={this.props.setLoggedInStatus}
                {...props}
              />
            ) : (
              <Redirect to="/quests" />
            )
          }
        />
        <Route
          exact
          path="/"
          render={props =>
            this.props.isLoggedIn ? (
              <Redirect to="/quests" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          path="/quests"
          render={props =>
            this.props.isLoggedIn ? (
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
            this.props.isLoggedIn ? (
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

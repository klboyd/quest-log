import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Quests.css";
import Log from "../log/Log";
import Character from "../characters/Character";
import ActionBar from "../actionbar/ActionBar";
import QuestList from "./QuestList";
import QuestDetail from "./QuestDetail";
import { Route } from "react-router-dom";
import QuestForm from "./QuestForm";
import APIManager from "../modules/APIManager";

const styles = {
  questContainer: {
    // margin: 0,
    height: window.innerHeight - 56
  }
};

export default class Quests extends Component {
  state = {
    quests: [],
    loadingStatus: true
  };
  async componentDidMount() {
    const quests = await APIManager.get("quests");
    this.setState({ quests: quests, loadingStatus: false });
  }
  render() {
    return (
      <Container style={styles.questContainer}>
        <Row className="quest-container">
          <Col className="log-sidebar" lg={4}>
            <Character {...this.props} />
            <Log quests={this.state.quests} {...this.props} />
          </Col>
          <Col className="quest-display" lg={8}>
            <Card style={{ height: "100%", padding: 0 }}>
              {
                <>
                  <Route
                    exact
                    path="/quests"
                    render={props => {
                      return (
                        <QuestList quests={this.state.quests} {...this.props} />
                      );
                    }}
                  />
                  <Route
                    path="/quests/:questId(\d+)"
                    render={props => (
                      <QuestDetail
                        questId={parseInt(props.match.params.questId)}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path="/quests/new"
                    render={props => <QuestForm {...props} />}
                  />
                </>
              }
              <ActionBar />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

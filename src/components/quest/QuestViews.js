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

const styles = {
  questContainer: {
    // margin: 0,
    height: window.innerHeight - 56
  }
};

export default class Quests extends Component {
  state = {
    loadingStatus: true
  };
  componentDidMount() {
    this.setState({ loadingStatus: false });
  }
  render() {
    return (
      <Container style={styles.questContainer}>
        <Row className="quest-container">
          <Col className="log-sidebar" lg={4}>
            <Character {...this.props} />
            <Log />
          </Col>
          <Col className="quest-display" lg={8}>
            <Card style={{ height: "100%", padding: 0 }}>
              {
                <>
                  <Route
                    exact
                    path="/quests"
                    render={props => {
                      return <QuestList {...this.props} />;
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

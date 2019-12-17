import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Quests.css";
import Log from "../log/Log";
import Character from "../characters/Character";
import QuestList from "./QuestList";
import QuestDetail from "./QuestDetail";
import { Route } from "react-router-dom";
import QuestForm from "./QuestForm";
import APIManager from "../modules/APIManager";
import QuestEditForm from "./QuestEditForm";

const styles = {
  questContainer: {
    // margin: 0,
    height: window.innerHeight - 56
  }
};

export default class Quests extends Component {
  state = {
    quests: [],
    assignedQuests: [],
    loadingStatus: true
  };
  async getAssignedQuests() {
    this.setState({ loadingStatus: true });
    const assignedQuests = await APIManager.get(
      `assignees?characterId=${localStorage["characterId"]}&_expand=quest`
    );
    this.setState({ loadingStatus: false });
    return assignedQuests.map(user => user.quest);
  }
  async getAllQuests() {
    return await APIManager.get(`quests?_embed=assignees`);
  }
  setUpdatedQuests = async () => {
    this.setState({ loadingStatus: true });
    this.setState({
      assignedQuests: await this.getAssignedQuests(),
      quests: await this.getAllQuests(),
      loadingStatus: false
    });
  };
  async componentDidMount() {
    this.setState({
      assignedQuests: await this.getAssignedQuests(),
      quests: await this.getAllQuests(),
      loadingStatus: false
    });
  }
  handleCompleteQuest = async (questId, instructions) => {
    if (instructions.find(step => !step.isComplete)) {
      window.alert("Please complete all tasks first");
    } else {
      this.setState({ loadingStatus: true });
      await APIManager.patch(`quests`, {
        id: questId,
        isComplete: true
      });
      this.setState({
        assignedQuests: await this.getAssignedQuests(),
        quests: await this.getAllQuests(),
        loadingStatus: false
      });
      this.props.history.push(`/quests`);
    }
  };
  render() {
    console.log("questViews state", this.state);
    console.log("questViews props", this.props);
    return (
      <Container style={styles.questContainer}>
        <Row className="quest-container">
          <Col className="log-sidebar" lg={4}>
            <Character {...this.props} />
            <Log quests={this.state.assignedQuests} {...this.props} />
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
                        <QuestList quests={this.state.quests} {...props} />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/quests/:questId(\d+)"
                    render={props => (
                      <QuestDetail
                        handleCompleteQuest={this.handleCompleteQuest}
                        setUpdatedQuests={this.setUpdatedQuests}
                        questId={parseInt(props.match.params.questId)}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/quests/:questId(\d+)/edit"
                    render={props => (
                      <QuestEditForm
                        setUpdatedQuests={this.setUpdatedQuests}
                        questId={parseInt(props.match.params.questId)}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/quests/new"
                    render={props => (
                      <QuestForm
                        setUpdatedQuests={this.setUpdatedQuests}
                        {...props}
                      />
                    )}
                  />
                </>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

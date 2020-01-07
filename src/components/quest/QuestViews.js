import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Quests.css";
import Log from "../log/Log";
import Character from "../characters/Character";
import QuestList from "./QuestList";
import QuestDetail from "./QuestDetail";
import { Route } from "react-router-dom";
import QuestForm from "./QuestForm";
import APIManager from "../../modules/APIManager";
import QuestEditForm from "./QuestEditForm";
import HealthManager from "../../modules/HealthManager";

const styles = {
  questContainer: {
    // margin: 0,
    maxHeight: window.innerHeight - 62.2
  },
  logSidebar: {
    maxHeight: "inherit"
  },
  questDetails: {
    maxHeight: "inherit"
  }
};

export default class Quests extends Component {
  _isMounted = false;
  state = {
    quests: [],
    assignedQuests: [],
    character: {},
    isEditMode: false,
    loadingStatus: true
  };

  getCharacterDetails = async () => {
    const results = await APIManager.get(
      `users/${localStorage["userId"]}?_expand=character`
    );
    console.log("CHARACTER", results);
    if (results.character && results.character.health > 0) {
      localStorage.setItem("characterId", results.character.id);
      this._isMounted &&
        this.setState({
          character: results.character,
          isEditMode: false
        });
    } else if (results.character && results.character.health <= 0) {
      this._isMounted &&
        this.setState({
          character: results.character,
          loadingStatus: false
        });
      localStorage.removeItem("characterId");
      this.props.history.push("/character/gameover");
    } else {
      this.props.history.push("/character/new");
    }
  };
  confirmNewDetails = async newDetails => {
    this._isMounted && this.setState({ loadingStatus: true });
    await APIManager.update(`characters`, {
      id: localStorage["characterId"],
      name: newDetails.name,
      description: newDetails.description,
      level: this.state.character.level,
      health: this.state.character.health,
      experience: this.state.character.experience,
      questsComplete: this.state.character.questsComplete,
      questsFailed: this.state.character.questsFailed,
      questsAbandoned: this.state.character.questsAbandoned,
      creationDate: this.state.character.creationDate
    });
    await this.getCharacterDetails();
  };
  switchEditMode = () => {
    this._isMounted &&
      this.setState({
        isEditMode: !this.state.isEditMode
      });
  };
  // async getAssignedQuests() {
  //   this._isMounted && this.setState({ loadingStatus: true });
  //   const assignedQuests = await APIManager.get(
  //     `assignees?characterId=${localStorage["characterId"]}&_expand=quest`
  //   );
  //   this._isMounted && this.setState({ loadingStatus: false });
  //   return assignedQuests.map(user => user.quest);
  // }
  async getAllQuests() {
    return await APIManager.get(`quests?_embed=assignees&_expand=difficulty`);
  }
  setUpdatedQuests = async () => {
    this._isMounted && this.setState({ loadingStatus: true });
    const quests = await this.getAllQuests();
    const assignedQuests = quests.filter(quest =>
      quest.assignees.find(
        assignee =>
          Number(assignee.characterId) === Number(localStorage["characterId"])
      )
    );
    this._isMounted &&
      this.setState({
        quests: quests,
        assignedQuests: assignedQuests,
        loadingStatus: false
      });
  };
  healthAbandon = async () => {
    await HealthManager.onAbandon(localStorage["characterId"]);
    await this.getCharacterDetails();
  };
  handleCompleteQuest = async (questId, instructions) => {
    if (instructions.find(step => !step.isComplete)) {
      window.alert("Please complete all tasks first");
    } else {
      this._isMounted && this.setState({ loadingStatus: true });
      await APIManager.patch(`quests`, {
        id: questId,
        isComplete: true
      });
      const quests = await this.getAllQuests();
      const assignedQuests = quests.filter(quest =>
        quest.assignees.find(
          assignee =>
            Number(assignee.characterId) === Number(localStorage["characterId"])
        )
      );
      this._isMounted &&
        this.setState({
          quests: quests,
          assignedQuests: assignedQuests,
          loadingStatus: false
        });
      await HealthManager.onComplete(localStorage["characterId"]);
      await this.getCharacterDetails();

      this.props.history.push(`/quests`);
    }
  };
  async componentDidMount() {
    this._isMounted = true;
    await this.getCharacterDetails();
    const quests = await this.getAllQuests();
    const assignedQuests = quests.filter(quest =>
      quest.assignees.find(
        assignee =>
          Number(assignee.characterId) === Number(localStorage["characterId"])
      )
    );
    this._isMounted &&
      this.setState({
        quests: quests,
        assignedQuests: assignedQuests,
        loadingStatus: false
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    console.log("questViews state", this.state);
    console.log("questViews props", this.props);
    return (
      <Container>
        <Row style={styles.questContainer} className="quest-container">
          <Col style={styles.logSidebar} className="log-sidebar" lg={4}>
            <Character
              confirmNewDetails={this.confirmNewDetails}
              switchEditMode={this.switchEditMode}
              character={this.state.character}
              isEditMode={this.state.isEditMode}
              {...this.props}
            />
            <Log quests={this.state.assignedQuests} {...this.props} />
          </Col>
          <Col style={styles.questDetails} className="quest-display" lg={8}>
            <Card style={{ height: "100%", padding: 0, border: 0 }}>
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
                        healthAbandon={this.healthAbandon}
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

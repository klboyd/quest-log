import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import QuestCard from "./QuestCard";
import { Link } from "react-router-dom";

export default class QuestList extends Component {
  _isMounted = false;
  state = {
    quests: []
  };
  async componentDidMount() {
    this._isMounted = true;
    const quests = this._isMounted && (await APIManager.get(`quests`));
    this._isMounted && this.setState({ quests: quests });
  }
  async componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Card className="quest-list-container">
        <Card.Header className="quest-card-header">Quest List</Card.Header>
        <Card.Body className="quest-list-body">
          <Container style={{ display: "flex", flexFlow: "row wrap" }}>
            {this.state.quests.map(quest => {
              return (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    flex: "0 0 45%",
                    margin: "5px"
                  }}
                  key={quest.id}
                  to={`/quests/${quest.id}`}>
                  <QuestCard quest={quest} />
                </Link>
              );
            })}
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

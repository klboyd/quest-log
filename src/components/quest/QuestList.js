import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import QuestCard from "./QuestCard";
import { Link } from "react-router-dom";
import ActionBar from "../actionbar/ActionBar";

export default class QuestList extends Component {
  render() {
    return (
      <>
        <Card className="quest-list-container">
          <Card.Header className="quest-card-header">Quest List</Card.Header>
          <Card.Body className="quest-list-body">
            <Container style={{ display: "flex", flexFlow: "row wrap" }}>
              {this.props.quests.map(quest => {
                return (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      flex: "0 0 45%",
                      margin: "5px"
                    }}
                    hidden={quest.isComplete}
                    key={quest.id}
                    to={`/quests/${quest.id}`}>
                    <QuestCard quest={quest} />
                  </Link>
                );
              })}
            </Container>
          </Card.Body>
        </Card>
        <ActionBar />
      </>
    );
  }
}

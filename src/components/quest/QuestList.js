import React, { Component } from "react";
import { Card } from "react-bootstrap";
import QuestCard from "./QuestCard";
import { Link } from "react-router-dom";
import ActionBar from "../actionbar/ActionBar";

export default class QuestList extends Component {
  componentWillUnmount() {
    console.log("questList unmounted");
  }
  render() {
    return (
      <>
        <Card className="quest-list-container">
          <Card.Header className="quest-card-header">Quest List</Card.Header>
          <Card.Body className="quest-list-body">
            {this.props.quests.map(quest => {
              return (
                !quest.isComplete && (
                  <Link
                    className="quest-card-link"
                    key={quest.id}
                    to={`/quests/${quest.id}`}>
                    <QuestCard quest={quest} />
                  </Link>
                )
              );
            })}
          </Card.Body>
        </Card>
        <ActionBar />
      </>
    );
  }
}

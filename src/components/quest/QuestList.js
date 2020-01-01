import React, { Component } from "react";
import { Card } from "react-bootstrap";
import QuestCard from "./QuestCard";
import { Link } from "react-router-dom";
import ActionBar from "../actionbar/ActionBar";
import "./Quests.css";

export default class QuestList extends Component {
  componentWillUnmount() {
    console.log("questList unmounted");
  }
  render() {
    console.log("questList props", this.props);
    return (
      <>
        <Card className="quest-list-container">
          <Card.Header className="quest-card-header">Quest List</Card.Header>
          <Card.Body className="quest-list-body">
            {this.props.quests.map(quest => {
              return (
                !quest.isComplete && (
                  <div key={quest.id} className={`quest-card-item`}>
                    <Link
                      className="quest-card-link"
                      key={quest.id}
                      to={`/quests/${quest.id}`}>
                      <QuestCard quest={quest} />
                    </Link>
                  </div>
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

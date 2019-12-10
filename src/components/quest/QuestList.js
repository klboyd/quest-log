import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
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
          <Container>
            <Row>
              <Col lg={6}>
                {this.state.quests.map(quest => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      key={quest.id}
                      to={`/quests/${quest.id}`}>
                      <QuestCard quest={quest} />
                    </Link>
                  );
                })}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

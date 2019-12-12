import React, { Component } from "react";
import { Card, Accordion, ListGroup, Button } from "react-bootstrap";
import "./Log.css";

export default class Log extends Component {
  render() {
    return (
      <Card className="log-display">
        <Card.Header>Log section</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Quests
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                {this.props.quests.map(quest => (
                  <ListGroup.Item
                    as={Card.Header}
                    key={quest.id}
                    onClick={() => {
                      this.props.history.push(`/quests/${quest.id}`);
                    }}>
                    {/* <Nav.Link tag={Link} to={`/quests/${quest.id}`}>
                      <Button>{quest.name}</Button>
                    </Nav.Link> */}
                    {quest.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Collapse>
          </Accordion>
        </Card.Body>
      </Card>
    );
  }
}

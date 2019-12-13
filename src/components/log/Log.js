import React, { Component } from "react";
import { Card, Accordion, ListGroup } from "react-bootstrap";
import "./Log.css";

export default class Log extends Component {
  render() {
    return (
      <Card className="log-display">
        <Card.Header>Quest Log</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Quests
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                {this.props.quests.map(quest =>
                  quest.recurInDays === 0 ? (
                    <ListGroup.Item
                      className="log-item"
                      as={Card.Header}
                      key={quest.id}
                      onClick={() => {
                        this.props.location.pathname.match(/^\/quests\/\d+$/)
                          ? this.props.history.push(`/quests`)
                          : this.props.history.push(`/quests/${quest.id}`);
                      }}>
                      {quest.name}
                    </ListGroup.Item>
                  ) : null
                )}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              Daily
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <ListGroup>
                {this.props.quests.map(quest =>
                  quest.recurInDays === 1 ? (
                    <ListGroup.Item
                      className="log-item"
                      as={Card.Header}
                      key={quest.id}
                      onClick={() => {
                        this.props.location.pathname.match(/^\/quests\/\d+$/)
                          ? this.props.history.push(`/quests`)
                          : this.props.history.push(`/quests/${quest.id}`);
                      }}>
                      {quest.name}
                    </ListGroup.Item>
                  ) : null
                )}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
              Weekly
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <ListGroup>
                {this.props.quests.map(quest =>
                  quest.recurInDays === 7 ? (
                    <ListGroup.Item
                      className="log-item"
                      as={Card.Header}
                      key={quest.id}
                      onClick={() => {
                        this.props.location.pathname.match(/^\/quests\/\d+$/)
                          ? this.props.history.push(`/quests`)
                          : this.props.history.push(`/quests/${quest.id}`);
                      }}>
                      {quest.name}
                    </ListGroup.Item>
                  ) : null
                )}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
              Complete
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <ListGroup>
                {this.props.quests.map(quest =>
                  quest.isComplete ? (
                    <ListGroup.Item
                      className="log-item"
                      as={Card.Header}
                      key={quest.id}
                      onClick={() => {
                        this.props.location.pathname.match(/^\/quests\/\d+$/)
                          ? this.props.history.push(`/quests`)
                          : this.props.history.push(`/quests/${quest.id}`);
                      }}>
                      {quest.name}
                    </ListGroup.Item>
                  ) : null
                )}
              </ListGroup>
            </Accordion.Collapse>
          </Accordion>
        </Card.Body>
      </Card>
    );
  }
}

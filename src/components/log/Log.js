import React, { Component } from "react";
import { Card, Accordion, ListGroup } from "react-bootstrap";
import "./Log.css";

export default class Log extends Component {
  state = {
    loadingStatus: true
  };
  componentDidMount() {
    this.setState({
      loadingStatus: false
    });
    console.log("log", this.state);
  }
  render() {
    return (
      <Card className="log-display">
        <Card.Header>Quest Log</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle
              className="accordion-header"
              as={Card.Header}
              variant="link"
              eventKey="0">
              <Card.Text className="accordion-title">Quests</Card.Text>
              <Card.Text className="accordion-quest-count">
                {
                  this.props.quests.filter(
                    quest => !quest.isComplete && quest.recurInDays === 0
                  ).length
                }
              </Card.Text>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                {this.props.quests
                  .filter(quest => !quest.isComplete && quest.recurInDays === 0)
                  .map(quest => (
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
                  ))}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              className="accordion-header"
              as={Card.Header}
              variant="link"
              eventKey="1">
              <Card.Text className="accordion-title">Daily</Card.Text>
              <Card.Text className="accordion-quest-count">
                {
                  this.props.quests.filter(
                    quest => !quest.isComplete && quest.recurInDays === 1
                  ).length
                }
              </Card.Text>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <ListGroup>
                {this.props.quests
                  .filter(quest => !quest.isComplete && quest.recurInDays === 1)
                  .map(quest => (
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
                  ))}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              className="accordion-header"
              as={Card.Header}
              variant="link"
              eventKey="2">
              <Card.Text className="accordion-title">Weekly</Card.Text>
              <Card.Text className="accordion-quest-count">
                {
                  this.props.quests.filter(
                    quest => !quest.isComplete && quest.recurInDays === 7
                  ).length
                }
              </Card.Text>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <ListGroup>
                {this.props.quests
                  .filter(quest => !quest.isComplete && quest.recurInDays === 7)
                  .map(quest => (
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
                  ))}
              </ListGroup>
            </Accordion.Collapse>
            <Accordion.Toggle
              className="accordion-header"
              as={Card.Header}
              variant="link"
              eventKey="3">
              <Card.Text className="accordion-title">Complete</Card.Text>
              <Card.Text className="accordion-quest-count">
                {this.props.quests.filter(quest => quest.isComplete).length}
              </Card.Text>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <ListGroup>
                {this.props.quests
                  .filter(quest => quest.isComplete)
                  .map(quest => (
                    <ListGroup.Item
                      className="log-item text-muted"
                      as={Card.Header}
                      key={quest.id}
                      onClick={() => {
                        this.props.location.pathname.match(/^\/quests\/\d+$/)
                          ? this.props.history.push(`/quests`)
                          : this.props.history.push(`/quests/${quest.id}`);
                      }}>
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

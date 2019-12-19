import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import APIManager from "../modules/APIManager";
import "./Guild.css";

const styles = {
  guildContainer: {
    // margin: 0,
    height: window.innerHeight - 56
  },
  guildRoster: {
    height: window.innerHeight - 56
  }
};

export default class GuildRoster extends Component {
  state = {
    characters: [],
    loadingStatus: true
  };
  async componentDidMount() {
    const characters = await APIManager.get("characters");
    this.setState({
      characters: characters.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      ),
      loadingStatus: false
    });
  }
  render() {
    console.log("guildRoster state", this.state);
    console.log("guildRoster props", this.props);
    return (
      <Container>
        <Row style={styles.guildContainer} className="guild-container">
          <Col className="guild-roster" lg={4}>
            <Card style={styles.guildRoster}>
              <Card.Header>Guild Roster</Card.Header>
              <Card.Body>
                <ListGroup>
                  {this.state.characters.map(character => (
                    <ListGroup.Item
                      key={character.id}
                      className="character-item"
                      onClick={() =>
                        this.props.history.push(`/guild/${character.id}`)
                      }>
                      {character.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} className="character-details">
            <Card className="character-details-container">
              {/* <CharacterDetails /> */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

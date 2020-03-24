import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Route } from "react-router-dom";
import "./Guild.css";
import CharacterDetails from "../characters/CharacterDetails";
import GuildRoster from "./GuildRoster";

const styles = {
  guildContainer: {
    // margin: 0,
    height: window.innerHeight - 62.2
  },
  guildViews: {
    height: window.innerHeight - 62.2
  },
  characterDetails: {
    height: window.innerHeight - 62.2
  }
};

export default class GuildViews extends Component {
  state = {
    loadingStatus: true
  };
  async componentDidMount() {
    this.setState({
      loadingStatus: false
    });
  }
  render() {
    // console.log("guildViews state", this.state);
    // console.log("guildViews props", this.props);
    return (
      <Container>
        <Row style={styles.guildContainer} className="guild-container">
          <Col className="guild-roster" lg={4}>
            <Card style={styles.guildViews}>
              <GuildRoster {...this.props} />
            </Card>
          </Col>
          <Col lg={8} className="character-details">
            <Card
              style={styles.characterDetails}
              className="character-details-container">
              <Route
                exact
                path="/guild/:characterId(\d+)"
                render={props => (
                  <CharacterDetails
                    characterId={parseInt(props.match.params.characterId)}
                  />
                )}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

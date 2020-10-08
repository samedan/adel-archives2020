import React from "react";
import {
  Segment,
  Header,
  Container,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container className="home-page-div">
        <Header as="h1" inverted>
          <Image
            size="massive"
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            style={{ marginBottom: 12 }}
          />
          Adelanto Archives
        </Header>
        <Button onClick={() => history.push("/archives")} size="huge" inverted>
          Voir les archives
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
  );
}

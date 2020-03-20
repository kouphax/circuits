import { Container, Button } from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const BackButton = () => (
  <Container>
    <LinkContainer to="/">
      <Button block variant="dark" className="mb-5 mt-5">
        <span style={{ fontSize: "2em" }}>Done</span>
      </Button>
    </LinkContainer>
  </Container>
);

export default BackButton;
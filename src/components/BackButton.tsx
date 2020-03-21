import { Container, Button } from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

type BackButtonProps = {
  to: string
}

const BackButton = ({ to }: BackButtonProps) => (
  <Container>
    <LinkContainer to={to}>
      <Button block variant="dark"  className="mb-5 mt-5">
        <span style={{ fontSize: "2em" }}>BACK</span>
      </Button>
      </LinkContainer>
  </Container>
);

export default BackButton;

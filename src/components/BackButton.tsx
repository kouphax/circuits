import { Container, Button } from "react-bootstrap";
import React from "react";
import { history } from '../App';

const BackButton = () => (
  <Container>
      <Button block variant="dark"  onClick={ history.goBack } className="mb-5 mt-5">
        <span style={{ fontSize: "2em" }}>BACK</span>
      </Button>
  </Container>
);

export default BackButton;

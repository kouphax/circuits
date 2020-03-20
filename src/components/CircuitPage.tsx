import { RouteComponentProps } from "react-router";
import { DataService, CircuitWorkout } from "../DataService";
import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import BackButton from "./BackButton";
import { LinkContainer } from "react-router-bootstrap";


const CircuitPage = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: {
      params: { id }
    }
  } = props;
  const circuit: CircuitWorkout = DataService.circuit(parseInt(id));
  return (
    <div>
      <BackButton />
      <Container>
        <LinkContainer to={`/circuits/timer/${id}`}>
          <Button block variant="outline-dark" className=" mt-5">
            <span style={{ fontSize: "2em" }}>TIMER</span>
          </Button>
        </LinkContainer>
      </Container>
      <Row>
        <Col>
          <h1 className="text-center display-3 pt-5">{circuit.title}</h1>
          <h2 className="text-center display-4 text-muted subtitle pb-5">
            {circuit.subtitle}
          </h2>
        </Col>
      </Row>
      <Row className="pb-5 mb-5">
        { 
          circuit.circuit.map(c => {
            return (
              <>
                <Col xs="6">
                  <div className="border border-secondary rounded mt-2 mb-2 p-5">
                    <h2
                      className="display-5 text-center"
                      style={{ color: "black" }}
                    >
                      {c.exercise.name}
                    </h2>
                    <h3 className="text-muted display-5 text-center">
                      {c.duration} seconds
                    </h3>
                  </div>
                </Col>
              </>
            )
          }) 
        }
      </Row>
    </div>
  );
};

export default CircuitPage;

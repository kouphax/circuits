import React from "react";
import { NavLink } from "react-router-dom";
import { get } from "local-storage";
import { Row, Col } from "react-bootstrap";
import { Circuits, DataService } from "../DataService";

const LandingPage = () => {
  const programme: Circuits = DataService.circuits()
  return (
    <div>
      <h1 className="text-center display-2 pt-5 mb-5">Circuits</h1>
      {programme.circuits.map(workout => {
        const hasRecord = get(`/workout/${workout.id}`) !== null;
        return (
          <Row>
            <Col>
              <div
                className="border border-secondary rounded mt-2 mb-2 p-5"
                style={{ opacity: hasRecord ? 0.5 : 1 }}
              >
                <NavLink
                  exact
                  to={`/circuits/circuit/${workout.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h2
                    className="display-5 text-center"
                    style={{ color: "black" }}
                  >
                    {workout.title}
                  </h2>
                  <h3 className="text-muted display-5 text-center">
                    {workout.subtitle}
                  </h3>
                </NavLink>
              </div>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default LandingPage;

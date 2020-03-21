import React from "react";
import BackButton from "./BackButton";
import { RouteComponentProps } from "react-router";
import { DataService, Exercise } from "../DataService";
import YouTube from "react-youtube";
import { Container, Button } from "react-bootstrap";
import { history } from "../App";

const ExerciseInstructions = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: {
      params: { id }
    }
  } = props;

  const exercise: Exercise = DataService.exercise(id);
  return (
    <>
      <Container>
        <Button
          block
          variant="dark"
          className="mb-5 mt-5"
          onClick={history.goBack}
        >
          <span style={{ fontSize: "2em" }}>BACK</span>
        </Button>
      </Container>
      <h1 className="text-center display-3 pt-5 mb-5">{exercise.name}</h1>
      <div className="text-center">
        {exercise.vid ? (
          <YouTube
            videoId={exercise.vid}
            className="border border-dark rounded"
          />
        ) : (
          <h2 className="text-center display-5 text-muted subtitle mb-5">
            This exercise has no video yet. We are working on it.
          </h2>
        )}
      </div>
    </>
  );
};

export default ExerciseInstructions;

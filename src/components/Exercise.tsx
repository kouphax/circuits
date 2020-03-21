import React from "react";
import BackButton from "./BackButton";
import { RouteComponentProps } from "react-router";
import { DataService, Instructions } from "../DataService";

const Exercise = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: {
      params: { id }
    }
  } = props;

  const instructions: Instructions = DataService.instructions(id)
  return (
    <>
    <BackButton />
      <h1 className="text-center display-3 pt-5">{instructions.exercise.name}</h1>
      <h2 className="text-center display-5 text-muted subtitle mb-3">
        We are still working on getting instructions written up.
      </h2>
    </>
  );
};

export default Exercise;

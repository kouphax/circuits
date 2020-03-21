import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const FourOhFour = () => {
  return (
    <>
      <h1 className="text-center display-3 pt-5 mb-5">Not Found</h1>
      <LinkContainer to="/">
        <Button block variant="dark" className=" mt-5">
          <span style={{ fontSize: "2em" }}>HOME</span>
        </Button>
      </LinkContainer>
    </>
  );
};

export default FourOhFour;

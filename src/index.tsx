import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";

ReactGA.initialize("UA-19143623-20");
ReactDOM.render(<App />, document.getElementById("root"));

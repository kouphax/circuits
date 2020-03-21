import React from "react";
import { Router, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import CircuitPage from "./components/CircuitPage";
import CircuitTimer from "./components/CircuitTimer";
import { createBrowserHistory } from 'history';
import ReactGA from "react-ga";
import Exercise from "./components/Exercise";
import { FaGithub } from "react-icons/fa";

export const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => (
  <div style={{ textTransform: "uppercase" }}>
    <div className="container">
      <Router history={history}>
        <ScrollToTop />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/circuit/:id" component={CircuitPage} />
        <Route exact path="/timer/:id" component={CircuitTimer} />
        <Route exact path="/exercise/:id" component={Exercise} />
      </Router>
      <h5 className="text-center mt-5 mb-5 text-muted display-5 subtitle ">BY <a href="https://yobriefca.se">YO BRIEFCASE</a>&nbsp;&nbsp;|&nbsp;&nbsp;WANT TO HELP? <a href="mailto:james@yobriefca.se?subject=Circuits Help">EMAIL US</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://github.com/kouphax/circuits">CODE ON GITHUB</a></h5>
    </div>
  </div>
);

export default App;

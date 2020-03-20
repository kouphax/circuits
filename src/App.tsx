import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import CircuitPage from "./components/CircuitPage";
import CircuitTimer from "./components/CircuitTimer";

const App = () => (
  <div style={{ textTransform: "uppercase" }}>
    <div className="container">
      <Router>
        <ScrollToTop />
        <Route exact path="/circuits/" component={LandingPage} />
        <Route exact path="/circuits/circuit/:id" component={CircuitPage} />
        <Route exact path="/circuits/timer/:id" component={CircuitTimer} />
      </Router>
    </div>
  </div>
);

export default App;

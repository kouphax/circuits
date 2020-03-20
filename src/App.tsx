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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/circuit/:id" component={CircuitPage} />
        <Route exact path="/timer/:id" component={CircuitTimer} />
      </Router>
    </div>
  </div>
);

export default App;

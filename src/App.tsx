import React from "react";
import { Router, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import CircuitPage from "./components/CircuitPage";
import CircuitTimer from "./components/CircuitTimer";
import { createBrowserHistory } from 'history';
import ReactGA from "react-ga";

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
      </Router>
    </div>
  </div>
);

export default App;

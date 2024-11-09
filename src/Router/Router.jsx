import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";

const Root = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

export default Root;

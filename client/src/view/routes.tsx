import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home";
import Demo from "./demo";
import NotFound from "./404";

export const Router = () => (
  <Switch>
    <Route exact path="/demo" component={Demo} />
    <Route exact path="/" component={Home} />
    <Route exact path="/*" component={NotFound} />
  </Switch>
);

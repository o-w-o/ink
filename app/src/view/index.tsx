import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home";

export const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

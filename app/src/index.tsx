import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline } from "@material-ui/core";

import "normalize.css";
import "./index.css";

import { Router } from "./view";
import { store, history } from "./store";
import { register } from "./serviceWorker";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store(history)}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Router />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register();

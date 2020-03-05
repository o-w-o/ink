import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline } from "@material-ui/core";

import "normalize.css";
import "./index.css";
import { history } from "./store/utils/history";
import { Router } from "./view/routes";
import { configureStore } from "./store";

import * as serviceWorker from "./serviceWorker";
import { isDev } from "../sdk/toolkit/is";

if (isDev()) {
  const {
    configureWhyDidYouRender,
  } = require("./template/helper/why-did-u-render");
  configureWhyDidYouRender(React, {});
}

const store = configureStore(window.__INITIAL_STATE__, history);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
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
serviceWorker.register();

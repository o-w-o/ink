import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { CssBaseline } from "@material-ui/core";

import "./index.css";
import { history } from "./store/utils/history";
import { Router } from "./view/routes";
import { configureStore } from "./store";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV === "development") {
  const {
    configureWhyDidYouRender,
  } = require("./template/helper/why-did-u-render");
  configureWhyDidYouRender(React, {});
}

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

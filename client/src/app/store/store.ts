import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { curry, merge } from "lodash";

import { epicsRunner } from "@o-w-o/store/epics";

import { IPreloaderState, preloaderState } from "./reducers";
import { isDev } from "../../sdk/toolkit/is";

export const curriedConfigureStore = function(
  reducer: any,
  initialState: IPreloaderState,
  history
) {
  const epicMiddleware = createEpicMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const middleware = [epicMiddleware, routerMiddleware];
  const devTools = isDev();

  const store = configureStore({
    reducer,
    devTools,
    preloadedState: merge(initialState, preloaderState),
    enhancers: () => [applyMiddleware(...middleware)],
  });

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(reducer);
    });
  }

  epicsRunner(epicMiddleware);
  return store;
};

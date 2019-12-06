import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router/immutable";
import { history } from "./utils/history";
import { IPreloaderState } from "./reducers";

export const connectStore = (reducers: any, initialState: IPreloaderState, epics: any) => {
  const env = process.env.NODE_ENV;

  const epicMiddleware = createEpicMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const middleware = [epicMiddleware, routerMiddleware];

  const enhancers: any[] = [];
  let composeEnhancers = compose;

  if (env === "development") {
    console.assert(env === "development", `env[${env}] !== development`);
    console.info(`env -> [${env}]`);

    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware), ...enhancers));

  const m = module as any;
  if (m.hot) {
    m.hot.accept("./reducers", () => {
      store.replaceReducer(reducers);
    });
  }

  epicMiddleware.run(epics);

  return store;
};

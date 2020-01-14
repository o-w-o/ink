import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router/immutable";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { history } from "./utils/history";
import { dbHelper } from "./modules/db/lib";
import { IPreloaderState } from "./reducers";
import { triggerCacheStore } from "./modules/db/epics";
import { socketHelper } from "./modules/socket/lib";
import { triggerSocket } from "./modules/socket/epics";

export const connectStore = (
  reducers: any,
  initialState: IPreloaderState,
  epics: any
) => {
  const env = process.env.NODE_ENV;

  const epicMiddleware = createEpicMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const middleware = [epicMiddleware, routerMiddleware];

  const enhancers: any[] = [];
  let composeEnhancers = compose;

  if (env === "development") {
    console.assert(env === "development", `env[${env}] !== development`);
    console.info(`env -> [${env}]`);

    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );

  const m = module;
  if (m.hot) {
    m.hot.accept("./reducers", () => {
      store.replaceReducer(reducers);
    });
  }

  const epic$ = new BehaviorSubject(epics);

  dbHelper.init().then(() => {
    socketHelper.init().then(() => {
      const rootEpic = (action$: any, state$: any): Observable<any> =>
        merge(
          socketHelper.$().pipe(map(triggerSocket)),
          dbHelper.$().pipe(map(triggerCacheStore)),
          epic$.pipe(mergeMap((epic) => epic(action$, state$)))
        );

      epicMiddleware.run(rootEpic);
    });
  });

  dbHelper.$o(() => dbHelper.test());
  socketHelper.$o(() => socketHelper.test());

  return store;
};

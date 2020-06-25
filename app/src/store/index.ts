import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import {
  epicToolkit,
  storeToolkit,
  preloaderState,
  routerReducer
} from "@o-w-o/lib-ext--client";

import { dbStore } from "./modules/db";

const epics = combineEpics(dbStore.epic);

epicToolkit.setEpics(epics).setEpicInitializers([dbStore.helper]);

export const store = history => {
  const reducers = combineReducers({
    router: routerReducer
  });

  return storeToolkit
    .setupReducer(reducers)
    .setupStore(preloaderState)
    .attachEpicsRunner(epicToolkit.getRunner())
    .setupRouterMiddleware(history)
    .buildStore();
};

export { history } from "@o-w-o/lib-ext--client";

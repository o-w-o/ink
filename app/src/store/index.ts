import { combineReducers } from "@reduxjs/toolkit";

import {
  EpicManager,
  preloaderState,
  routerReducer,
  StoreBuilder,
} from "../framework";

import { dbStore } from "./modules/db";

export const store = (history) => {
  const reducers = combineReducers({
    router: routerReducer,
  });

  const epics = [dbStore.epic];

  return StoreBuilder.INSTANCE.setupRouterMiddleware(history)
    .setupReducer(reducers)
    .setupStore(preloaderState)
    .attachEpicsRunner(
      EpicManager.INSTANCE.setEpics(epics)
        .setEpicInitializers([dbStore.helper])
        .generateEpicRunner()
    )
    .build();
};

export { history } from "../framework/data/reducers";

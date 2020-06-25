import { applyMiddleware, configureStore, Middleware } from "@reduxjs/toolkit";
import { isDev } from "@o-w-o/lib";
import { merge } from "lodash";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { preloaderState } from "./reducers";

class StoreToolkit<T> {
  private readonly epicMiddleware: EpicMiddleware<any>;
  private routerMiddleware: Middleware<any>;
  private preloaderState: T;
  private devTools = isDev();
  private reducer: any;
  constructor() {
    this.epicMiddleware = createEpicMiddleware();
  }

  setupStore(initialState) {
    this.preloaderState = merge(preloaderState, initialState);
    console.log("Initial state: ", this.preloaderState);
    return this;
  }

  setupReducer(reducer) {
    this.reducer = reducer;
    return this;
  }

  setupRouterMiddleware(history) {
    this.routerMiddleware = createRouterMiddleware(history);
    return this;
  }

  attachEpicsRunner(runner) {
    runner(this.epicMiddleware);
    return this;
  }

  private get middleware() {
    return [this.routerMiddleware, this.epicMiddleware];
  }

  buildStore() {
    return configureStore({
      reducer: this.reducer,
      devTools: this.devTools,
      preloadedState: this.preloaderState,
      enhancers: () => [applyMiddleware(...this.middleware)]
    });
  }
}

export const storeToolkit = new StoreToolkit();

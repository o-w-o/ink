import { merge } from "lodash";
import { applyMiddleware, configureStore, Middleware } from "@reduxjs/toolkit";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { preloaderState } from "./reducers";
import { isDev } from "../util";

export class StoreBuilder<T> {
  private readonly epicMiddleware: EpicMiddleware<any>;
  private routerMiddleware?: Middleware<any>;
  private preloaderState?: T;
  private devTools = isDev();
  private reducer: any;

  constructor() {
    this.epicMiddleware = createEpicMiddleware();
  }

  setupStore(initialState) {
    this.preloaderState = merge(preloaderState, initialState);
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

  private get middleware(): Middleware<any>[] {
    if (this.routerMiddleware === undefined) {
      throw new Error(
        "RouterMiddleware is not initialized (Note: run `setupRouterMiddleware` after `build`)!"
      );
    }
    return [this.routerMiddleware, this.epicMiddleware];
  }

  build() {
    return configureStore({
      reducer: this.reducer,
      devTools: this.devTools,
      preloadedState: this.preloaderState,
      enhancers: () => [applyMiddleware(...this.middleware)],
    });
  }

  public static readonly INSTANCE = new StoreBuilder<any>();
}

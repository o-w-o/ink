import { configureStore, applyMiddleware, Middleware } from "@reduxjs/toolkit";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { merge } from "lodash";
import { isDev } from "@o-w-o/helper/is";
import { IPreloaderState, preloaderState } from "./reducers";

class StoreToolkit {
  private readonly epicMiddleware: EpicMiddleware<any>;
  private routerMiddleware: Middleware<any>;
  private preloaderState: IPreloaderState;
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
    const store = configureStore({
      reducer: this.reducer,
      devTools: this.devTools,
      preloadedState: this.preloaderState,
      enhancers: () => [applyMiddleware(...this.middleware)],
    });

    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(this.reducer);
      });
    }

    return store;
  }
}

export const storeToolkit = new StoreToolkit();

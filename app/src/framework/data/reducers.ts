import { connectRouter, RouterState } from "connected-react-router";
import { createBrowserHistory as createHistory } from "history";

export interface IReducerAction<T> {
  type: string | symbol;
  payload: T;
}

export const history = createHistory();

export interface IRouterState extends RouterState {}

const defaultRouterState: IRouterState = {
  action: "PUSH",
  location: history.location,
};

export interface IPreloaderState {
  router: any;
}

const defaultPreloaderState: IPreloaderState = {
  router: defaultRouterState,
};

export const preloaderState: IPreloaderState = defaultPreloaderState;

export const routerReducer = connectRouter(history);

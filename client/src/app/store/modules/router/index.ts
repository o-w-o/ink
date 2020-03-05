import { connectRouter, RouterState } from "connected-react-router";
import { history } from "../../utils/history";

export interface IRouterState extends RouterState {}

export const defaultRouterState: IRouterState = {
  action: "PUSH",
  location: history.location,
};

export const routerReducer = connectRouter(history);

export default routerReducer;

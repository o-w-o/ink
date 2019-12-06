import { connectRouter } from "connected-react-router/immutable";
import { history } from "../../utils/history";
import { Record } from "immutable";
import { RouterState } from "connected-react-router";

export interface IRouterState extends RouterState {}

export const defaultRouterStateRecordVal: IRouterState = {
  action: "PUSH",
  location: history.location,
};

export const RouterStateRecord: Record.Factory<IRouterState> = Record<IRouterState>(
  defaultRouterStateRecordVal,
  "[[DemoStateRecord]]"
);

export const routerReducer = connectRouter(history);

export default routerReducer;

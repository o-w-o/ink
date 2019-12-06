import { combineReducers } from "redux-immutable";
import { profileReducer, ProfileStateRecord, IProfileState } from "./modules/profile/reducer";
import { routerReducer, RouterStateRecord } from "./modules/router/reducer";
import { Record, RecordOf } from "immutable";

export interface IReducerAction {
  type: string | symbol;
  payload: any;
}

export interface IPreloaderState {
  profile: RecordOf<IProfileState>;
  router: any;
}
const defaultPreloaderState: IPreloaderState = {
  profile: new ProfileStateRecord(),
  router: new RouterStateRecord(),
};

export const PreloaderStateRecord: Record.Factory<IPreloaderState> = Record<IPreloaderState>(
  defaultPreloaderState,
  "[[PreloaderStateRecord]]"
);

export const preloaderStateRecord: RecordOf<IPreloaderState> = new PreloaderStateRecord();

export const reducers = combineReducers({
  profile: profileReducer,
  router: routerReducer,
});

import { combineReducers } from "@reduxjs/toolkit";
import { initialProfileState, ProfileState } from "./modules/profile/store";
import { profileStore } from "./modules/profile";
import { defaultRouterState, routerReducer } from "./modules/router";

export interface IReducerAction {
  type: string | symbol;
  payload: any;
}

export interface IPreloaderState {
  profile: ProfileState;
  router: any;
}
const defaultPreloaderState: IPreloaderState = {
  profile: initialProfileState,
  router: defaultRouterState,
};

export const preloaderState: IPreloaderState = defaultPreloaderState;

export const reducers = combineReducers({
  profile: profileStore.reducer,
  router: routerReducer,
});

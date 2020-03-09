import { combineReducers } from "@reduxjs/toolkit";
import { profileStore, initialProfileState } from "@o-w-o/stores/profile";
import { defaultRouterState, routerReducer } from "@o-w-o/stores/router";
import { ProfileState } from "@o-w-o/stores/profile/store";

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

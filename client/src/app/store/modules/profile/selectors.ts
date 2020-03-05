import { createSelector } from "@reduxjs/toolkit";
import { IPreloaderState } from "../../reducers";
import { ProfileState } from "./store";

export const $profileState_ = ($state: IPreloaderState) => $state.profile;

export const uuid_ = createSelector(
  $profileState_,
  ($state: ProfileState) => $state.uuid
);

export const $user_ = createSelector($profileState_, ($state) => {
  return $state.$user;
});

export const $projects_ = createSelector($user_, ($state) => {
  return $state.projects;
});

export const loading_ = createSelector(
  $profileState_,
  ($state) => $state.loading
);

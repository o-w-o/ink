import { createSelector } from "../../utils/selector";
import { IPreloaderState } from "../../reducers";
import { IProfileState } from "./reducer";
import { RecordOf } from "immutable";

export const $profileState_ = ($state: RecordOf<IPreloaderState>) => $state.profile;

export const uuid_ = createSelector(
  $profileState_,
  ($state: RecordOf<IProfileState>) => $state.uuid
);

export const $projects_ = createSelector(
  $profileState_,
  ($state) => {
    return $state.$projects;
  }
);

export const $user_ = createSelector(
  $profileState_,
  ($state) => {
    return $state.$user;
  }
);
export const loading_ = createSelector(
  $profileState_,
  ($state) => $state.loading
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Record, RecordOf } from "immutable";
import { uniqueId } from "lodash";

import {
  IProject,
  IUser,
  ProjectRecord,
  UserRecord,
} from "@o-w-o/domains/demo/Demo";

export interface IProfileState {
  uuid: string;
  $projects: RecordOf<IProject>;
  $user: RecordOf<IUser>;
  loading: boolean;
}

export const initialProfileStateRecord: IProfileState = {
  uuid: uniqueId(),
  $projects: new ProjectRecord(),
  $user: new UserRecord(),
  loading: true,
};

export const ProfileStateRecord: Record.Factory<IProfileState> = Record<
  IProfileState
>(initialProfileStateRecord, "[[ProfileStateRecord]]");
export const initialProfileState: RecordOf<IProfileState> = new ProfileStateRecord();

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setProfile: ($state, action: PayloadAction<{ user: IUser }>) => {
      const { user } = action.payload;
      return $state.update("$user", ($state) => $state.merge(user));
    },
    setProfileLoading: (
      $state,
      action: PayloadAction<{ loading: boolean }>
    ) => {
      const { loading } = action.payload;
      return $state.update("loading", () => loading);
    },
  },
});

export const { setProfileLoading, setProfile } = profileSlice.actions;

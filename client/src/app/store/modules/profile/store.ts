import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqueId, merge } from "lodash";

import { User } from "@o-w-o/domains/demo/Demo";

export interface ProfileState {
  loading: boolean;
  uuid: string;
  $user: User;
}

export const initialProfileState: ProfileState = {
  loading: true,
  uuid: uniqueId(),
  $user: User.initialValue,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setProfile: ($state, action: PayloadAction<{ user: User }>) => {
      $state.$user = merge($state.$user, action.payload.user);
    },
    setProfileLoading: (
      $state,
      action: PayloadAction<{ loading: boolean }>
    ) => {
      $state.loading = action.payload.loading;
    },
  },
});

export const { setProfileLoading, setProfile } = profileSlice.actions;

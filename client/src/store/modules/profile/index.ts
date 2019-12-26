import { profileSlice } from "./store";
import { fetchProfile, profileEpic } from "./epics";

const { actions, reducer, name } = profileSlice;
export const profileStore = {
  name,
  actions,
  reducer,
  emitters: {
    fetchProfile,
  },
  epic: profileEpic,
};

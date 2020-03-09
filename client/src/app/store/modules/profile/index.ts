import { profileSlice } from "./store";

const { actions, reducer, name } = profileSlice;
import * as getters from "./selectors";
import { emitters, profileEpic } from "./epics";

export const profileStore = {
  name,
  getters,
  setters: actions,
  reducer,
  emitters,
  epic: profileEpic,
};

export { initialProfileState } from "./store";

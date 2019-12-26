import { combineEpics } from "redux-observable";

import { profileStore } from "./modules/profile";
import { dbStore } from "./modules/db";

const epics = [profileStore.epic, dbStore.epic];

export default combineEpics(...epics);

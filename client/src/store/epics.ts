import { combineEpics } from "redux-observable";

import { profileStore } from "./modules/profile";
import { dbStore } from "./modules/db";
import { socketEpic } from "./modules/socket/epics";

const epics = [profileStore.epic, dbStore.epic, socketEpic];

export default combineEpics(...epics);

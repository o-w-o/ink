import demoEpics from "./modules/profile/epics";
import { combineEpics } from "redux-observable";

const epics = [demoEpics];

export default combineEpics(...epics);

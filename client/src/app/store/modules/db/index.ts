import {
  triggerCacheStore,
  dispatchCacheStore,
  tryCacheStore,
  dbEpic,
} from "./epics";
import { dbHelper } from "./lib";

export const dbStore = {
  emitters: {
    triggerCacheStore,
    dispatchCacheStore,
    tryCacheStore,
  },
  epic: dbEpic,
  helper: dbHelper,
};

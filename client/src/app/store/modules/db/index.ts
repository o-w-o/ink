import {
  triggerCacheStore,
  dispatchCacheStore,
  tryCacheStore,
  storeToken,
  dbEpic,
} from "./epics";
import { dbHelper } from "./lib";

export const dbStore = {
  emitters: {
    triggerCacheStore,
    dispatchCacheStore,
    tryCacheStore,
    storeToken,
  },
  epic: dbEpic,
  helper: dbHelper,
};

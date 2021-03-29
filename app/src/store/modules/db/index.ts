import { dbEpic } from "./epics";
import { dbHelper } from "./lib";
import {
  dispatchCacheStore,
  storeToken,
  triggerCacheStore,
  tryCacheStore,
} from "@o-w-o/stores/db/emitter";

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

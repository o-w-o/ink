import { ActionsObservable, combineEpics } from "redux-observable";
import { filter, mergeMap, tap } from "rxjs/operators";

import { IReducerAction } from "../../../framework/data";
import { dbHelper } from "./lib";
import {
  dispatchCacheStore,
  storeToken,
  triggerCacheStore,
} from "@o-w-o/stores/db/emitter";

export const triggerCacheStoreEpics = (
  actions$: ActionsObservable<IReducerAction<any>>
) =>
  actions$.pipe(
    filter(triggerCacheStore.match),

    tap((evt: any) => {
      console.log("rxdb trigger evt -> ", evt);
    }),

    mergeMap(() => [dispatchCacheStore()])
  );

export const triggerStoreTokenEpics = (
  actions$: ActionsObservable<IReducerAction<any>>
) =>
  actions$.pipe(
    filter(storeToken.match),

    tap((evt: any) => {
      console.log("rxdb trigger evt[storeToken] -> ", evt);
    }),

    tap(async (action) => {
      await dbHelper.db.tokens.upsert(action.payload);
    }),

    mergeMap(() => [dispatchCacheStore()])
  );

export const dbEpic = combineEpics(
  triggerCacheStoreEpics,
  triggerStoreTokenEpics
);

import { createAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { EMPTY } from "rxjs";
import { filter, mergeMap, tap } from "rxjs/operators";

import { IReducerAction } from "../../reducers";
import { dbHelper } from "./lib";
import { Token } from "@o-w-o/stores/db/modules/tokens";

export const CACHE_STORE_NAMESPACE = "@@rxdb";

export const triggerCacheStore = createAction<any>(
  `${CACHE_STORE_NAMESPACE}/TRIGGER`
);
export const dispatchCacheStore = createAction(
  `${CACHE_STORE_NAMESPACE}/DISPATCH`
);

export const tryCacheStore = createAction(`${CACHE_STORE_NAMESPACE}/TRY`);

export const storeToken = createAction<Token>(
  `${CACHE_STORE_NAMESPACE}/TOKEN/store`
);

export const triggerCacheStoreEpics = (
  actions$: ActionsObservable<IReducerAction>
) =>
  actions$.pipe(
    filter(triggerCacheStore.match),

    tap((evt: any) => {
      console.log("rxdb trigger evt -> ", evt);
    }),

    mergeMap(() => [dispatchCacheStore()])
  );

export const triggerStoreTokenEpics = (
  actions$: ActionsObservable<IReducerAction>
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

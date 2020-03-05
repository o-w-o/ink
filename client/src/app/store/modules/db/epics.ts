import { createAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { mergeMap, tap, filter } from "rxjs/operators";

import { IReducerAction } from "../../reducers";

export const CACHE_STORE_NAMESPACE = "@@rxdb";

export const triggerCacheStore = createAction<any, string>(
  `${CACHE_STORE_NAMESPACE}/TRIGGER`
);
export const dispatchCacheStore = createAction(
  `${CACHE_STORE_NAMESPACE}/DISPATCH`
);

export const tryCacheStore = createAction(`${CACHE_STORE_NAMESPACE}/TRY`);

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

export const dbEpic = combineEpics(triggerCacheStoreEpics);

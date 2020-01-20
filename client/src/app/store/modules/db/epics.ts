import { createAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { mergeMap, tap } from "rxjs/operators";

import { IReducerAction } from "../../reducers";

export const cacheStoreNamespace = "@@rxdb";

export const triggerCacheStore = createAction<any, string>(
  `${cacheStoreNamespace}/TRIGGER`
);
export const dispatchCacheStore = createAction(
  `${cacheStoreNamespace}/DISPATCH`
);
export const tryCacheStore = createAction(`${cacheStoreNamespace}/TRY`);

export const triggerCacheStoreEpics = (
  actions$: ActionsObservable<IReducerAction>
) =>
  actions$.pipe(
    ofType(triggerCacheStore.type),

    tap((evt: any) => {
      console.log("rxdb trigger evt -> ", evt);
    }),

    mergeMap(() => [dispatchCacheStore()])
  );

export const dbEpic = combineEpics(triggerCacheStoreEpics);

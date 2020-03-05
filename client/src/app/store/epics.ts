import { combineEpics, EpicMiddleware } from "redux-observable";

import { merge } from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

import { dbStore } from "@o-w-o/stores/db";
import { socketStore } from "@o-w-o/stores/socket";
import { profileStore } from "@o-w-o/stores/profile";

export const epics = [profileStore.epic, dbStore.epic, socketStore.epic];

export const epicsRunner = function(epicMiddleware: EpicMiddleware<any>) {
  const epic$ = new BehaviorSubject(combineEpics(...epics));

  dbStore.helper
    .init()
    .then(() => {
      socketStore.helper
        .init()
        .then(() => {
          const rootEpic = (
            action$: any,
            state$: any,
            dependencies: any
          ): Observable<any> =>
            merge(
              socketStore.helper
                .$()
                .pipe(
                  tap(console.log),
                  map(socketStore.emitters.triggerSocket)
                ),
              dbStore.helper
                .$()
                .pipe(
                  tap(console.log),
                  map(dbStore.emitters.triggerCacheStore)
                ),
              epic$.pipe(
                mergeMap((epic) => epic(action$, state$, dependencies))
              )
            );

          epicMiddleware.run(rootEpic);
        })
        .finally(() => {
          socketStore.helper.$o(() => socketStore.helper.test());
        });
    })
    .finally(() => {
      dbStore.helper.$o(() => dbStore.helper.test());
    });
};

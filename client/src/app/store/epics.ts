import { combineEpics, Epic, EpicMiddleware } from "redux-observable";

import { BehaviorSubject, Observable, merge, of, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { dbStore } from "@o-w-o/stores/db";
import { socketStore } from "@o-w-o/stores/socket";
import { profileStore } from "@o-w-o/stores/profile";
import { IReducerAction } from "@o-w-o/store/reducers";

class EpicToolkit {
  private epic$: BehaviorSubject<Epic<IReducerAction, any, void>>;
  private readonly epics = combineEpics(
    dbStore.epic,
    socketStore.epic,
    profileStore.epic
  );

  constructor() {
    this.epic$ = new BehaviorSubject(this.epics);
    console.log("Init ->", this.epic$);
  }

  getRunner() {
    return (epicMiddleware: EpicMiddleware<any>) =>
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
                    .pipe(map(socketStore.emitters.triggerSocket)),
                  dbStore.helper
                    .$()
                    .pipe(map(dbStore.emitters.triggerCacheStore)),
                  this.epic$.pipe(
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
  }

  attachEpic(epic) {
    this.epic$.next(epic);
    return this;
  }
}

export const epicToolkit = new EpicToolkit();

import { combineEpics, Epic, EpicMiddleware } from "redux-observable";
import { BehaviorSubject, from, merge, Observable } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

import { IReducerAction } from "./reducers";

export interface IEpicInitializer {
  init(): Promise<IEpicInitializer>;

  $: Observable<any>;
  emitterTrigger: (...rest) => IReducerAction<any>;
}

export class EpicManager {
  private epic$: BehaviorSubject<
    Epic<IReducerAction<any>, any, void>
  > = new BehaviorSubject({} as any);
  private epics: any[] = [];
  private epicInitializers: IEpicInitializer[] = [];
  private epicInitialized = false;

  setEpics(epics) {
    this.epics = epics;
    return this;
  }

  setEpicInitializers(epicInitializers) {
    this.epicInitializers = epicInitializers;
    return this;
  }

  generateEpicRunner() {
    this.epic$ = new BehaviorSubject(combineEpics(...this.epics));
    this.epicInitialized = true;

    const $stream: Observable<any>[] = [];

    return async (epicMiddleware: EpicMiddleware<any>) => {
      from(this.epicInitializers).pipe(
        mergeMap(async (initializer) => await initializer.init()),
        map((initializer) =>
          initializer.$.pipe(map(initializer.emitterTrigger))
        ),
        tap((v) => $stream.push(v))
      );

      const rootEpic = (
        action$: any,
        state$: any,
        dependencies: any
      ): Observable<any> =>
        merge(
          ...$stream,
          this!.epic$.pipe(
            mergeMap((epic) => epic(action$, state$, dependencies))
          )
        );

      epicMiddleware.run(rootEpic);
    };
  }

  attachEpic(epic) {
    if (this.epicInitialized) {
      this.epic$.next(epic);
    } else {
      throw new Error(
        "Epic is not initialized (Note: run `attachEpic` after `getRunner`)"
      );
    }
    return this;
  }

  public static readonly INSTANCE = new EpicManager();
}

import { Ix$Ops, Ix$ } from "@o-w-o/lib";
import { combineEpics, Epic, EpicMiddleware } from "redux-observable";

import { BehaviorSubject, merge, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import { IReducerAction } from "./reducers";

export interface IEpicInitializer {
  init(): Promise<IEpicInitializer>;
  $: Observable<any>;
  emitterTrigger: (...rest) => IReducerAction<any>;
}

class EpicToolkit {
  private epic$: BehaviorSubject<Epic<IReducerAction<any>, any, void>>;
  private epics: any[];
  private epicInitializers: IEpicInitializer[];

  setEpics(epics) {
    this.epics = epics;
    return this;
  }

  setEpicInitializers(epicInitializers) {
    this.epicInitializers = epicInitializers;
    return this;
  }

  getRunner() {
    this.epic$ = new BehaviorSubject(combineEpics(...this.epics));

    const $stream: Observable<any>[] = [];
    const $ix = Ix$.from<IEpicInitializer>(this.epicInitializers).pipe(
      Ix$Ops.map(async initializer => await initializer.init()),
      Ix$Ops.map(initializer =>
        initializer.$.pipe(map(initializer.emitterTrigger))
      )
    );

    return async (epicMiddleware: EpicMiddleware<any>) => {
      for await (let $ of $ix) {
        $stream.push($);
      }

      const rootEpic = (
        action$: any,
        state$: any,
        dependencies: any
      ): Observable<any> =>
        merge(
          ...$stream,
          this.epic$.pipe(mergeMap(epic => epic(action$, state$, dependencies)))
        );

      epicMiddleware.run(rootEpic);
    };
  }

  attachEpic(epic) {
    this.epic$.next(epic);
    return this;
  }
}

export const epicToolkit = new EpicToolkit();

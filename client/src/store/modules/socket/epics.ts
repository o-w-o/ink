import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { mergeMap, tap } from "rxjs/operators";

export const SocketNamespace = "@@socket";

export const triggerSocket = createAction<any, string>(
  `${SocketNamespace}/TRIGGER`
);
export const dispatchSocket = createAction(`${SocketNamespace}/DISPATCH`);

export const triggerSocketEpics = (
  actions$: ActionsObservable<PayloadAction>
) =>
  actions$.pipe(
    ofType(triggerSocket.type),

    tap((evt: any) => {
      console.log("socket trigger evt -> ", evt);
    }),

    mergeMap(() => [dispatchSocket()])
  );

export const socketEpic = combineEpics(triggerSocketEpics);

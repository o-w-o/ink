import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { mergeMap, tap } from "rxjs/operators";

export const SOCKET_NAMESPACE = "@@socket";

export const triggerSocket = createAction<any, string>(
  `${SOCKET_NAMESPACE}/TRIGGER`
);
export const dispatchSocket = createAction(`${SOCKET_NAMESPACE}/DISPATCH`);

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

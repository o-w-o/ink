import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { debounceTime, map, mergeMap, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import camelcaseKeys from "camelcase-keys";

import { IReducerAction } from "../../reducers";

import { FETCH_PROFILE } from "./constants";
import { setProfile, setProfileLoading } from "./actions";

export const fetchProfileEpics = (actions$: ActionsObservable<IReducerAction>) =>
  actions$.pipe(
    ofType(FETCH_PROFILE),
    debounceTime(3000),
    mergeMap(({ payload }) =>
      ajax.getJSON(`https://gitlab.com/api/v4/users/1831024`).pipe(
        map((responseUser: any) => {
          console.log("fetch user done!");
          const { id, avatar_url: avatarUrl, username } = responseUser;
          return {
            id,
            avatarUrl,
            username,
          };
        }),

        mergeMap((responseUser) => [
          setProfile({
            user: camelcaseKeys(responseUser),
            projects: camelcaseKeys({}),
          }),
          setProfileLoading(false),
        ])
      )
    ),
    tap(console.info)
  );

export default combineEpics(fetchProfileEpics);

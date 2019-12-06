import { uniqueId } from "lodash";
import { SET_PROFILE, SET_PROFILE_LOADING } from "./constants";
import { Record, RecordOf } from "immutable";
import { IReducerAction } from "../../reducers";
import { Reducer } from "redux";
import { IProject, IUser, ProjectRecord, UserRecord } from "../../../domain/modules/demo/Demo";

export interface IProfileState {
  uuid: string;
  $projects: RecordOf<IProject>;
  $user: RecordOf<IUser>;
  loading: boolean;
}

export const defaultProfileStateRecordVal: IProfileState = {
  uuid: uniqueId(),
  $projects: new ProjectRecord(),
  $user: new UserRecord(),
  loading: true,
};

export const ProfileStateRecord: Record.Factory<IProfileState> = Record<IProfileState>(
  defaultProfileStateRecordVal,
  "[[DemoStateRecord]]"
);

export const initialProfileState: RecordOf<IProfileState> = new ProfileStateRecord();

export const profileReducer: Reducer<RecordOf<IProfileState>, IReducerAction> = (
  $state: RecordOf<IProfileState> = initialProfileState,
  action: IReducerAction
): RecordOf<IProfileState> => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROFILE: {
      const { user, projects } = payload;
      return $state
        .update("$user", ($state) => $state.merge(user))
        .update("$projects", ($state) => $state.merge(projects));
    }
    case SET_PROFILE_LOADING: {
      const { loading } = payload;
      return $state.update("loading", () => loading);
    }
    default:
      return $state;
  }
};

export default profileReducer;

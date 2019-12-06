import { FETCH_PROFILE, SET_PROFILE, SET_PROFILE_LOADING } from "./constants";

export const fetchProfile = () => ({
  type: FETCH_PROFILE,
});

export const setProfile = (data: any) => ({
  type: SET_PROFILE,
  payload: data,
});

export const setProfileLoading = (data: boolean) => ({
  type: SET_PROFILE_LOADING,
  payload: {
    loading: data,
  },
});

import { curriedConfigureStore } from "./store";
import { IPreloaderState, reducers } from "./reducers";

export const configureStore = (initialState: IPreloaderState, history: any) => {
  console.log("Initial state: ", initialState);

  return curriedConfigureStore(reducers, initialState, history);
};

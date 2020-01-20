import { connectStore } from "./store";
import { IPreloaderState, PreloaderStateRecord, reducers } from "./reducers";
import epics from "./epics";

export const configureStore = (initialState: IPreloaderState) => {
  console.log("Initial state: ", initialState);

  return connectStore(reducers, new PreloaderStateRecord(initialState), epics);
};

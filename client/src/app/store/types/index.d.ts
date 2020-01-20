export { IPreloaderState } from "../reducers";

export interface IStoreModule {
  name: string;
  setters: any;
  getters: any;
  emitters: any;
  reducer: any;
  epic: any;
}

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IRxRequestAdaptor } from "./request-adaptor.define";
import { IPageableResult } from "./data/define";

export interface IRxError extends AxiosError {}

export interface IRxRequest extends AxiosRequestConfig {}
export interface IRxRequestConfig extends IRxRequest {
  adaptor: IRxRequestAdaptor;
  retryTime?: number;
  delayTime?: number;
}

export interface IRxResponse<T = any> extends AxiosResponse<T> {}
export interface IRxResponseData {
  result: boolean;
  data?: any;
  payload?: any;
  error?: any;
  [key: string]: any;
}
export interface IRxResponseOutput {
  data: IRxResponseData;
  response: IRxResponse;
}

export interface IRxPageableResponseOutput<T> extends IRxResponseOutput {
  payload: IPageableResult<T>;
}

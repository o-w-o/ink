import { AjaxRequest, AjaxResponse } from "rxjs/ajax";

export class ResponseStatusPreset {
  readonly code: number;
  readonly message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static UNHANDLED_ERROR = new ResponseStatusPreset(0, "未捕获错误");
  static SERVER_INTERNAL_ERROR = new ResponseStatusPreset(500, "服务器错误");
  static NOT_FOUND = new ResponseStatusPreset(400, "客户端异常");
}

export enum ResponseType {
  ARRAY_BUFFER = "arraybuffer",
  BLOB = "blob",
  DOCUMENT = "document",
  JSON = "json",
  TEXT = "text",
  STREAM = "stream",
}

export interface IHttpResponseData<T = any> {}

export interface IHttpResponseDataTransformer<S, T = any> {
  (data: IHttpOutput<T>): S;
}

export interface IHttpContext {
  xhr: XMLHttpRequest;
  request: AjaxRequest;
  response: AjaxResponse;
  status: number;
  responseType: ResponseType;
}

export interface IHttpOutput<T = any> {
  context: IHttpContext;
  data: T;
}

export type { Middleware as IHttpMiddleware } from "@o-w-o/api";

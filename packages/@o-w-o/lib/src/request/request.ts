import Axios, { AxiosPromise, AxiosRequestConfig, Method } from "axios";
import { defer, from, of } from "rxjs";
import { catchError, flatMap, map, tap } from "rxjs/operators";

import { IRxRequestConfig } from "./request.define";
import { IRxRequestAdaptor } from "./request-adaptor.define";
import { defaultsJonRxRequestAdaptor } from "./adaptors/json-adaptor";
import { generateResponseFromError } from "./response/response-data";

const defaultAxiosConfig: AxiosRequestConfig = {
  timeout: 0
};

const request = Axios.create(defaultAxiosConfig);

export class RxRequest {
  constructor() {
    this.__method__ = RxRequest.methods.GET;
    this.__adaptor__ = defaultsJonRxRequestAdaptor;
    this.__config__ = {};
    this.stage = 0;
  }

  __method__: Method;
  __adaptor__: IRxRequestAdaptor;
  __url__: string | undefined;
  __params__: any;
  __data__: any;
  __config__: AxiosRequestConfig;

  stage: number;

  method(method: Method): this {
    this.__method__ = method;
    return this;
  }

  url(url: string): this {
    this.__url__ = url;
    return this;
  }

  params(query: any): this {
    this.__params__ = query;
    return this;
  }

  data(data: any): this {
    this.__data__ = data;
    return this;
  }

  config(config: AxiosRequestConfig): this {
    this.__config__ = {
      ...this.__config__,
      ...config
    };
    return this;
  }

  adaptor(adaptor: IRxRequestAdaptor) {
    this.__adaptor__ = adaptor;
    return this;
  }

  getAdaptor(): IRxRequestAdaptor {
    return this.__adaptor__;
  }

  /**
   * @description 请求发出后，进行临时数据重置工作
   */
  reset() {
    this.__url__ = undefined;
    this.__params__ = undefined;
    this.__data__ = undefined;
    this.__method__ = RxRequest.methods.GET;

    this.stage = -1;
  }

  get $() {
    return this.$proxy(true);
  }

  $proxy(reset?: boolean) {
    if (reset) {
      this.reset();
    }
    return this.__$__;
  }

  get __$__() {
    return RxRequest.request$({
      url: this.__url__,
      method: this.__method__,
      data: this.__data__,
      params: this.__params__,
      adaptor: this.__adaptor__,
      ...this.__config__
    });
  }

  static get methods(): { [key in Method]: Method } {
    return {
      HEAD: "HEAD",
      LINK: "LINK",
      OPTIONS: "OPTIONS",
      UNLINK: "UNLINK",
      delete: "delete",
      head: "head",
      link: "link",
      options: "options",
      patch: "patch",
      post: "post",
      put: "put",
      unlink: "unlink",
      get: "get",
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
      PATCH: "PATCH"
    };
  }

  static get defaultRetryTime() {
    return 0;
  }

  static get defaultDelayTime() {
    return 200;
  }

  static request(config: AxiosRequestConfig): AxiosPromise {
    let __timeout__ = 0;
    if (config.timeout && !Number.isNaN(+config.timeout)) {
      __timeout__ = +config.timeout;
    }
    if (__timeout__ > 0) {
      console.warn(`请求已设置超时限制, ${__timeout__}ms 触发超时异常。`);
    }
    return request(config);
  }

  static request$(requestConfig: IRxRequestConfig) {
    const { adaptor } = requestConfig;

    // 必须 defer 才可以 retry
    const request$ = defer(() =>
      RxRequest.request(requestConfig)
        .then(resp => resp)
        .catch(error => {
          // console.info(Object.keys(error).map(key => error[key]));
          return generateResponseFromError(error);
        })
    ).pipe(
      flatMap(response =>
        from(adaptor.responseTransformer(response, requestConfig))
      ),
      map((response: any) =>
        adaptor.responseInterceptor(response, requestConfig)
      ),
      tap((response: any) => adaptor.responseLogger(response, requestConfig)),
      tap((response: any) => adaptor.responseNotifier(response, requestConfig)),
      map((response: any) => adaptor.responseHandler(response, requestConfig)),
      catchError(e =>
        of(e).pipe(
          tap((response: any) =>
            adaptor.responseErrorLogger(e, response, requestConfig)
          ),
          tap((response: any) =>
            adaptor.responseErrorNotifier(e, response, requestConfig)
          ),
          map((response: any) => ({
            response,
            data: response.data
          }))
        )
      )
    );

    return request$;
  }
}

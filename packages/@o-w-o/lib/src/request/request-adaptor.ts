import {
  IRxRequestAdaptor,
  IRxRequestAdaptorConfig,
  IRxResponseDataTransformer,
  IRxResponseErrorLogger,
  IRxResponseErrorNotifier,
  IRxResponseHandler,
  IRxResponseLogger,
  IRxResponseNotifier,
  IRxResponseTransformer,
  IRxResponseInterceptor
} from "./request-adaptor.define";
import {
  IRxError,
  IRxRequestConfig,
  IRxResponse,
  IRxResponseData,
  IRxResponseOutput
} from "./request.define";

export class RxRequestAdaptor implements IRxRequestAdaptor {
  constructor(config: IRxRequestAdaptorConfig) {
    this.parseConfig(config);
  }

  config: IRxRequestAdaptorConfig = {};
  responseErrorNotifier = RxRequestAdaptor.defaultResponseErrorNotifier;
  responseErrorLogger = RxRequestAdaptor.defaultResponseErrorLogger;
  responseLogger = RxRequestAdaptor.defaultResponseLogger;
  responseNotifier = RxRequestAdaptor.defaultResponseNotifier;
  responseTransformer = RxRequestAdaptor.defaultResponseTransformer;
  responseDataTransformer = RxRequestAdaptor.defaultResponseDataTransformer;
  responseInterceptor: IRxResponseInterceptor =
    RxRequestAdaptor.defaultResponseInterceptor;
  responseHandler = RxRequestAdaptor.defaultResponseHandler;
  requestInterceptor: IRxResponseInterceptor =
    RxRequestAdaptor.defaultResponseInterceptor;

  parseConfig(config: IRxRequestAdaptorConfig): this {
    this.config = config;
    return this;
  }

  static async defaultResponseTransformer(
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): Promise<IRxResponse> {
    return response;
  }

  setResponseTransformer(responseTransformer: IRxResponseTransformer): this {
    // @ts-ignore
    this.responseTransformer = responseTransformer;
    return this;
  }

  static defaultResponseDataTransformer(
    data: IRxResponseData,
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): IRxResponseData {
    return data;
  }

  setResponseDataTransformer(
    responseDataHandler: IRxResponseDataTransformer
  ): this {
    this.responseDataTransformer = responseDataHandler;
    return this;
  }

  static defaultResponseInterceptor(
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): IRxResponse {
    if (response.status >= 400) {
      throw response;
    }
    return response;
  }

  setResponseInterceptor(responseInterceptor: IRxResponseInterceptor): this {
    this.responseInterceptor = responseInterceptor;
    return this;
  }

  static defaultResponseLogger(
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void {
    console.groupCollapsed(`请求 [ ${requestConfig.url} ] 执行成功`);
    console.info(response);
    console.info(requestConfig);
    console.groupEnd();
  }

  setResponseLogger(responseLogger: IRxResponseLogger): this {
    this.responseLogger = responseLogger;
    return this;
  }

  // @ts-ignore
  static defaultResponseNotifier(
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void {}

  setResponseNotifier(responseNotifier: IRxResponseNotifier): this {
    this.responseNotifier = responseNotifier;
    return this;
  }

  // @ts-ignore
  static defaultResponseErrorNotifier(
    error: IRxError,
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void {}

  setResponseErrorNotifier(
    responseErrorNotifier: IRxResponseErrorNotifier
  ): this {
    this.responseErrorNotifier = responseErrorNotifier;
    return this;
  }

  static defaultResponseErrorLogger(
    error: IRxError,
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void {
    console.groupCollapsed(`请求 [ ${requestConfig.url} ] 发生错误`);
    console.error(error);
    console.info(response);
    console.info(requestConfig);
    console.groupEnd();
  }

  setResponseErrorLogger(responseErrorRecorder: IRxResponseErrorLogger): this {
    this.responseErrorLogger = responseErrorRecorder;
    return this;
  }

  static defaultResponseHandler(
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): IRxResponseOutput {
    return {
      data: response.data,
      response
    };
  }

  setResponseHandler(responseHandler: IRxResponseHandler): this {
    this.responseHandler = responseHandler;
    return this;
  }
}

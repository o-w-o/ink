import {
  IRxRequestConfig,
  IRxError,
  IRxResponse,
  IRxResponseData,
  IRxResponseOutput
} from "./request.define";

export interface IRxRequestAdaptorConfig {}

/**
 * 适配器基类
 * 注释：接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
 *
 */
export interface IRxRequestAdaptor {
  config: IRxRequestAdaptorConfig;

  parseConfig(config: IRxRequestAdaptorConfig): this;

  requestInterceptor: IRxResponseInterceptor;

  responseTransformer: IRxResponseTransformer;
  responseInterceptor: IRxResponseInterceptor;
  responseLogger: IRxResponseLogger;
  responseNotifier: IRxResponseNotifier;
  responseErrorLogger: IRxResponseErrorLogger;
  responseErrorNotifier: IRxResponseErrorNotifier;
  responseHandler: IRxResponseHandler;
  responseDataTransformer: IRxResponseDataTransformer;

  setResponseTransformer(responseTransformer: IRxResponseTransformer): this;
  setResponseDataTransformer(
    responseDataTransformer: IRxResponseDataTransformer
  ): this;
  setResponseInterceptor(responseInterceptor: IRxResponseInterceptor): this;
  setResponseLogger(responseLogger: IRxResponseLogger): this;
  setResponseNotifier(responseNotifier: IRxResponseNotifier): this;
  setResponseErrorLogger(responseErrorLogger: IRxResponseErrorLogger): this;
  setResponseErrorNotifier(
    responseErrorNotifier: IRxResponseErrorNotifier
  ): this;
  setResponseHandler(responseHandler: IRxResponseHandler): this;
}

export interface IRxResponseTransformer {
  (response: IRxResponse, requestConfig: IRxRequestConfig): Promise<
    IRxResponse
  >;
}

export interface IRxResponseDataTransformer {
  (
    data: IRxResponseData,
    response?: IRxResponse,
    requestConfig?: IRxRequestConfig
  ): IRxResponseData;
}

export interface IRxResponseInterceptor {
  (response: IRxResponse, requestConfig: IRxRequestConfig): IRxResponse;
}

export interface IRxResponseLogger {
  (response: IRxResponse, requestConfig: IRxRequestConfig): void;
}

export interface IRxResponseErrorLogger {
  (
    error: IRxError,
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void;
}

export interface IRxResponseNotifier {
  (response: IRxResponse, requestConfig: IRxRequestConfig): void;
}

export interface IRxResponseErrorNotifier {
  (
    error: IRxError,
    response: IRxResponse,
    requestConfig: IRxRequestConfig
  ): void;
}

export interface IRxResponseHandler {
  (response: IRxResponse, requestConfig: IRxRequestConfig): IRxResponseOutput;
}

import { IRxResponse, IRxResponseData } from "../request.define";
import { UNHANDLED_ERROR } from "./response-status";
import { AxiosError } from "axios";
import { ResponseType } from "./response-type";

export const defaultErrorResponseData: IRxResponseData = {
  result: false,
  error: "未捕获错误"
};
export const defaultErrorResponse: IRxResponse = {
  data: defaultErrorResponseData,
  status: UNHANDLED_ERROR.getCode(),
  statusText: UNHANDLED_ERROR.getMessage(),
  headers: {
    "content-type": "application/json"
  },
  request: {
    responseType: ResponseType.JSON
  },
  config: {}
};

export function generateErrorResponseData(response?: IRxResponse) {
  if (!response) {
    return defaultErrorResponseData;
  }

  let responseData: IRxResponseData = {
    result: false
  };

  if (!response.data) {
    responseData.error = response.statusText;
  } else {
    responseData.error = response.data.error;
  }

  if (!responseData.error) {
    responseData.error = defaultErrorResponseData.error;
  }

  return responseData;
}

export function generateErrorResponse(
  response?: IRxResponse,
  errorText?: string,
  errorStatus?: number
) {
  let __response__: IRxResponse = response || defaultErrorResponse;

  let __errorText__: string =
    errorText || response.statusText || UNHANDLED_ERROR.getMessage();
  let __errorStatus__: number =
    errorStatus || response.status || UNHANDLED_ERROR.getCode();

  if (!response) {
    __response__.data.error = __errorText__;
  }

  return {
    ...__response__,
    data: generateErrorResponseData(__response__),
    status: __errorStatus__,
    statusText: __errorText__
  };
}

export function generateResponseFromError(
  error: AxiosError,
  errorText?: string,
  errorStatus?: number
): IRxResponse {
  let __errorText__: string = errorText || UNHANDLED_ERROR.getMessage();
  let __errorStatus__: number = errorStatus || UNHANDLED_ERROR.getCode();
  let responseData = undefined;

  const { response, config } = error;
  // console.log("generateResponseFromError [response] ", response)

  if (response && response.statusText) {
    __errorText__ = response.statusText;
  }

  if (response && response.status) {
    __errorStatus__ = response.status;
  }

  if (error.code) {
    __errorText__ += ` [ ${error.code} ] `;
  }

  if (response && response.data) {
    responseData = response.data;
    // console.log("generateResponseFromError [responseData] ", responseData)
  }

  if (!responseData) {
    responseData = generateErrorResponse(
      response,
      __errorText__,
      __errorStatus__
    ).data;
  }

  return {
    ...response,
    data: responseData,
    status: __errorStatus__,
    statusText: __errorText__,
    config
  };
}

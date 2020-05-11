import { RxRequestAdaptor } from "../request-adaptor";
import { generateErrorResponse } from "..";
import { ResponseType } from "..";
import { IRxResponse } from "../request.define";

export const defaultsJonRxRequestAdaptor = new RxRequestAdaptor(
  {}
).setResponseTransformer(
  async (response, requestConfig): Promise<IRxResponse> => {
    const loggerMark = "defaultsJonRxRequestAdaptor [response]";

    if (!response || !response.request) {
      console.log(loggerMark, " response 结构异常，无法解析");
      throw generateErrorResponse(response);
    }

    const responseType = response.request.responseType || "";
    const responseContentType = response.headers["content-type"] || "";
    if (
      responseType === ResponseType.JSON ||
      responseContentType.indexOf("json") >= 0
    ) {
      const __response__ = {
        ...response,
        data: requestConfig.adaptor.responseDataTransformer(response.data)
      };

      return __response__;
    }

    console.warn("未知的 responseType ->", responseType);
    console.warn("未知的 responseContentType ->", responseContentType);

    try {
      return generateErrorResponse(
        response,
        response.statusText,
        response.status
      );
    } catch (e) {
      console.error(loggerMark, response);
      return generateErrorResponse(response);
    }
  }
);

export const generateJsonErrorResponse = (response: IRxResponse): any => {
  return {
    data: {
      result: false,
      error: response.statusText
    },
    response
  };
};

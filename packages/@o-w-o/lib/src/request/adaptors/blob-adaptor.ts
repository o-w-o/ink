import { saveAs } from "file-saver";
import * as mime from "mime-types";

import {
  IRxResponseHandler,
  IRxResponseTransformer
} from "../request-adaptor.define";
import { IRxRequestConfig, IRxResponse } from "../request.define";
import { RxRequestAdaptor } from "../request-adaptor";
import { ResponseType, generateErrorResponse } from "..";

export const sleep = async (time = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const sleepUntil = async (fn: any) => {
  do {
    await sleep(100);
  } while (!fn());
  return {
    completed: true
  };
};

export const defaultBlobResponseTransformer: IRxResponseTransformer = async (
  response: IRxResponse,
  requestConfig: IRxRequestConfig
): Promise<IRxResponse> => {
  const loggerMark = "defaultBlobResponseTransformer [response]";

  if (!response || !response.request) {
    console.log(loggerMark, " response 结构异常，无法解析");
    throw generateErrorResponse(response);
  }

  const responseType = response.request.responseType || "";
  const responseContentType = response.headers["content-type"] || "";

  console.assert(
    responseType === ResponseType.BLOB,
    `${loggerMark}, expect 'blob' but get ${responseType} `
  );
  console.assert(
    requestConfig.responseType === ResponseType.BLOB,
    `${loggerMark}, expect 'blob' but get ${requestConfig.responseType} `
  );

  if (
    responseType === ResponseType.BLOB ||
    responseContentType.indexOf("json") >= 0
  ) {
    // console.log('defaultBlobResponseTransformer [responseStatus]', response.status)

    if (response.status >= 400) {
      let responseData = { result: false };
      // console.log("defaultBlobResponseTransformer [responseData] ", response.data)

      try {
        if (response.data instanceof Blob) {
          const responseBlob = new Blob([response.data], {
            type: "application/json"
          });

          const fr = new FileReader();
          fr.onload = function() {
            responseData = JSON.parse(this.result as string);
          };
          fr.readAsText(responseBlob);

          await sleepUntil((): boolean => {
            return fr.readyState === fr.DONE;
          });
        } else {
          responseData = response.data;
        }

        return {
          ...response,
          data: requestConfig.adaptor.responseDataTransformer(responseData)
        };
      } catch (e) {
        console.error(loggerMark, e, response);
        return generateErrorResponse(response);
      }
    } else {
      return {
        ...response,
        data: {
          result: true,
          payload: response.data
        }
      };
    }
  } else {
    console.error(loggerMark, response);
    return generateErrorResponse(
      response,
      `${loggerMark}, expect 'blob' but get ${responseType}`
    );
  }
};

/**
 * @description 待下载文件描述
 * type 类型可参看 ：http://www.w3school.com.cn/media/media_mimeref.asp
 */
export interface IDownloadFile {
  name: string;
  type: string;
  config?: any;
}

export const generateDownloadBlobResponseHandler = (
  file: IDownloadFile
): IRxResponseHandler => {
  return (response, requestConfig) => {
    // console.log("generateDownloadBlobResponseHandler ", requestConfig.url, file);
    saveAs(
      new Blob([response.data.payload], { type: file.type }),
      file.name,
      file.config
    );
    return {
      response,
      data: {
        result: true
      }
    };
  };
};

export const generateAttachmentDownloadBlobResponseHandler = (
  file?: IDownloadFile
): IRxResponseHandler => (response, requestConfig) => {
  console.debug("generateDownloadBlobResponseHandler ", requestConfig.url);

  // content-disposition: attachment; filename=[name.suffix]
  const contentDisposition: string = response.headers["content-disposition"];

  const fileName = contentDisposition
    .replace("attachment;", "")
    .trim()
    .replace("filename=", "")
    .trim();
  const fileType = mime.contentType(fileName) || "";

  const _file_: IDownloadFile = file
    ? {
        name: file.name || fileName,
        type: file.type || fileType,
        config: file.config
      }
    : {
        name: fileName,
        type: fileType
      };

  saveAs(
    new Blob([response.data.payload], { type: _file_.type }),
    _file_.name,
    _file_.config
  );

  return {
    response,
    data: {
      result: true
    }
  };
};

export const blobRxRequestAdaptor = new RxRequestAdaptor(
  {}
).setResponseTransformer(defaultBlobResponseTransformer);

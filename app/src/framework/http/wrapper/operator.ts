import { of, OperatorFunction } from "rxjs";
import {
  IHttpOutput,
  IHttpResponseData,
  IHttpResponseDataTransformer,
} from "../index.define";

interface IHttpOperatorCallback<S> {
  (data: S): void;
}

interface IHttpOperatorErrorCallback {
  (error: IHttpResponseData): void;
}

export function withOperator<T>(
  operatorPayload: T,
  operator: OperatorFunction<T, IHttpOutput>
);

export function withOperator<I, O extends IHttpOutput>(
  rxOperatorPayload: I,
  rxOperator: OperatorFunction<I, IHttpOutput>,
  dataTransformer: IHttpResponseDataTransformer<O>
);

/**
 * rx 异步操作封装
 * @param operatorPayload 操作符参数
 * @param operator 操作符
 * @param dataTransformer 当操作成功时，调用的数据转换器
 */
export function withOperator(operatorPayload, operator, dataTransformer?) {
  return (
    cb: IHttpOperatorCallback<IHttpOutput>,
    errorCb?: IHttpOperatorErrorCallback,
    finallyCb?: Function
  ) => {
    console.assert(
      finallyCb === undefined || typeof finallyCb === "function",
      `withRxOperator params::finallyCb is not a function', ${typeof finallyCb}`
    );
    console.assert(
      typeof cb === "function",
      `withRxOperator params::cb is not a function', ${typeof cb}`
    );
    console.assert(
      errorCb === undefined || typeof errorCb === "function",
      `withRxOperator params::errorCb is not a function', ${typeof errorCb}`
    );

    of(operatorPayload)
      .pipe(operator)
      .subscribe({
        next: (output: IHttpOutput) => {
          const { data } = output;
          if (data.succeed) {
            if (dataTransformer) {
              cb(dataTransformer(output));
            } else {
              cb(output);
            }
          } else {
            errorCb?.(data);
          }
        },
        error: (err) => {
          errorCb?.(err);
        },
        complete: () => {
          finallyCb?.();
        },
      });
  };
}

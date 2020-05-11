import { of, OperatorFunction } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { pick } from "lodash/fp";
import {
  IRxResponseData,
  IRxResponseOutput,
  IRxPageableResponseOutput
} from "../request.define";

interface IRxDataTransformer<S> {
  (data: IRxResponseOutput): S;
}

interface IRxOperatorCallback<S> {
  (data: S): void;
}

interface IRxOperatorErrorCallback {
  (error: IRxResponseData): void;
}

export function pageableResponseOutputTransformer<T>(
  output: IRxResponseOutput
): IRxPageableResponseOutput<T> {
  const { data } = output;

  const { succeed, reason } = data;
  const { pageSize, pageIndex, total } = data.data;

  if (!data.succeed) {
    console.warn(
      "pageableResponseOutputTransformer: 期望 output.data.succeed 为 true， 得到：",
      succeed
    );
  }

  let list: T[] = [];

  try {
    list = (pick(["data", "result"])(data) || []) as T[];
  } catch (e) {
    console.error(e);
  }

  return Object.assign({}, output, {
    payload: {
      reason,
      list,
      pagination: {
        pageIndex,
        pageSize,
        total
      }
    }
  });
}

/**
 * rx 异步操作封装
 * @param rxOperatorPayload 操作符参数
 * @param rxOperator 操作符
 */
export function withRxOperator<T>(
  rxOperatorPayload: T,
  rxOperator: OperatorFunction<T, IRxResponseOutput>
) {
  return (
    cb: IRxOperatorCallback<IRxResponseOutput>,
    errorCb?: IRxOperatorErrorCallback,
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

    of(rxOperatorPayload)
      .pipe(rxOperator)
      .subscribe({
        next: output => {
          const { data } = output;
          if (data.succeed) {
            cb(output);
          } else {
            errorCb(data);
          }
        },
        error: err => {
          if (errorCb) errorCb(err);
        },
        complete: () => {
          if (finallyCb) finallyCb();
        }
      });
  };
}

/**
 * rx 异步操作封装
 * @param rxOperatorPayload 操作符参数
 * @param rxOperator 操作符
 * @param dataTransformer 当操作成功时，调用的数据转换器
 */
export function withRxOperatorWithTransformer<I, O extends IRxResponseOutput>(
  rxOperatorPayload: I,
  rxOperator: OperatorFunction<I, IRxResponseOutput>,
  dataTransformer: IRxDataTransformer<O>
) {
  return (
    cb: IRxOperatorCallback<O>,
    errorCb: IRxOperatorErrorCallback,
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
      typeof errorCb === "function",
      `withRxOperator params::errorCb is not a function', ${typeof errorCb}`
    );

    of(rxOperatorPayload)
      .pipe(rxOperator)
      .subscribe({
        next: output => {
          const { data } = output;
          if (data.succeed) {
            cb(dataTransformer(output));
          } else {
            errorCb(data);
          }
        },
        error: err => {
          errorCb(err);
        },
        complete: () => {
          if (finallyCb) finallyCb();
        }
      });
  };
}

export const withThrottle = (time: number, cb: () => void) => {
  of("")
    .pipe(throttleTime(time))
    .subscribe({
      complete: cb
    });
};

export default {
  withThrottle,
  withRxOperator,
  withRxOperatorWithTransformer
};

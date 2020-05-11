import { IRxResponseOutput } from "../request.define";

export interface IPageable {
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IPageableResult<T> {
  pagination: IPageable;
  list: T[];
}

export const defaultPageableResult: IPageableResult<any> = {
  pagination: {
    pageIndex: 1,
    pageSize: 20,
    total: 0
  },
  list: []
};

export interface IRxPageableResponseOutput<T> extends IRxResponseOutput {
  payload: IPageableResult<T>;
}

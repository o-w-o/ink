export class ResponseStatusItem {
  code: number;
  message: string;

  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }
}

export const UNHANDLED_ERROR = new ResponseStatusItem(5000, "未捕获错误");
export const SERVER_INTERNAL_ERROR = new ResponseStatusItem(
  500,
  "服务器内部错误"
);
export const NOT_FOUND = new ResponseStatusItem(400, "资源未找到");

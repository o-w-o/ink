# API

## 结构 

`res = api.[namespace].[resourceAction](...params)`

例如：

`res = api.auth.register(username, password)`

## 响应结果

根据 `res.status()` 判断是否成功。

### 成功
```json5
{
  "success": true,
  "code": 0,
  "payload": {}, // 响应数据，通过 res["key"] 获得；
  "timestamp": 111111111111
}
```

### 异常
```json5
{
  "success": false,
  "code": 10086,
  "error": "错误信息", // 错误响应，通过 res.error 获得
  "errors": [], // 错误信息详情
  "path": "/xxx/xxx", // 错误接口
  "timestamp": 111111111111
}
```
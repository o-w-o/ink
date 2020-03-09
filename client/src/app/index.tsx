import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline } from "@material-ui/core";
import AjaxHook from "ajax-hook";

import "normalize.css";
import "./index.css";

import { Router } from "@o-w-o/view/routes";
import { storeToolkit } from "@o-w-o/store";
import { reducers } from "@o-w-o/store/reducers";
import { epicToolkit } from "@o-w-o/store/epics";
import { history } from "@o-w-o/store/utils/history";
import { isDev } from "@o-w-o/helper/is";

import * as serviceWorker from "./serviceWorker";
import { tokenPersistence } from "@o-w-o/stores/db/modules/tokens.persistence";

if (isDev()) {
  const {
    configureWhyDidYouRender,
  } = require("@o-w-o/template/helper/why-did-u-render");
  configureWhyDidYouRender(React, {});
}

/**
 * XHR.readyState == 状态（0，1，2，3，4）
 * - 0：请求未初始化，还没有调用 open()。
 * - 1：请求已经建立，但是还没有发送，还没有调用 send()。
 * - 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
 * - 3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
 * - 4：响应已完成；您可以获取并使用服务器的响应了。
 */
AjaxHook.hookAjax({
  // 拦截回调
  onreadystatechange: function(xhr: XMLHttpRequest) {
    const header = tokenPersistence.getAuthorizationHeader();

    console.log(
      "onreadystatechange called: [ %s ] -> %s",
      xhr.readyState,
      xhr.responseURL
    );

    if (xhr.readyState === 1 && header.key.trim() !== "") {
      xhr.setRequestHeader(header.key, header.val);
    }
  },
  onload: function(xhr) {
    console.log("onload called: %O", xhr);
  },
  //拦截方法
  open: function(arg, xhr) {
    console.log(
      "open called: method:%s,url:%s,async:%s",
      arg[0],
      arg[1],
      arg[2]
    );
  },
});

const store = storeToolkit
  .setupReducer(reducers)
  .attachEpicsRunner(epicToolkit.getRunner())
  .setupRouterMiddleware(history)
  .setupStore(window.__INITIAL_STATE__)
  .buildStore();

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Router />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React, { useEffect, useState } from "react";
import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { flatMap, map, mergeMap, tap } from "rxjs/operators";

import ReactJson from "react-json-view";
import { useDispatch } from "react-redux";
import { storeToken } from "@o-w-o/stores/db/epics";
import { Token } from "@o-w-o/stores/db/modules/tokens";

export function useProxyTester() {
  const [loading, setLoading] = useState<boolean>(true);
  const [output, setOutput] = useState<any | void>(null);
  const [trigger, setTrigger] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    of(0)
      .pipe(
        tap(() => setLoading(true)),
        mergeMap(() =>
          forkJoin([
            ajax.post("/api/authorization?username=qa&password=233333"),
          ]).pipe(
            map((v) => {
              const result = v[0].response;
              const token = new Token();
              token.accessToken = result.accessToken;
              token.refreshToken = result.refreshToken;

              return token;
            })
          )
        ),
        tap((token: Token) => dispatch(storeToken(token))),
        tap(() => setLoading(false))
      )
      .subscribe(setOutput, (e) => setOutput(e.response));
  }, [trigger]);

  return {
    loading,
    output,
    setTrigger,
  };
}

export function ProxyTester() {
  const { loading, output, setTrigger } = useProxyTester();
  console.log("++");
  return loading ? (
    <div onClick={() => setTrigger(Math.random())}>loading</div>
  ) : (
    <div onDoubleClick={() => setTrigger(Math.random())}>
      <ReactJson src={output || {}} displayDataTypes={false} />
    </div>
  );
}

ProxyTester.whyDidYouRender = true;

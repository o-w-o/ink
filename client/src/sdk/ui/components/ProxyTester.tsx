import React, { useEffect, useState } from "react";
import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mergeMap, tap } from "rxjs/operators";

import ReactJson from "react-json-view";

export function useProxyTester() {
  const [loading, setLoading] = useState<boolean>(true);
  const [output, setOutput] = useState<any | void>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    of(0)
      .pipe(
        tap(() => setLoading(true)),
        mergeMap(() =>
          forkJoin(
            ajax.post("/api/authorization?username=qa&password=233333")
          ).pipe(
            tap((v) => {
              console.log("[TAP]: ", v[0]);
            }),
            map((v) => v[0].response)
          )
        ),
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

import React, { useEffect, useState } from "react";
import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mergeMap, tap } from "rxjs/operators";
import { useDispatch } from "react-redux";
import ReactJson from "react-json-view";
import { fetchProfile } from "../../store/modules/profile/actions";

export function useProxyTester() {
  const [loading, setLoading] = useState<boolean>(true);
  const [output, setOutput] = useState<any | void>(null);
  const [trigger, setTrigger] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    of(0)
      .pipe(
        tap(() => setLoading(true)),
        tap(() => dispatch(fetchProfile())),
        mergeMap(() =>
          forkJoin(ajax.getJSON("/api/auth/token?username=demo&password=23333")).pipe(
            tap((v) => {
              console.log("[TAP]: ", v[0]);
            }),
            map((v: any) => v[0])
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
  return loading ? (
    <div onClick={() => setTrigger(Math.random())}>loading</div>
  ) : (
    <div onClick={() => setTrigger(Math.random())}>
      <ReactJson src={output || {}} displayDataTypes={false} />
    </div>
  );
}

ProxyTester.whyDidYouRender = true;

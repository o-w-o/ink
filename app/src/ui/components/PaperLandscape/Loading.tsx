import React from "react";
import { Case, Default, Switch } from "react-if";
import * as cssModule from "./Loading.module.css";

export interface LoadingProps {
  type?: "default" | "dot";
}

export const defaultProps: LoadingProps = {
  type: "default",
};

export const Loading = React.memo((_props: LoadingProps) => {
  const props = Object.assign({}, defaultProps, _props);
  const { type } = props;

  return (
    <Switch>
      <Case condition={type === "default"}>
        <div className={cssModule.DefaultSpinner}>
          <div className={cssModule.DotI} />
          <div className={cssModule.DotO} />
        </div>
      </Case>
      <Case condition={type === "dot"}>
        <div className={cssModule.DotSpinner}>
          <div className={cssModule.DotX} />
          <div className={cssModule.DotY} />
        </div>
      </Case>
      <Default>
        <div className={cssModule.DefaultSpinner}>
          <div className={cssModule.DotI} />
          <div className={cssModule.DotO} />
        </div>
      </Default>
    </Switch>
  );
});

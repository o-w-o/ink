import React from "react";
import { Case, Else, If, Switch, Then } from "react-if";
import loadable from "@loadable/component";

export interface PaperBackgroundProps {
  mode?: "preset" | "custom";
  backgroundMode?: "M1" | "M2" | "M3";
  background?: JSX.Element;
  backgroundUrl?: string;
  backgroundUrlPaired?: string;
}

const M1 = loadable(() => import("./PaperBackgroundM1"));
const M2 = loadable(() => import("./PaperBackgroundM2"));
const M3 = loadable(() => import("./PaperBackgroundM3"));

export const PaperBackground = React.memo((props: PaperBackgroundProps) => {
  const _props = Object.assign(
    {
      mode: "preset",
      backgroundMode: "M3",
    } as PaperBackgroundProps,
    props
  );

  return (
    <If condition={_props.mode === "preset"}>
      <Then>
        <Switch>
          <Case condition={_props.backgroundMode === "M1"}>
            <M1 mode="M1" url={props.backgroundUrl} />
          </Case>
          <Case condition={_props.backgroundMode === "M2"}>
            <M2 mode="M2" url={props.backgroundUrl} />
          </Case>
          <Case condition={_props.backgroundMode === "M3"}>
            <M3
              mode="M3"
              url={props.backgroundUrl}
              urlPaired={props.backgroundUrlPaired}
            />
          </Case>
        </Switch>
      </Then>

      <Else>{_props.background}</Else>
    </If>
  );
});

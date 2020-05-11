import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Keyboard, Cloud, AllInclusive } from "@material-ui/icons";

import { PaperButton } from "./PaperButton";

export default {
  title: "PaperButton",
  component: PaperButton,
  decorators: [withKnobs],
};

export const 烛火录 = () => {
  const active = boolean("active", true);
  return (
    <PaperButton
      title={text("title", "烛火录")}
      icon={Keyboard}
      active={active}
    />
  );
};

export const 藏 = () => {
  const active = boolean("active", false);
  return (
    <PaperButton title={text("title", "藏")} icon={Cloud} active={active} />
  );
};

export const 易 = () => {
  const active = boolean("active", false);
  return (
    <PaperButton
      title={text("title", "易")}
      icon={AllInclusive}
      active={active}
    />
  );
};

import React from "react";
import { withKnobs, text, boolean, optionsKnob } from "@storybook/addon-knobs";
import { Keyboard } from "@material-ui/icons";

import { PaperButtonX } from "./PaperButtonX";

export default {
  title: "PaperButtonX",
  component: PaperButtonX,
  decorators: [withKnobs],
};

export const 烛火录 = () => {
  const active = boolean("active", true);
  const direction = optionsKnob(
    "direction",
    {
      left: "left",
      right: "right",
    },
    "left",
    {
      display: "inline-radio",
    }
  );
  const color = optionsKnob(
    "color",
    {
      red: "red",
      orange: "orange",
      yellow: "yellow",
    },
    "orange",
    {
      display: "inline-radio",
    }
  );
  return (
    <PaperButtonX title={text("title", "烛火录")} icon={Keyboard} active={active} direction={direction} color={color} />
  );
};

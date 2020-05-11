import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import avatar from "../../assets/avatar.jpg";

import { PaperAvatar } from "./PaperAvatar";

export default {
  title: "PaperAvatar",
  component: PaperAvatar,
  decorators: [withKnobs]
};

export const Avatar = () => {
  const active = boolean("active", true);
  return <PaperAvatar src={text("src", avatar)} alt="--" active={active} />;
};

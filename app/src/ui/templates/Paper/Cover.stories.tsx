import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Box } from "@material-ui/core";

import { Cover } from "./Cover";
import cover from "../../assets/cover.png";

export default {
  title: "Cover",
  component: Cover,
  decorators: [withKnobs]
};

export const 主页 = () => {
  return <Cover style={{ cover }} content={<Box>-</Box>} />;
};

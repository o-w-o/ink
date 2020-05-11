import React from "react";
import { isDev } from "@o-w-o/lib";

export const setupDev = () => {
  if (isDev()) {
    require("./why-did-u-render").configureWhyDidYouRender(React, {});
  }
};

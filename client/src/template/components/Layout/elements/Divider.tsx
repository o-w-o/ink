/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { ParallaxLayer } from "react-spring/renderprops-addons.cjs";

type DividerProps = {
  speed: number;
  offset: number;
  children?: React.ReactNode;
  bg?: string;
  fill?: string;
  clipPath?: string;
  className?: string;
  factor?: number;
};

export const Divider = ({ speed, offset, factor, bg, fill, clipPath, children, className }: DividerProps) => (
  <ParallaxLayer
    speed={speed}
    offset={offset}
    factor={factor || 1}
    className={className}
    css={{
      position: `absolute`,
      width: `full`,
      height: `full`,
      background: bg,
      backgroundColor: bg,
      "#contact-wave": {
        color: fill,
        fill: `currentColor`,
      },
      clipPath,
    }}>
    {children}
  </ParallaxLayer>
);

export default Divider;

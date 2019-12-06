/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { ParallaxLayer } from "react-spring/renderprops-addons.cjs";

type ContentProps = {
  speed: number;
  offset: number;
  children?: React.ReactNode;
  className?: string;
  factor?: number;
};

const Content = ({ speed, offset, children, className, factor }: ContentProps) => (
  <ParallaxLayer
    className={className}
    speed={speed}
    offset={offset}
    factor={factor || 1}
    css={{
      padding: [3, 4, 4, 5],
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
      zIndex: 50,
    }}>
    {children}
  </ParallaxLayer>
);

export default Content;

/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

export const Inner = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={className} css={{
    width: ['81vw'],
    textAlign: `left`
  }}>
    {children}
  </div>
);

export default Inner;

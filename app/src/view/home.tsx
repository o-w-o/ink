import React from "react";
import { Apps, BubbleChart, Info, Settings, Toc } from "@material-ui/icons";

import {
  Navigation,
  NavigationProps,
  PaperAuthentication,
  PaperO,
} from "@o-w-o/ui";

import logo from "../assets/logo.png";

const navigationHomeProps: NavigationProps = {
  enableAvatar: true,
  avatar: {
    src: logo,
    active: false,
  },
  enableController: true,
  controllerStatus: true,
  buttons: [
    {
      title: "目录",
      icon: Toc,
      active: false,
    },
    {
      title: "联系",
      icon: BubbleChart,
      active: false,
    },
  ],
  bottomButtons: [
    {
      title: "控制",
      icon: Apps,
      active: false,
    },
    {
      title: "设置",
      icon: Settings,
      active: false,
    },
    {
      title: "关于",
      icon: Info,
      active: false,
    },
  ],
};

export default function Home() {
  return (
    <>
      <PaperO nav={<Navigation {...navigationHomeProps} />} content={<div />} />
      <PaperAuthentication />
    </>
  );
}

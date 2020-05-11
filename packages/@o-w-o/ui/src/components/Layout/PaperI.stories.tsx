import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import { PaperI } from "./PaperI";
import { Navigation, NavigationProps } from "../Navigation/Navigation";
import logo from "../../assets/logo.png";
import { Apps, BubbleChart, Info, Settings, Toc } from "@material-ui/icons";
import { Authentication } from "./Authentication";
import { Extra } from "./Extra";

import Bg1 from "../../assets/bg1.png";
import Bg2 from "../../assets/bg2.png";

export default {
  title: "PaperI",
  component: PaperI,
  decorators: [withKnobs],
};

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

const navigationExtraProps: NavigationProps = {
  enableAvatar: true,
  avatar: {
    src: logo,
    active: false,
  },
  enableController: true,
  controllerStatus: false,
  buttons: [],
  bottomButtons: [],
};

export const 主页 = () => {
  return <PaperI bg={Bg1} nav={<Navigation {...navigationHomeProps} />} content={<div></div>} />;
};

export const 展开 = () => {
  return (
    <PaperI
      nav={<Navigation {...navigationExtraProps} />}
      bg={Bg2}
      content={<Extra content={<div>"</div>} loading={true} loadingContent={<Authentication />} />}
    />
  );
};

import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import { Apps, BubbleChart, Info, Settings, Toc } from "@material-ui/icons";
import { Paper } from "./Paper";
import { PaperAuthentication } from "../PaperAuthentication/PaperAuthentication";
import { Exception } from "./Exception";
import { Extra } from "./Extra";
import { PaperNavigation, PaperNavigationProps } from "../../components";

import logo from "../../assets/images/logo.png";
import Bg from "../../assets/bg.png";
import Bg1 from "../../assets/bg1.png";
import Bg2 from "../../assets/bg2.png";
import Bg3 from "../../assets/bg3.png";

export default {
  title: "PaperI",
  component: Paper,
  decorators: [withKnobs],
};

const navigationHomeProps: PaperNavigationProps = {
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

const navigationExtraProps: PaperNavigationProps = {
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
  return (
    <Paper
      style={{ bg: Bg, cover: Bg1 }}
      nav={<PaperNavigation {...navigationHomeProps} />}
      content={<div />}
    />
  );
};

export const 授权页 = () => {
  return (
    <Paper
      nav={<PaperNavigation {...navigationExtraProps} />}
      style={{ bg: Bg, cover: Bg2 }}
      content={
        <Extra
          content={<div />}
          loading={true}
          loadingContent={<PaperAuthentication />}
        />
      }
    />
  );
};

export const 异常页 = () => {
  return (
    <Paper
      nav={<PaperNavigation {...navigationExtraProps} />}
      style={{ bg: Bg, cover: Bg3 }}
      content={
        <Extra
          content={<div />}
          loading={true}
          loadingContent={<Exception />}
        />
      }
    />
  );
};

export const 控制台页 = () => {
  return <div>-</div>;
};

import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import { PaperI } from "./PaperI";
import { Navigation, NavigationProps } from "../Navigation/Navigation";
import logo from "../../assets/logo.png";
import { Apps, BubbleChart, Info, Settings, Toc } from "@material-ui/icons";
import { Authentication } from "./Authentication";
import { Exception } from "./Exception";
import { Extra } from "./Extra";

import Bg from "../../assets/bg.png";
import Bg1 from "../../assets/bg1.png";
import Bg2 from "../../assets/bg2.png";
import Bg3 from "../../assets/bg3.png";

export default {
  title: "PaperI",
  component: PaperI,
  decorators: [withKnobs]
};

const navigationHomeProps: NavigationProps = {
  enableAvatar: true,
  avatar: {
    src: logo,
    active: false
  },
  enableController: true,
  controllerStatus: true,
  buttons: [
    {
      title: "目录",
      icon: Toc,
      active: false
    },
    {
      title: "联系",
      icon: BubbleChart,
      active: false
    }
  ],
  bottomButtons: [
    {
      title: "控制",
      icon: Apps,
      active: false
    },
    {
      title: "设置",
      icon: Settings,
      active: false
    },
    {
      title: "关于",
      icon: Info,
      active: false
    }
  ]
};

const navigationExtraProps: NavigationProps = {
  enableAvatar: true,
  avatar: {
    src: logo,
    active: false
  },
  enableController: true,
  controllerStatus: false,
  buttons: [],
  bottomButtons: []
};

export const 主页 = () => {
  return (
    <PaperI
      style={{ bg: Bg, cover: Bg1 }}
      nav={<Navigation {...navigationHomeProps} />}
      content={<div />}
    />
  );
};

export const 授权页 = () => {
  return (
    <PaperI
      nav={<Navigation {...navigationExtraProps} />}
      style={{ bg: Bg, cover: Bg2 }}
      content={
        <Extra
          content={<div />}
          loading={true}
          loadingContent={<Authentication />}
        />
      }
    />
  );
};

export const 异常页 = () => {
  return (
    <PaperI
      nav={<Navigation {...navigationExtraProps} />}
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

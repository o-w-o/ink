import React from "react";
import { boolean, withKnobs } from "@storybook/addon-knobs";

import logo from "../../assets/logo.png";
import {
  Apps,
  BubbleChart,
  Info,
  Settings,
  Toc,
  ViewCarousel
} from "@material-ui/icons";

import { Navigation, NavigationProps } from "./Navigation";

export default {
  title: "Navigation",
  component: Navigation,
  decorators: [withKnobs],
  includeStories: ["导航"]
};

export function navigationProps(): NavigationProps {
  return {
    enableAvatar: boolean("enableAvatar", true),
    avatar: {
      src: logo,
      active: false
    },
    enableController: boolean("enableController", true),
    controllerStatus: boolean("controllerStatus", true),
    buttons: [
      {
        title: "目录",
        icon: Toc,
        active: false
      },
      {
        title: "背景",
        icon: ViewCarousel,
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
}

export const 导航 = () => {
  const props: NavigationProps = navigationProps();
  return <Navigation {...props} />;
};

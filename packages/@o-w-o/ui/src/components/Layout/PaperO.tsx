import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PaperAvatarProps } from "../Avatar/PaperAvatar";

import Bg from "../../assets/bg.png";
import Bg1 from "../../assets/bg1.png";

export interface PaperStyleProps {
  bg?: string;
}

const useStyle = makeStyles<Theme, PaperStyleProps>((theme) =>
  createStyles({
    paperWrapper: {
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.palette.grey.A100,
      backgroundImage: `url(${Bg})`,
      backgroundSize: "cover",
      position: "absolute",
      top: 0,
      left: 0,
    },
    paperNav: {
      width: 300,
      paddingRight: 36,
    },
    paperContent: {
      height: "calc(95vh - 48px)",
      width: "calc(100vw - 396px)",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      margin: "0 48px",
      borderRadius: 3,
    },
    paperHelper: (props) => ({
      position: "absolute",
      top: 0,
      left: 128,
      height: "100vh",
      width: "28vw",
      content: "''",
      backgroundColor: theme.palette.grey["100"],
      backgroundImage: `url(${props.bg})`,
      backgroundSize: "cover",
      boxShadow: theme.shadows[1],
      zIndex: 8,
    }),
    paperSlide: {},
  })
);

export interface PaperProps {
  enableAvatar?: boolean;
  avatar?: PaperAvatarProps;
  enableController?: boolean;
  controllerStatus?: boolean;
  nav: JSX.Element;
  content: JSX.Element;
  extraContent?: JSX.Element;
  bg?: string;
}

const defaultPaperProps: PaperProps = {
  enableAvatar: false,
  nav: <div />,
  content: <div />,
  bg: Bg1,
};

export const PaperO = React.memo<PaperProps>((props: PaperProps = defaultPaperProps) => {
  const classes = useStyle({ bg: props.bg });

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.paperWrapper}>
      <Box className={classes.paperContent}>{props.content}</Box>
      <Box className={classes.paperNav}>{props.nav}</Box>
      <Box className={classes.paperHelper}></Box>
    </Box>
  );
});

import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PaperAvatarProps } from "../Avatar/PaperAvatar";

export interface PaperOStyleProps {
  bg?: string;
  cover?: string;
}

const useStyle = makeStyles<Theme, PaperOStyleProps>(theme =>
  createStyles({
    paperWrapper: props => ({
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.palette.grey.A100,
      backgroundImage: `url(${props.bg})`,
      backgroundSize: "cover",
      position: "absolute",
      top: 0,
      left: 0
    }),
    paperNav: {
      width: 300,
      paddingRight: 36
    },
    paperContent: {
      height: "calc(95vh - 48px)",
      width: "calc(100vw - 396px)",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      margin: "0 48px",
      borderRadius: 3
    },
    paperHelper: props => ({
      position: "absolute",
      top: 0,
      left: 128,
      height: "100vh",
      width: "28vw",
      content: "''",
      backgroundColor: theme.palette.grey["100"],
      backgroundImage: `url(${props.cover})`,
      backgroundSize: "cover",
      boxShadow: theme.shadows[1],
      zIndex: 8
    }),
    paperSlide: {}
  })
);

export interface PaperOProps {
  enableAvatar?: boolean;
  avatar?: PaperAvatarProps;
  enableController?: boolean;
  controllerStatus?: boolean;
  nav: JSX.Element;
  content: JSX.Element;
  extraContent?: JSX.Element;
  style?: PaperOStyleProps;
}

const defaultPaperProps: PaperOProps = {
  enableAvatar: false,
  nav: <div />,
  content: <div />
};

export const PaperO = React.memo<PaperOProps>(
  (props: PaperOProps = defaultPaperProps) => {
    const classes = useStyle(props.style);

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.paperWrapper}
      >
        <Box className={classes.paperContent}>{props.content}</Box>
        <Box className={classes.paperNav}>{props.nav}</Box>
        <Box className={classes.paperHelper}></Box>
      </Box>
    );
  }
);

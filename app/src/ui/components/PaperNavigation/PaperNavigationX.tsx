import React from "react";
import { Else, If } from "react-if";
import { Paper, Fab, Box, Divider } from "@material-ui/core";
import { MoreVert, Close } from "@material-ui/icons";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import { PaperButton, PaperButtonProps } from "../PaperButton/PaperButton";
import { PaperAvatar, PaperAvatarProps } from "../PaperAvatar/PaperAvatar";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    navigationWrapper: {
      position: "relative",
      height: "95vh",
      width: 186,
    },
    navigationPanel: {
      width: 96,
      height: "calc(95vh - 48px)",
      margin: "24px auto",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 9,

      "& > div": {
        margin: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    navigationController: {
      backgroundColor: theme.palette.common.white,
      marginTop: theme.spacing(1.5),
      boxShadow: "none",
      "&.--active, &:hover": {
        boxShadow: theme.shadows[2],
      },
      "&.--active": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.dark,
      },
    },
    navigationBg: {
      position: "relative",
      height: "95vh",
      width: 136,
      content: "''",
      backgroundColor: theme.palette.grey["100"],
      boxShadow: theme.shadows[1],
      zIndex: 8,
    },
    navigationSlide: {
      position: "absolute",
      top: 24,
      right: -4,
      height: "calc(95vh - 48px)",
      width: 108,
      content: "''",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      zIndex: 7,
    },
  })
);

export interface PaperNavigationXProps {
  enableAvatar?: boolean;
  avatar: PaperAvatarProps;
  enableController?: boolean;
  controllerStatus?: boolean;
  buttons: PaperButtonProps[];
  bottomButtons: PaperButtonProps[];
}

const defaultPaperNavigationProps: PaperNavigationXProps = {
  enableAvatar: false,
  avatar: {
    src: "",
    active: false,
  },
  buttons: [],
  bottomButtons: [],
};

export const PaperNavigationX = React.memo(
  (props: PaperNavigationXProps = defaultPaperNavigationProps) => {
    const classes = useStyle();

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={classes.navigationWrapper}
      >
        <Paper elevation={0} className={classes.navigationBg}>
          <Paper elevation={0} className={classes.navigationPanel}>
            <div>
              <If condition={props?.enableAvatar}>
                <PaperAvatar {...props.avatar} />
              </If>

              <Divider orientation="horizontal" />

              {props.buttons.map((value) => (
                <PaperButton {...value} key={value.title} />
              ))}

              <If condition={props?.enableController}>
                <If condition={props?.controllerStatus}>
                  <Fab size="small" className={classes.navigationController}>
                    <MoreVert fontSize="small" />
                  </Fab>
                  <Else>
                    <Fab
                      size="small"
                      className={`${classes.navigationController} --active`}
                    >
                      <Close fontSize="small" />
                    </Fab>
                  </Else>
                </If>
              </If>
            </div>
            <div>
              {props.bottomButtons.map((value) => (
                <PaperButton {...value} />
              ))}
            </div>
          </Paper>
        </Paper>
        <Paper elevation={0} className={classes.navigationSlide}></Paper>
      </Box>
    );
  }
);

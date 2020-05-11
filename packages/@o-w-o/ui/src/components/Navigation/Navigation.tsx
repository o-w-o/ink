import React from "react";
import {Else, If} from "react-if";
import {Paper, Fab, Box} from "@material-ui/core";
import {MoreVert, Close} from "@material-ui/icons";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";

import {PaperButton, PaperButtonProps} from "../Button/PaperButton";
import {PaperAvatar, PaperAvatarProps} from "../Avatar/PaperAvatar";

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
      navigationWrapper: {
        position: "relative",
        height: "95vh",
        width: 280,
      },
      navigationPanel: {
        width: 108,
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
          margin: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
      navigationController: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[2],
        marginTop: theme.spacing(1.5),
        "&.--active": {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.error.dark,
        },
      },
      navigationBg: {
        position: "absolute",
        top: 0,
        left: 54,
        height: "95vh",
        width: 160,
        content: "''",
        backgroundColor: theme.palette.grey["100"],
        boxShadow: theme.shadows[1],
        zIndex: 8,
      },
      navigationSlide: {
        position: "absolute",
        top: 24,
        right: 0,
        height: "calc(95vh - 48px)",
        width: 180,
        content: "''",
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        zIndex: 7,
      },
    })
);

export interface NavigationProps {
  enableAvatar?: boolean;
  avatar: PaperAvatarProps;
  enableController?: boolean;
  controllerStatus?: boolean;
  buttons: PaperButtonProps[];
  bottomButtons: PaperButtonProps[];
}

const defaultNavigationProps: NavigationProps = {
  enableAvatar: false,
  avatar: {
    src: "",
    active: false,
  },
  buttons: [],
  bottomButtons: [],
};

export const Navigation = React.memo((props: NavigationProps = defaultNavigationProps) => {
  const classes = useStyle();

  return (
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.navigationWrapper}>
        <Paper elevation={0} className={classes.navigationPanel}>
          <div>
            <If condition={props?.enableAvatar}>
              <PaperAvatar {...props.avatar} />
            </If>

            {props.buttons.map((value) => (
                <PaperButton {...value} />
            ))}

            <If condition={props?.enableController}>
              <If condition={props?.controllerStatus}>
                <Fab size="small" className={classes.navigationController}>
                  <MoreVert fontSize="small"/>
                </Fab>
                <Else>
                  <Fab size="small" className={`${classes.navigationController} --active`}>
                    <Close fontSize="small"/>
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
        <Paper elevation={0} className={classes.navigationBg}></Paper>
        <Paper elevation={0} className={classes.navigationSlide}></Paper>
      </Box>
  );
});

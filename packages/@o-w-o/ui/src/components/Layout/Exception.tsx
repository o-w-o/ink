import React from "react";
import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PaperAvatarProps } from "../Avatar/PaperAvatar";
import { NavigationProps } from "../Navigation/Navigation";
import logo from "../../assets/logo.png";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    exceptionWrapper: {
      position: "relative",
      height: "calc(100% - 128px)",
      padding: 64,
      "& .MuiTextField-root": {
        margin: `${theme.spacing(2)}px 0`
      },
      "& *": {
        fontFamily: "Source Han Serif CN"
      },
      "& h1": {
        color: theme.palette.error.dark
      }
    },
    exceptionPanel: {
      width: 188,
      height: "calc(95vh - 48px)",
      margin: "24px auto",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      position: "relative",
      zIndex: 9,

      "& > div": {
        margin: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    },
    exceptionAction: {
      position: "absolute",
      right: 64,
      bottom: 32,
      textDecoration: "underline",
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.error.dark,
      fontFamily: "Source Han Serif CN"
    },
    exceptionController: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      marginTop: theme.spacing(1.5),
      "&.--active": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.dark
      }
    }
  })
);

export interface ExceptionProps {
  email?: string;
  avatar?: PaperAvatarProps;
  enableController?: boolean;
  controllerStatus?: boolean;
}

const defaultExceptionProps: ExceptionProps = {
  email: ""
};

export const Exception = React.memo(
  (props: ExceptionProps = defaultExceptionProps) => {
    const classes = useStyle();

    return (
      <form className={classes.exceptionWrapper} noValidate autoComplete="off">
        <h1>异常</h1>
        <div>
          <TextField
            label="原因"
            fullWidth
            variant="outlined"
            defaultValue="IP 禁止登录！"
            onChange={console.log}
          />
        </div>

        <Button className={classes.exceptionAction}>
          <div>返回</div>
        </Button>
      </form>
    );
  }
);

export const generateExceptionPaperProps = () => {
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

  return navigationExtraProps;
};

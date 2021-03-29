import React from "react";
import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    authenticationWrapper: {
      position: "relative",
      height: "calc(100% - 128px)",
      padding: 64,
      "& .MuiTextField-root": {
        margin: `${theme.spacing(2)}px 0`,
      },
      "& *": {
        fontFamily: "Source Han Serif CN",
      },
      "& h1": {
        color: theme.palette.error.dark,
      },
    },
    authenticationPanel: {
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
        alignItems: "center",
      },
    },
    authenticationAction: {
      position: "absolute",
      right: 64,
      bottom: 32,
      textDecoration: "underline",
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.error.dark,
      fontFamily: "Source Han Serif CN",
    },
    authenticationController: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      marginTop: theme.spacing(1.5),
      "&.--active": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.dark,
      },
    },
  })
);

export interface AuthenticationProps {
  email?: string;
  enableController?: boolean;
  controllerStatus?: boolean;
}

const defaultAuthenticationProps: AuthenticationProps = {
  email: "",
};

export const PaperAuthentication = React.memo(
  (props: AuthenticationProps = defaultAuthenticationProps) => {
    const classes = useStyle();

    return (
      <form
        className={classes.authenticationWrapper}
        noValidate
        autoComplete="off"
      >
        <h1>授权</h1>
        <div>
          <TextField
            label="邮箱"
            fullWidth
            variant="outlined"
            onChange={console.log}
          />
          <TextField
            label="密码"
            fullWidth
            variant="outlined"
            onChange={console.log}
          />
        </div>

        <Button className={classes.authenticationAction}>
          <div>继续</div>
        </Button>
      </form>
    );
  }
);

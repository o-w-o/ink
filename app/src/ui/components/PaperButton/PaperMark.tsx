import React from "react";
import { Case, Switch } from "react-if";
import { Gamepad, SvgIconComponent } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface PaperMarkStyleProps {
  active?: boolean;
  color?: string;
  direction?: "left" | "right";
}

const useStyles = makeStyles<Theme, PaperMarkStyleProps>((theme) =>
  createStyles({
    btnWrapper: () => ({
      display: "inline-block",
      margin: 4,
    }),
    btn: (props) => ({
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      position: "relative",
      height: 120,
      width: 60,
      backgroundColor: props.active
        ? theme.palette.common.white
        : theme.palette.grey.A100,
      boxShadow: theme.shadows[2],
      borderRadius: 3,
      [theme.breakpoints.down("xs")]: {
        height: 48,
        width: 48,
      },
      "&:hover, &$btnFocusVisible": {
        zIndex: 1,
        backgroundColor: theme.palette.grey.A100,
        "& $btnTitle": {
          color: theme.palette.common.black,
        },
        "& $btnIcon": {
          color: theme.palette.grey.A700,
        },
        "& $btnBackdrop": {
          opacity: 1,
        },
        "& $btnMarked": {
          opacity: 0,
        },
      },
    }),
    btnTitle: {
      width: theme.typography.pxToRem(12),
      color: theme.palette.common.black,
      fontFamily: "Source Han Serif CN",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(12),
      marginTop: theme.spacing(0.5),
    },
    btnIcon: {
      color: theme.palette.grey.A700,
      height: 24,
      width: 24,
    },
    btnFocusVisible: {},
    btnActiveBarWrapper: {
      position: "absolute",
      height: "100%",
      width: "100%",
    },
    btnBar: (props) => ({
      position: "absolute",
      top: 0,
      width: 6,
      height: "100%",
      backgroundColor: props.color,
      /* L1 */
      boxShadow: theme.shadows[1],
      borderRadius: 3,
      "&:after": {
        content: "",
      },
      "&.--left": {
        left: 0,
      },
      "&.--right": {
        right: 0,
      },
    }),
    btnBackdrop: (props) => ({
      position: "absolute",
      left: props.direction === "left" ? "unset" : -3,
      right: props.direction === "right" ? "unset" : -3,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: theme.palette.common.white,
    }),
  })
);

export interface PaperMarkProps {
  title: string;
  icon: SvgIconComponent;
  color?: string;
  active?: boolean;
  direction?: "left" | "right";
}

const defaultPaperMarkProps: PaperMarkProps = {
  title: "按钮",
  icon: Gamepad,
  color: "#000",
  active: false,
  direction: "right",
};

export const PaperMark = React.memo(
  (props: PaperMarkProps = defaultPaperMarkProps) => {
    const _props = Object.assign({}, defaultPaperMarkProps, props);

    const classes = useStyles({
      active: _props.active,
      direction: _props.direction,
      color: _props.color,
    });

    const Icon = _props.icon;

    return (
      <div className={classes.btnWrapper}>
        <ButtonBase
          focusRipple
          className={classes.btn}
          focusVisibleClassName={classes.btnFocusVisible}
        >
          <Icon className={classes.btnIcon} />
          <div className={classes.btnTitle}>{_props.title}</div>
          <div className={classes.btnBackdrop} />
          <Switch>
            <Case condition={_props.direction === "right"}>
              <Box className={`${classes.btnBar} --right`} />
            </Case>
            <Case condition={_props.direction === "left"}>
              <Box className={`${classes.btnBar} --left`} />
            </Case>
          </Switch>
        </ButtonBase>
      </div>
    );
  }
);

import React from "react";
import { If } from "react-if";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Gamepad, SvgIconComponent } from "@material-ui/icons";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper: {
      display: "inline-block",
      margin: 4
    },
    btn: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      position: "relative",
      height: 84,
      width: 84,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      borderRadius: 3,
      [theme.breakpoints.down("xs")]: {
        height: 48,
        width: 48
      },
      "&:hover, &$btnFocusVisible": {
        zIndex: 1,
        backgroundColor: theme.palette.grey.A100,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        "& $btnTitle": {
          color: theme.palette.common.black
        },
        "& $btnIcon": {
          color: theme.palette.grey.A700
        },
        "& $btnBackdrop": {
          opacity: 0.15
        },
        "& $btnMarked": {
          opacity: 0
        }
      }
    },
    btnTitle: {
      color: theme.palette.common.black,
      fontFamily: "Source Han Serif CN",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(16)
    },
    btnIcon: {
      color: theme.palette.grey.A700,
      marginTop: theme.spacing(0.5),
      height: 24,
      width: 24
    },
    btnFocusVisible: {},
    btnActiveBarWrapper: {
      position: "absolute",
      height: "100%",
      width: "100%"
    },
    btnBar: {
      position: "absolute",
      width: 6,
      height: 6,
      background: theme.palette.success.main,
      /* L1 */
      boxShadow: theme.shadows[1],
      borderRadius: 3,
      "&:after": {
        content: ""
      },
      "&.--left": {
        left: 3,
        top: 3
      },
      "&.--right": {
        right: 3,
        bottom: 3
      }
    },
    btnBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity")
    },
    btnMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity")
    }
  })
);

export interface PaperButtonProps {
  title: string;
  icon: SvgIconComponent;
  active: boolean;
  space?: number;
}

const defaultPaperButtonProps: PaperButtonProps = {
  title: "按钮",
  icon: Gamepad,
  active: false,
  space: 8
};

export const PaperButton = React.memo(
  (props: PaperButtonProps = defaultPaperButtonProps) => {
    const classes = useStyles();
    const Icon = props.icon;

    return (
      <div className={classes.btnWrapper}>
        <ButtonBase
          focusRipple
          className={classes.btn}
          focusVisibleClassName={classes.btnFocusVisible}
        >
          <div className={classes.btnTitle}>{props.title}</div>
          <Icon className={classes.btnIcon} />

          <If condition={props.active}>
            <div className={classes.btnActiveBarWrapper}>
              <div className={`${classes.btnBar} --left`} />
              <div className={`${classes.btnBar} --right`} />
            </div>
          </If>
        </ButtonBase>
      </div>
    );
  }
);

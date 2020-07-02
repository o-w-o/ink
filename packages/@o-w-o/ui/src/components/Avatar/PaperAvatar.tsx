import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
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
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        height: 48,
        width: 48
      },
      "&:hover, &$btnFocusVisible": {
        zIndex: 1,
        backgroundColor: theme.palette.grey.A100,
        "& $btnBackdrop": {
          opacity: 0.15
        },
        "& $btnMarked": {
          opacity: 0
        }
      }
    },
    avatar: {
      height: "100%",
      width: "100%"
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

export interface PaperAvatarProps {
  src: string;
  alt?: string;
  active: boolean;
}

export const PaperAvatar = React.memo((props: PaperAvatarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.btnWrapper}>
      <ButtonBase
        focusRipple
        className={classes.btn}
        focusVisibleClassName={classes.btnFocusVisible}
      >
        <img src={props.src} alt={props.alt || ""} className={classes.avatar} />
      </ButtonBase>
    </div>
  );
});

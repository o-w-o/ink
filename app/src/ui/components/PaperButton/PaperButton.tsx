import React from "react";
import { If } from "react-if";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SvgIconComponent } from "@material-ui/icons";
import ButtonBase from "@material-ui/core/ButtonBase";

import { PaperSize } from "../../assets/styles/theme";

const useStyles = makeStyles<Theme, PaperButtonProps>((theme: Theme) =>
  createStyles({
    btnWrapper: {
      display: "inline-block",
      margin: 4,
    },
    btn: (props) => ({
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      position: "relative",

      height: 9 * props.size,
      width: 9 * props.size,

      overflow: "hidden",
      transition: "all .3s",

      borderRadius: 3,
      boxShadow: props.active ? theme.shadows[2] : "none",
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("xs")]: {
        height: 6 * props.size,
        width: 6 * props.size,
      },
      [theme.breakpoints.between("xs", "xl")]: {
        height: 7 * props.size,
        width: 7 * props.size,
      },
      [theme.breakpoints.between("xl", "md")]: {
        height: 8 * props.size,
        width: 8 * props.size,
      },
      "&:hover, &$btnFocused": {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[2],
      },
      "&:hover, &$btnFocusVisible": {
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.grey["100"],
        "& $btnTitle": {
          color: theme.palette.common.black,
        },
        "& $btnIcon": {
          color: theme.palette.grey.A700,
        },
        "& $btnBackdrop": {
          opacity: 0.15,
        },
        "& $btnMarked": {
          opacity: 0,
        },
      },
    }),
    btnTitle: {
      color: theme.palette.common.black,
      fontFamily: "Source Han Serif CN",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(14),

      [theme.breakpoints.down("xs")]: {
        fontSize: theme.typography.pxToRem(8),
      },
      [theme.breakpoints.between("xs", "xl")]: {
        fontSize: theme.typography.pxToRem(10),
      },
      [theme.breakpoints.between("xl", "md")]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    btnIcon: {
      color: theme.palette.grey.A700,
      marginTop: theme.spacing(0.5),
      height: 18,
      width: 18,

      [theme.breakpoints.down("xs")]: {
        height: 12,
        width: 12,
      },
      [theme.breakpoints.between("xs", "xl")]: {
        height: 14,
        width: 14,
      },
      [theme.breakpoints.between("xl", "md")]: {
        height: 16,
        width: 16,
      },
    },
    btnFocusVisible: {},
    btnActiveBarWrapper: {
      position: "absolute",
      height: "100%",
      width: "100%",
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
        content: "",
      },
      "&.--left": {
        left: 3,
        top: 3,
      },
      "&.--right": {
        right: 3,
        bottom: 3,
      },
    },
    btnBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
    },
    btnMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
    },
  })
);

export interface PaperButtonProps {
  className?: string;
  title?: string;
  icon?: SvgIconComponent;
  active?: boolean;
  space?: number;
  size?: PaperSize;
}

const defaultPaperButtonProps: PaperButtonProps = {
  className: "",
  title: "",
  active: false,
  space: 8,
  size: 8,
};

export const PaperButton = React.memo(
  (_props: PaperButtonProps = defaultPaperButtonProps) => {
    const props = Object.assign({}, defaultPaperButtonProps, _props);
    const classes = useStyles(props);
    const Icon = props.icon;

    return (
      <div className={`${classes.btnWrapper} ${props.className}`}>
        <ButtonBase
          focusRipple
          className={classes.btn}
          focusVisibleClassName={classes.btnFocusVisible}
        >
          <div className={classes.btnTitle}>{props.title}</div>

          <If condition={props.icon !== null}>
            <Icon className={classes.btnIcon} />
          </If>

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

import React from "react";
import { Gamepad, SvgIconComponent } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface PaperActionStyleProps {
  active?: boolean;
  color?: string;
}

const useStyles = makeStyles<Theme, PaperActionProps>((theme: Theme) =>
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

      height: 6 * props.size,
      width: 6 * props.size,

      overflow: "hidden",
      transition: "all .3s",

      borderRadius: "50%",
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("xs")]: {
        height: 3 * props.size,
        width: 3 * props.size,
      },
      [theme.breakpoints.between("xs", "xl")]: {
        height: 4 * props.size,
        width: 4 * props.size,
      },
      [theme.breakpoints.between("xl", "md")]: {
        height: 5 * props.size,
        width: 5 * props.size,
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
    btnIcon: (props) => ({
      color: theme.palette.grey.A700,
      height: `${props.iconSize}%`,
      width: `${props.iconSize}%`,
    }),
    btnFocusVisible: {},
  })
);

export interface PaperActionProps {
  icon: SvgIconComponent;
  iconSize?: number;
  size?: number;
  color?: string;
  active?: boolean;
  className?: string;
}

const defaultPaperActionProps: PaperActionProps = {
  icon: Gamepad,
  iconSize: 60,
  size: 8,
  color: "#000",
  active: false,
};

export const PaperAction = React.memo(
  (props: PaperActionProps = defaultPaperActionProps) => {
    const _props = Object.assign({}, defaultPaperActionProps, props);

    const classes = useStyles(_props);

    const Icon = _props.icon;

    return (
      <div className={`${classes.btnWrapper} ${_props.className ?? ""}`}>
        <ButtonBase
          focusRipple
          className={classes.btn}
          focusVisibleClassName={classes.btnFocusVisible}
        >
          <Icon className={classes.btnIcon} />
        </ButtonBase>
      </div>
    );
  }
);

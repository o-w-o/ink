import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import { PaperSize } from "../../assets/styles/theme";

const useStyles = makeStyles<Theme, PaperAvatarProps>((theme: Theme) =>
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
      borderRadius: 3,
      backgroundColor: props.backgroundColor,
      overflow: "hidden",
      boxShadow: props.active ? theme.shadows[2] : "none",
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
    }),
    avatar: {
      height: "100%",
      width: "100%",
    },
  })
);

export interface PaperAvatarProps {
  src: string;
  alt?: string;
  active?: boolean;
  size?: PaperSize;
  backgroundColor?: string;
  className?: string;
}

const defaultPaperAvatarPropsProps: Partial<PaperAvatarProps> = {
  active: false,
  size: 8,
  backgroundColor: "white",
};

export const PaperAvatar = React.memo((_props: PaperAvatarProps) => {
  const props = Object.assign({}, defaultPaperAvatarPropsProps, _props);
  const classes = useStyles(props);

  return (
    <Box className={`${classes.btnWrapper} ${props.className}`}>
      <ButtonBase
        focusRipple
        className={classes.btn}
        focusVisibleClassName={classes.btnFocused}
      >
        <img src={props.src} alt={props.alt || ""} className={classes.avatar} />
      </ButtonBase>
    </Box>
  );
});

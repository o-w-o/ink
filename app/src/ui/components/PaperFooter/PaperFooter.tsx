import React from "react";
import { Else, If, Then } from "react-if";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import badge from "./badge.png";

export interface PaperFooterProps {
  mini?: boolean;
  alignment?: "left" | "center";
  transparent?: boolean;
}

const useStyles = makeStyles<Theme, PaperFooterProps>((theme) =>
  createStyles({
    wrapper: (props) => ({
      margin: 0,
      padding: "9px 0",
      width: "100%",
      backgroundColor: props.transparent
        ? "transparent"
        : theme.palette.background.paper,
      boxShadow: props.transparent ? "none" : theme.shadows["1"],
    }),
    websiteName: (props) => ({
      margin: props.alignment === "left" ? "18px 9px" : "18px auto",
      fontWeight: "bold",
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
      color: theme.palette.primary.main,
      textAlign: props.alignment,

      "& > small": {
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.common.black,
      },
    }),
    copyright: (props) => ({
      fontSize: theme.typography.pxToRem(12),
      textAlign: props.alignment,
      margin: props.alignment === "left" ? "9px" : "9px auto",
    }),
    badge: (props) => ({
      fontSize: theme.typography.pxToRem(12),
      textAlign: props.alignment,
      margin: props.alignment === "left" ? "9px" : "9px auto",
      "& > img": {
        display: "inline-block",
        position: "relative",
        bottom: -2,
        height: theme.typography.pxToRem(16),
      },
    }),
    mini: {
      margin: 4,
      fontSize: theme.typography.pxToRem(12),
      textAlign: "left",
      "& > img": {
        display: "inline-block",
        position: "relative",
        bottom: -2,
        height: theme.typography.pxToRem(16),
      },
    },
  })
);

export const defaultPaperFooterProps: Partial<PaperFooterProps> = {
  mini: false,
  alignment: "center",
  transparent: false,
};

export const PaperFooter = React.memo((props: PaperFooterProps) => {
  const _props = Object.assign({}, defaultPaperFooterProps, props);

  const classes = useStyles(_props);

  return (
    <Paper className={classes.wrapper}>
      <If condition={_props.mini}>
        <Then>
          <Typography className={classes.mini}>
            Copyright &copy; 2020 烛火录 豫 ICP 备 15034530 号&nbsp;
            <img src={badge} alt="备案图标" />
          </Typography>
        </Then>
        <Else>
          <div>
            <Typography className={classes.websiteName}>
              迷失的核桃
              <small>&nbsp;的小站</small>
            </Typography>
          </div>
          <div>
            <Typography className={classes.copyright}>
              Copyright &copy; 2020 烛火录 o-w-o.ink{" "}
            </Typography>
          </div>
          <div>
            <Typography className={classes.badge}>
              豫 ICP 备 15034530 号 <img src={badge} alt="备案图标" />
            </Typography>
          </div>
        </Else>
      </If>
    </Paper>
  );
});

export default PaperFooter;

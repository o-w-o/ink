import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import backgroundLt from "./evie-s-kqJfP-lrl-8-unsplash.x.jpeg";
import backgroundRb from "./evie-s-MicqqGyDQ6w-unsplash.x.jpeg";
import {
  PaperBackgroundMxProps,
  paperBackgroundStyles,
} from "./PaperBackgroundMx";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    bgWrapper: Object.assign({}, paperBackgroundStyles.bgWrapper, {
      background: "linear-gradient(81deg, #FFFFFF 36%, #EBF0F4 64%)",
    }),
    bgLb: Object.assign({}, paperBackgroundStyles.bg, {
      left: 0,
      bottom: 0,
      transform: "matrix(-1, 0, 0, 1, 0, 0)",
      height: "49vh",
      ["@media screen and (max-device-aspect-ratio:16/10)"]: {
        height: "42vh",
      },
    }),
    bgRt: Object.assign({}, paperBackgroundStyles.bg, {
      right: 0,
      top: 0,
      height: "49vh",
      ["@media screen and (max-device-aspect-ratio:16/10)"]: {
        height: "42vh",
      },
      ["@media screen and (max-device-aspect-ratio:1/1)"]: {
        display: "none",
      },
    }),
  })
);

export const PaperBackgroundM2 = React.memo((props: PaperBackgroundMxProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.bgWrapper}>
      <img
        className={classes.bgRt}
        src={props.url && props.url.trim() !== "" ? props.url : backgroundLt}
        alt="M3-Lt"
      />
      <img
        className={classes.bgLb}
        src={
          props.urlPaired && props.urlPaired.trim() !== ""
            ? props.urlPaired
            : backgroundRb
        }
        alt="M3-Rb"
      />
    </Paper>
  );
});

export default PaperBackgroundM2;

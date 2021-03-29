import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import background from "./evie-s-kqJfP-lrl-8-unsplash.x.jpeg";
import {
  PaperBackgroundMxProps,
  paperBackgroundStyles,
} from "./PaperBackgroundMx";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    bgWrapper: Object.assign({}, paperBackgroundStyles.bgWrapper, {
      backgroundColor: "#EDF1F5",
    }),
    bgM2: Object.assign(
      {},
      paperBackgroundStyles.bg,
      paperBackgroundStyles.bgStandalone
    ),
  })
);

export const PaperBackgroundM2 = React.memo((props: PaperBackgroundMxProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.bgWrapper}>
      <img
        className={classes.bgM2}
        src={props.url && props.url.trim() !== "" ? props.url : background}
        alt="M2"
      />
    </Paper>
  );
});

export default PaperBackgroundM2;

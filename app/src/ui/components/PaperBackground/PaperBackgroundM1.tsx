import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import background from "./evie-s-MicqqGyDQ6w-unsplash.x.jpeg";
import {
  PaperBackgroundMxProps,
  paperBackgroundStyles,
} from "./PaperBackgroundMx";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    bgWrapper: paperBackgroundStyles.bgWrapper,
    bgM1: Object.assign(
      {},
      paperBackgroundStyles.bg,
      paperBackgroundStyles.bgStandalone
    ),
  })
);

export const PaperBackgroundM1 = React.memo((props: PaperBackgroundMxProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.bgWrapper}>
      <img
        className={classes.bgM1}
        src={props.url && props.url.trim() !== "" ? props.url : background}
        alt="M1"
      />
    </Paper>
  );
});

export default PaperBackgroundM1;

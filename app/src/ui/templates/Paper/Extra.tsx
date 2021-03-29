import React from "react";
import { Else, If } from "react-if";
import { Box, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    extraWrapper: {
      position: "relative",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    skeletonWrapper: {
      padding: 48,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: "auto",
      display: "block",
    },
    loadingContentWrapper: {
      position: "relative",
      height: "calc(100% - 200px)",
      width: "calc(100% - 420px)",
      minWidth: 400,
    },
  })
);

export interface ExtraProps {
  loading?: boolean;
  loadingContent: JSX.Element;
  content: JSX.Element;
}

const defaultExtraProps: ExtraProps = {
  loading: true,
  loadingContent: <div />,
  content: <div />,
};

export const Extra = React.memo((props: ExtraProps = defaultExtraProps) => {
  const classes = useStyle();
  return (
    <If condition={!!props.loading}>
      <div className={classes.extraWrapper}>
        <Box className={classes.skeletonWrapper}>
          <Skeleton height={220} />
          <Box margin="24px auto" />
          <Skeleton variant="text" height={36} />
          <Skeleton variant="text" height={36} />
          <Skeleton variant="text" height={36} />
          <Box margin="24px auto" />
          <Box>
            <Skeleton height={36} />
            <Box margin="24px auto" />
            <Skeleton variant="text" height={36} />
          </Box>
          <Box margin="24px auto" />
          <Box display="flex">
            <Skeleton height={36} />
            <Skeleton variant="text" height={36} />
          </Box>
        </Box>
        <Paper elevation={2} className={classes.loadingContentWrapper}>
          {props.loadingContent}
        </Paper>
      </div>
      <Else>{props.content}</Else>
    </If>
  );
});

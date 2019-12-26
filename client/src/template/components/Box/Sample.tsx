/** @jsx jsx */
import * as React from "react";
import { jsx, CSSObject } from "@emotion/core";
import { Box, Grid, Paper } from "@material-ui/core";

const sampleStyle: CSSObject = {
  margin: 24,
  padding: 24,
  textAlign: "center",
};

export const Sample1: React.SFC = ({ children }) => (
  <Box style={{ width: "81%", margin: "64px auto", padding: "24px" }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper css={sampleStyle}>{children}</Paper>
      </Grid>
    </Grid>
  </Box>
);

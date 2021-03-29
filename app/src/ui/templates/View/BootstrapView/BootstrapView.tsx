import React from "react";
import { Box, Paper } from "@material-ui/core";
import { PaperBackground } from "../../../components/PaperBackground/PaperBackground";
import { PaperLandmark } from "../../../components/PaperLandmark/PaperLandmark";
import { theme, ThemeProvider } from "../../../assets/styles/theme";
import "./BootstrapView.css";

export const BootstrapView = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="paperEntryWrapper">
        <Box className="paperEntry">
          <Paper className="paper">-</Paper>
          <PaperLandmark />
        </Box>
        <PaperBackground backgroundMode="M1" />
      </Box>
    </ThemeProvider>
  );
};

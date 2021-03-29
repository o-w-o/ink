import { createMuiTheme } from "@material-ui/core";

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#d32f2f"
    }
  },
  typography: {
    fontFamily: "Roboto Mono, Source Han Serif CN, sans-serif",
    button: {
      textTransform: "none"
    }
  },
  shape: {
    borderRadius: 4
  }
});

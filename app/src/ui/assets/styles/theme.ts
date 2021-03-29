import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: red[700],
      },
      secondary: {
        main: amber[400],
      },
    },
    typography: {
      fontFamily: [
        "Consolas",
        "Monaco",
        "monospace",
        "Times New Roman",
        "Source Han Serif CN",
        "仿宋",
        "宋体",
        "Microsoft YaHei Mono",
        "Microsoft YaHei",
      ]
        .map((v) => `'${v}'`)
        .join(","),
    },
  })
);

export type PaperSize = 2 | 4 | 8 | 16 | 24 | 32;

export { ThemeProvider } from "@material-ui/core/styles";

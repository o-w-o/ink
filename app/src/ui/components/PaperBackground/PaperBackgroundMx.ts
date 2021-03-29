import { StyleRules } from "@material-ui/styles/withStyles";

export const paperBackgroundStyles: StyleRules = {
  bgWrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "64vh",
    mixBlendMode: "darken",
  },
  bgStandalone: {
    height: "72vh",
  },
  bgPaired: {
    height: "49vh",
  },
};

export interface PaperBackgroundMxProps {
  mode: "M1" | "M2" | "M3";
  url?: string;
  urlPaired?: string;
}

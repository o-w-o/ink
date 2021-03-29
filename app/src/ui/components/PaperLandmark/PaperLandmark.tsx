import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box";
import Fingerprint from "@material-ui/icons/Fingerprint";

import "../../global.css";

import logo from "../../assets/images/logo.png";
import {
  PaperAction,
  PaperAvatar,
  PaperButton,
  PaperFooter,
} from "../../components";

export interface PaperLandmarkStyleProps {
  active?: boolean;
}

const useStyle = makeStyles<Theme, PaperLandmarkStyleProps>((theme) =>
  createStyles({
    landmarkWrapper: {
      width: 512,
      marginLeft: -25,
      position: "relative",

      "& .MuiFab-root": {
        backgroundColor: theme.palette.common.white,
      },
    },
    landmarkBrandWrapper: {
      position: "relative",
      height: 280,
      width: 280,
    },
    landmarkBrand: {
      position: "relative",
      left: -75,
      bottom: -12,
    },
    landmarkBrandSlider: {
      position: "relative",
      right: -75,
      bottom: 16,
      "& .MuiButtonBase-root": {
        background: `${grey["100"]}`,
      },
    },
    landmarkAction: {
      position: "absolute",
      right: -24,
      bottom: -18,
      "& .MuiButtonBase-root": {
        background: `${grey["50"]}`,
      },
    },
    landmarkFooterWrapper: {
      marginLeft: 100 - 25,
    },
  })
);

export interface PaperLandmarkProps {
  style?: PaperLandmarkStyleProps;
}

const defaultCoverProps: PaperLandmarkProps = {};

export const PaperLandmark = React.memo<PaperLandmarkProps>(
  (props: PaperLandmarkProps = defaultCoverProps) => {
    const classes = useStyle(props.style);

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.landmarkWrapper}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          className={classes.landmarkBrandWrapper}
        >
          <PaperButton
            icon={Fingerprint}
            size={24}
            className={classes.landmarkBrandSlider}
            active
          />
          <PaperAvatar
            src={logo}
            size={24}
            active
            className={classes.landmarkBrand}
          />
          <PaperAction
            className={classes.landmarkAction}
            icon={Fingerprint}
            size={10}
          />
        </Box>
        <Box className={classes.landmarkFooterWrapper}>
          <PaperFooter transparent alignment="left" />
        </Box>
      </Box>
    );
  }
);

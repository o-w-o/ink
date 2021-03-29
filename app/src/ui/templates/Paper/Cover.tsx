import React from "react";
import { Box, Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AllInclusive } from "@material-ui/icons";

import logo from "../../assets/images/logo.png";
import { PaperButton, PaperAvatar } from "../../components";

import "../../global.css";
import * as cssModule from "./Cover.module.css";

export interface CoverStyleProps {
  cover?: string;
}

const useStyle = makeStyles<Theme, CoverStyleProps>((theme) =>
  createStyles({
    paperWrapper: (props) => ({
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.palette.common.white,
      backgroundImage: `url(${props.cover})`,
      backgroundSize: "cover",
      backgroundPosition: "-108px center",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      top: 0,
      left: 0,
      overflow: "hidden",
    }),
    paperHeader: {
      height: "calc(95vh - 72px)",
      width: "calc((100vw - 36vw)/2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    paperSiteBanner: {
      marginTop: "calc(((100vw - 36vw)/2 - 160px)/2)",
      position: "relative",

      "& .MuiFab-root": {
        backgroundColor: theme.palette.common.white,
      },
    },
    paperSiteBannerBg: {
      position: "absolute",
      right: 24,
      bottom: 24,
      "& .MuiButtonBase-root": {
        background: `${theme.palette.grey[100]}`,
      },
    },
    paperSiteBannerAuth: {
      position: "absolute",
      boxShadow: theme.shadows[2],
      right: -49,
      bottom: -49,
    },
    paperFooter: {
      height: "calc(95vh - 72px)",
      width: "calc((100vw - 36vw)/2)",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    paperSiteWrapper: {
      margin: "48px 0",
      marginLeft: "calc(16vw - 128px)",
    },
    paperSite: {
      fontFamily: theme.typography.fontFamily,
      marginBottom: 24,
      marginLeft: -2,
    },
    paperSiteOwner: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      fontSize: 24,
      "& > small": {
        color: theme.palette.common.black,
        fontWeight: "bolder",
        fontSize: 16,
        marginLeft: 8,
      },
    },
    paperSiteGsh: {
      display: "inline-block",
      marginLeft: ".5rem",
      position: "relative",
      top: 4,
    },
    paperSiteExtra: {
      fontSize: 9,
      fontFamily: theme.typography.fontFamily,
      color: "#4f4f4f",
      margin: "0.1rem 0",
    },
    paperContentWrapper: {
      height: "calc(95vh - 72px)",
      width: "36vw",
      padding: "0 48px",
    },
    paperContent: {
      height: "inherit",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
      borderRadius: 3,
      overflowY: "auto",
    },
  })
);

export interface CoverProps {
  content: JSX.Element;
  extraContent?: JSX.Element;
  coverImageUrl?: string;
  style?: CoverStyleProps;
}

const defaultCoverProps: CoverProps = {
  content: <div />,
};

export const Cover = React.memo<CoverProps>(
  (props: CoverProps = defaultCoverProps) => {
    const classes = useStyle(props.style);

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.paperWrapper}
      >
        <Box className={classes.paperHeader}>
          <div className={classes.paperSiteBanner}>
            <PaperButton
              icon={AllInclusive}
              size={16}
              className={classes.paperSiteBannerBg}
            />
            <PaperAvatar src={logo} size={16} />
            <Fab
              size="small"
              color="default"
              className={classes.paperSiteBannerAuth}
            >
              <AllInclusive fontSize={"small"} />
            </Fab>
          </div>
        </Box>
        <Box className={classes.paperContentWrapper}>
          <Box className={classes.paperContent}>
            <Box className={cssModule.quote}>{props.content}</Box>
          </Box>
        </Box>
        <Box className={classes.paperFooter}>
          <div className={classes.paperSiteWrapper}>
            <p className={classes.paperSite}>
              <strong className={classes.paperSiteOwner}>
                迷失的核桃<small>的小站</small>
              </strong>
            </p>
            <p className={classes.paperSiteExtra}>版权 &copy; 2020 烛火录</p>
            <p className={classes.paperSiteExtra}>
              豫 ICP 备 15034530 号
              <img
                src="https://o-w-o.store/public/images/beian.png"
                alt="备案图标"
                className={classes.paperSiteGsh}
              />
            </p>
          </div>
        </Box>
      </Box>
    );
  }
);

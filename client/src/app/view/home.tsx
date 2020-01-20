import React from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-spring/renderprops-addons.cjs";

import "./home.css";
import styles from "./home.module.css";

import { Button } from "@material-ui/core";
import { Box1 } from "@o-w-o/uis/Layout/boxes/Box1";
import { Box4 } from "@o-w-o/uis/Layout/boxes/Box4";
import { Sample1 } from "@o-w-o/uis/Box/Sample";
import { SEO } from "@o-w-o/uis/SEO";

export default function Home() {
  return (
    <Parallax pages={2} className={styles.normal}>
      <SEO />

      <Box1 offset={0}>
        <Sample1>
          <Button component={Link} to="/demo">
            查看 DEMO
          </Button>
        </Sample1>
      </Box1>
      <Box4 offset={1} />
    </Parallax>
  );
}

import React from "react";
import { Parallax } from "react-spring/renderprops-addons.cjs";

import "./home.css";
import styles from "./home.module.css";

import { Box1 } from "../template/components/Layout/boxes/Box1";
import { Box4 } from "../template/components/Layout/boxes/Box4";
import { SEO } from "../template/components/SEO";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Sample1 } from "../template/components/Box/Sample";

export default function Home() {
  return (
    <Parallax pages={2} className={styles.normal}>
      <SEO />

      <Box1 offset={0}>
        <Sample1>
          <Link to="/demo">
            <Button>查看 DEMO</Button>
          </Link>
        </Sample1>
      </Box1>
      <Box4 offset={1}></Box4>
    </Parallax>
  );
}

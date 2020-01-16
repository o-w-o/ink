import React from "react";
import { Link } from "react-router-dom";

import { Box, Button } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

import { IUserRecord } from "../../../domain/modules/demo/Demo";

import { Parallax } from "react-spring/renderprops-addons.cjs";

import { Box1 } from "../../components/Layout/boxes/Box1";
import { Sample1 } from "../../components/Box/Sample";
import { UserProfileCard } from "./components/UserProfileCard";

export interface IDemoStateToProps {
  $user: IUserRecord;
  loading: boolean;
}

export interface IDemoDispatchToProps {
  fetchProfile: () => any;
}

export interface IDemoProps extends IDemoStateToProps, IDemoDispatchToProps {}

export class Demo extends React.Component<IDemoProps, never> {
  render() {
    const { $user, fetchProfile, loading } = this.props;
    return (
      <Parallax pages={1}>
        <Box1 offset={0}>
          <Sample1>
            <UserProfileCard
              user={$user}
              triggerSlot={
                <React.Fragment>
                  <br />
                  <Button aria-label="settings" onClick={fetchProfile}>
                    <Box mr={4}>FETCH</Box>
                    <ArrowForward />
                  </Button>
                </React.Fragment>
              }
              loading={loading}
            />
          </Sample1>
          <Sample1>
            <Link to="/">
              <Button>返回主页</Button>
            </Link>
          </Sample1>
        </Box1>
      </Parallax>
    );
  }
}

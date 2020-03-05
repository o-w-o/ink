import React from "react";
import { Else, If, Then } from "react-if";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./UserProfileCard.css";

import { User } from "@o-w-o/domains/demo/Demo";
import { ProxyTester } from "@o-w-o/uis/ProxyTester";

interface IProps {
  user: User;
  triggerSlot: any;
  loading: boolean;
}

export const UserProfileCard = React.memo<IProps>(
  ({ user, triggerSlot, loading }) => {
    const { id, quote, avatarUrl, username, projects } = user;

    const profile = (
      <List>
        {projects.map((item, idx) => (
          <ListItem key={idx}>
            <strong>{item[0]}</strong>
            :&nbsp;&nbsp;&nbsp;
            <code>{item[1]}</code>
          </ListItem>
        ))}
      </List>
    );

    return (
      <Box
        p={{ xs: 1, sm: 3, md: 5 }}
        textAlign="left"
        className="UserProfileCard">
        <If condition={!loading}>
          <Then>
            <Card>
              <CardHeader
                avatar={<Avatar src={avatarUrl} />}
                title={`Name：${username + "， ID：" + id}`}
                subheader={quote}
              />
              <CardContent>
                <ProxyTester />
              </CardContent>
            </Card>
          </Then>
          <Else>
            <Skeleton height="120px" style={{ margin: 0 }} />
            <Skeleton style={{ width: "120px" }} />
            <Skeleton style={{ width: "120px" }} />
            {triggerSlot}
          </Else>
        </If>
      </Box>
    );
  }
);

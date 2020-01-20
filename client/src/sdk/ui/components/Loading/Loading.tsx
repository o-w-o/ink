import * as React from "react";
import { Card } from "@material-ui/core";

export interface IDemoCardProps {}

export default React.memo(() => {
  return <Card>加载中</Card>;
});

import React from "react";
import { connect } from "@formily/react-schema-renderer";
import { omit } from "lodash";
import { Switch as Field, SwitchProps as FieldProps } from "@material-ui/core";

export const Switch = connect({})((props: FieldProps) => {
  const { value, ...rest } = omit<FieldProps>(props, ["dataSource"]);

  return <Field {...rest} value={value || props.defaultValue || false} />;
});

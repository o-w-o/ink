import React from "react";
import { connect } from "@formily/react-schema-renderer";
import {
  MenuItem,
  TextField as Field,
  TextFieldProps as FieldProps
} from "@material-ui/core";

export const TextField = connect({})(
  (props: FieldProps & { dataSource: any[] }) => {
    const { children, value, dataSource, ...rest } = props;

    console.log(dataSource);

    if (Array.isArray(dataSource) && dataSource.length !== 0) {
      return (
        <Field {...rest} value={value || props.defaultValue || ""} select>
          {dataSource.map(value => (
            <MenuItem key={value.label} value={value.value}>
              {value.label}
            </MenuItem>
          ))}
        </Field>
      );
    }

    return (
      <Field {...rest} value={value || props.defaultValue || ""}>
        {children}
      </Field>
    );
  }
);

import React from "react";
import { Box } from "@material-ui/core";
import {
  FormItemIOAdaptor,
  IFormItemIProps,
  IFormItemOProps
} from "../FormItem";

export const textHelperIOAdaptor = new FormItemIOAdaptor<
  IFormItemIProps<IFormItemOProps>,
  IFormItemOProps
>("text_helper", (input, api) => {
  const { state } = api;

  let hasError = false;
  let hasWarning = false;

  if (state.errors.length !== 0) {
    hasError = true;
  }
  if (state.warnings.length !== 0) {
    hasWarning = true;
  }

  return {
    helperText: hasError ? (
      <Box component="span" color="error.main">
        {state.errors[0]}
      </Box>
    ) : hasWarning ? (
      <Box component="span" color="warning.main">
        {state.warnings[0]}
      </Box>
    ) : (
      input.props.helperText || ""
    )
  };
});

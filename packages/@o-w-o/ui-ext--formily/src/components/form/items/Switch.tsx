import React from "react";
import {
  Switch as FormItemComponent,
  SwitchProps as FormItemComponentProps
} from "@material-ui/core";
import { FormItem, IFormItemIProps } from "../FormItem";
import {
  defaultIOAdaptor,
  textHelperIOAdaptor,
  generateControllerFormItemIOAdaptor
} from "../adaptors";
import { ControlledFormItem, ControlledFormItemProps } from "./index";

const adaptors = [
  defaultIOAdaptor,
  textHelperIOAdaptor,
  generateControllerFormItemIOAdaptor(FormItemComponent)
];

export type SwitchProps = IFormItemIProps<
  ControlledFormItemProps<FormItemComponentProps>
>;

export const Switch = React.memo<SwitchProps>(props => {
  return (
    <FormItem {...props} component={ControlledFormItem} adaptors={adaptors} />
  );
});

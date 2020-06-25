import {
  Slider as FormItemComponent,
  SliderProps as FormItemComponentProps
} from "@material-ui/core";
import React from "react";
import { FormItem, IFormItemIProps } from "../FormItem";
import {
  defaultIOAdaptor,
  checkedFormItemIOAdaptor,
  textHelperIOAdaptor,
  generateControllerFormItemIOAdaptor
} from "../adaptors";
import { ControlledFormItem, ControlledFormItemProps } from "./index";

export type SliderProps = IFormItemIProps<
  ControlledFormItemProps<FormItemComponentProps>
>;

const adaptors = [
  defaultIOAdaptor,
  textHelperIOAdaptor,
  generateControllerFormItemIOAdaptor(FormItemComponent),
  checkedFormItemIOAdaptor
];

export const Slider = React.memo<SliderProps>(props => {
  return (
    <FormItem {...props} component={ControlledFormItem} adaptors={adaptors} />
  );
});

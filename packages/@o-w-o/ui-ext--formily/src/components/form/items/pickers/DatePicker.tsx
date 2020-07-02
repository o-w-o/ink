import {
  DatePicker as FormItemComponent,
  DatePickerProps as FormItemComponentProps
} from "@material-ui/pickers";
import React from "react";
import { FormItem, IFormItemIProps, IFormItemOProps } from "../../FormItem";
import { defaultIOAdaptor, textHelperIOAdaptor } from "../../adaptors";

const adaptors = [defaultIOAdaptor, textHelperIOAdaptor];

export type DatePickerProps = IFormItemIProps<
  FormItemComponentProps & IFormItemOProps
>;

export const DatePicker = React.memo<DatePickerProps>(props => {
  return (
    // @ts-ignore
    <FormItem {...props} component={FormItemComponent} adaptors={adaptors} />
  );
});

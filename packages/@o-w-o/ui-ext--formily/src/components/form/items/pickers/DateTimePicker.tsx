import {
  DateTimePicker as FormItemComponent,
  DateTimePickerProps as FormItemComponentProps
} from "@material-ui/pickers";
import React from "react";
import { FormItem, IFormItemIProps, IFormItemOProps } from "../../FormItem";
import { defaultIOAdaptor, textHelperIOAdaptor } from "../../adaptors";

const adaptors = [defaultIOAdaptor, textHelperIOAdaptor];

export type DateTimePickerProps = IFormItemIProps<
  FormItemComponentProps & IFormItemOProps
>;

export const DateTimePicker = React.memo<DateTimePickerProps>(props => {
  return (
    // @ts-ignore
    <FormItem {...props} component={FormItemComponent} adaptors={adaptors} />
  );
});

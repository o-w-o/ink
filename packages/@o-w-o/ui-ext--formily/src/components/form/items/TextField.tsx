import React from "react";
import { Else, If } from "react-if";
import {
  makeStyles,
  MenuItem,
  TextField as FormItemComponent,
  TextFieldProps as FormItemComponentProps
} from "@material-ui/core";
import { FormItem, IFormItemIProps } from "../FormItem";
import { defaultIOAdaptor, textHelperIOAdaptor } from "../adaptors";
import { ControlledFormItemProps, IFormGroupPresetItems } from "./index";

const adaptors = [defaultIOAdaptor, textHelperIOAdaptor];

type ControlledFormItemComponentProps = ControlledFormItemProps<
  FormItemComponentProps
> &
  Partial<IFormGroupPresetItems>;

const useStyles = makeStyles(theme => ({
  root: {}
}));

function ControlledFormItemComponent(props: ControlledFormItemComponentProps) {
  const {
    itemProps,
    label,
    id,
    helperText,
    error,
    presetValues,
    onBlur,
    onChange,
    onFocus,
    name,
    value
  } = props;

  const formItemComponentProps: FormItemComponentProps = {
    ...itemProps,
    error,
    label,
    helperText,
    onChange,
    onFocus,
    onBlur,
    id: id + "",
    name,
    value
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <If condition={itemProps?.select}>
        <FormItemComponent {...formItemComponentProps}>
          {(presetValues || []).map(value => (
            <MenuItem key={value.label} value={value.value}>
              {value.label}
            </MenuItem>
          ))}
        </FormItemComponent>

        <Else>
          <FormItemComponent {...formItemComponentProps} />
        </Else>
      </If>
    </div>
  );
}

export type TextFieldProps = IFormItemIProps<ControlledFormItemComponentProps>;

export const TextField = React.memo<TextFieldProps>(props => {
  return (
    <FormItem
      {...props}
      component={ControlledFormItemComponent}
      adaptors={adaptors}
    />
  );
});

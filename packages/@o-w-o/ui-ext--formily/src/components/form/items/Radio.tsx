import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  RadioGroup,
  Radio as FormItemComponent,
  RadioProps as FormItemComponentProps
} from "@material-ui/core";
import React from "react";
import { FormItem, IFormItemIProps } from "../FormItem";
import { defaultIOAdaptor, textHelperIOAdaptor } from "../adaptors";
import {
  ControlledFormItemLayoutProps,
  ControlledFormItemProps,
  IFormGroupPresetItems
} from "./index";

const adaptors = [defaultIOAdaptor, textHelperIOAdaptor];

type ControlledFormItemComponentProps = ControlledFormItemProps<
  FormItemComponentProps
> &
  IFormGroupPresetItems &
  Partial<ControlledFormItemLayoutProps>;

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

function ControlledFormItemComponent(props: ControlledFormItemComponentProps) {
  const {
    formGroupProps,
    formLabelProps,
    girdContainerProps,
    girdItemProps,
    label,
    helperText,
    error,
    presetValues,
    onBlur,
    onChange,
    onFocus,
    value
  } = props;
  const classes = useStyles();

  const selectedValue = value || "";

  return (
    <div className={classes.root}>
      <FormControl
        component="fieldset"
        error={error}
        className={classes.formControl}
      >
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <RadioGroup
          {...formGroupProps}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={selectedValue}
        >
          <Grid {...girdContainerProps} container>
            {presetValues.map(value => (
              <Grid item {...girdItemProps}>
                <FormControlLabel
                  key={value.label}
                  value={value.value}
                  label={value.label}
                  control={<FormItemComponent />}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export type RadioProps = IFormItemIProps<ControlledFormItemComponentProps>;

export const Radio = React.memo<RadioProps>(props => {
  return (
    <FormItem
      {...props}
      component={ControlledFormItemComponent}
      adaptors={adaptors}
    />
  );
});

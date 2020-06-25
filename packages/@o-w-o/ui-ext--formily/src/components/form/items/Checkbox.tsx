import React, { useCallback } from "react";
import {
  Checkbox as FormItemComponent,
  CheckboxProps as FormItemComponentProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles
} from "@material-ui/core";
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
  Partial<IFormGroupPresetItems<boolean>> &
  Partial<ControlledFormItemLayoutProps>;

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: theme.spacing(2)
  }
}));

function ControlledFormItemComponent(props: ControlledFormItemComponentProps) {
  const {
    formLabelProps,
    formControlLabelProps,
    formControlProps,
    girdContainerProps,
    girdItemProps,
    label,
    helperText,
    error,
    presetValues,
    value,
    onChange
  } = props;

  const selectedItemNames = value || [];

  const onChangeFn = useCallback(
    (event: any) => {
      const val = { name: event?.target?.name, value: event.target.checked };
      const nextVal = [];

      if (val.value) {
        nextVal.push(val.name);
        nextVal.push(...selectedItemNames);
      } else {
        nextVal.push(...selectedItemNames.filter(v => v !== val.name));
      }

      onChange(nextVal);
    },
    [onChange, selectedItemNames]
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl
        {...formControlProps}
        error={error}
        className={classes.formControl}
      >
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <FormGroup>
          <Grid {...girdContainerProps} container>
            {presetValues.map(v => (
              <Grid item {...girdItemProps}>
                <FormControlLabel
                  {...formControlLabelProps}
                  key={v.label}
                  label={v.label}
                  control={
                    <FormItemComponent
                      checked={
                        selectedItemNames.filter(n_ => n_ === v.name).length !==
                        0
                      }
                      name={v.name}
                      onChange={onChangeFn}
                    />
                  }
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export type CheckboxProps = IFormItemIProps<ControlledFormItemComponentProps>;

export const Checkbox = React.memo<CheckboxProps>(props => {
  return (
    <FormItem
      {...props}
      component={ControlledFormItemComponent}
      adaptors={adaptors}
    />
  );
});

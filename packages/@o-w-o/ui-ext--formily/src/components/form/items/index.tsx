import React from "react";
import { If, Else } from "react-if";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  FormGroup,
  FormControlLabel,
  FormGroupProps,
  FormControlLabelProps,
  InputLabel,
  FormHelperText,
  makeStyles,
  createStyles,
  GridProps,
  Theme
} from "@material-ui/core";
import { IFormItemOProps } from "../FormItem";

export interface ControlledFormItemBaseProps<T, Payload, LabelType, GroupType>
  extends IFormItemOProps {
  item?: React.JSXElementConstructor<T>;
  itemProps?: T;

  payload?: Payload;

  formControlProps?: FormControlProps;
  formLabelProps?: LabelType;
  formGroupProps?: Omit<GroupType, "children">;
  formControlLabelProps?: Omit<FormControlLabelProps, "control" | "children">;
}

export interface IFormGroupPresetItem<T> {
  label: string;
  name?: string;
  value: T;
}

export interface IFormGroupPresetItems<T = string> {
  presetValues: IFormGroupPresetItem<T>[];
}

export interface ControlledFormItemProps<
  T,
  Payload = any,
  LabelType = FormLabelProps,
  GroupType = FormGroupProps
> extends ControlledFormItemBaseProps<T, Payload, LabelType, GroupType> {}

export interface ControlledFormItemLayoutProps {
  girdContainerProps: Omit<GridProps, "container">;
  girdItemProps: Omit<GridProps, "item">;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldset: {
      border: "1px solid",
      borderRadius: 6,
      borderColor: theme.palette.grey["400"],

      "&:hover": {
        borderColor: theme.palette.grey["700"]
      }
    },
    legend: {
      position: "absolute",
      top: -theme.spacing(1),
      left: theme.spacing(2),
      background: theme.palette.background.paper,
      borderStyle: "solid",
      borderColor: theme.palette.background.paper,
      borderWidth: 2,
      fontSize: "small"
    },
    group: {
      padding: `${theme.spacing(2)}px 0`,
      paddingLeft: theme.spacing(4)
    }
  })
);

export function ControlledFormItem<T>(props) {
  const classes = useStyles();

  const {
    item,
    itemProps,
    formGroupProps,
    formControlLabelProps,
    formControlProps,
    helperText,
    error,
    label,
    formLabelProps,
    inputLabelProps,
    ...rest
  } = props;
  const reactElement = React.createElement(item, { ...itemProps, ...rest });
  return (
    <FormControl
      {...formControlProps}
      error={error}
      className={classes.fieldset}
    >
      <If condition={!!formLabelProps}>
        <InputLabel {...formLabelProps}>{label}</InputLabel>
        <Else>
          <FormLabel {...formLabelProps} className={classes.legend}>
            {label}
          </FormLabel>
        </Else>
      </If>
      <FormGroup {...formGroupProps} className={classes.group}>
        <FormControlLabel {...formControlLabelProps} control={reactElement} />
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export * from "./TextField";
export * from "./Radio";
export * from "./Checkbox";
export * from "./Switch";
export * from "./Slider";

export * from "./pickers";

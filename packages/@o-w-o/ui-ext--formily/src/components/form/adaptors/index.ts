import {
  FormItemIOAdaptor,
  IFormItemIProps,
  IFormItemOProps
} from "../FormItem";
import { IFieldAPI } from "@formily/react";

export const defaultIOAdaptor = new FormItemIOAdaptor<
  IFormItemIProps<IFormItemOProps>,
  IFormItemOProps
>("default", (input: IFormItemIProps<IFormItemOProps>, api: IFieldAPI) => {
  const { state, mutators } = api;
  const key = input.props?.id || input.props?.name;

  if (!!key) {
    console.error(
      "FormItemIOAdaptor[defaultIOAdaptor]: required props [id] or [name]"
    );
  }

  return {
    id: key,
    name: key,
    disabled: !state.editable,
    value: state.value,
    checked: state.value,
    onChange: mutators.change,
    onBlur: mutators.blur,
    onFocus: mutators.focus
  } as IFormItemOProps;
});

export * from "./texthelper";
export * from "./checked";
export * from "./controlleredformitem";

import { FormItemIOAdaptor, IFormItemIProps } from "../FormItem";
import { SliderProps } from "../items";

export const checkedFormItemIOAdaptor = new FormItemIOAdaptor<
  IFormItemIProps<SliderProps>,
  SliderProps
>("checked_form_item", (input, api) => {
  const { state, mutators } = api;
  return {
    value: state.value,
    checked: state.value,
    onChange: (e, v) => mutators.change(v)
  } as Partial<SliderProps>;
});

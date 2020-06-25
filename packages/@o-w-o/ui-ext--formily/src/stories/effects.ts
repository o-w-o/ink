import { LifeCycleTypes } from "@formily/react-schema-renderer";
import { FormEffectHooks } from "@formily/react";

const {
  onFormInit$,
  onFormInputChange$,
  onFieldInputChange$
} = FormEffectHooks;

export const effects = ($, { setFieldState }) => {
  onFormInit$().subscribe(() => {
    console.log("初始化");
  });
  onFormInputChange$().subscribe(() => {
    console.log("输入变化 [Form]");
  });
  onFieldInputChange$().subscribe(state => {
    console.log("输入变化 [Field]", state.path, state.value);
  });
  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "name").subscribe(fieldState => {
    // setFieldState("email", state => {
    //   state.value = fieldState.value || "";
    // });
  });
};

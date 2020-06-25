import React from "react";
import {
  createFormActions,
  Field,
  Form,
  FormEffectHooks,
  FormProvider,
  FormSpy
} from "@formily/react";

import { Box, Button, TextField } from "@material-ui/core";
import { withKnobs } from "@storybook/addon-knobs";
import { LifeCycleTypes } from "@formily/react-schema-renderer";

const {
  onFormInit$,
  onFormInputChange$,
  onFieldInputChange$
} = FormEffectHooks;

const actions = createFormActions();

export const MyFormItem = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      let hasError = false;
      let hasWarning = false;
      if (state.errors.length !== 0) {
        hasError = true;
      }
      if (state.warnings.length !== 0) {
        hasWarning = true;
      }
      return (
        <TextField
          id={props.name}
          label={props.label}
          disabled={!state.editable}
          value={state.value}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
          error={hasError || hasWarning}
          helperText={
            hasError ? (
              <Box color="error.main">{state.errors[0]}</Box>
            ) : hasWarning ? (
              <Box color="warning.main">{state.warnings[0]}</Box>
            ) : (
              props.helperText || ""
            )
          }
          variant="outlined"
        />
      );
    }}
  </Field>
);

const MyForm = () => (
  <Form
    actions={actions}
    effects={($, { setFieldState }) => {
      onFormInit$().subscribe(() => {
        console.log("初始化");
      });
      onFormInputChange$().subscribe(() => {
        console.log("输入变化 [Form]");
      });
      onFieldInputChange$().subscribe(state => {
        console.log("输入变化 [Field]", state.path, state);
      });
      $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "姓名").subscribe(fieldState => {
        setFieldState("ID", state => {
          state.value = fieldState.value;
        });
      });
    }}
    initialValues={{ 姓名: "烛火录", 年龄: 12 }}
  >
    <h5>required validation</h5>

    <MyFormItem name="姓名" label="姓名" required />

    <Box my={2} />

    <MyFormItem
      name="年龄"
      label="年龄"
      rules={[
        {
          format: "number",
          message: "年龄应该是数字！",
          required: true
        }
      ]}
    />

    <h5>warning type validation</h5>

    <MyFormItem
      name="性别"
      label="性别"
      rules={[
        val =>
          val === undefined
            ? { type: "warning", message: "性别默认为无！" }
            : undefined
      ]}
    />

    <h5>built-in validation default to error type validation</h5>

    <MyFormItem
      name="ID"
      label="ID"
      rules={[
        {
          format: "number",
          message: "ID 为数字，且不能为空！",
          required: true
        }
      ]}
    />

    <h5>custom validation</h5>

    <MyFormItem
      name="验证码"
      label="验证码"
      rules={[
        {
          validator(value) {
            return value === undefined
              ? "This field can not be empty, please enter {{scope.outerVariable}}"
              : undefined;
          },
          scope: {
            outerVariable: "456"
          }
        },

        {
          validator(value) {
            return value === "456"
              ? { type: "error", message: "This field can not be 456" }
              : undefined;
          }
        }
      ]}
    />

    <Box my={2} />

    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          const result = actions.validate();
          console.log(actions.getFormState(state => state.values));
          result.then(validateResp => {
            console.log(validateResp);
          });
        }}
      >
        校验
      </Button>
    </div>
  </Form>
);

export const Sample = () => {
  return (
    <FormProvider>
      <MyForm />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue("姓名")}
              <br />
              age: {form.getFieldValue("年龄")}
            </div>
          );
        }}
      </FormSpy>
    </FormProvider>
  );
};

export default {
  title: "Sample",
  decorators: [withKnobs]
};

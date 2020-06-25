import React, { useRef } from "react";

import { IFormProps } from "@formily/react";
import {
  PreviewText,
  PreviewTextConfigProps
} from "@formily/react-shared-components";

import {
  ISchemaFieldComponentProps,
  ISchemaFormProps,
  registerFormComponent,
  registerFormField,
  registerFormItemComponent,
  SchemaMarkupForm
} from "@formily/react-schema-renderer";

import { autoScrollInValidateFailed } from "../../helper";
import { IFormValidateResult } from "@formily/core";
import { TextField, Switch } from "./items";

export type ISchemaFormItemComponentProps = Partial<
  ISchemaFieldComponentProps
> & {};

export type ISchemaFormComponentProps = PreviewTextConfigProps & IFormProps;

export function onValidateFailedOp(op, formRef) {
  return (result: IFormValidateResult) => {
    if (op) {
      op(result);
    }
    autoScrollInValidateFailed(formRef);
  };
}

export const SchemaFormComponent: React.FC<ISchemaFormComponentProps> = props => {
  const {
    effects,
    actions,
    form,
    defaultValue,
    initialValues,
    value,
    onChange,
    onSubmit,
    onReset,
    useDirty,
    onValidateFailed,
    editable,
    validateFirst,
    ...rest
  } = props;

  return (
    <PreviewText.ConfigProvider value={props}>
      <form {...rest} onSubmit={onSubmit} onReset={onReset}>
        {props.children}
      </form>
    </PreviewText.ConfigProvider>
  );
};

export const SchemaFormItemComponent: React.FC<ISchemaFormItemComponentProps> = rootProps => {
  return <div>{rootProps.children}</div>;
};

export const registerBootstrap = () => {
  registerFormComponent(SchemaFormComponent);
  registerFormItemComponent(SchemaFormItemComponent);
};

export const registerFields = () => {
  registerFormField("string", TextField);
  registerFormField("boolean", Switch);
};

export type ICustomSchemaFormProps = PreviewTextConfigProps & ISchemaFormProps;

export const SchemaForm: React.FC<ICustomSchemaFormProps> = props => {
  const formRef = useRef<HTMLDivElement>();
  return (
    <div ref={formRef}>
      <SchemaMarkupForm
        {...props}
        onValidateFailed={onValidateFailedOp(props.onValidateFailed, formRef)}
      >
        {props.children}
      </SchemaMarkupForm>
    </div>
  );
};

export default () => {
  return (
    <SchemaForm
      formComponent={SchemaFormComponent}
      formItemComponent={SchemaFormItemComponent}
    />
  );
};

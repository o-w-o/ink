import React, { useRef } from "react";
import { log } from "@formily/shared";
import { IFormProps } from "@formily/react";
import { InternalForm } from "@formily/react-schema-renderer";
import {
  PreviewText,
  PreviewTextConfigProps
} from "@formily/react-shared-components";
import { autoScrollInValidateFailed } from "../../helper/shared";

export type ICustomFormProps = IFormProps<any, any>;

export const Form: React.FC<ICustomFormProps &
  PreviewTextConfigProps> = props => {
  const {
    effects,
    actions,
    initialValues,
    value,
    defaultValue,
    onChange,
    onSubmit,
    form,
    useDirty,
    onValidateFailed,
    editable,
    validateFirst,
    ...rest
  } = props;
  const formRef = useRef<HTMLDivElement>();
  return (
    <InternalForm
      {...props}
      onValidateFailed={result => {
        if (props.onValidateFailed) {
          props.onValidateFailed(result);
        }
        autoScrollInValidateFailed(formRef);
      }}
    >
      {form => {
        const onSubmit = e => {
          if (e && e.preventDefault) e.preventDefault();
          form.submit().catch(e => log.warn(e));
        };
        const onReset = () => {
          form.reset({ validate: false, forceClear: false });
        };
        return (
          <PreviewText.ConfigProvider value={props}>
            <div ref={formRef}>
              <form {...rest} onSubmit={onSubmit} onReset={onReset}>
                {props.children}
              </form>
            </div>
          </PreviewText.ConfigProvider>
        );
      }}
    </InternalForm>
  );
};

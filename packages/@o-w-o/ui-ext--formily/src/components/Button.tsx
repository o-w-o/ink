import React from "react";
import { FormSpy, LifeCycleTypes } from "@formily/react-schema-renderer";
import { Button } from "@material-ui/core";
import { ISubmitProps, IResetProps } from "../types";

export const Submit = ({ showLoading, onSubmit, ...props }: ISubmitProps) => {
  return (
    <FormSpy
      selector={[
        LifeCycleTypes.ON_FORM_SUBMIT_START,
        LifeCycleTypes.ON_FORM_SUBMIT_END
      ]}
      reducer={(state, action) => {
        switch (action.type) {
          case LifeCycleTypes.ON_FORM_SUBMIT_START:
            return {
              ...state,
              submitting: true
            };
          case LifeCycleTypes.ON_FORM_SUBMIT_END:
            return {
              ...state,
              submitting: false
            };
          default:
            return state;
        }
      }}
    >
      {({ state, form }) => {
        /**
         * {...props}
         * loading={showLoading ? state.submitting : undefined}
         */
        return (
          <Button
            {...props}
            type="submit"
            onClick={e => {
              if (props.type !== "submit") {
                form.submit(onSubmit);
              }
              if (props.onClick) {
                props.onClick(e);
              }
            }}
            disabled={showLoading ? state.submitting : undefined}
          >
            {props.children || "提交"}
          </Button>
        );
      }}
    </FormSpy>
  );
};

Submit.defaultProps = {
  showLoading: true,
  type: "primary"
};

export const Reset: React.FC<IResetProps> = ({
  children,
  forceClear,
  validate,
  clearInitialValue,
  ...props
}) => {
  return (
    <FormSpy selector={[]}>
      {({ form }) => {
        return (
          <Button
            {...props}
            type="reset"
            onClick={() =>
              form.reset({ forceClear, validate, clearInitialValue })
            }
          >
            {children || "重置"}
          </Button>
        );
      }}
    </FormSpy>
  );
};

import React from "react";

import { withKnobs } from "@storybook/addon-knobs";

import { createFormActions } from "@formily/react-schema-renderer";

import {
  registerBootstrap,
  registerFields,
  SchemaForm,
  Submit
} from "../components";
import { effects } from "./effects";

export default {
  title: "SchemaForm",
  decorators: [withKnobs]
};

const actions = createFormActions();

registerBootstrap();
registerFields();

export const SchemaFormDemo = () => {
  return (
    <SchemaForm
      actions={actions}
      schema={{
        type: "object",
        properties: {
          aa: {
            type: "boolean",
            title: "AA",
            "x-component-props": {
              id: "bool",
              name: "bool",
              label: "bool"
            }
          },
          bb: {
            type: "string",
            title: "BB",
            enum: [
              {
                label: "A",
                value: 1
              },
              {
                label: "B",
                value: 2
              },
              {
                label: "C",
                value: 3
              }
            ],
            "x-component-props": {
              id: "demo",
              name: "demo",
              label: "demo",
              variant: "outlined",
              fullWidth: true,
              type: "password"
            }
          }
        },
        required: ["bb"]
      }}
      effects={effects}
      onSubmit={console.log}
    >
      <Submit>提交</Submit>
    </SchemaForm>
  );
};

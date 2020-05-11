import React from "react";
import { PreviewText } from "@formily/react-shared-components";

import { MyForm } from "../../components/MyForm";
import { ICustomSchemaFormAdaptorProps } from "../types";
import { FormItemDeepProvider } from "../context";

export const CustomSchemaFormAdaptor: React.FC<ICustomSchemaFormAdaptorProps> = props => {
  const {inline, previewPlaceholder, onSubmit, onReset, ...rest} = props;
  return (
      <FormItemDeepProvider {...props}>
        <PreviewText.ConfigProvider value={props}>
          <MyForm
              {...rest}
              onSubmit={onSubmit}
              onReset={onReset}
          />
        </PreviewText.ConfigProvider>
      </FormItemDeepProvider>
  );
};

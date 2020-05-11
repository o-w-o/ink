import {
  IFieldStateUIProps,
  IFormProps,
  ISchemaFieldComponentProps,
  ISchemaFormProps
} from "@formily/react-schema-renderer";
import { PreviewTextConfigProps } from "@formily/react-shared-components";
import { ButtonProps } from "@material-ui/core/button";
import { TextFieldProps } from "@material-ui/core/textfield";

import { IMyFormProps } from "../components/MyForm";

export interface ISubmitProps extends ButtonProps {
  htmlType: string,
  onSubmit?: ISchemaFormProps["onSubmit"];
  showLoading?: boolean;
}

export interface IResetProps extends ButtonProps {
  forceClear?: boolean;
  validate?: boolean;
}

export type ICustomSchemaFormProps = ICustomFormItemDeepProps &
    PreviewTextConfigProps &
    ISchemaFormProps;

export type ICustomFormProps = IMyFormProps & ICustomFormItemDeepProps &
    IFormProps<any, any>;

export type ICustomFormItemProps = TextFieldProps & IFieldStateUIProps &
    {
      valueName?: string;
      eventName?: string;
      component?: React.JSXElementConstructor<any>;
      children?: React.ReactNode;
      itemStyle?: {
        [key: string]: string | number;
      };
      itemClassName?: string;
      [key: string]: any;
    };

export type ICustomFormItemDeepProps = React.PropsWithChildren<{
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}>;

export type ICustomSchemaFieldAdaptorProps = Partial<ISchemaFieldComponentProps> & {};

export type ICustomSchemaFormAdaptorProps = IMyFormProps &
    ICustomFormItemDeepProps &
    PreviewTextConfigProps & { onSubmit: () => void }

export * from "@formily/react-schema-renderer";


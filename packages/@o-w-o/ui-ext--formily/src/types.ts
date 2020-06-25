import { ISchemaFormProps } from "@formily/react-schema-renderer";
import { IFormResetOptions } from "@formily/core";
import { ButtonProps } from "@material-ui/core/Button";

export interface ISubmitProps extends ButtonProps {
  onSubmit?: ISchemaFormProps["onSubmit"];
  showLoading?: boolean;
}

export interface IResetProps extends ButtonProps, IFormResetOptions {}

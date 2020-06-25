import React from "react";
import { IFieldStateProps } from "@formily/core";
import { Field, IFieldAPI } from "@formily/react";
import { log } from "@formily/shared";

export interface IFormItemOProps {
  label?: string;
  id?: string | number;
  name?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  helperText?: React.ReactElement | string;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
}

export interface IFormItemIOAdaptorOp<Input, Output> {
  (input?: Input, api?: IFieldAPI): Partial<Output>;
}

export class FormItemIOAdaptor<Input, Output extends IFormItemOProps> {
  constructor(
    name: string,
    op: IFormItemIOAdaptorOp<Input, Output>,
    target?,
    dep?
  ) {
    this.name = name;
    this.op = op;
    this.targetKeys = target;
    this.depKeys = dep;

    console.log("FormItemIOAdaptor ->", name);
  }

  public name: string;
  public targetKeys: keyof Output[];
  public depKeys: keyof Input[];
  public op: IFormItemIOAdaptorOp<Input, Output>;
}

export class FormItemIO<Input, Output extends IFormItemOProps> {
  private adaptors: FormItemIOAdaptor<Input, Output>[] = [];
  public registerAdaptor(adapter: FormItemIOAdaptor<Input, Output>) {
    this.adaptors.push(adapter);
  }
  public exec(input: Input, api): Partial<Output> {
    return this.adaptors.reduce<Partial<Output>>(
      (previousValue, currentValue) => {
        return {
          ...previousValue,
          ...currentValue.op(input, api)
        };
      },
      {} as Output
    );
  }
}

export type IFormItemIProps<T extends IFormItemOProps> = Partial<IFieldAPI> &
  IFieldStateProps<T> & {
    triggerType?: "onChange" | "onBlur" | "none";
    getValueFromEvent?: (...args: any[]) => any;
    children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement);
    valueName?: string;
    eventName?: string;
    component?: React.JSXElementConstructor<T>;
    adaptors?: FormItemIOAdaptor<IFormItemIProps<T>, T>[];
    // [key: string]: any;
  };

export class FormItem<T extends IFormItemOProps> extends React.Component<
  Partial<IFormItemIProps<T>>
> {
  io = new FormItemIO<IFormItemIProps<T>, T>();

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    log.info("FormItem Init……");
  }

  renderComponent(api: IFieldAPI) {
    console.info("FormItem renderComponent……");
    if (Array.isArray(this.props.adaptors)) {
      this.props.adaptors.forEach(adaptor => {
        this.io.registerAdaptor(adaptor);
      });
    } else {
      log.warn("FormItem props[adaptors]:IOAdaptors is empty!");
    }

    return React.createElement(
      this.props.component,
      this.io.exec(this.props as IFormItemIProps<T>, api) as T
    );
  }

  render() {
    console.info("FormItem render……");
    return <Field {...this.props}>{api => this.renderComponent(api)}</Field>;
  }
}

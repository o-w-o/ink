import React from "react";
import { FormItemIOAdaptor, IFormItemIProps } from "../FormItem";
import { ControlledFormItemProps } from "../items";

export function generateControllerFormItemIOAdaptor<
  T extends React.JSXElementConstructor<TP>,
  TP
>(itemComponent: T) {
  return new FormItemIOAdaptor<
    IFormItemIProps<ControlledFormItemProps<TP>>,
    ControlledFormItemProps<TP>
  >("controller_form_item", () => {
    return {
      item: itemComponent
    } as ControlledFormItemProps<TP>;
  });
}

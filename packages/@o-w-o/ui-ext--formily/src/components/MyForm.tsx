import React from "react";

export interface IMyFormProps {
  onSubmit: any,
  onReset: any,
}

export interface IMyFormItemProps {

}

export const MyForm = React.memo<IMyFormProps>(() => {
  return <form />
})

export const MyFormItem = React.memo<IMyFormItemProps>(() => {
  return <form />
})
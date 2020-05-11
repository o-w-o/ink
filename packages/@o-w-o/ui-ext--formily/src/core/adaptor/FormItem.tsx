import React, { createElement } from 'react'

import { FormItemShallowProvider, useShallowFormItem } from '../context'
import { ICustomSchemaFieldAdaptorProps } from '../types'
import { pickFormItemProps } from '../shared'
import { MyFormItem } from "../../components/MyForm";

const computeStatus = (props: ICustomSchemaFieldAdaptorProps) => {
  if (props.loading) {
    return 'validating'
  }
  if (props.invalid) {
    return 'error'
  }
  if (props.warnings && props.warnings.length) {
    return 'warning'
  }
  return ''
}

const computeHelp = (props: ICustomSchemaFieldAdaptorProps) => {
  if (props.help) return props.help
  const messages = [].concat(props.errors || [], props.warnings || [])
  return messages.length
      ? messages.map((message, index) =>
          createElement(
              'span',
              {key: index},
              message,
              messages.length - 1 > index ? ' ,' : ''
          )
      )
      : props.schema && props.schema.description
}

const computeLabel = (props: ICustomSchemaFieldAdaptorProps) => {
  if (props.label) return props.label
  if (props.schema && props.schema.title) {
    return props.schema.title
  }
}

const computeExtra = (props: ICustomSchemaFieldAdaptorProps) => {
  if (props.extra) return props.extra
}

const computeSchemaExtendProps = (props: ICustomSchemaFieldAdaptorProps) => {
  if (props.schema) {
    return pickFormItemProps({
      ...props.schema.getExtendsItemProps(),
      ...props.schema.getExtendsProps()
    })
  }
}

export const CustomSchemaFieldAdaptor: React.FC<ICustomSchemaFieldAdaptorProps> = props => {
  const help = computeHelp(props)
  const label = computeLabel(props)
  const status = computeStatus(props)
  const extra = computeExtra(props)
  const itemProps = pickFormItemProps(props)
  const schemaItemProps = computeSchemaExtendProps(props)
  const formItemShallowProps = useShallowFormItem()

  const mergedProps = {
    label,
    ...formItemShallowProps,
    ...itemProps,
    ...schemaItemProps
  }

  const addonAfter = mergedProps.addonAfter

  delete mergedProps.addonAfter

  const children = addonAfter ? (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <FormItemShallowProvider>{props.children}</FormItemShallowProvider>
        {addonAfter}
      </div>
  ) : (
      <FormItemShallowProvider>{props.children}</FormItemShallowProvider>
  )

  return (
      <MyFormItem
          help={help}
          validateStatus={status}
          extra={extra ? <p>{extra}</p> : undefined}
          {...mergedProps}
          required={props.editable === false ? undefined : props.required}
      >
        {children}
      </MyFormItem>
  )
}

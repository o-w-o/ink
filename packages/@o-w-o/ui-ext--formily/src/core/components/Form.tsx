import React, {useRef} from 'react'
import {InternalForm} from '@formily/react-schema-renderer'
import {PreviewText, PreviewTextConfigProps} from '@formily/react-shared-components'
import {autoScrollInValidateFailed, log} from '../shared'
import {FormItemDeepProvider} from '../context'
import {ICustomFormProps} from '../types'
import {MyForm} from "../../components/MyForm";

export const Form: React.FC<ICustomFormProps &
    PreviewTextConfigProps> = props => {
  const {
    inline,
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
  } = props
  const formRef = useRef<HTMLDivElement>()
  return (
      <InternalForm
          {...props}
          onValidateFailed={result => {
            if (props.onValidateFailed) {
              props.onValidateFailed(result)
            }
            autoScrollInValidateFailed(formRef)
          }}
      >
        {form => {
          const onSubmit = e => {
            if (e && e.preventDefault) e.preventDefault()
            form.submit().catch(e => log.warn(e))
          }
          const onReset = () => {
            form.reset({validate: false, forceClear: false})
          }
          return (
              <PreviewText.ConfigProvider value={props}>
                <FormItemDeepProvider {...props}>
                  <div ref={formRef}>
                    <MyForm
                        {...rest}
                        onSubmit={onSubmit}
                        onReset={onReset}
                    />
                  </div>
                </FormItemDeepProvider>
              </PreviewText.ConfigProvider>
          )
        }}
      </InternalForm>
  )
}

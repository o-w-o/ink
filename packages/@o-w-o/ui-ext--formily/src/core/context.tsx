import React, { createContext, useContext } from 'react'
import { ICustomFormItemDeepProps } from './types'

//递归控制
const NextFormItemDeepContext = createContext<ICustomFormItemDeepProps>({})
const NextFormItemShallowContext = createContext({})

export const FormItemDeepProvider: React.FC<ICustomFormItemDeepProps> = ({
  children,
  inline
}) => (
  <NextFormItemDeepContext.Provider
    value={{
      inline
    }}
  >
    {children}
  </NextFormItemDeepContext.Provider>
)

FormItemDeepProvider.displayName = 'FormItemDeepProvider'

export const useDeepFormItem = () => {
  return useContext(NextFormItemDeepContext)
}

export const FormItemShallowProvider = ({ children, ...props }) => (
  <NextFormItemShallowContext.Provider value={props}>
    {children}
  </NextFormItemShallowContext.Provider>
)

export const useShallowFormItem = () => {
  return useContext(NextFormItemShallowContext)
}

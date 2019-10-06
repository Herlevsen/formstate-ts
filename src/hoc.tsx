import React from "react"
import { Subtract } from 'utility-types'
import { FormValues, StandardErrorType, FormProps, HOCWrappedComponentFormProps } from "./types"
import { Form } from './form'

export function withForm<Values extends FormValues, ErrorType = StandardErrorType>(
  ownProps: FormProps<Values, ErrorType>
) {
  return function<T extends HOCWrappedComponentFormProps<Values, ErrorType>>(WrappedComponent: React.ComponentType<T>) {
    return function(outsideProps: Subtract<T, HOCWrappedComponentFormProps<Values, ErrorType>>) {
      return (
        <Form {...ownProps}>{form => {
          const props = {...outsideProps, form} as T // TODO: How to avoid casting to T?
          return <WrappedComponent {...props} />
        }}</Form>
      )
    }
  }
}
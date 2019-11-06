import * as React from 'react'

import {
  FormValues,
  StandardErrorType,
  FormComponentProps,
  ValidationReturnType,
  FormField,
} from './types'

/**
 * The form component. You are required to pass in the initialProps and the field types will be inferred from here.
 * You can optionally set the fields types with the generic parameter Values, like so:
 * <Form<{username: string, password: string}> initialValues={....} >
 *
 * You can change the type of the errors with the second generic parameter. By default it is "string | undefined"
 */
export const Form = <Values extends FormValues, ErrorType = StandardErrorType>(
  props: FormComponentProps<Values, ErrorType>
) => {
  const [stateFields, setFields] = React.useState<Values>(props.initialValues)
  const [touched, setTouched] = React.useState<
    Partial<{ [K in keyof Values]: boolean }>
  >({})

  const validationResult = props.validation
    ? props.validation(stateFields)
    : ({} as ValidationReturnType<Values, ErrorType>)

  const fields: {
    [K in keyof Values]: FormField<Values[K], ErrorType>
  } = Object.entries(stateFields).reduce((result, entry) => {
    const key = entry[0]
    const value = entry[1]

    const field = {
      name: key,
      value,
      touched: touched[key] || false,
      error: validationResult[key],
      onChange: (value: unknown) => setFields({ ...stateFields, [key]: value }),
      onBlur: () => setTouched({ ...touched, [key]: true }),
    }
    return { ...result, [key]: field }
  }, {}) as { [K in keyof Values]: FormField<Values[K], ErrorType> }

  return props.children({
    fields,
    values: stateFields,
    validate: () => {
      const result: Partial<
        { [K in keyof Values]: ErrorType }
      > = props.validation ? props.validation(stateFields) : {}
      // Delete undefined values, as they are not considered errors. Note: Mutating object
      Object.entries(result).forEach(entry => {
        const key = entry[0]
        const value = entry[1]
        if (value === undefined) delete result[key]
      })
      return {
        isValid: Object.keys(result).length === 0,
        errors: result,
      }
    },
    setAllFields: setFields,
    setSomeFields: fieldValues => setFields({ ...stateFields, ...fieldValues }),
    reset: () => {
      setFields(props.initialValues)
      setTouched({})
    },
  })
}

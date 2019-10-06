export type FormValues = {[key: string]: unknown}
export type ValidationReturnType<Values, ErrorType> = Partial<{[K in keyof Values]: ErrorType}>
export type StandardErrorType = string | undefined

export interface FormField<ValueType, ErrorType> {
  /** Name of the field */
  name: string
  /** The current value of the field */
  value: ValueType
  /** The error/errors for the field. This is returned from the validation function passed to the form. The default error type is "string | undefined", but you can set it to whatever you'd like, by passing a generic parameter to the Form component */
  error: ErrorType
  /** Whether the field has been changed. Remember to pass the onBlur function to your input field. */
  touched: boolean
  /** Change handler. Please note that you cannot directly pass this to an input field.
   * The reason is that an input field will always return a string from event.target.value, and your field might not be a string.
   * So when passing it to a input text field and the field value is of string type, you can do it like this:
   * onChange={e => form.fields.nameField.onChange(e.target.value)}.
   */
  onChange: (value: ValueType) => void
  /**
   * Blur handler. Use this on your input fields onBlur property. This will set the touched property on the field.
   */
  onBlur: () => void
}
  
export interface FormChildrenProps<Values, ErrorType = StandardErrorType> {
  /** Map of all fields, with the respective values, errors, change handler etc. */
  fields:   {[K in keyof Values]: FormField<Values[K], ErrorType>}
  /** Map of all the values. Use this if you need to pass all the data somewhere else. */
  values:   Values
  /** Manually run the validation. */
  validate: () => ValidationReturnType<Values, ErrorType>
  /** Reset the fields to their initial values */
  reset:    () => void
  /** Set values for all fields at once */
  setAllFields: (fieldValues: Values) => void
  /** Set values for some of the fields */
  setSomeFields: (fieldValues: Partial<Values>) => void
}

export interface FormProps<Values extends FormValues, ErrorType = StandardErrorType> {
  /** The values that the form will be initialized with. */
  initialValues: Values
  /** A function that will validate the fields in the form on every onChange call.
   * @param form The values of all the fields
  */
  validation?: (form: Values) => ValidationReturnType<Values, ErrorType>
}
  
export interface FormComponentProps<Values extends FormValues, ErrorType = StandardErrorType> extends FormProps<Values, ErrorType> {
  /**
   * The children property should be passed a function that takes {@link FormChildrenProps} as a parameter and returns a React.ReactElement
   */
  children: (form: FormChildrenProps<Values, ErrorType>) => React.ReactElement
}

export type HOCWrappedComponentFormProps<Values extends FormValues, ErrorType = StandardErrorType> = {
  form: FormChildrenProps<Values, ErrorType>
}
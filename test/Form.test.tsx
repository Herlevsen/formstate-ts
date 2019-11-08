import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Form } from '../src/form'
import { FormChildrenProps } from '../src/types'
import { act } from 'react-dom/test-utils'

type SimpleForm = {
  firstName: string
  lastName: string
  yearOfBirth: number
}

const renderSimpleForm = () => {
  let formProps: FormChildrenProps<SimpleForm>
  const utils = render(
    <Form<SimpleForm>
      initialValues={{ firstName: 'John', lastName: 'Doe', yearOfBirth: 1985 }}
    >
      {form => {
        const { firstName } = form.fields
        formProps = form
        return (
          <div>
            <input
              data-testid="firstName-input"
              name={firstName.name}
              onChange={e => firstName.onChange(e.target.value)}
              onBlur={firstName.onBlur}
              value={firstName.value}
            />
            <div data-testid="formProps">{JSON.stringify(form)}</div>
          </div>
        )
      }}
    </Form>
  )

  return {
    ...utils,
    input: utils.getByTestId('firstName-input') as HTMLInputElement,
    getFormProps: () => formProps,
  }
}

describe('Form Component', () => {
  it('Should pass down props', () => {
    render(
      <Form initialValues={{ firstName: 'John', lastName: 'Doe' }}>
        {form => {
          const { firstName } = form.fields
          expect(firstName.value).toBe('John')
          expect(firstName.touched).toBe(false)
          expect(firstName.error).toBe(undefined)
          expect(form.values).toEqual({ firstName: 'John', lastName: 'Doe' })
          return <div>Nothing here</div>
        }}
      </Form>
    )
  })

  it('Changes value when the change handler is called', () => {
    const result = renderSimpleForm()

    const input = result.input
    expect(input.value).toBe('John')
    fireEvent.change(input, { target: { value: 'Jack' } })
    expect(input.value).toBe('Jack')
  })

  it('Updates the touched property to true when blur handler is called the first time', () => {
    const result = renderSimpleForm()
    const { input, getFormProps } = result

    expect(getFormProps().fields.firstName.touched).toBe(false)
    fireEvent.blur(input)
    expect(getFormProps().fields.firstName.touched).toBe(true)
  })

  it('Can set a subset of fields at once', () => {
    const result = renderSimpleForm()
    const { getFormProps } = result

    act(() =>
      getFormProps().setSomeFields({ firstName: 'Jack', yearOfBirth: 1980 })
    )
    expect(getFormProps().values).toEqual({
      firstName: 'Jack',
      lastName: 'Doe',
      yearOfBirth: 1980,
    })
  })

  it('Can set all fields at once', () => {
    const result = renderSimpleForm()
    const { getFormProps } = result

    act(() =>
      getFormProps().setAllFields({
        firstName: 'Jack',
        lastName: 'Dane',
        yearOfBirth: 1980,
      })
    )
    expect(getFormProps().values).toEqual({
      firstName: 'Jack',
      lastName: 'Dane',
      yearOfBirth: 1980,
    })
  })

  it('Can reset to the initial state', () => {
    const result = renderSimpleForm()
    const { input, getFormProps } = result

    fireEvent.change(input, { target: { value: 'Jack' } })
    fireEvent.blur(input)
    expect(getFormProps().values).toEqual({
      firstName: 'Jack',
      lastName: 'Doe',
      yearOfBirth: 1985,
    })
    expect(getFormProps().fields.firstName.touched).toBe(true)

    // Reset form state
    act(() => getFormProps().reset())
    expect(getFormProps().values).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      yearOfBirth: 1985,
    })
    expect(getFormProps().fields.firstName.touched).toBe(false)
  })

  it('Calls the validation function if one is provided', () => {
    const validationFnMock = jest.fn(() => ({
      firstName: 'Too short',
    }))
    render(
      <Form<SimpleForm>
        initialValues={{
          firstName: 'John',
          lastName: 'Doe',
          yearOfBirth: 1985,
        }}
        validation={validationFnMock}
      >
        {() => {
          return <div>Nothing here</div>
        }}
      </Form>
    )

    expect(validationFnMock.mock.calls.length).toBe(1)
  })

  it('It returns a validation result when running the validate function', () => {
    render(
      <Form
        initialValues={{ firstName: 'John' }}
        validation={() => ({ firstName: 'Name incorrect' })}
      >
        {form => {
          React.useEffect(() => {
            const validationResult = form.validate()

            expect(validationResult.isValid).toBe(false)
            expect(validationResult.errors.firstName).toBe('Name incorrect')
          })
          return <div>Nothing here</div>
        }}
      </Form>
    )
  })

  it('Validate function returns true when no validation function is provided', () => {
    render(
      <Form initialValues={{ firstName: 'John' }}>
        {form => {
          React.useEffect(() => {
            const validationResult = form.validate()

            expect(validationResult.isValid).toBe(true)
            expect(validationResult.errors).toEqual({})
          })
          return <div>Nothing here</div>
        }}
      </Form>
    )
  })

  it('Validate function removes undefined errors', () => {
    render(
      <Form
        initialValues={{ firstName: 'John' }}
        validation={() => ({ firstName: undefined })}
      >
        {form => {
          React.useEffect(() => {
            const validationResult = form.validate()

            expect(validationResult.isValid).toBe(true)
            expect(validationResult.errors).toEqual({})
          })
          return <div>Nothing here</div>
        }}
      </Form>
    )
  })

  it('Sets all fields as touched when calling setAllTouched', () => {
    const { getFormProps } = renderSimpleForm()

    const { fields, setAllTouched } = getFormProps()
    expect(fields.firstName.touched).toBe(false)
    expect(fields.lastName.touched).toBe(false)
    expect(fields.yearOfBirth.touched).toBe(false)
    act(() => setAllTouched())
    const { fields: newFields } = getFormProps()
    expect(newFields.firstName.touched).toBe(true)
    expect(newFields.lastName.touched).toBe(true)
    expect(newFields.yearOfBirth.touched).toBe(true)
    act(() => setAllTouched(false))
    const { fields: untouchedFields } = getFormProps()
    expect(untouchedFields.firstName.touched).toBe(false)
    expect(untouchedFields.lastName.touched).toBe(false)
    expect(untouchedFields.yearOfBirth.touched).toBe(false)
  })
})

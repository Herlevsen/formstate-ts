import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Form } from '../src/form'
import { FormChildrenProps } from '../src/types'

type SimpleForm = {
  firstName: string
  lastName: string
}

const renderSimpleForm = () => {
  let formProps: FormChildrenProps<SimpleForm>
  const utils = render(
    <Form<SimpleForm> initialValues={{firstName: 'John', lastName: 'Doe'}}>{form => {
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
    }}</Form>
  )

  return {
    ...utils,
    input: utils.getByTestId('firstName-input') as HTMLInputElement,
    getFormProps: () => formProps
  }
}

describe('Form Component', () => {
  it('Should pass down props', () => {
    render(
      <Form initialValues={{firstName: 'John', lastName: 'Doe'}}>{form => {
        const { firstName } = form.fields
        expect(firstName.value).toBe('John')
        expect(firstName.touched).toBe(false)
        expect(firstName.error).toBe(undefined)
        expect(form.values).toEqual({firstName: 'John', lastName: 'Doe'})
        return <div>Nothing here</div>
      }}</Form>
    )
  })

  it('Changes value when the change handler is called', () => {
    const result = renderSimpleForm()

    const input = result.input
    expect(input.value).toBe('John')
    fireEvent.change( input, { target: { value: 'Jack' } } )
    expect(input.value).toBe('Jack')
  })

  it('Updates the touched property to true when blur handler is called the first time', () => {
    const result = renderSimpleForm()
    const { input, getFormProps } = result

    expect(getFormProps().fields.firstName.touched).toBe(false)
    fireEvent.blur(input)
    expect(getFormProps().fields.firstName.touched).toBe(true)
  })
})
import * as React from 'react'
import { render } from '@testing-library/react'
import { Form } from '../src/form'

describe('Form', () => {
  it('Should pass down props', () => {
    render(
      <Form initialValues={{firstName: 'John', lastName: 'Doe'}}>{form => {
        const { firstName } = form.fields
        expect(firstName.value).toBe('John')
        expect(firstName.touched).toBe(false)
        expect(form.values).toEqual({firstName: 'John', lastName: 'Doe'})
        return <div>Nothing here</div>
      }}</Form>
    )
    
  })
})
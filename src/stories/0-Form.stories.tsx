import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Form } from '../form'
import { strHandler, numberHandler } from '../helpers'

const stories = storiesOf('Form', module)

type SimpleForm = {
  firstName: string
  lastName: string
  age: number
}

stories.add(
  'Simple form',
  () => (
    <Form<SimpleForm>
      initialValues={{ firstName: 'John', lastName: 'Doe', age: 10 }}
    >
      {({ fields: { firstName, lastName, age } }) => (
        <form>
          <div>
            <div>
              <label>First name</label>
            </div>
            <input
              type="text"
              value={firstName.value}
              onChange={e => firstName.onChange(e.target.value)}
            />
          </div>

          <div>
            <div>
              <label>Last name</label>
            </div>
            <input
              type="text"
              value={lastName.value}
              onChange={strHandler(lastName.onChange)}
            />
          </div>
          <div>
            <div>
              <label>Age</label>
            </div>
            <input
              type="text"
              value={age.value}
              onChange={numberHandler(age.onChange, 0)}
            />
          </div>
        </form>
      )}
    </Form>
  ),
  { info: { inline: true } }
)

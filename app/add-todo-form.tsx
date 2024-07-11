import { addTodo } from '@/lib/action'
import { Button, TextField, Theme } from '@radix-ui/themes'
import React from 'react'

export const AddTodoForm = () => {

  return (
    <form className='w-full' action={addTodo}>
      <Theme radius="medium">
        <TextField.Root name='title' size="3" placeholder="Add a new todo">
          <TextField.Slot side="right" px="1">
            <Button size="2">Save</Button>
          </TextField.Slot>
        </TextField.Root>
      </Theme>
    </form>
  )
}

import { deleteTodo, updateTodo } from '@/lib/action'
import { Todo } from '@/types'
import { TrashIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@radix-ui/themes'
import React from 'react'
import { DeleteTodo, ToggleTodo } from './btn-action'

type Props = {
  todo: Todo
}
export const TodoCard = (
  { todo }: Props
) => {

  const deleteCurrentTodo = async () => {
    "use server"
    await deleteTodo(todo.id)
  }

  const updateCurrentTodo = async () => {
    "use server"
    await updateTodo(todo.id, !todo.completed)
  }


  return (
    <div className='flex gap-4 p-2 items-center justify-between border-b border-b-gray-100 last:border-b-0'>
      <h3 className='text-base font-medium'> {todo.title} </h3>
      <div className='relative flex items-center gap-3'>
        <DeleteTodo onClick={deleteCurrentTodo} />
        <ToggleTodo completed={todo.completed} onClick={updateCurrentTodo} />
      </div>
    </div>
  )
}

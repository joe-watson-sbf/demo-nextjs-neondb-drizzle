import { deleteTodo } from '@/lib/action'
import { Todo } from '@/types'
import React from 'react'
import { DeleteTodo, ToggleTodo } from './btn-actions'

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

  return (
    <div className='flex gap-4 py-3 items-center justify-between border-b border-b-gray-200 last:border-b-0'>
      <h3 className='text-base font-medium'> {todo.title} </h3>
      <div className='relative flex items-center gap-3'>
        <DeleteTodo onClick={deleteCurrentTodo} />
        <ToggleTodo todo={todo} />
      </div>
    </div>
  )
}

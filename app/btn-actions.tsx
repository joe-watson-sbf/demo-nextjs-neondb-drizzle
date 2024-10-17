"use client"
import { updateTodo } from '@/lib/action'
import { Todo } from '@/types'
import { TrashIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@radix-ui/themes'
import React, { useOptimistic, useTransition } from 'react'

type Props = {
  onClick: any
}
export const DeleteTodo = ({ onClick }: Props) => {
  return (
    <TrashIcon onClick={
      async () => {
        await onClick()
      }
    }
      className='w-5 h-5 text-red-700 block cursor-pointer' />
  )
}

type ToggleTodoBtnProps = {
  todo: Todo
}
export const ToggleTodo = ({ todo }: ToggleTodoBtnProps) => {
  const [pending, startTransition] = useTransition()
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(todo, (state, newCompleted: boolean) => ({
    ...state,
    completed: newCompleted
  }))

  const onClick = async () => {
    startTransition(async () => {
      const newStatus = !optimisticTodo.completed
      // Optimistically update the state
      updateOptimisticTodo(newStatus)

      // Make the API call to update the todo
      await updateTodo(todo.id, newStatus)
    })

  }

  return (
    <Checkbox
      disabled={pending}
      onClick={onClick}
      defaultChecked={optimisticTodo.completed}
      className='block relative disabled:cursor-progress' />
  )
}



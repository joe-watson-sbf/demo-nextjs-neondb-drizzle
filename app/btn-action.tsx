"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@radix-ui/themes'
import React from 'react'

type Props = {
  onClick: any
}
export const DeleteTodo = ({onClick}:Props) => {
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
  completed: boolean
  onClick: any
}
export const ToggleTodo = ({completed, onClick}:ToggleTodoBtnProps) => {

  return (
    <Checkbox onClick={
      async () => {
        await onClick()
      }
    } defaultChecked={completed} className='block relative' />
  )
}



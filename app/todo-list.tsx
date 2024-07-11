import React, { Suspense } from 'react'
import { getTodos } from '@/lib/action'
import { TodoCard } from './todo'

export default async function TodoList() {

  const todos = await getTodos()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>} />
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
      <Suspense />
    </div>
  )
}

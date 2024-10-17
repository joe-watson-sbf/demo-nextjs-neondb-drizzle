import { Suspense } from 'react';
import { AddTodoForm } from './add-todo-form';
import TodoList from './todo-list';
import UsersList from './users-list';


export default function page({ searchParams }: { searchParams: { id: string | undefined } }) {

  const { id } = searchParams


  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        <h1 className='text-4xl font-bold mb-6'>
          Todo App
        </h1>
        <UsersList ownerId={id} />

      </div>
      <div className='space-y-4'>
        <AddTodoForm ownerId={id} />
        <Suspense key={id} fallback={<div>Loading...</div>}>
          <TodoList ownerId={id} />
        </Suspense>
      </div>
    </div>
  )
}

import { AddTodoForm } from './add-todo-form';
import TodoList from './todo-list';

export default function page() {
  return (
    <main className='container p-8 max-w-lg mx-auto'>
      <h1 className='text-4xl font-bold mb-6'>
        Todo App
      </h1>
      <div className='space-y-4'>
        <AddTodoForm />
        <TodoList />
      </div>
    </main>
  )
}

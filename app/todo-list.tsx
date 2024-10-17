import { getTodos } from '@/lib/action'
import { TodoCard } from './todo'

type Props = {
  ownerId: string | undefined
}
export default async function TodoList({ ownerId }: Props) {

  const todos = await getTodos(ownerId)

  return (
    <>
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </>
  )
}

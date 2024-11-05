import { Todo } from '@/types'
import { PersonIcon, TrashIcon } from '@radix-ui/react-icons'
import { Checkbox, Dialog } from '@radix-ui/themes'

type Props = {
  todo: Todo
}
export const TodoCard = (
  { todo }: Props
) => {
  return (
    <div className='flex gap-4 py-3 items-center justify-between border-b border-b-gray-200 last:border-b-0'>
      <h3 className='text-base font-medium'>
        {todo.title}
        {todo.user?.name}
      </h3>
      <div className='relative flex items-center gap-3'>
        <Checkbox
          defaultChecked={todo.completed}
          className='block relative disabled:cursor-progress' />

        <Dialog.Root>
          <Dialog.Trigger>
            <PersonIcon className='w-5 h-5 block cursor-pointer'/>
          </Dialog.Trigger>
          
          <Dialog.Content maxWidth="450px">
            <Dialog.Title size="7">User Info</Dialog.Title>
            
            <Dialog.Description size="6" mb="4">
              The owner of this todo
            </Dialog.Description>

            <div>
              <p>
                Name: ( The user name )
              </p>
              <p>
                Profession: ( The user profession )
              </p>
              <p>
                Joined: ( The user joined date )
              </p>
            </div>

          </Dialog.Content>
        </Dialog.Root>
        <TrashIcon className='w-5 h-5 text-red-700 block cursor-pointer' />
      </div>
    </div>
  )
}

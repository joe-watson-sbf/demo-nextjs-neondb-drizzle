import { Todo } from '@/types';
import { CheckIcon, MixerVerticalIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Popover, TextField, Theme } from '@radix-ui/themes';
import Link from 'next/link';
import { TodoCard } from './todo-card';

export default async function page(
  props: { searchParams: Promise<{ status: string | undefined, search: string | undefined }> }
) {
  const searchParams = await props.searchParams;

  const { status, search } = searchParams;

  const todos:Todo[] = []

  return (
    (<div className='space-y-4'>
      <h1 className='text-4xl font-bold'>Todo App</h1>
      <div className='flex gap-4 items-center'>
        <Theme radius="medium">
          <TextField.Root name='search' size="3" placeholder="Search by name..." defaultValue={search}>
            <TextField.Slot side="right" px="1">
              <Button type='submit' size="2" variant='soft'>Search</Button>
            </TextField.Slot>
          </TextField.Root>
        </Theme>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button>
              <PlusIcon className='w-4 h-4' /> Add Todo
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title size="6">Add Todo</Dialog.Title>
            <Dialog.Description size="4" mb="4">
              Fill the form below to add a new todo
            </Dialog.Description>

            <form className='w-full' action="/api/todos" method='POST'>
              <Theme radius="medium">
                <TextField.Root name='title' size="3" placeholder="Add a new todo">
                  <TextField.Slot side="right" px="1">
                    <Button type='submit' size="2">Save</Button>
                  </TextField.Slot>
                </TextField.Root>
              </Theme>
            </form>
          </Dialog.Content>
        </Dialog.Root>


        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline">
              <MixerVerticalIcon className='w-4 h-4' />
              {
                !status || status === "" ? "All Todos" : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
              }
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <div className='space-y-2'>
              <Link className={'flex gap-2 items-center transition-all duration-1000 ' + (!status || status === "" ? "group active text-blue-600" : "text-slate-400")} href='/'>
                <CheckIcon className='w-4 h-4 group-[.active]:inline-block hidden transition-all duration-500' /> All Todos
              </Link>
              <Link className={'flex gap-2 items-center transition-all duration-1000 ' + (status === "completed" ? "group active text-blue-600" : "text-slate-400")} href='?status=completed'>
                <CheckIcon className='w-4 h-4 group-[.active]:inline-block hidden transition-all duration-500' /> Completed
              </Link>
              <Link className={'flex gap-2 items-center transition-all duration-1000 ' + (status === "in-progress" ? "group active text-blue-600" : "text-slate-400")} href='?status=in-progress'>
                <CheckIcon className='w-4 h-4 group-[.active]:inline-block hidden transition-all duration-500' /> In Progress
              </Link>
            </div>
          </Popover.Content>
        </Popover.Root>

      </div>
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>)
  );
}

import { getUsers } from '@/lib/action';
import { User } from '@/types';
import { Box, RadioCards, Skeleton } from '@radix-ui/themes';
import { Suspense } from 'react';
import { UserCard } from './user-card';

type Props = {
  ownerId: string | undefined
}
export default async function UsersList({ ownerId }: Props) {
  const users: User[] = await getUsers();

  const defaultName = users.find(user => user.id === ownerId)?.name;

  return (
    <Suspense fallback={<Skeleton loading={true} className='block h-24 min-w-72' />}>
      <Box className='mx-auto max-w-4xl'>
        <RadioCards.Root defaultValue={defaultName} columns={{ initial: "1", sm: "3" }}>
          {
            users.map(user => (
              <UserCard key={user.id} user={user} defaultId={users.at(0)?.id}/>
            ))
          }
        </RadioCards.Root>
      </Box>
    </Suspense>
  )
}

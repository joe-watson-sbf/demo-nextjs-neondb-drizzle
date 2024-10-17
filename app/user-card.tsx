"use client";
import { User } from '@/types';
import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {
  user: User;
  defaultId?: string | undefined;
}
export const UserCard = ({ user, defaultId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');


  const query = React.useCallback((userId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('id', userId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [user.id]);


  React.useEffect(() => {
    if (searchParams.size === 0 && defaultId) {
      query(defaultId);
    }
  }, [defaultId]);




  return (
    <RadioCards.Item key={user.id} value={user.name} onClick={() => query(user.id)}>
      <Flex direction="column" width="100%">
        <Text weight="bold">{user.name}</Text>
        <Text>{user.profession}</Text>
      </Flex>
    </RadioCards.Item>
  )
}

"use server";

import { db } from '@/db/drizzle';
import { TodoTable, UserTable } from '@/db/schema';
import { Todo, User } from '@/types';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';





export const getUsers = cache(async (): Promise<User[]> => {
  const users = await db.select().from(UserTable);
  return users as unknown as User[];
});







export const getTodos = cache(async (ownerId: string | undefined): Promise<Todo[]> => {
  if (!ownerId) {
    return [];
  }

  const todos = await db.select()
      .from(TodoTable)
      .where(eq(TodoTable.user_id, ownerId))
      .orderBy(desc(TodoTable.create_at));
  return todos as unknown as Todo[];
});



export const addTodo = async (form:FormData): Promise<void> => {
  const title = form.get('title') as string;
  const userId = form.get('userId') as string;

  if (!title || !userId) {
    throw new Error("Title and User ID are required.");
  }

  await db.insert(TodoTable).values({
    title,
    user_id: userId,
    completed: false
  });
  revalidatePath('/');
};


export const updateTodo = async (id: string, completed: boolean): Promise<void> => {
  await db.update(TodoTable)
      .set({ completed })
      .where(eq(TodoTable.id, id));
  revalidatePath('/');
};


export const deleteTodo = async (id: string): Promise<void> => {
  await db.delete(TodoTable).where(eq(TodoTable.id, id));
  revalidatePath('/');
};


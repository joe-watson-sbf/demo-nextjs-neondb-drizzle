"use server";
import { db } from '@/db/drizzle';
import { TodoTable, UserTable } from '@/db/schema';
import { Todo, User } from '@/types';
import { desc, eq, ilike } from 'drizzle-orm';
import { cache } from 'react';


export const getUsers = cache(async (): Promise<User[]> => {
  const users = await db.select().from(UserTable);
  return users as unknown as User[];
});

export const findUserById = cache(async (id: string): Promise<User | null> => {
  console.log('findUserById', id);
  const users = await db.select()
      .from(UserTable)
      .where(eq(UserTable.id, id));
  return users[0] as unknown as User;
})


export const findAllTodos = cache(async (): Promise<Todo[]> => {
  const todos = await db.select()
      .from(TodoTable)
      .orderBy(desc(TodoTable.create_at));
  return todos as unknown as Todo[];
})

export const findTodoById = cache(async (id: string): Promise<Todo | null> => {
  const todos = await db.select()
      .from(TodoTable)
      .where(eq(TodoTable.id, id));
  return todos[0] as unknown as Todo;
})


export const findTodosByName = cache(async (name: string): Promise<Todo[]> => {
  const todos = await db.select()
      .from(TodoTable)
      .where(ilike(TodoTable.title, `%${name}%`))
      .orderBy(desc(TodoTable.create_at));
  return todos as unknown as Todo[];
})



export const addTodo = async (form:FormData): Promise<void> => {
  const title = form.get('title') as string;

  if (!title) {
    throw new Error("Title and User ID are required.");
  }

  await db.insert(TodoTable).values({
    title,
    user_id: "bddac0af-2b2d-4b7d-a299-21a7812aa6ec",
    completed: true
  });
};


export const updateTodo = async (id: string, completed: boolean): Promise<void> => {
  await db.update(TodoTable)
      .set({ completed })
      .where(eq(TodoTable.id, id));
};


export const deleteTodo = async (id: string): Promise<void> => {
  await db.delete(TodoTable).where(eq(TodoTable.id, id));
};


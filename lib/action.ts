"use server";
import { Todo } from '@/types';
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

const sql = neon(process.env.DATABASE_URL as string);

export const getTodos = cache(async (): Promise<Todo[]> => {
  const data: Todo[] = await sql`SELECT * FROM todos 
    order by id desc
  ` as Todo[]
  return data
});

export const getTodo = cache(async (id: number): Promise<Todo> => {
  const data = await sql`SELECT * FROM todos WHERE id = ${id}`
  if (data.length === 0) {
    throw new Error('Todo not found')
  }
  return data as unknown as Todo
});


export const addTodo = async (form:FormData): Promise<void> => {
  const title = form.get('title') as string;
  const todo: Partial<Todo> = {
    title,
    completed: false
  };
  await sql`INSERT INTO todos (title, completed) VALUES (${todo.title}, ${todo.completed})`;
  revalidatePath('/');
};


export const updateTodo = async (id: number, completed: boolean): Promise<void> => {
  await sql`UPDATE todos SET completed = ${completed} WHERE id = ${id}`;
};


export const deleteTodo = async (id: number): Promise<void> => {
  await sql`DELETE FROM todos WHERE id = ${id}`;
  revalidatePath('/');
};

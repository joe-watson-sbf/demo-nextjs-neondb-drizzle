import { addTodo, deleteTodo, findAllTodos, updateTodo } from '@/lib/action';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') === "completed" ? true : false;
  const search = req.nextUrl.searchParams.get('search'); 
  const allTodos = await findAllTodos();
  const todos = search ? allTodos.filter(todo => todo.title.toLowerCase().includes((search.toLowerCase().trim()))) : allTodos;
  if (status) {
    return NextResponse.json(todos.filter(todo => todo.completed));
  }

  return NextResponse.json(todos);
}



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    await addTodo(formData);
    return NextResponse.json({ message: "Todo added!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json();

    await updateTodo(id, completed);
    return NextResponse.json({ message: "Todo updated!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}



export async function DELETE(req: NextRequest) {
  const {id} = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }
  await deleteTodo(id);
  return NextResponse.json({ message: "Todo deleted!" });
}
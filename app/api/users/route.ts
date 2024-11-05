import { getUsers } from '@/lib/action';
import { NextResponse } from 'next/server';

export async function GET() {
  const todos = await getUsers();
  return NextResponse.json(todos);
}
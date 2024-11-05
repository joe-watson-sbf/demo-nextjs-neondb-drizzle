import { findUserById } from '@/lib/action';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string[] } }) {
  try {
    const userId = params?.id[0] as string;
    const user = await findUserById(userId);
    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json({ error: "User not found" }, 
      { status: 500 });

  }

}
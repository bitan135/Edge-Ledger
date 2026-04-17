import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/admin-auth';

export async function GET() {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ email: session.email, role: session.role });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

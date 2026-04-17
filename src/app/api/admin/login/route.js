import { NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/admin-auth';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Credentials required' }, { status: 400 });
    }

    // Rate limit: 3 attempts per 10 minutes
    const limit = rateLimit(`admin_login`, 3, 600000);
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many attempts. Wait 10 minutes.' }, { status: 429 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD not configured');
      return NextResponse.json({ error: 'Admin auth not configured' }, { status: 500 });
    }

    if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim() || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAdminToken(email);
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 28800, // 8 hours
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

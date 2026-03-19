import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signAffiliateToken } from '@/lib/affiliate-auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: aff, error } = await sb
      .from('affiliates')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .eq('status', 'active')
      .single();

    if (error || !aff) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, aff.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signAffiliateToken(aff.id, aff.email);

    const res = NextResponse.json({ success: true, name: aff.name });
    res.cookies.set('aff_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('Affiliate login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

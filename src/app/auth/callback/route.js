import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    console.error('OAuth Code Exchange Error:', error);
  } else {
    console.warn('No code provided in OAuth callback');
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/login?error=auth_callback_failed', request.url));
}

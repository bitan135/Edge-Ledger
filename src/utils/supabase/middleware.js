import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { ENV } from '@/lib/env';
import { isPublicRoute, isProtectedRoute } from '@/lib/routes';

export async function updateSession(request) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  const isLocal = process.env.NODE_ENV === 'development' || 
                 host.includes('localhost') || 
                 host.includes('127.0.0.1');

  const code = request.nextUrl.searchParams.get('code');

  // 1. Canonical Domain Enforcement (Production only) - PRIORITY 1
  // Ensures session cookies match the intended domain (Apex vs WWW)
  // If a code is present, we jump DIRECTLY to the callback on the canonical domain to avoid double redirects.
  if (!isLocal && host.includes('smcjournal.app') && !host.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = 'www.smcjournal.app';
    url.protocol = 'https';
    
    // Efficiency: If there's a code, jump straight to callback on canonical domain
    if (code && pathname !== '/auth/callback') {
      url.pathname = '/auth/callback';
    }
    
    return NextResponse.redirect(url);
  }

  // 2. OAuth Code Interceptor
  // If a ?code= is detected on ANY path (like the root /) but we are not on the callback route,
  // we must immediately redirect to /auth/callback to ensure the server-side exchange logic handles it.
  if (code && pathname !== '/auth/callback') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback';
    // Preserve all other search params (like 'next' or 'state')
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions = {
              ...options,
              secure: isLocal ? false : true,
              sameSite: 'lax',
              path: '/',
              domain: isLocal ? undefined : '.smcjournal.app',
            };
            
            request.cookies.set({ name, value, ...cookieOptions });
            supabaseResponse.cookies.set(name, value, cookieOptions);
          });
        },
      },
    }
  );

  // Helper to ensure ALL redirects carry the session cookies
  const finalizeResponse = (res) => {
    supabaseResponse.cookies.getAll().forEach(cookie => {
      res.cookies.set(cookie.name, cookie.value, {
        ...cookie.options,
        secure: isLocal ? false : true,
        sameSite: 'lax',
        path: '/',
        domain: isLocal ? undefined : '.smcjournal.app',
      });
    });
    return res;
  };

  const { data: { user } } = await supabase.auth.getUser();
  const isPublic = isPublicRoute(pathname);
  const isProtected = isProtectedRoute(pathname);
  
  // 1. Auth Guard: Unauthenticated users -> /login
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return finalizeResponse(NextResponse.redirect(url));
  }

  // 2. Redirect Loop Prevention: Authenticated users -> /dashboard
  const isLoginPage = pathname === '/login' || pathname === '/signup';
  const isLandingPage = pathname === '/';
  const isLogoutSignal = pathname === '/' && request.nextUrl.searchParams.get('logout') === 'true';

  if (user && (isLoginPage || isLandingPage) && !isLogoutSignal) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return finalizeResponse(NextResponse.redirect(url));
  }

  // Final safety sync for standard next() response
  return finalizeResponse(supabaseResponse);
}

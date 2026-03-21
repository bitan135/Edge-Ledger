import { createBrowserClient } from '@supabase/ssr';
import { ENV } from '@/lib/env';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
  
  const host = typeof window !== 'undefined' ? window.location.host : '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');

  // Custom Storage Implementation to ensure PKCE works with SSR callback
  // Browser client defaults to localStorage, which the server can't see.
  // We force it into cookies so the auth/callback route can find the verifier.
  const cookieStorage = {
    getItem: (key) => {
      if (typeof document === 'undefined') return null;
      const name = `${key}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return null;
    },
    setItem: (key, value) => {
      if (typeof document === 'undefined') return;
      const domain = isLocal ? '' : `; domain=smcjournal.app`;
      const secure = isLocal ? '' : '; Secure';
      document.cookie = `${key}=${value}; path=/; SameSite=Lax${domain}${secure}; max-age=3600`;
    },
    removeItem: (key) => {
      if (typeof document === 'undefined') return;
      const domain = isLocal ? '' : `; domain=smcjournal.app`;
      document.cookie = `${key}=; path=/; SameSite=Lax${domain}; max-age=0`;
    },
  };

  return createBrowserClient(url, key, {
    cookieOptions: {
      domain: isLocal ? undefined : 'smcjournal.app',
      path: '/',
      sameSite: 'lax',
      secure: isLocal ? false : true,
    },
    auth: {
      flowType: 'pkce',
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'sb-smcjournal-auth-v4', // Rotate again for clean slate
      storage: cookieStorage // FORCE cookies for PKCE storage
    }
  });
}

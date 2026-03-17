import { createBrowserClient } from '@supabase/ssr';
import { ENV } from '@/lib/env';

export function createClient() {
  return createBrowserClient(
    ENV.url,
    ENV.anonKey
  );
}

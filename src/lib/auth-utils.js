import { ENV } from './env';

/**
 * Generates a redirect URL for Supabase auth flows.
 * This ensures we always point back to the correct environment (localhost or production).
 * @param {string} path - The path to redirect to (e.g., '/auth/callback')
 * @returns {string} - The full redirect URL
 */
export function getRedirectUrl(path = '/auth/callback') {
  const baseUrl = ENV.SITE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

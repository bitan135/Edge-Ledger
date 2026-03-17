// Validate required environment variables at startup
// This file is imported in API routes that need these vars

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Add it to your .env.local file and Vercel environment variables.`
    );
  }
  return value;
}

/**
 * Build-safe Supabase configuration.
 * Satisfies library requirements with placeholders if real keys are missing,
 * preventing prerendering crashes while ensuring no real secrets are hardcoded.
 */
export const getSupabaseConfig = () => ({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
});

export const ENV = {
  ...getSupabaseConfig(),
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://smcjournal.com',
  NOWPAYMENTS_API_KEY: process.env.NOWPAYMENTS_API_KEY,
  NOWPAYMENTS_IPN_SECRET: process.env.NOWPAYMENTS_IPN_SECRET,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

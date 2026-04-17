import jwt from 'jsonwebtoken';

/**
 * Admin JWT Auth Module
 * 
 * Uses the same underlying secret as affiliate auth but with
 * completely different issuer/audience claims, ensuring tokens
 * are never interchangeable between systems.
 * 
 * Credentials: ADMIN_EMAIL + ADMIN_PASSWORD env vars.
 */

function getSecret() {
  const secret = process.env.AFFILIATE_JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    console.error('FATAL: AFFILIATE_JWT_SECRET not set. Admin auth disabled.');
    return null;
  }
  return secret || `dev-admin-${process.pid}-${Date.now()}`;
}

export function signAdminToken(email) {
  const secret = getSecret();
  if (!secret) throw new Error('Admin auth is not configured.');

  return jwt.sign(
    { email, role: 'super_admin' },
    secret,
    {
      expiresIn: '8h',
      issuer: 'smcjournal-admin',
      audience: 'smcjournal-admin-panel',
    }
  );
}

export function verifyAdminToken(token) {
  const secret = getSecret();
  if (!secret) return null;

  try {
    const payload = jwt.verify(token, secret, {
      issuer: 'smcjournal-admin',
      audience: 'smcjournal-admin-panel',
    });
    if (payload.role !== 'super_admin') return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Middleware helper: extracts and verifies admin token from cookies.
 * Returns the payload or null.
 */
export async function getAdminSession(cookieStore) {
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

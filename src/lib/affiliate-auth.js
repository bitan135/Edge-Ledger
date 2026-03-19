import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AFFILIATE_JWT_SECRET || 'dev-secret-change-in-production';

if (!process.env.AFFILIATE_JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('WARNING: AFFILIATE_JWT_SECRET is missing in production environment');
}

export function signAffiliateToken(affiliateId, email) {
  return jwt.sign({ affiliateId, email }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyAffiliateToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

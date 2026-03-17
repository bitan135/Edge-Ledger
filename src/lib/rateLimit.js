const rateLimitMap = new Map();

export function rateLimit(identifier, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }
  
  const requests = rateLimitMap.get(identifier).filter(time => time > windowStart);
  
  if (requests.length >= maxRequests) {
    return { success: false, remaining: 0, resetAt: new Date(requests[0] + windowMs) };
  }
  
  requests.push(now);
  rateLimitMap.set(identifier, requests);
  
  // Clean up old entries every 100 calls to prevent memory leak
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every(t => t < windowStart)) rateLimitMap.delete(key);
    }
  }
  
  return { success: true, remaining: maxRequests - requests.length };
}

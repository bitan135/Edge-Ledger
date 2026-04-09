export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://smcjournal.app').replace(/\/$/, '');
  
  const routes = [
    '',
    '/login',
    '/signup',
    '/features',
    '/pricing',
    '/founding-member',
    '/insight-engine',
    '/forex-trading-journal',
    '/smc-trading-journal',
    '/trading-journal',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}

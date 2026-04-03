import FoundingMemberClient from './FoundingMemberClient';

export const metadata = {
  title: 'Founding Member — SMC Journal',
  description: 'Join the exclusive group of only 10 Founding Members for SMC Journal and secure a lifetime of edge.',
  metadataBase: new URL('https://smcjournal.app'),
  openGraph: {
    title: 'Founding Member Pass — SMC Journal',
    description: 'Own the elite institutional edge for a lifetime. Only 10 spots exist.',
    images: [{ 
      url: '/exclusive-lifetime-access.png',
      width: 1200,
      height: 630,
      alt: 'SMC Journal Founding Member Elite Pass'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founding Member Pass — SMC Journal',
    description: 'Own the elite institutional edge for a lifetime. Only 10 spots exist.',
    images: ['https://smcjournal.app/exclusive-lifetime-access.png'],
  },
};

export default function FoundingMemberPage() {
  return <FoundingMemberClient />;
}

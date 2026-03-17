import BillingClient from './BillingClient';

export const metadata = {
  title: 'Upgrade — SMC Journal',
  description: 'Upgrade to Pro for advanced analytics. $20/month or $50 lifetime.',
};

export default function BillingPage() {
  return <BillingClient />;
}

import AnalyticsClient from './AnalyticsClient';

export const metadata = {
  title: 'Analytics — SMC Journal',
  description: 'Advanced SMC trading analytics. Drawdown curve, session performance, instrument dominance, and monthly P&L.',
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
